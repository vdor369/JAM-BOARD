let noteId = 0;
let isDrawing = false;
let startX, startY, currentLine;

// Helper function to get canvas element
function getCanvas() {
    return document.getElementById("canvas");
}

// Create a draggable note
function createNote() {
    const canvas = getCanvas();
    const note = document.createElement("div");
    note.className = "note";
    note.id = `note-${noteId++}`;
    note.style.top = `${Math.random() * (canvas.clientHeight - 200)}px`;
    note.style.left = `${Math.random() * (canvas.clientWidth - 200)}px`;

    note.innerHTML = `
        <textarea placeholder="Type something..."></textarea>
    `;

    makeDraggable(note);
    canvas.appendChild(note);
}

// Add a shape to the canvas
function addShape(shape) {
    const canvas = getCanvas();
    const shapeElement = document.createElement("div");
    shapeElement.className = "shape";

    // Set dimensions and styling based on shape type
    if (shape === "triangle") {
        Object.assign(shapeElement.style, {
            width: "0",
            height: "0",
            borderLeft: "50px solid transparent",
            borderRight: "50px solid transparent",
            borderBottom: "100px solid #333",
            backgroundColor: "transparent"
        });
    } else {
        Object.assign(shapeElement.style, {
            width: "100px",
            height: shape === "oval" || shape === "circle" ? "100px" : "100px",
            borderRadius: shape === "oval" || shape === "circle" ? "50%" : "0"
        });
    }

    // Set random position
    shapeElement.style.top = `${Math.random() * (canvas.clientHeight - 200)}px`;
    shapeElement.style.left = `${Math.random() * (canvas.clientWidth - 200)}px`;

    makeDraggable(shapeElement);
    canvas.appendChild(shapeElement);
}

// Add editable text to the canvas
function addText() {
    const canvas = getCanvas();
    const textElement = document.createElement("div");
    textElement.className = "note";
    textElement.contentEditable = "true";

    Object.assign(textElement.style, {
        width: "200px",
        height: "auto",
        borderRadius: "0",
        top: `${Math.random() * (canvas.clientHeight - 200)}px`,
        left: `${Math.random() * (canvas.clientWidth - 200)}px`
    });

    textElement.innerHTML = "Edit text...";
    makeDraggable(textElement);
    canvas.appendChild(textElement);
}

// Enable free drawing on the canvas
function enableDrawing() {
    const canvas = getCanvas();

    canvas.onmousedown = (e) => {
        isDrawing = true;
        startX = e.offsetX;
        startY = e.offsetY;

        currentLine = document.createElement("div");
        currentLine.className = "line";
        Object.assign(currentLine.style, {
            position: "absolute",
            top: `${startY}px`,
            left: `${startX}px`,
            width: "2px",
            height: "2px"
        });
        canvas.appendChild(currentLine);
    };

    canvas.onmousemove = (e) => {
        if (isDrawing) {
            currentLine.style.width = `${Math.abs(e.offsetX - startX)}px`;
            currentLine.style.height = `${Math.abs(e.offsetY - startY)}px`;
        }
    };

    canvas.onmouseup = () => {
        isDrawing = false;
    };
}

// Allow shapes to be connected (placeholder for logic)
function connectShapes() {
    alert("Click on two shapes to connect them.");
    // TODO: Implement logic to draw connecting lines between selected elements
}

// Make an element draggable
function makeDraggable(element) {
    element.onmousedown = (event) => {
        const shiftX = event.clientX - element.getBoundingClientRect().left;
        const shiftY = event.clientY - element.getBoundingClientRect().top;

        const moveAt = (pageX, pageY) => {
            element.style.left = `${pageX - shiftX}px`;
            element.style.top = `${pageY - shiftY}px`;
        };

        const onMouseMove = (e) => moveAt(e.pageX, e.pageY);
        document.addEventListener("mousemove", onMouseMove);

        element.onmouseup = () => {
            document.removeEventListener("mousemove", onMouseMove);
            element.onmouseup = null;
        };

        event.preventDefault();
    };
}

// Clear all elements from the canvas
function clearCanvas() {
    const canvas = getCanvas();
    canvas.innerHTML = "";
}
