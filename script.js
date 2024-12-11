const canvas = document.getElementById("canvas");

// Crear una nueva nota
document.getElementById("addNoteBtn").addEventListener("click", () => {
    const note = document.createElement("div");
    note.className = "note";
    note.contentEditable = true;
    note.style.top = `${Math.random() * 300}px`;
    note.style.left = `${Math.random() * 300}px`;
    makeDraggable(note);
    canvas.appendChild(note);
});

// Crear una nueva forma
["circle", "triangle", "rectangle"].forEach((shape) => {
    document.getElementById(`${shape}Btn`).addEventListener("click", () => addShape(shape));
});

function addShape(type) {
    const shape = document.createElement("div");
    shape.className = `shape ${type}`;
    shape.style.top = `${Math.random() * 300}px`;
    shape.style.left = `${Math.random() * 300}px`;
    makeDraggable(shape);
    canvas.appendChild(shape);
}

// Hacer elementos arrastrables
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

// Limpiar canvas
document.getElementById("clearCanvasBtn").addEventListener("click", () => {
    canvas.innerHTML = "";
});

// Compartir Jamboard
document.getElementById("shareBtn").addEventListener("click", () => {
    const modal = document.getElementById("shareModal");
    const link = `${window.location.href}?boardId=${Math.random().toString(36).substr(2, 9)}`;
    document.getElementById("shareLink").value = link;
    modal.classList.remove("hidden");
});

// Cerrar Modal
document.getElementById("closeModalBtn").addEventListener("click", () => {
    document.getElementById("shareModal").classList.add("hidden");
});
