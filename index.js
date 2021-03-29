import Canvas from "./Canvas.js";
import Pen from "./Pen.js";
import Circle from './Circle.js';
import Rectangle from "./Rectangle.js";
import Line from "./Line.js";


// Create canvas
let canvas = new Canvas(window.innerWidth, window.innerHeight, document.body);

// Toolbox
const toolbox = document.querySelector("#toolbox");
let isHoldingToolbox = false;

const tools = Array.from(document.querySelectorAll(".tool"));
const colors = Array.from(document.querySelectorAll(".color"));
const thicknessRange = document.getElementById("thickness-range");
const thicknessText = document.getElementById("thickness-text");

//** Move toolbox **//

toolbox.addEventListener("mousedown", event => {
    if(event.target.id === "hold" || event.target.className === "dot")
        isHoldingToolbox = true;
});

document.body.addEventListener("mouseup", event => {
    isHoldingToolbox = false;
});

document.body.addEventListener("mouseleave", event => {
    isHoldingToolbox = false;
});

document.body.addEventListener("mousemove", event => {
    if(isHoldingToolbox){
        let left = event.clientX - (toolbox.clientWidth / 2);
        let top = event.clientY - 10;
        toolbox.style.left = `${left}px`;
        toolbox.style.top = `${top}px`;
    }
});

//** Change current tool **//

function clearActiveTool(){
    tools.forEach(tool => {
        tool.classList.remove("active-tool");
    });
}

tools.forEach(tool => {
    tool.addEventListener("click", event => {
        clearActiveTool();
        event.currentTarget.classList.add("active-tool");
        switch(event.currentTarget.id){
            case "pen":
                canvas.setCurrentTool(new Pen());
                break;
            
            case "stroke-circle":
                canvas.setCurrentTool(new Circle());
                break;
            
            case "stroke-rectangle":
                canvas.setCurrentTool(new Rectangle());
                break;

            case "circle":
                let circle = new Circle();
                circle.IsFilled = true;
                canvas.setCurrentTool(circle);
                break;
            
            case "rectangle":
                let rectangle = new Rectangle();
                rectangle.IsFilled = true;
                canvas.setCurrentTool(rectangle);
                break;
            
            case "line":
                canvas.setCurrentTool(new Line());
        }
    });
});

//** Change Color **//
function clearActiveColor(){
    colors.forEach(color => {
        color.classList.remove("active-color");
        color.style.boxShadow = "none";
        if(color.id === "white")
            color.style.boxShadow = "0 0 4px rgb(156, 156, 156)";
    });
}

colors.forEach(color => {
    color.addEventListener("click", event => {
        clearActiveColor();
        event.currentTarget.classList.add("active-color");
        event.currentTarget.style.boxShadow = `0 0 16px ${event.currentTarget.id}`;
        
        let newColor = event.currentTarget.id;
        canvas.setFillColor(newColor);
        canvas.setStrokeColor(newColor);

        if(newColor === "yellow"){
            canvas.setFillColor("rgb(255, 217, 0)");
            canvas.setStrokeColor("rgb(255, 217, 0)");
        }
        else if(newColor === "white"){
            event.currentTarget.style.boxShadow = `0 0 16px rgb(156, 156, 156)`;
        }
    });
});

//** Change Pen Width **//
thicknessRange.addEventListener("input", (event) => {
    thicknessText.value = event.target.value;
});

thicknessRange.addEventListener("change", (event) => {
    canvas.currentTool.LineWidth = event.target.value;
});

thicknessText.addEventListener("change", (event) => {
    const newWidth = event.target.value;
    thicknessRange.value = newWidth;
    canvas.currentTool.LineWidth = newWidth;
});