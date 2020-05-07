//create canvas object
var canvas = document.getElementById("canvas");
//create a 2d drawing object "ctx" stands for context
var ctx = canvas.getContext("2d");
//calculate clock radius
var radius = canvas.height/2;
//remap position (x,y) to center of canvas
ctx.translate(radius, radius);
//reduce clock radius so it is drawn inside the canvas
radius = radius * 0.90;
//call clock-drawing function
drawClock();
//create clock-drawing function
function drawClock(){
  //.arc is used to create circles or parts of circles
  ctx.arc(0, 0, radius, 0, 2*Math.PI);
  //will color in face of clock
  ctx.fillStyle = "White";
  //used to fill current path of drawing, default color is black
  ctx.fill();
};
