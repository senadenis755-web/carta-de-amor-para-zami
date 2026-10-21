const espacioParaEscribir = document.getElementById("texto-carta");
const espacioParaMensaje = document.getElementById("texto-mensaje");
const cartaEscrita = document.getElementById("carta-escrita");
const mensajeEscrito = document.getElementById("mensaje-escrito");
const inicio = document.getElementById("inicio");
const botonEmpezar = document.getElementById("empezar-carta");
const formularioCarta = document.getElementById("formulario-carta");
const lluviaCorazones = document.getElementById("lluvia-corazones");
const botonMostrar = document.getElementById("mostrar-carta");
const sobre = document.getElementById("sobre");
const contenidoCarta = document.getElementById("contenido-carta");

function mostrarFormulario() {
    lanzarCorazones();
    inicio.hidden = true;
    formularioCarta.hidden = false;
    espacioParaEscribir.focus();
}

function lanzarCorazones() {
    const simbolos = ["♥", "❤", "💕"];
    const colores = ["#d05d78", "#e991a5", "#bd4e6b", "#f1a7b8"];

    for (let indice = 0; indice < 36; indice += 1) {
        const corazon = document.createElement("span");
        corazon.className = "corazon-volador";
        corazon.textContent = simbolos[Math.floor(Math.random() * simbolos.length)];
        corazon.style.setProperty("--posicion-x", `${Math.random() * 100}%`);
        corazon.style.setProperty("--tamano-corazon", `${16 + Math.random() * 24}px`);
        corazon.style.setProperty("--duracion-corazon", `${3 + Math.random() * 2}s`);
        corazon.style.setProperty("--retraso-corazon", `${Math.random() * 1.2}s`);
        corazon.style.setProperty("--desvio-x", `${-100 + Math.random() * 200}px`);
        corazon.style.setProperty("--rotacion", `${-90 + Math.random() * 180}deg`);
        corazon.style.setProperty("--color-corazon", colores[Math.floor(Math.random() * colores.length)]);
        corazon.addEventListener("animationend", function retirarCorazon() {
            corazon.remove();
        }, { once: true });
        lluviaCorazones.append(corazon);
    }
}

function abrirCarta() {
    botonMostrar.disabled = true;
    botonMostrar.textContent = "Abriendo tu carta... 💌";
    cartaEscrita.textContent = espacioParaEscribir.value.trim()
        || "Con todo mi amor.";
    mensajeEscrito.textContent = espacioParaMensaje.value.trim()
        || "Un mensajito lleno de cariño para ti.";

    sobre.hidden = false;
    sobre.addEventListener("animationend", function mostrarMensaje(evento) {
        if (evento.target !== sobre.querySelector(".solapa")
            || evento.animationName !== "abrir-solapa") {
            return;
        }

        contenidoCarta.hidden = false;
        botonMostrar.textContent = "Carta abierta 💌";
        sobre.removeEventListener("animationend", mostrarMensaje);
    });

    requestAnimationFrame(function animarSobre() {
        sobre.classList.add("abierto");
    });
}

botonEmpezar.addEventListener("click", mostrarFormulario);
botonMostrar.addEventListener("click", abrirCarta);
