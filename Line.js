import Tool from "./Tool.js";

class Line extends Tool{
    constructor(){
        super();
    }

    draw(event, context){
        context.clearRect(0, 0, event.canvasWidth, event.canvasHeight);
        context.putImageData(event.lastImage, 0, 0);

        // Cordinates
        let startX = event.center_x;
        let startY = event.center_y;
        let endX = event.clientX;
        let endY = event.clientY;

        // Settings
        context.fillStyle = this.FillColor;
        context.strokeStyle = this.StrokeColor;

        // draw
        context.moveTo(startX, startY);
        context.lineTo(endX, endY);
        context.stroke();
        context.beginPath();
    }
}

export default Line;