// Crear selectores

const formulario = document.querySelector('#formulario')
const listaTweets = document.querySelector('#lista-tweets')
let arregloTweets = []

// Crear evento de submit

formulario.addEventListener('submit', agregarTweet)

function agregarTweet(e) {
    e.preventDefault()
    // console.log('submit')
    const infoTweet = document.querySelector('#tweet').value
    //  console.log(infoTweet)
    if (infoTweet === '') {
        mostrarError('El tweet no puede estar vacio')
    } else {
        // console.log('campo lleno')
        //Pensar en que estrucutura voy guardar
        //Crear un  objeto
        const objTweet = {
            tweet: infoTweet,
            id: Date.now()
        }
        // console.log(objTweet)

        arregloTweets.push(objTweet)
        // console.log(arregloTweets)
        sincronizarLS()
        
        // crearHTML()
        formulario.reset()
    }
    crearListaTweets()
}

function sincronizarLS (){
    localStorage.setItem('tweets', JSON.stringify(arregloTweets))

}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p')
    mensajeError.innerText = mensaje
    mensajeError.classList.add('error')
    const contenido = document.querySelector('#contenido')
    contenido.appendChild(mensajeError)
    setTimeout(() => {
        mensajeError.remove()
    }, 3000)
}
// formulario.addEventListener('submit', (e)=>{
//     e.preventDefault()
//     instrucciones
// })

function crearListaTweets() {
    limpiarHTML()
    arregloTweets.forEach(i => {
        const li = document.createElement('li')
        const btnEliminar = document.createElement('a')
        btnEliminar.classList.add('borrar-tweet')
        btnEliminar.innerText = 'X'
        li.appendChild(btnEliminar)
        const textNode = document.createTextNode(i.tweet)
        li.appendChild(textNode)
        listaTweets.appendChild(li)
    })
}



function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild)
    }
}
// Ctrl K U para descomentar

// function crearHTML() {
//     //Mostrar toda la informacion que tengo en la carpeta de tweets
//     if (arregloTweets.length > 0) {
//         //Al menos hay un tweet guardado en el arreglo
//         //Crear y mostrar ese html en la interfaz 

//         //Recorrer el arreglo
//         arregloTweets.forEach(tweet => {
//             const li = document.createElement('li')
//             li.innerText = tweet
//             listaTweets.appendChild(li)
//         })
//     }
// }
addEventListener()
function addEventListener(){
    formulario.addEventListener('submit', agregarTweet)
    document.addEventListener('DOMContentLoaded', ()=>{
        arregloTweets = JSON.parse(localStorage.getItem('tweets')) || []
        console.log(arregloTweets)
        crearListaTweets()
    })
}

// function borrarTweet(id){
//     arregloTweets = arregloTweets.filter(i => i.id !== id)
//     sincronizarLS()
//     crearListaTweets()
// }