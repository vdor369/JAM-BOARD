let noteId = 0;

function createNote() {
    const canvas = document.getElementById("canvas");
    const note = document.createElement("div");
    note.className = "note";
    note.id = `note-${noteId++}`;
    note.style.top = `${Math.random() * (canvas.clientHeight - 200)}px`;
    note.style.left = `${Math.random() * (canvas.clientWidth - 200)}px`;

    note.innerHTML = `
        <textarea placeholder="Type something..."></textarea>
        <button class="delete-btn" onclick="deleteNote('${note.id}')">Delete</button>
    `;

    note.addEventListener("mousedown", dragNote);
    canvas.appendChild(note);
}

function deleteNote(noteId) {
    const note = document.getElementById(noteId);
    if (note) {
        note.remove();
    }
}

function dragNote(event) {
    const note = event.target.closest(".note");
    let shiftX = event.clientX - note.getBoundingClientRect().left;
    let shiftY = event.clientY - note.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
        note.style.left = `${pageX - shiftX}px`;
        note.style.top = `${pageY - shiftY}px`;
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    document.addEventListener("mousemove", onMouseMove);

    note.onmouseup = function () {
        document.removeEventListener("mousemove", onMouseMove);
        note.onmouseup = null;
    };
}

function clearCanvas() {
    const canvas = document.getElementById("canvas");
    canvas.innerHTML = "";
}

document.getElementById("canvas").ondragstart = function () {
    return false;
};
let noteId = 0;

function createNote() {
    const canvas = document.getElementById("canvas");
    const note = document.createElement("div");
    note.className = "note";
    note.id = `note-${noteId++}`;
    note.style.top = `${Math.random() * (canvas.clientHeight - 200)}px`;
    note.style.left = `${Math.random() * (canvas.clientWidth - 200)}px`;

    note.innerHTML = `
        <textarea placeholder="Type something..."></textarea>
        <div>
            <label for="color-picker">Color:</label>
            <input type="color" id="color-picker" onchange="changeColor(this, '${note.id}')">
        </div>
        <button class="delete-btn" onclick="deleteNote('${note.id}')">Delete</button>
    `;

    note.addEventListener("mousedown", dragNote);
    canvas.appendChild(note);
}

function changeColor(input, noteId) {
    const note = document.getElementById(noteId);
    note.style.backgroundColor = input.value;
}

function deleteNote(noteId) {
    const note = document.getElementById(noteId);
    if (note) {
        note.remove();
    }
}

function dragNote(event) {
    const note = event.target.closest(".note");
    let shiftX = event.clientX - note.getBoundingClientRect().left;
    let shiftY = event.clientY - note.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
        note.style.left = `${pageX - shiftX}px`;
        note.style.top = `${pageY - shiftY}px`;
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    document.addEventListener("mousemove", onMouseMove);

    note.onmouseup = function () {
        document.removeEventListener("mousemove", onMouseMove);
        note.onmouseup = null;
    };
}

function clearCanvas() {
    const canvas = document.getElementById("canvas");
    canvas.innerHTML = "";
}

document.getElementById("canvas").ondragstart = function () {
    return false;
};
