const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let arregloTweets = [];

formulario.addEventListener('submit', agregarTweet);

function agregarTweet(e) {
    e.preventDefault();
    const infoTweet = document.querySelector('#tweet').value;
    if (infoTweet === '') {
        mostrarError('El tweet no puede estar vacio');
    } else {
        const objTweet = {
            tweet: infoTweet,
            id: Date.now()
        };
        arregloTweets.push(objTweet);
        sincronizarLS();
        formulario.reset();
    }
    crearListaTweets();
}

function sincronizarLS() {
    localStorage.setItem('tweets', JSON.stringify(arregloTweets));
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.innerText = mensaje;
    mensajeError.classList.add('error');
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

function crearListaTweets() {
    limpiarHTML();
    arregloTweets.forEach(i => {
        const li = document.createElement('li');
        const btnEliminar = document.createElement('a');
        btnEliminar.classList.add('borrar-tweet');
        btnEliminar.innerText = 'X';
        btnEliminar.onclick = () => {
            borrarTweet(i.id);
        };
        li.appendChild(btnEliminar);
        const textNode = document.createTextNode(i.tweet);
        li.appendChild(textNode);
        listaTweets.appendChild(li);
    });
}

function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

function borrarTweet(id) {
    arregloTweets = arregloTweets.filter(tweet => tweet.id !== id);
    sincronizarLS();
    crearListaTweets();
}

document.addEventListener('DOMContentLoaded', () => {
    arregloTweets = JSON.parse(localStorage.getItem('tweets')) || [];
    crearListaTweets();
});
