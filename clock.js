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
//call clock-drawing function using setInterval method to start it every second
setInterval(drawClock, 1000);
//create clock-drawing function
function drawClock(){
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
};

function drawFace(ctx, radius) {
  //create var for gradient
  var grad;
  //draw white clock face (beginPath to first ctx.fill)
  //begins path or can be used to reset current path
  ctx.beginPath();
  //.arc is used to create circles or parts of circles
  ctx.arc(0, 0, radius, 0, 2*Math.PI);
  //will color in face of clock
  ctx.fillStyle = "white";
  //used to fill current path of drawing, default color is black
  ctx.fill();
  //use grad variable to make radial gradient
  grad = ctx.createRadialGradient(0, 0, radius*0.95, 0, 0, radius*1.05);
  //create '3D' effect by creating 3 color stops corresponding with inner, middle and outer edge of arc
  grad.addColorStop(0, '#333'); //inner
  grad.addColorStop(0.5, 'white'); //middle
  grad.addColorStop(1, '#333'); //outer edge
  //define gradient as strokestyle of drawing object
  ctx.strokeStyle = grad;
  //defining line width at 10% of rad
  ctx.lineWidth = radius*0.1;
  //use stroke method to draw circle
  ctx.stroke();
  //(begin path to fill) to draw clock center
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
};

function drawNumbers(ctx, radius){
  //var for angle
  var ang;
  //var for clock numbers
  var num;
  //set font size to 15% of radius
  ctx.font = radius*0.15 + "px arial";
  //set text align to middle and center
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  //calculate print position for the clock numbers at 85% of radius
  for(num = 1; num < 13; num++){
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    //change (x,y)
    ctx.translate(0, -radius*0.85);
    ctx.rotate(-ang);
    //put text on clock as string
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    //change (x,y)
    ctx.translate(0, radius*0.85);
    ctx.rotate(-ang);
  };
};


function drawTime(ctx, radius){
  //vars of current date and time
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  //calculate angle of hour hand
  hour = hour%12;
  hour = (hour*Math.PI/6)+
  (minute*Math.PI/(6*60))+
  (second*Math.PI/(360*60));
  drawHand(ctx, hour, radius*0.5, radius*0.07);
  //calculate angle of minute hand
  minute = (minute*Math.PI/30)+(second*Math.PI/(30*60));
  drawHand(ctx, minute, radius*0.8, radius*0.07);
  //calculate angle second hand
  second = (second*Math.PI/30);
  drawHand(ctx, second, radius*0.9, radius*0.02);
};

function drawHand(ctx, pos, length, width){
  ctx.beginPath();
  ctx.lineWidth = width;
  //style end of line
  ctx.lineCap = "round";
  ctx.moveTo(0,0);
  ctx.rotate(pos);
  //makes new point and creates line to that point from last specified point
  ctx.lineTo(0, -length);
  //draw line
  ctx.stroke();
  ctx.rotate(-pos);
};
