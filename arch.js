function mostrarDiv(id) {
    let divs = document.querySelectorAll(".contenido");
    divs.forEach(div => div.style.display = "none");
    document.getElementById(id).style.display = "block";
}

let index = 0;
function cambiarImagen(direccion) {
    let slides = document.querySelectorAll(".slide");
    let contenedor = document.querySelector(".carrusel-contenedor");
    index = (index + direccion + slides.length) % slides.length;
    contenedor.style.transform = `translateX(${-index * 100}%)`;
}
