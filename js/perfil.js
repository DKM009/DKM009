// JavaScript para gestionar la carga de imagen de perfil
const profilePhoto = document.getElementById("profilePhoto");
const uploadPhoto = document.getElementById("uploadPhoto");

uploadPhoto.addEventListener("change", function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profilePhoto.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});

// Guardar y mostrar la información de usuario
const userName = document.getElementById("userName");
const nameInput = document.getElementById("nameInput");
const extraInfo = document.getElementById("extraInfo");
const saveInfo = document.getElementById("saveInfo");

saveInfo.addEventListener("click", function() {
    const name = nameInput.value;
    const info = extraInfo.value;

    if (name) {
        userName.textContent = name;
    }

    if (info) {
        alert("Información guardada: " + info);
    }
});

// Subir y descargar CV
const uploadCV = document.getElementById("uploadCV");
const cvName = document.getElementById("cvName");
const downloadLink = document.getElementById("downloadLink");

uploadCV.addEventListener("change", function() {
    const file = this.files[0];
    if (file && file.type === "application/pdf") {
        cvName.textContent = file.name;
        downloadLink.href = URL.createObjectURL(file);
        downloadLink.style.display = "inline";
    } else {
        alert("Por favor, sube un archivo PDF.");
    }
});
