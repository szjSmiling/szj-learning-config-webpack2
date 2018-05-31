var color = {// 获取dom元素
  getClassDom: function(className){
      return document.getElementsByClassName(className)[0];
  },
  getIdDom: function(id){
    return document.getElementById(id);
  },
  colorRandom: function(){
      var r = Math.floor(Math.random()*256);
      var g = Math.floor(Math.random()*256);
      var b = Math.floor(Math.random()*256);
      var rgb = 'rgb('+r+','+g+','+b+')';
      return rgb;
  }
}

module.exports = color;// 导出模块