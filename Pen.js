"use-strict";
import Tool from "./Tool.js";


class Pen extends Tool{
    constructor(){
        super();
    }

    draw(event, context){
        const X = event.offsetX;
        const Y = event.offsetY;
        context.strokeStyle = this.StrokeColor;
        context.fillStyle = this.FillColor;
        context.lineJoin = this.LineJoin;
        //context.lineWidth = this.StrokeWidth;
        context.lineTo(X, Y);
        context.stroke();
        context.beginPath();
        context.moveTo(X, Y);
    }
}

export default Pen;