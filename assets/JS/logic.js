/*Consumir la API */

const salida = document.querySelector('#salida')
const fragment = document.createDocumentFragment()

document.addEventListener('DOMContentLoaded', e => {
    fetchData()
})

const fetchData =async () =>{
    const res = await fetch('https://digimon-api.vercel.app/api/digimon')

    const data = await res.json()
    const tarjeta = document.querySelector('#salida')
    data.forEach(digimon => {
        var card = `
        <div class="miCard">
            <img src="${digimon.img}" alt="Digimon" class="imgCard">
            <div id="cardInfo">
                <h5  id="colorCard">${digimon.name}</h5>
                <h6 class="level">${digimon.level}</h6>
            </div>
        </div>`
        
        tarjeta.innerHTML+=card
        console.log(digimon)
    });

    //salida.appendChild(fragment)
    //console.log(salida)
}


/*Buscar Digimon*/

var formulario = document.getElementById('form')

formulario.addEventListener("submit", function(event){
    event.preventDefault()
    //Valor del input
    var idCharacter = document.getElementById("character").value
    //Funcion validacion...

    //Funcion getCharacter
    getCharacter(idCharacter)
})

function getCharacter(name){
    var promesa = fetch(`https://digimon-api.vercel.app/api/digimon/name/${name}`)

    promesa
        .then((result)=>result.json())

        .then(function(json){
            console.log(json)
            injectionHtml(json[0]) 
        })
        .catch(function(error){
            console.log(error)
        })
}

function injectionHtml(digimon){
    var modalBody = document.getElementById("modalBody")
    var content = 
    `<img src="${digimon.img}" alt="Digimon">
    <h1 class="modal-title" id="modalLabel">${digimon.name}</h1> 
    <h4 class="modal-body fs-5 text-secondary">${digimon.level}</h4>`
    modalBody.innerHTML = content
    const miModal = new bootstrap.Modal(document.getElementById('miModal'))
    miModal.show()
}
