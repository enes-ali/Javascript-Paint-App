import Pen from "./Pen.js";
import Tool from "./Tool.js";

class Canvas{

    #isHoldingMouseButton = false;
    #currentTool = new Pen();
    #lastMousePos = []; // For Drawing Shapes
    #lastImage;
    #canvas;
    #context;

    constructor(width, height, parent){
        // Create canvas
        this.#canvas = document.createElement("canvas");
        this.#canvas.width = width;
        this.#canvas.height = height;

        // Append canvas to parent
        parent.appendChild(this.#canvas);

        // Create context
        this.#context = this.#canvas.getContext("2d");
        this.#context.beginPath();

        // Bind events
        this.#canvas.addEventListener("mousedown", this.mouseDown);
        this.#canvas.addEventListener("mouseup", this.mouseUp);
        this.#canvas.addEventListener("mouseleave", this.mouseLeave);
        this.#canvas.addEventListener("mousemove", this.draw);
    }

    getCanvas(){
        return this.#canvas;
    }

    get currentTool(){
        return this.#currentTool;
    }

    setCurrentTool = (newTool)=>{
        if(newTool instanceof Tool){
            newTool.FillColor = this.#currentTool.FillColor;
            newTool.StrokeColor = this.#currentTool.StrokeColor;
            newTool.LineCap = this.#currentTool.LineCap;
            newTool.LineJoin = this.#currentTool.LineJoin;
            newTool.LineWidth = this.#currentTool.LineWidth;
            
            this.#currentTool = newTool;
        }else{
            throw new Error("Tool Should Be instance of Tool class");
        }
    }

    setFillColor(color){
        if(!color instanceof String)
            new Error("Color must be string");
        this.#currentTool.FillColor = color;
    }

    setStrokeColor(color){
        if(!color instanceof String)
            new Error("Color must be string");
        this.#currentTool.StrokeColor = color;
    }

    mouseDown = (event) => {
        this.#isHoldingMouseButton = true;
        this.#lastMousePos = [event.clientX, event.clientY];
        this.#lastImage = this.#context.getImageData(0, 0, this.#canvas.width, this.#canvas.height);
        this.draw(event);
    }

    mouseUp = (event) => {
        this.#isHoldingMouseButton = false;
        this.#context.beginPath();
    }

    mouseLeave = (event) => {
        this.#isHoldingMouseButton = false;
        this.#context.beginPath();
    }

    draw = (event) => {
        event.center_x = this.#lastMousePos[0];
        event.center_y = this.#lastMousePos[1];
        event.lastImage = this.#lastImage;
        event.canvasWith = this.#canvas.width;
        event.canvasHeight = this.#canvas.height;
        if(this.#currentTool !== undefined && this.#isHoldingMouseButton)
            this.#currentTool.draw(event, this.#context);
    }
}

export default Canvas;