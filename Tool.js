"use-strict";

class Tool{
    StrokeWidth = 8;
    StrokeColor = "black";
    FillColor = "black";
    LineJoin = "round";

    constructor(){
        if(this.constructor == Tool)
            throw new Error("You Cannot create an abstract class instance");
    }

    draw(event, context){
        throw new Error("You have to override this abstract method");
    }
}

export default Tool;