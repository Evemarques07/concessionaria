const marca = document.querySelector("#marca")
const modelo = document.querySelector("#modelo")
const ano = document.querySelector("#ano")
const preco = document.querySelector("#preco")
const cor = document.querySelector("#cor")
const ar = document.querySelector("#ar")
const lista_div = document.querySelector("#lista_car")
const buscaResultadoDiv = document.querySelector("#buscaResultado")

const formulario = document.querySelector("#formulario")
const formularioBusca = document.querySelector("#formularioBusca")

let lista = []

document.addEventListener("DOMContentLoaded", () => {
    const listaString = localStorage.getItem("lista")
    if (listaString) {
        lista = JSON.parse(listaString)
        renderizarLista()
    }
})

function cadastrar_carro(event) {
    event.preventDefault()

    const marcaInput = document.querySelector("#marca")
    const modeloInput = document.querySelector("#modelo")
    const anoInput = document.querySelector("#ano")
    const precoInput = document.querySelector("#preco")
    const corInput = document.querySelector("#cor")
    const arInput = document.querySelector("#ar")

    if (marcaInput.value.trim() === '' || modeloInput.value.trim() === '' || anoInput.value.trim() === '' || precoInput.value.trim() === '' || corInput.value.trim() === '') {
        alert("Por favor, insira as informações completas do carro.")
        return
    }

    const carroNovo = {
        marca: marcaInput.value,
        modelo: modeloInput.value,
        ano: anoInput.value,
        preco: precoInput.value,
        cor: corInput.value,
        ar: arInput.checked ? "Sim" : "Não"
    }; 

    lista.push(carroNovo)
    salvarListaNoLocalStorage()

    marcaInput.value = ""
    modeloInput.value = ""
    anoInput.value = ""
    precoInput.value = ""
    corInput.value = ""
    arInput.checked = false
    marcaInput.focus()

    renderizarLista()
}



function buscar_carro(event) {
    event.preventDefault()

    const termoBusca = document.querySelector("#termoBusca").value.trim().toLowerCase()
    const resultados = lista.filter(carro =>
        carro.marca.toLowerCase().includes(termoBusca) ||
        carro.modelo.toLowerCase().includes(termoBusca) ||
        carro.ano.toLowerCase().includes(termoBusca) ||
        carro.ar.toLowerCase() === termoBusca
    )

    if (resultados.length === 0) {
        buscaResultadoDiv.textContent = "Nenhum resultado encontrado."
    } else {
        buscaResultadoDiv.innerHTML = "<h3>Resultados da busca:</h3>"
        resultados.forEach(carro => {
            buscaResultadoDiv.innerHTML += `<p>Marca: ${carro.marca}, Modelo: ${carro.modelo}, Ano: ${carro.ano}, Preço: ${carro.preco}, Ar-condicionado: ${carro.ar}</p>`
        })
    }
}

function excluircarro(index) {
    lista.splice(index, 1)
    salvarListaNoLocalStorage()
    renderizarLista()
}

function salvarListaNoLocalStorage() {
    localStorage.setItem("lista", JSON.stringify(lista))
}

function renderizarLista() {
    lista_div.innerHTML = ""
    lista.forEach((carro, index) => {
        const itemcarro = document.createElement("div")
        itemcarro.classList.add("carro")
        itemcarro.innerHTML = `
            <p>Marca: ${carro.marca}</p>
            <p>Modelo: ${carro.modelo}</p>
            <p>Ano: ${carro.ano}</p>
            <p>Preço: R$ ${carro.preco}</p>
            <p>Cor: ${carro.cor}</p>
            <p>Ar-condicionado: ${carro.ar}</p>
            <button onclick="excluircarro(${index})">Excluir</button>
        `
        lista_div.appendChild(itemcarro)
    })
}


formulario.addEventListener("submit", cadastrar_carro)
formularioBusca.addEventListener("submit", buscar_carro)

