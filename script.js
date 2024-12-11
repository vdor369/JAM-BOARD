let noteId = 0;
let isDrawing = false;
let startX, startY, currentLine;

function createNote() {
    const canvas = document.getElementById("canvas");
    const note = document.createElement("div");
    note.className = "note";
    note.id = `note-${noteId++}`;
    note.style.top = `${Math.random() * (canvas.clientHeight - 200)}px`;
    note.style.left = `${Math.random() * (canvas.clientWidth - 200)}px`;

    note.innerHTML = `
        <textarea placeholder="Type something..."></textarea>
    `;

    note.addEventListener("mousedown", dragElement);
    canvas.appendChild(note);
}

function addShape(shape) {
    const canvas = document.getElementById("canvas");
    const element = document.createElement("div");
    element.className = "shape";
    element.style.width = "100px";
    element.style.height = "100px";
    element.style.borderRadius = shape === "circle" || shape === "oval" ? "50%" : "0";

    if (shape === "triangle") {
        element.style.width = "0";
        element.style.height = "0";
        element.style.borderLeft = "50px solid transparent";
        element.style.borderRight = "50px solid transparent";
        element.style.borderBottom = "100px solid #333";
        element.style.backgroundColor = "transparent";
    }

    element.style.top = `${Math.random() * (canvas.clientHeight - 200)}px`;
    element.style.left = `${Math.random() * (canvas.clientWidth - 200)}px`;

    element.addEventListener("mousedown", dragElement);
    canvas.appendChild(element);
}

function addText() {
    const canvas = document.getElementById("canvas");
    const textElement = document.createElement("div");
    textElement.className = "note";
    textElement.contentEditable = "true";
    textElement.style.width = "200px";
    textElement.style.height = "auto";
    textElement.style.borderRadius = "0";
    textElement.innerHTML = "Edit text...";
    textElement.style.top = `${Math.random() * (canvas.clientHeight - 200)}px`;
    textElement.style.left = `${Math.random() * (canvas.clientWidth - 200)}px`;

    textElement.addEventListener("mousedown", dragElement);
    canvas.appendChild(textElement);
}

function enableDrawing() {
    const canvas = document.getElementById("canvas");
    canvas.onmousedown = (e) => {
        isDrawing = true;
        startX = e.offsetX;
        startY = e.offsetY;

        currentLine = document.createElement("div");
        currentLine.className = "line";
        currentLine.style.position = "absolute";
        currentLine.style.top = `${startY}px`;
        currentLine.style.left = `${startX}px`;
        currentLine.style.width = "2px";
        currentLine.style.height = "2px";
        canvas.appendChild(currentLine);
    };

    canvas.onmousemove = (e) => {
        if (isDrawing) {
            const width = Math.abs(e.offsetX - startX);
            const height = Math.abs(e.offsetY - startY);
            currentLine.style.width = `${width}px`;
            currentLine.style.height = `${height}px`;
        }
    };

    canvas.onmouseup = () => {
        isDrawing = false;
    };
}

function connectShapes() {
    alert("Click on two shapes to connect them.");
    // Implement logic to draw lines between selected elements.
}

function dragElement(event) {
    const element = event.target;
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
        element.style.left = `${pageX - shiftX}px`;
        element.style.top = `${pageY - shiftY}px`;
    }

    function onMouseMove(e) {
        moveAt(e.pageX, e.pageY);
    }

    document.addEventListener("mousemove", onMouseMove);

    element.onmouseup = function () {
        document.removeEventListener("mousemove", onMouseMove);
        element.onmouseup = null;
    };
}

function clearCanvas() {
    document.getElementById("canvas").innerHTML = "";
}
