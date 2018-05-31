require('./test.css');
console.log("我是入口js");
function testEs6(a, ...args) {
  console.log(args); // [2,3,4]
}
testEs6(1,2,3,4);
console.log(Set);
console.log(Map);
const color = require('src/public-resource/color.js');
const arr = [require('../../img/b_flight1.jpg'),require('../../img/b_flight2.jpg'),require('../../img/b_flight3.jpg'),require('../../img/b_flight4.jpg')];
color.getIdDom('test').onclick = function(){
  color.getIdDom('test').style.color = color.colorRandom();
  // color.getClassDom('img3').style.background = 'url('+(arr[Math.random(0,3)])+')';
};

new Promise(function(resolve, reject) {});