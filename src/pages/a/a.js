require('./a.css');
const color = require('../../public-resource/color.js');
const oA = color.getIdDom('a');
const oImg = color.getClassDom('img1');
oImg.src = require('../../img/b_flight1.jpg');
oA.onclick = function(){
  oA.style.color = color.colorRandom();
};
oA.onselectstart = function(){
  return false;
}