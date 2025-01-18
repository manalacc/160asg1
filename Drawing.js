function renderDrawing() {
    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    g_shapesList=[]
    
    Draw();

    var len = g_shapesList.length;

    for(var i = 0; i < len; i++) {
        g_shapesList[i].renderCustom()
    }
}

const HAIR_COLOR = [0.231, 0.231, 0.231, 1];
const FACE_COLOR = [0.940, 0.812, 0.592, 1];
const NECK_COLOR = [0.790, 0.660, 0.434, 1];
const EYE_1 = [1, 1, 1, 1]

function Draw() {
    let p = new Triangle();

    // neck 1
    p.vertices = [0, -1, -0.4, -0.6, 0.4, -0.6];
    p.color = NECK_COLOR;
    g_shapesList.push(p)
    
    //neck 2
    p = new Triangle();
    p.vertices = [0.3, -1, 0, -1, 0.4, -0.6];
    p.color = NECK_COLOR;
    g_shapesList.push(p)

    //neck 3
    p = new Triangle();
    p.vertices = [-0.3, -1, 0, -1, -0.4, -0.6];
    p.color = NECK_COLOR;
    g_shapesList.push(p)

    // face 1 'chin'
    p = new Triangle();
    p.vertices = [0, -0.8, -0.6, -0.5, 0.6, -0.5];
    p.color = FACE_COLOR;
    g_shapesList.push(p)

    // face 2 'middle'
    p = new Triangle();
    p.vertices = [0, 1, -0.6, -0.5, 0.6, -0.5];
    p.color = FACE_COLOR;
    g_shapesList.push(p)

    // face 3 'right'
    p = new Triangle();
    p.vertices = [0, 1, 0.6, -0.5, 0.6, 1];
    p.color = FACE_COLOR;
    g_shapesList.push(p)

    // face 3.5 'right'
    p = new Triangle();
    p.vertices = [0.85, 0.3, 0.6, -0.5, 0.6, 1];
    p.color = FACE_COLOR;
    g_shapesList.push(p)

    // face 4 'left'
    p = new Triangle();
    p.vertices = [0, 1, -0.6, -0.5, -0.6, 1];
    p.color = FACE_COLOR;
    g_shapesList.push(p)

    // face 4.5 'left'
    p = new Triangle();
    p.vertices = [-0.85, 0.3, -0.6, -0.5, -0.6, 1];
    p.color = FACE_COLOR;
    g_shapesList.push(p)

    // hair 1 middle
    p = new Triangle();
    p.vertices = [0, 0, 0.3, 1, -0.3, 1];
    p.color = HAIR_COLOR;
    g_shapesList.push(p)

    // hair 2 middleright
    p = new Triangle();
    p.vertices = [0.25, 0.25, 0.6, 1, 0.25, 1];
    p.color = HAIR_COLOR;
    g_shapesList.push(p)

    // hair 2.5 middleleft
    p = new Triangle();
    p.vertices = [-0.25, 0.25, -0.6, 1, -0.25, 1];
    p.color = HAIR_COLOR;
    g_shapesList.push(p)

    // hair 3 middlerightright
    p = new Triangle();
    p.vertices = [0.4, 0.3, 0.6, 1, 0.5, 1];
    p.color = HAIR_COLOR;
    g_shapesList.push(p)

    // hair 3.5 middleleftleft
    p = new Triangle();
    p.vertices = [-0.4, 0.3, -0.6, 1, -0.5, 1];
    p.color = HAIR_COLOR;
    g_shapesList.push(p)

    // left hair 1
    p = new Triangle();
    p.vertices = [-0.55, -0.7, -0.7, 0.98, -0.55, 1];
    p.color = HAIR_COLOR;
    g_shapesList.push(p)

    // left hair 2
    p = new Triangle();
    p.vertices = [-0.55, -0.7, -0.8, 0.8, -0.55, 1];
    p.color = HAIR_COLOR;
    g_shapesList.push(p)

    // left hair 3
    p = new Triangle();
    p.vertices = [-0.65, -0.55, -0.9, 0.5, -0.65, 0.8];
    p.color = HAIR_COLOR;
    g_shapesList.push(p)

    // left hair 4
    p = new Triangle();
    p.vertices = [-0.7, -0.5, -0.9, 0.5, -0.65, 0.8];
    p.color = HAIR_COLOR;
    g_shapesList.push(p)

    // right hair 1
    p = new Triangle();
    p.vertices = [0.55, -0.7, 0.7, 0.98, 0.55, 1];
    p.color = HAIR_COLOR;
    g_shapesList.push(p)

    // right hair 2
    p = new Triangle();
    p.vertices = [0.55, -0.7, 0.8, 0.8, 0.55, 1];
    p.color = HAIR_COLOR;
    g_shapesList.push(p)

    // right hair 3
    p = new Triangle();
    p.vertices = [0.65, -0.55, 0.9, 0.5, 0.65, 0.8];
    p.color = HAIR_COLOR;
    g_shapesList.push(p)
    
    // right hair 4
    p = new Triangle();
    p.vertices = [0.7, -0.5, 0.9, 0.5, 0.65, 0.8];
    p.color = HAIR_COLOR;
    g_shapesList.push(p)

    // right eye 1
    p = new Triangle();
    p.vertices = [0.5, 0.2, 0.25, 0, 0.15, 0.2];
    p.color = EYE_1;
    g_shapesList.push(p)

    // right eye 2
    p = new Triangle();
    p.vertices = [0.5, 0.2, 0.25, 0, 0.35, 0];
    p.color = EYE_1;
    g_shapesList.push(p)

    // right pupil 
    p = new Triangle();
    p.vertices = [0.4, 0.2, 0.3, 0, 0.25, 0.2];
    p.color = [0, 0, 0, 1];
    g_shapesList.push(p)

    // left eye 1
    p = new Triangle();
    p.vertices = [-0.5, 0.2, -0.25, 0, -0.15, 0.2];
    p.color = EYE_1;
    g_shapesList.push(p)

    // left eye 2
    p = new Triangle();
    p.vertices = [-0.5, 0.2, -0.25, 0, -0.35, 0];
    p.color = EYE_1;
    g_shapesList.push(p)

    // left pupil 
    p = new Triangle();
    p.vertices = [-0.4, 0.2, -0.3, 0, -0.25, 0.2];
    p.color = [0, 0, 0, 1];
    g_shapesList.push(p)

    // nose
    p = new Triangle();
    p.vertices = [0, -0.2, -0.1, -0.25, 0.1, -0.25];
    p.color = NECK_COLOR;
    g_shapesList.push(p)

    // mouth
    p = new Triangle();
    p.vertices = [0, -0.6, -0.3, -0.45, 0.3, -0.45];
    p.color = [0.89, 0.4, 0.4, 1];
    g_shapesList.push(p)
}