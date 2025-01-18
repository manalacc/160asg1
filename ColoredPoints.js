// ColoredPoint.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE =`
    attribute vec4 a_Position;
    uniform float u_Size;
    void main() {
        gl_Position = a_Position;
        gl_PointSize = u_Size;
    }`
  
// Fragment shader program
var FSHADER_SOURCE =`
    precision mediump float;
    uniform vec4 u_FragColor;  
    void main() {
      gl_FragColor = u_FragColor;
    }`


// Glb vars
let canvas;
let gl;
let a_Position;
let u_FragColor;
let u_Size;


function setupWebGL() {
    // Retrieve <canvas> element
    canvas = document.getElementById('webgl');

    // Get the rendering context for WebGL
    // gl = getWebGLContext(canvas)
    gl = canvas.getContext('webgl', {preserveDrawingBuffer: true});
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }
}

function connectVariablesToGLSL() {
    // Initialize shaders
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to intialize shaders.');
        return;
    }

    // // Get the storage location of a_Position
    a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return;
    }

    // Get the storage location of u_FragColor
    u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    if (!u_FragColor) {
        console.log('Failed to get the storage location of u_FragColor');
        return;
    }    
    
    u_Size = gl.getUniformLocation(gl.program, 'u_Size');
    if (!u_Size) {
        console.log('Failed to get the storage location of u_Size');
        return;
    }
}

// Constants
const POINT = 0;
const TRIANGLE = 1;
const CIRCLE = 2;

// UI globals
let g_selectedColor=[1.0,1.0,1.0,1.0];
let g_selectedSize = 10;
let g_selectedSegments = 10;
let g_selectedType = POINT;

function addActionsForHtmlUI() {
    // Buttons for easier color changing
    document.getElementById('Rbutton').addEventListener('mouseup', function() {g_selectedColor=[1.0,0.0,0.0,1.0]})
    document.getElementById('Gbutton').addEventListener('mouseup', function() {g_selectedColor=[0.0,1.0,0.0,1.0]})
    document.getElementById('Bbutton').addEventListener('mouseup', function() {g_selectedColor=[0.0,0.0,1.0,1.0]})

    // Clear Button
    document.getElementById('ClearButton').addEventListener('mouseup', function() {g_shapesList=[]; renderAllShapes();})

    //Shapes
    document.getElementById('PointButton').addEventListener('mouseup', function () {g_selectedType=POINT})
    document.getElementById('TriButton').addEventListener('mouseup', function () {g_selectedType=TRIANGLE})
    document.getElementById('CirButton').addEventListener('mouseup', function () {g_selectedType=CIRCLE})

    // Color
    document.getElementById('red').addEventListener('mouseup', function() {g_selectedColor[0] = parseFloat(this.value);})
    document.getElementById('green').addEventListener('mouseup', function() {g_selectedColor[1] = parseFloat(this.value);})
    document.getElementById('blue').addEventListener('mouseup', function() {g_selectedColor[2] = parseFloat(this.value);})

    // Customize size/ circle segments
    document.getElementById('size').addEventListener('mouseup', function() {g_selectedSize = this.value;})
    document.getElementById('segments').addEventListener('mouseup', function() {g_selectedSegments = this.value;})

    document.getElementById('Drawing').addEventListener('mouseup', function() {renderDrawing()})

    document.getElementById('ChaseButton').addEventListener('mouseup', function() {
        startChaseMode(); 
        mousePosition = [0, 0];
        catPosition = [1, 1];
    });
}

function main() {

    setupWebGL();

    connectVariablesToGLSL();

    // Register function (event handler) to be called on a mouse press
    canvas.onmousedown = click;
    canvas.onmousemove = function(ev) { if(ev.buttons == 1) { click(ev) }};
    addActionsForHtmlUI();

    // Specify the color for clearing <canvas>
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    renderDrawing();
}

var g_shapesList = [];

function click(ev) {

    [x, y] = convertCoordinatesEventToGL(ev);

    let point;

    if (g_selectedType == POINT) {
        point = new Point();
    } else if (g_selectedType == TRIANGLE) {
        point = new Triangle();
    } else {
        point = new Circle();
        point.segments = g_selectedSegments;
    }

    point.position = [x, y];
    //console.log(point.position)
    point.color = g_selectedColor.slice();
    point.size = g_selectedSize;
    g_shapesList.push(point)
    //console.log(point)
    
    renderAllShapes();
}

function convertCoordinatesEventToGL(ev) {
    var x = ev.clientX; // x coordinate of a mouse pointer
    var y = ev.clientY; // y coordinate of a mouse pointer
    var rect = ev.target.getBoundingClientRect();

    x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
    y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);
    
    return([x, y])
}

function renderAllShapes() {
    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    var len = g_shapesList.length;

    for(var i = 0; i < len; i++) {
        g_shapesList[i].render()
    }
}
