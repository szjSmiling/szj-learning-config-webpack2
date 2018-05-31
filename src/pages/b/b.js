require('./b.css');
const color = require('../../public-resource/color.js');

const oImg = color.getClassDom('img2');
oImg.src = require('Simg/b_flight2.jpg');
const oB = color.getIdDom('b');
oB.onclick = function(){
  oB.style.color = color.colorRandom();
};
oB.onselectstart = function(){
  return false;
}