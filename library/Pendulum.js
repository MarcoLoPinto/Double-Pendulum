class Pendulum{
	constructor(ctx,startX,startY,kgUnitDimension,lengthUnitDimension){
		this.ctx = ctx;
		this.gX = startX;
		this.gY = startY;
		this.unitKg = kgUnitDimension;
		this.unitLength = lengthUnitDimension;
		this.trace = [];
	}
	
	drawBall(x,y,m){
		this.ctx.save();
		this.ctx.beginPath();
		this.ctx.fillStyle = "black";
		this.ctx.arc(this.gX+x*this.unitLength,this.gY+y*this.unitLength,m*this.unitKg,0,2*Math.PI);
		this.ctx.fill();
		this.ctx.restore();
	}
	
	drawLine(x0,y0,x1,y1){
		this.ctx.save();
		this.ctx.beginPath();
		this.ctx.moveTo(this.gX+x0*this.unitLength,this.gY+y0*this.unitLength);
		this.ctx.lineTo(this.gX+x1*this.unitLength,this.gY+y1*this.unitLength);
		this.ctx.stroke();
		this.ctx.restore();
	}
	
	drawPendulum(x0,y0,x1,y1,m){
		this.drawLine(x0,y0,x1,y1);
		this.drawBall(x1,y1,m);
	}
	
	onResize(startX,startY,kgUnitDimension,lengthUnitDimension){
		this.gX = startX;
		this.gY = startY;
		this.unitKg = kgUnitDimension;
		this.unitLength = lengthUnitDimension;
	}
	
	takePoint(valx,valy){
		this.trace.push({x:valx,y:valy});
		if(this.trace.length > 300) this.trace.shift();
	}
	
	drawPoints(){
		for(var i = 1; i< this.trace.length; i++){
			this.drawLine(this.trace[i-1].x,this.trace[i-1].y,this.trace[i].x,this.trace[i].y);
		}
	}
	
}