// Alternar Secciones
function mostrarDiv(id) {
    document.querySelectorAll('.contenido').forEach(div => {
        div.style.display = (div.id === id) ? 'block' : 'none';
    });
}

// Carrusel
let indiceActual = 0;
const slides = document.querySelectorAll('.slide');

function cambiarImagen(n) {
    slides[indiceActual].classList.remove('active-slide');
    indiceActual = (indiceActual + n + slides.length) % slides.length;
    slides[indiceActual].classList.add('active-slide');
}

// Cotización Mejorada
function calcularCotizacion() {
    const area = parseFloat(document.getElementById('area').value);
    const precipitacion = parseFloat(document.getElementById('precipitacion').value);
    const captacion = (area * precipitacion * 0.85) / 1000;
    
    const costoTanque = captacion * 150; // Costo estimado por capacidad (MXN)
    const costoFiltro = captacion * 75;
    const costoInstalacion = 8000; // Estimación base

    document.getElementById('resultado').innerHTML = `<h2>Agua Captada: ${captacion.toFixed(2)} m³</h2>`;
    document.getElementById('detalle-cotizacion').innerHTML = `
        <h3>💰 Costos Estimados</h3>
        <ul>
            <li><strong>Tanques de almacenamiento:</strong> $${costoTanque.toFixed(2)}</li>
            <li><strong>Filtración y purificación:</strong> $${costoFiltro.toFixed(2)}</li>
            <li><strong>Instalación completa:</strong> $${costoInstalacion}</li>
        </ul>
        <h3>🌎 Beneficios</h3>
        <p>Reducción del consumo de agua potable, mayor eficiencia hídrica y ahorro a largo plazo.</p>
    `;
}

// Juego de Preguntas
const preguntas = [
    { pregunta: "¿Qué es el agua pluvial?", opciones: ["Agua de lluvia", "Agua de río", "Agua subterránea"], correcta: 0 },
    { pregunta: "¿Cómo se puede almacenar agua pluvial?", opciones: ["Tanques de almacenamiento", "Cubetas", "En botellas"], correcta: 0 },
    { pregunta: "¿Cuál es un beneficio de la recolección de agua pluvial?", opciones: ["Ahorro de agua potable", "Más gasto de agua", "Contaminación"], correcta: 0 }
];

let indicePregunta = 0;
function mostrarPregunta() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.style.display = "block";

    document.getElementById('pregunta').textContent = preguntas[indicePregunta].pregunta;
    const opcionesDiv = document.getElementById('opciones');
    opcionesDiv.innerHTML = "";
    preguntas[indicePregunta].opciones.forEach((opcion, i) => {
        const boton = document.createElement("button");
        boton.textContent = opcion;
        boton.onclick = () => verificarRespuesta(i);
        opcionesDiv.appendChild(boton);
    });
}

function verificarRespuesta(i) {
    const resultadoJuego = document.getElementById('resultadoJuego');
    if (i === preguntas[indicePregunta].correcta) {
        resultadoJuego.textContent = "✅ ¡Correcto!";
    } else {
        resultadoJuego.textContent = "❌ Incorrecto, intenta otra vez.";
    }
}

function siguientePregunta() {
    indicePregunta = (indicePregunta + 1) % preguntas.length;
    mostrarPregunta();
}

document.addEventListener("DOMContentLoaded", mostrarPregunta);
