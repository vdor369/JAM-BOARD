let noteId = 0;

// Crear una nueva nota
function createNote() {
    const canvas = document.getElementById("canvas");
    const note = document.createElement("div");
    note.className = "note";
    note.id = `note-${noteId++}`;
    note.style.left = `${Math.random() * 300}px`;
    note.style.top = `${Math.random() * 300}px`;

    const textArea = document.createElement("textarea");
    textArea.placeholder = "Edit text...";

    // Botones flotantes
    const actions = document.createElement("div");
    actions.className = "note-actions";
    actions.innerHTML = `
        <button onclick="connectTo('${note.id}')">🔗 Connect</button>
        <button onclick="deleteNote('${note.id}')">❌ Delete</button>
    `;

    note.appendChild(textArea);
    note.appendChild(actions);
    makeDraggable(note);
    canvas.appendChild(note);
}

// Permitir arrastrar elementos
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

        e.preventDefault();
    };
}

// Conectar notas
let connectingNote = null;

function connectTo(noteId) {
    const note = document.getElementById(noteId);

    if (connectingNote) {
        // Crear una línea entre las dos notas
        console.log(`Connecting ${connectingNote.id} to ${noteId}`);
        connectingNote = null;
    } else {
        connectingNote = note;
    }
}

// Eliminar nota
function deleteNote(noteId) {
    const note = document.getElementById(noteId);
    note.remove();
}
let noteId = 0;

// Crear una nueva forma
function addShape(shape) {
    const canvas = document.getElementById("canvas");
    const element = document.createElement("div");
    element.className = `shape ${shape}`;
    element.style.position = "absolute";
    element.style.top = `${Math.random() * (canvas.clientHeight - 100)}px`;
    element.style.left = `${Math.random() * (canvas.clientWidth - 100)}px`;

    // Estilos específicos para formas especiales
    if (shape === "triangle") {
        element.style.width = "0";
        element.style.height = "0";
        element.style.borderLeft = "50px solid transparent";
        element.style.borderRight = "50px solid transparent";
        element.style.borderBottom = "100px solid black";
        element.style.backgroundColor = "transparent"; // Necesario para triángulos
    } else if (shape === "circle") {
        element.style.width = "100px";
        element.style.height = "100px";
        element.style.borderRadius = "50%";
        element.style.backgroundColor = "#ccc";
    } else {
        element.style.width = "100px";
        element.style.height = "100px";
        element.style.backgroundColor = "#ccc";
    }

    makeDraggable(element); // Hacer la forma arrastrable
    canvas.appendChild(element); // Añadir al canvas
}

// Hacer un elemento arrastrable
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

        e.preventDefault();
    };
}

// Limpiar el canvas
function clearCanvas() {
    const canvas = document.getElementById("canvas");
    canvas.innerHTML = ""; // Eliminar todos los elementos
}
