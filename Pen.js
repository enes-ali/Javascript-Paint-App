import Tool from "./Tool.js";


class Pen extends Tool{
    constructor(){
        super();
    }

    draw(event, context){
        const X = event.offsetX;
        const Y = event.offsetY;

        // Settings
        this.matchSettings(context);
        
        // draw
        context.lineTo(X, Y);
        context.stroke();
        context.beginPath();
        context.moveTo(X, Y);
    }
}

export default Pen;