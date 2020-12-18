function dashedLine(){
	console.log('----------');
}

function crosshairs(){
	var current_stroke = ctx.strokeStyle;
	ctx.strokeStyle = 'rgba(66, 168, 255, 0.25)';  //  semi-transparent white

	ctx.beginPath;
	ctx.moveTo(canvas.width/2,-canvas.height);
	ctx.lineTo(canvas.width/2,canvas.height);
	ctx.stroke();
	ctx.moveTo(0,canvas.height/2);
	ctx.lineTo(canvas.width,canvas.height/2);
	ctx.stroke();
	ctx.strokeStyle = current_stroke;
		

}