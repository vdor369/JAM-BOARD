let noteId = 0;

function createNote() {
    const canvas = document.getElementById("canvas");
    const note = document.createElement("div");
    note.className = "note";
    note.id = `note-${noteId++}`;
    note.style.top = "50px";
    note.style.left = "50px";

    note.innerHTML = `
        <textarea placeholder="Write something..."></textarea>
    `;

    note.addEventListener("mousedown", dragNote);

    canvas.appendChild(note);
}

function dragNote(event) {
    const note = event.target.closest(".note");
    let shiftX = event.clientX - note.getBoundingClientRect().left;
    let shiftY = event.clientY - note.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
        note.style.left = pageX - shiftX + "px";
        note.style.top = pageY - shiftY + "px";
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

document.getElementById("canvas").ondragstart = function () {
    return false;
};
