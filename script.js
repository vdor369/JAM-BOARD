function createNote() {
    const canvas = document.getElementById("canvas");
    const note = document.createElement("div");
    note.className = "note";
    note.style.top = `${Math.random() * 400}px`;
    note.style.left = `${Math.random() * 400}px`;
    note.contentEditable = true;
    note.textContent = "Double-click to edit...";
    makeDraggable(note);
    canvas.appendChild(note);
}

function addShape(type) {
    const canvas = document.getElementById("canvas");
    const shape = document.createElement("div");
    shape.className = `shape ${type}`;
    shape.style.top = `${Math.random() * 400}px`;
    shape.style.left = `${Math.random() * 400}px`;
    makeDraggable(shape);
    canvas.appendChild(shape);
}

function makeDraggable(element) {
    element.onmousedown = (e) => {
        const offsetX = e.offsetX;
        const offsetY = e.offsetY;

        const moveAt = (pageX, pageY) => {
            element.style.left = `${pageX - offsetX}px`;
            element.style.top = `${pageY - offsetY}px`;
        };

        const onMouseMove = (e) => moveAt(e.pageX, e.pageY);
        document.addEventListener("mousemove", onMouseMove);

        element.onmouseup = () => {
            document.removeEventListener("mousemove", onMouseMove);
            element.onmouseup = null;
        };
    };
}

function clearCanvas() {
    const canvas = document.getElementById("canvas");
    canvas.innerHTML = "";
}
