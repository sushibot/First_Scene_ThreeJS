const Three = require("three");

// import * as Three from 'three';
let width = window.innerWidth,
    height = window.innerHeight;
let scene = new Three.Scene();

console.log('39248938493849384jelkj');
let camera = new Three.PerspectiveCamera(55, width / height, 1, 500);
let renderer = new Three.WebGLRenderer();

let geometry = new Three.BoxGeometry(5, 2.3, 1);
let material = new Three.MeshBasicMaterial({ color: 0x00ff00 });
let cube = new Three.Mesh(geometry, material);

scene.add(cube);
camera.position.set(0, 0, 30);
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

let lineMaterial = new Three.LineBasicMaterial({ color: "#ffd900" });
let lineGeometry = new Three.Geometry();
lineGeometry.vertices.push(new Three.Vector3(-10, 0, 0));
lineGeometry.vertices.push(new Three.Vector3(0, 10, 0));
lineGeometry.vertices.push(new Three.Vector3(10, 0, 0));
let line = new Three.Line(lineGeometry, lineMaterial);
scene.add(line);
document.getElementById("remove-button").addEventListener("click", () => {
    scene.remove(line);
})
const animateObject = () => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    line.rotation.x += 0.04;
    line.rotation.y += 0.03;
    line.rotation.z += 0.05;
    // line.rotateOnAxis(1, 15);
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