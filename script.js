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
