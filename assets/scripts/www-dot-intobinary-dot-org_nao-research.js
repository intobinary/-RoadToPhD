"use strict";
//	build scene
let loaded = 0;
const viewer = document.querySelector('.robot360-zone');
const loader = document.querySelector('h2 span');
const images = [];
for (let i = 1; i <= 36; ++i) {
    const img = new Image();
    img.src = `/assets/images/nao-research/nao-3d/${('' + i).slice(-3)}.jpg`;
    img.onload = () => loader.innerText = `${Math.round(++loaded / 36 * 360)}˚`;
    images.push(img);
    viewer.appendChild(img);
}
//	rotation handler
//	http://chrisbateman.github.io/impetus/
//	https://github.com/chrisbateman/impetus
const threshold = 5;
const total = images.length - 1;
let frame = 0;
const impetus = new Impetus({
    source: document,
    update(x) {
        // console.log(x)
        images[frame].classList.remove('active');
        frame = Math.floor(-x / threshold) % total;
        frame = frame <= 0 ? total + frame : frame;
        images[frame].classList.add('active');
    }
});
images[frame].classList.add('active');
//	cursor
document.getElementByClass("robot360-zone").addEventListener('mousedown', e => document.getElementByClass("robot360-zone").style.cursor = 'grabbing');
document.getElementByClass("robot360-zone").addEventListener('mouseup', e => document.getElementByClass("robot360-zone").style.cursor = 'grab');
