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

scene.add(cube);
camera.position.z = 5;
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);


const animateObject = () => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
}
const render = () => {

    animateObject();
    renderer.render(scene, camera);
}

const animate = () => {
    requestAnimationFrame(animate);
    render();
}



animate();