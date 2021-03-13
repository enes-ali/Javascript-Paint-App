"use-strict";
import Tool from "./Tool.js";

class Canvas{

    #isHoldingMouseButton = false;
    _currentTool = null;
    #lastMousePos = []; // For Drawing Shapes
    #lastImage;

    constructor(width, height, parent){
        // Create canvas
        this._canvas = document.createElement("canvas");
        this._canvas.width = width;
        this._canvas.height = height;

        // Append canvas to parent
        parent.appendChild(this._canvas);

        // Create context
        this._context = this._canvas.getContext("2d");
        this._context.beginPath();
        this._context.lineCap = "rounded";

        // Bind events
        this._canvas.addEventListener("mousedown", this.mouseDown);
        this._canvas.addEventListener("mouseup", this.mouseUp);
        this._canvas.addEventListener("mouseleave", this.mouseLeave);
        this._canvas.addEventListener("mousemove", this.draw);
    }

    getCanvas(){
        return this._canvas;
    }

    get currentTool(){
        return this._currentTool;
    }

    set currentTool(newTool){
        if(newTool instanceof Tool){
            this._currentTool = newTool;
        }else{
            throw new Error("Tool Should Be instance of Tool class");
        }
    }

    setFillColor(color){
        if(!color instanceof String)
            new Error("Color must be string");
        this._currentTool.FillColor = color;
    }

    setStrokeColor(color){
        if(!color instanceof String)
            new Error("Color must be string");
        this._currentTool.StrokeColor = color;
    }

    mouseDown = (event) => {
        this.#isHoldingMouseButton = true;
        this.#lastMousePos = [event.clientX, event.clientY];
        this.#lastImage = this._context.getImageData(0, 0, this._canvas.width, this._canvas.height);
        this.draw(event);
    }

    mouseUp = (event) => {
        this.#isHoldingMouseButton = false;
        this._context.beginPath();
    }

    mouseLeave = (event) => {
        this.#isHoldingMouseButton = false;
        this._context.beginPath();
    }

    draw = (event) => {
        event.center_x = this.#lastMousePos[0];
        event.center_y = this.#lastMousePos[1];
        event.lastImage = this.#lastImage;
        event.canvasWith = this._canvas.width;
        event.canvasHeight = this._canvas.height;
        if(this._currentTool !== undefined && this.#isHoldingMouseButton)
            this._currentTool.draw(event, this._context);
    }
}

export default Canvas;