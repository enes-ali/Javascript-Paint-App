"use-strict";
import Tool from "./Tool.js";

class Circle extends Tool{
    FillColor = "transparent";
    
    constructor(){
        super();
    }

    draw(event, context){
        context.clearRect(0, 0, event.canvasWidth, event.canvasHeight);
        context.putImageData(event.lastImage, 0, 0);

        const X = event.clientX;
        const Y = event.clientY;

        let radius = (Math.abs(X - event.center_x) > Math.abs(Y - event.center_y)) ? Math.abs(X - event.center_x) : Math.abs(Y - event.center_y);
        context.fillStyle = this.FillColor;
        context.strokeStyle = this.StrokeColor;
        context.arc(event.center_x, event.center_y, radius, 0, 2*Math.PI);
        
        if(this.IsFilled)
            context.fill();
        else
            context.stroke();

        context.beginPath();
    }
}

export default Circle;