//SETUP

var ctxId = document.getElementById("ctx");
var port = document.getElementById("port");

var game = new FitViewport(ctxId,ctxId.getContext("2d"),(16/9),32,"white","gray",window.innerWidth,window.innerHeight*0.8);
var pendulum = new Pendulum(game.getContext(),game.getCanvas().width/2,game.getCanvas().height/32,game.getDimension(),game.getDimension()*(4/1000));


//GLOBALS

const g = 9.81;

var length1 = parseFloat(document.getElementById("length1").value)*1000;
var m1 = parseFloat(document.getElementById("m1").value); //kg
var a1 = parseFloat(document.getElementById("a1_value").value)*(Math.PI/180);
var a1_v = 0;
var a1_a = 0;

var length2 = parseFloat(document.getElementById("length2").value)*1000;
var m2 = parseFloat(document.getElementById("m1").value); //kg
var a2 = parseFloat(document.getElementById("a2_value").value)*(Math.PI/180);
var a2_v = 0;
var a2_a = 0;

$( window ).resize(() => {
  game.resizeCanvas(window.innerWidth,window.innerHeight*0.8);
  pendulum.onResize(game.getCanvas().width/2,game.getCanvas().height/32,game.getDimension(),game.getDimension()*(4/1000));
});
		
function drawCoreFunction(){
	game.clearCanvasArea(0,0,game.getCanvas().width,game.getCanvas().height);
	
	
	a1_a = getEq1();
	a2_a = getEq2();
	
	
	a1_v += a1_a;
	a2_v += a2_a;
	
	a1 += a1_v;
	a2 += a2_v;
	
	var x1 = length1 * Math.sin(a1);
	var y1 = length1 * Math.cos(a1);
	
	var x2 = x1 + length2 * Math.sin(a2);
	var y2 = y1 + length2 * Math.cos(a2);
	
	
	
	pendulum.drawPendulum(0,0,x1,y1,m1);
	pendulum.drawPendulum(x1,y1,x2,y2,m2);
	
	window.requestAnimationFrame(drawCoreFunction);
}

window.requestAnimationFrame(drawCoreFunction);

function getEq1(){
	var num1 = -g * (2 * m1 + m2) * Math.sin(a1);
	var num2 = -m2 * g * Math.sin(a1-2*a2);
	var num3 = -2*Math.sin(a1-a2)*m2;
	var num4 = a2_v*a2_v*length2+a1_v*a1_v*length1*Math.cos(a1-a2);
	var den = length1 * (2*m1+m2-m2*Math.cos(2*a1-2*a2));
	var acceleration1 = (num1 + num2 + num3*num4) / den;
	return acceleration1;
}

function getEq2(){
	var num1 = 2 * Math.sin(a1-a2);
	var num2 = (a1_v*a1_v*length1*(m1+m2));
	var num3 = g * (m1 + m2) * Math.cos(a1);
	var num4 = a2_v*a2_v*length2*m2*Math.cos(a1-a2);
	var den = length2 * (2*m1+m2-m2*Math.cos(2*a1-2*a2));
	var acceleration2 = (num1*(num2+num3+num4)) / den;
	return acceleration2;
}

//INPUTS

document.getElementById("length1").oninput = () => {
   document.getElementById("length1_value").value = document.getElementById("length1").value;
   length1 = parseFloat(document.getElementById("length1").value) * 1000;
}

document.getElementById("length2").oninput = () => {
   document.getElementById("length2_value").value = document.getElementById("length2").value;
   length2 = parseFloat(document.getElementById("length2").value) * 1000;
}

document.getElementById("m1").oninput = () => {
   document.getElementById("m1_value").value = document.getElementById("m1").value;
   length1 = parseFloat(document.getElementById("m1").value);
}

document.getElementById("m2").oninput = () => {
   document.getElementById("m2_value").value = document.getElementById("m2").value;
   length2 = parseFloat(document.getElementById("m2").value);
}

document.getElementById("m1").oninput = () => {
   document.getElementById("m1_value").value = document.getElementById("m1").value;
   m1 = parseFloat(document.getElementById("m1").value);
}

document.getElementById("m2").oninput = () => {
   document.getElementById("m2_value").value = document.getElementById("m2").value;
   m2 = parseFloat(document.getElementById("m2").value);
}

function setAngles(){
	a1 = parseFloat(document.getElementById("a1_value").value)*(Math.PI/180);
	a2 = parseFloat(document.getElementById("a2_value").value)*(Math.PI/180);
}

/*

ctxId.style.width,ctxId.style.height





function getEq1(){
	var num1 = -g * (2 * m1 + m2) * Math.sin(a1*(Math.PI/180));
	var num2 = -m2 * g * Math.sin(a1*(Math.PI/180)-2*a2*(Math.PI/180));
	var num3 = -2*Math.sin(a1*(Math.PI/180)-a2*(Math.PI/180))*m2;
	var num4 = a2_v*a2_v*length2+a1_v*a1_v*length1*Math.cos(a1*(Math.PI/180)-a2*(Math.PI/180));
	var den = length1 * (2*m1+m2-m2*Math.cos(2*a1*(Math.PI/180)-2*a2*(Math.PI/180)));
	var acceleration = (num1 + num2 + num3*num4) / den;
	return acceleration;
}

function getEq2(){
	var num1 = 2 * Math.sin(a1*(Math.PI/180)-a2*(Math.PI/180));
	var num2 = (a1_v*a1_v*length1*(m1+m2));
	var num3 = g * (m1 + m2) * Math.cos(a1*(Math.PI/180));
	var num4 = a2_v*a2_v*length2*m2*Math.cos(a1*(Math.PI/180)-a2*(Math.PI/180));
	var den = length2 * (2*m1+m2-m2*Math.cos(2*a1*(Math.PI/180)-2*a2*(Math.PI/180)));
	var acceleration = (num1*(num2+num3+num4)) / den;
	return acceleration;
}

*/