class Tool{
    LineWidth = 2;
    StrokeColor = "black";
    FillColor = "black";
    LineJoin = "round";
    LineCap = "round";
    IsFilled = false;

    constructor(){
        if(this.constructor == Tool)
            throw new Error("You Cannot create an abstract class instance");
    }

    matchSettings(context){
        context.strokeStyle = this.StrokeColor;
        context.fillStyle = this.FillColor;
        context.lineCap = this.LineCap;
        context.lineJoin = this.LineJoin;
        context.lineWidth = this.LineWidth;
    }

    draw(event, context){
        throw new Error("You have to override this abstract method");
    }
}

export default Tool;