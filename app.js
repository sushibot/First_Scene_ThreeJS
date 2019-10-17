const Three = require("three");

// import * as Three from 'three';
let width = window.innerWidth,
    height = window.innerHeight;
let scene = new Three.Scene();

let camera = new Three.PerspectiveCamera(75, width / height, 0.1, 1000);
let renderer = new Three.WebGLRenderer();

let geometry = new Three.BoxGeometry(5, 2.3, 1);
let material = new Three.MeshBasicMaterial({ color: 0x00ff00 });
let cube = new Three.Mesh(geometry, material);

let audioListener = new Three.AudioListener();
let sound = new Three.Audio(audioListener);
let audioAnalyzer = new Three.AudioAnalyser(sound, 32)
let audioLoader = new Three.AudioLoader();
camera.add(audioListener);
// document.getElementById("stop-button").addEventListener("click", (action) => {
//     sound.pause();
// });


// document.getElementById("play-button").addEventListener("click", (action) => {

//     audioLoader.load("./Sound/Moke.wav", (buffer) => {
//         console.log(buffer);
//         sound.setBuffer(buffer);
//         sound.setLoop(true);
//         sound.setVolume(0.5);

//         sound.play();
//     });

// });


let semi = 1,
    octave = 1200;
// document.getElementById("detuneUp").addEventListener("click", (action) => {
//     sound.setDetune(semi);
//     // sound.detune(semi);
//     semi += 2;
// })
// document.getElementById("detuneDown").addEventListener("click", (action) => {
//     sound.setDetune(semi)
//         // sound.detune(semi);
//     semi -= 2;
// })
// scene.add(cube);
camera.position.z = 5;
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

const analyzeAudio = () => {
    let test = audioAnalyzer.getFrequencyData();
    let texture = new Three.DataTexture(test, 32 / 2, 1, Three.RGBFormat)
    console.log(texture);
    console.log(test);
}
const animateObject = () => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
}
const render = () => {
    if (sound.isPlaying) {
        analyzeAudio();
    }

    lineShape();
    animateObject();
    renderer.render(scene, camera);
}

const animate = () => {
    requestAnimationFrame(animate);
    render();
}
const lineShape = () => {

    let max_points = 500;
    let shape = new Three.BufferGeometry(); //instatiates the buffer geometry for the shape, which will be a line in this case
    let material = new Three.LineBasicMaterial({ color: 0xff000, linewidth: 2 }); //creates the material and color for the line

    let positions = new Float32Array(max_points, 3); //3 vertices per point

    shape.addAttribute('position', new Three.BufferAttribute(positions, 3));
    let line = new Three.Line(shape, material);

    let drawCount = 2;
    shape.setDrawRange(0, drawCount);
    positions = line.geometry.attributes.position.array;
    let x, y, z, index;
    x = y = z = index = 0;
    for (let i = 0; i < max_points; i++) {
        positions[index++] = x;
        positions[index++] = y;
        positions[index++] = z;
        x += (Math.random() - 0.5) * 30;
        y += (Math.random() - 0.5) * 30;
        z += (Math.random() - 0.5) * 30;
    }
    scene.add(line);
    line.geometry.setDrawRange(0, 3);
}

// const updateLinePoints = () => {
//     let x, y, z, index;
//     x = y = z = index = 0;
//     for (let i = 0; i < max_points; i++) {
//         positions[index++] = x;
//         positions[index++] = y;
//         positions[index++] = z;
//         x += (Math.random() - 0.5) * 30;
//         y += (Math.random() - 0.5) * 30;
//         z += (Math.random() - 0.5) * 30;
//     }
// }

animate();