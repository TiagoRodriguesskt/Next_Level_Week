function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

        for( const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

    })
}

populateUFs()


function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`


    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        

        for( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    } )
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


//ITENS DE COLETA
//PEGANDO TODOS OS li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}


const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    //ADICIONAR OU REMOVER UMA CLASSE JAVASCRIPT
    itemLi.classList.toggle("selected")
    
    const itemId = itemLi.dataset.id

    // console.log('ITEM ID: ', itemId)

    //VERIFICAR SE EXISTEM ITENS SELECIONADOS, SE SIM
    //PEGAR OS ITENS SELECIONADOS

    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId // isso será true ou false
        return itemFound
    })

    //SE JÁ ESTIVER SELECIONADO, 
    if( alreadySelected >= 0 ) {
        //TIRAR DA SELEÇÃO
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId //FALSE
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        //SE NÃO ESTIVER SELECIONADO
        //ADICIONAR À SELEÇÃO
        selectedItems.push(itemId)
    }

    // console.log('selectedItems: ', selectedItems)

    //ATUALIZAR O CAMPO ESCONDIDO COM OS ITENS SELECIONADOS
    collectedItems.value = selectedItems

}