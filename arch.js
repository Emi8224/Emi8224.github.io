// 🔹 Iniciar proyecto y mostrar contenido
function iniciarProyecto() {
    document.getElementById("pantalla-inicio").style.display = "none";
    document.getElementById("contenido").style.display = "block";
}

// 🔹 Mostrar una sección específica
function mostrarDiv(id) {
    document.querySelectorAll('.contenido').forEach(div => {
        div.style.display = "none"; // Oculta todas las secciones
    });
    document.getElementById(id).style.display = "block"; // Muestra solo la seleccionada
}

// 🔹 Carrusel de imágenes
function cambiarImagen(direccion) {
    let slides = document.querySelectorAll(".slide");
    let totalSlides = slides.length;
    let actual = 0;

    slides.forEach((slide, index) => {
        if (slide.style.display === "block") {
            actual = index;
        }
        slide.style.display = "none";
    });

    let nuevoIndice = (actual + direccion + totalSlides) % totalSlides;
    slides[nuevoIndice].style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
    let slides = document.querySelectorAll(".slide");
    slides.forEach((slide, index) => {
        slide.style.display = index === 0 ? "block" : "none";
    });
});

// 🔹 Calcular cotización de agua pluvial con conteo de productos usados
function calcularCotizacion() {
    let area = parseFloat(document.getElementById("area").value);
    let precipitacion = parseFloat(document.getElementById("precipitacion").value);
    let captacionLitros = (area * precipitacion * 0.85);

    let costoBase = 8000;
    let costoTotal = costoBase;
    let capacidadAlmacenamiento = 0;
    let productosUsados = [];

    document.querySelectorAll("#productos input[type='number']").forEach(producto => {
        let cantidad = parseInt(producto.value) || 0;
        let precio = parseFloat(producto.dataset.precio) || 0;
        let capacidad = parseFloat(producto.dataset.capacidad) || 0;

        costoTotal += cantidad * precio;
        capacidadAlmacenamiento += cantidad * capacidad;

        if (cantidad > 0) {
            productosUsados.push(`${cantidad} x ${producto.previousElementSibling.textContent}`);
        }
    });

    let aguaRestante = Math.max(0, captacionLitros - capacidadAlmacenamiento);
    let mensajeAlmacenamiento = aguaRestante > 0
        ? `<h3>⚠️ Falta almacenar ${aguaRestante.toFixed(2)} L</h3>`
        : `<h3>✅ Almacenamiento suficiente</h3>`;

    document.getElementById('resultado').innerHTML = `
        <h2>📏 Agua Captada: ${captacionLitros.toFixed(2)} L</h2>
    `;
    document.getElementById('total-final').innerHTML = `
        <h2>💰 Costo Final: $${costoTotal.toFixed(2)} MXN</h2>
        <h3>🛢️ Capacidad de Almacenamiento: ${capacidadAlmacenamiento.toFixed(2)} L</h3>
        ${mensajeAlmacenamiento}
    `;

    document.getElementById('detalle-conteo').innerHTML = `
        <h2>🛠️ Productos usados:</h2>
        ${productosUsados.length > 0 ? `<ul><li>${productosUsados.join("</li><li>")}</li></ul>` : "<h3>No se ha seleccionado ningún producto</h3>"}
    `;
}

document.querySelectorAll("#productos input[type='number']").forEach(producto => {
    producto.addEventListener("change", actualizarCotizacion);
});

function actualizarCotizacion() {
    calcularCotizacion();
}

// 🔹 🎮 Juego de Preguntas con puntaje mejorado y correcciones
const preguntas = [
    { pregunta: "¿Qué es el agua pluvial?", opciones: ["Agua de lluvia", "Agua de río", "Agua subterránea"], correcta: 0 },
    { pregunta: "¿Cómo se puede almacenar el agua pluvial?", opciones: ["En tanques", "En piscinas", "En bolsas"], correcta: 0 },
    { pregunta: "¿Cuál es un beneficio de captar agua pluvial?", opciones: ["Ahorrar agua potable", "Aumentar el desperdicio", "Reducir el consumo eléctrico"], correcta: 0 },
    { pregunta: "¿Cómo se filtra el agua pluvial?", opciones: ["Con filtros de sedimentos", "Con cloro puro", "Dejándola reposar"], correcta: 0 },
    { pregunta: "¿Cuál es el mejor material para almacenar agua pluvial?", opciones: ["Polietileno reforzado", "Vidrio", "Papel"], correcta: 0 },
    { pregunta: "¿Qué porcentaje de agua de lluvia puede ser aprovechado?", opciones: ["85%", "50%", "10%"], correcta: 0 },
    { pregunta: "¿Qué elemento ayuda a captar agua de los techos?", opciones: ["Canalones", "Lámparas", "Pisos de madera"], correcta: 0 },
    { pregunta: "¿Qué sistema ayuda a distribuir agua pluvial en una casa?", opciones: ["Bomba de agua", "Cañerías de aire", "Cables eléctricos"], correcta: 0 },
    { pregunta: "¿Cómo se reduce la evaporación en un tanque de agua pluvial?", opciones: ["Con tapa", "Con calefacción", "Con ventilación"], correcta: 0 },
    { pregunta: "¿En qué zonas es más eficiente la captación de agua pluvial?", opciones: ["Zonas con alta precipitación", "Desiertos", "Regiones polares"], correcta: 0 }
];

let preguntaActual = 0;
let puntaje = 0;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("quiz-container").style.display = "block";
    mostrarPregunta();
});

function mostrarPregunta() {
    if (preguntaActual < preguntas.length) {
        document.getElementById('pregunta').textContent = preguntas[preguntaActual].pregunta;
        const opcionesDiv = document.getElementById('opciones');
        opcionesDiv.innerHTML = "";

        preguntas[preguntaActual].opciones.forEach((opcion, i) => {
            const boton = document.createElement("button");
            boton.textContent = opcion;
            boton.onclick = () => verificarRespuesta(i);
            opcionesDiv.appendChild(boton);
        });
    } else {
        document.getElementById('quiz-container').innerHTML = `<h2>🎉 ¡Has completado el juego!</h2>
        <h3>🏆 Tu puntaje final: ${puntaje} / 10</h3>`;
    }
}

function verificarRespuesta(i) {
    const resultado = document.getElementById('resultadoJuego');
    if (i === preguntas[preguntaActual].correcta) {
        resultado.innerHTML = "✅ ¡Correcto!";
        puntaje++;
    } else {
        resultado.innerHTML = "❌ Incorrecto";
    }

    setTimeout(() => {
        resultado.innerHTML = "";
        preguntaActual++;
        mostrarPregunta();
    }, 1000);
}
