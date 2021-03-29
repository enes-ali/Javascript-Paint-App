import Tool from "./Tool.js";

class Rectangle extends Tool{
    FillColor = "transparent";
    
    constructor(){
        super();
    }

    draw(event, context){
        context.clearRect(0, 0, event.canvasWidth, event.canvasHeight);
        context.putImageData(event.lastImage, 0, 0);

        // Settings
        this.matchSettings(context);

        let start_x = (event.center_x < event.clientX) ? event.center_x : event.clientX;
        let start_y = (event.center_y < event.clientY) ? event.center_y : event.clientY;
        let width = Math.abs(event.center_x - event.clientX);
        let height = Math.abs(event.center_y - event.clientY);

        if(this.IsFilled)
            context.fillRect(start_x, start_y, width, height)
        else
            context.strokeRect(start_x, start_y, width, height);
        context.beginPath();
    }
}

export default Rectangle;