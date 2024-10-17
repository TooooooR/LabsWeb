const modal = document.getElementById("errorModal");
const closeModalBtn = document.querySelector(".close");
const modalMessage = document.getElementById("modalMessage");


export function showModal(message) {
    modalMessage.textContent = message;
    modal.style.display = "block";
}

closeModalBtn.onclick = function() {
    modal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};