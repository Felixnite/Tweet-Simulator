// Crear selectores

const formulario = document.querySelector('#formulario')
const listaTweets = document.querySelector('#lista-tweets')
let arregloTweets = []

// Crear evento de submit

formulario.addEventListener('submit', agregarTweet)

function agregarTweet(e){
    e.preventDefault()
    // console.log('submit')
    const infoTweet = document.querySelector('#tweet').value 
    //  console.log(infoTweet)
    if(infoTweet === ''){
        mostrarError('El tweet no puede estar vacio')
} else {
    // console.log('campo lleno')
    //Pensar en que estrucutura voy guardar
    //Crear un objeto
    const objTweet = {
        tweet: infoTweet,
        id:Date.now()
    }
    // console.log(objTweet)

    arregloTweets.push(objTweet)
    // console.log(arregloTweets)
    crearListaTweets()
    formulario.reset()
}
}

function mostrarError(mensaje){
    const mensajeError = document.createElement('p')
    mensajeError.innerText = mensaje
    mensajeError.classList.add('error')
    const contenido = document.querySelector('#contenido')
    contenido.appendChild(mensajeError)
    setTimeout(()=>{
        mensajeError.remove()
    },3000)
}
// formulario.addEventListener('submit', (e)=>{
//     e.preventDefault()
//     instrucciones
// })

function crearListaTweets(){
    limpiarHTML()
    arregloTweets.forEach(i =>{
        const li = document.createElement('li')
        li.innerText = i.tweet
        listaTweets.appendChild(li)
    })
}

function limpiarHTML() {
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild)
    }
}