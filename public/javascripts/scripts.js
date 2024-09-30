// Show the modal


let oldFilName;
function openModal(fileName, description) {
    oldFilName = fileName;
    document.getElementById("titleInput").value = fileName.split(".txt").join("");
    document.getElementById("descriptionInput").value = description;
    document.getElementById("editModal").style.display = "flex";
}

// Hide the modal
function closeModal() {
    document.getElementById("editModal").style.display = "none";
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000); // Show toast for 3 seconds
}