Template.draw.events({
	"click #drawIt": function(event){
	drawStuff();
	}
})

function drawStuff(){
	drawContext = drawSpace.getContext("2d");
	var my_gradient = drawContext.createLinearGradient(0,0,600,300);
	my_gradient.addColorStop(0,"red");
	my_gradient.addColorStop(0.5,"green");
	my_gradient.addColorStop(1,"blue");
	drawContext.fillStyle=my_gradient;
	drawContext.fillRect(0,0,600,300);
	drawContext.fillStyle="blue";
	drawContext.fillRect(50,50,550,250);
	drawContext.fillStyle="red";
	drawContext.fillRect(200,145,20,10);
	drawContext.fillRect(295,140,10,20);
}

Template.draw.rendered = drawStuff;

function drawTriange(){
	drawContext.strokeStyle="#00ff00";
	drawContext.moveTo(100,100);
	drawContext.lineTo(150,100);
	drawContext.lineTo(125,150);
	drawContext.lineTo(125,150);
	drawContext.lineTo(100,100);
	drawContext.stroke();
}