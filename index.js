"use-strict";
import Canvas from "./Canvas.js";
import Pen from "./Pen.js";

// Create canvas
let canvas = new Canvas(window.innerWidth, window.innerHeight, document.body);
let pen = new Pen(); // Default tool
canvas.currentTool = pen;

// Toolbox
const toolbox = document.querySelector("#toolbox");
let isHoldingToolbox = false;

const tools = Array.from(document.querySelectorAll(".tool"));
const colors = Array.from(document.querySelectorAll(".color"));


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
                let newTool = new Pen();
                canvas.currentTool = newTool;
                break;
            
            case "stroke-circle":
                console.log("stroke-circle");
                break;
            
            case "stroke-rectangle":
                console.log("stroke-rectangle");
                break;

            case "circle":
                console.log("circle");
                break;
            
            case "rectangle":
                console.log("rectangle");
                break;
            
            case "line":
                console.log("Line");
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