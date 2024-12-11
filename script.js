function addNote(inputId, contentId) {
    const input = document.getElementById(inputId);
    const content = document.getElementById(contentId);

    if (input.value.trim() !== "") {
        const note = document.createElement("div");
        note.className = "note";
        note.textContent = input.value;
        content.appendChild(note);
        input.value = "";
    }
}

function generateLink() {
    const randomCode = Math.random().toString(36).substring(2, 8);
    const shareLink = `https://example.com/board/${randomCode}`;
    document.getElementById("shareLink").value = shareLink;
    alert(`Share this link: ${shareLink}`);
}
