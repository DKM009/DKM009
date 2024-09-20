  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDaHoSm8eAfEutqz6mawOU2Whr9e25i1LA",
    authDomain: "cv-ai2.firebaseapp.com",
    projectId: "cv-ai2",
    storageBucket: "cv-ai2.appspot.com",
    messagingSenderId: "89595327167",
    appId: "1:89595327167:web:17b5bd81da760e8d6b4c0a",
    measurementId: "G-N25W5K29D4"
  };

  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);7
const storage = firebase.storage();
const db = firebase.firestore();

  //--*******__*_*_*_*_*_*_*_***************************++
// Función para subir el currículum

document.getElementById("miBoton").addEventListener("click", miFuncion);

function miFuncion() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    
    if (file && file.type === "application/pdf") {
        const storageRef = firebase.storage().ref();
        const pdfRef = storageRef.child(`curriculums/${file.name}`);
        
        pdfRef.put(file).then(() => {
            // Una vez subido, obtenemos la URL
            pdfRef.getDownloadURL().then((url) => {
                // Aquí decidirías si aceptarlo o no
                const estado = file.size > 500000 ? "no aceptado" : "aceptado"; // Ejemplo de criterio
                const collection = estado === "aceptado" ? "curriculums_aceptados" : "curriculums_no_aceptados";

                db.collection(collection).add({
                    nombre: file.name,
                    fechaSubida: new Date(),
                    archivoURL: url,
                    estado: estado,
                    requisitosCumplidos: estado === "aceptado" // Lógica simplificada
                });
                
                document.getElementById('status').innerText = `Currículum ${estado}.`;
            });
        }).catch(error => {
            console.error("Error al subir el archivo: ", error);
            document.getElementById('status').innerText = "Error al subir el currículum.";
        });
    } else {
        alert("Por favor, sube un archivo PDF válido.");
    }
}