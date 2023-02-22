const form = document.getElementById('novoItem');
const lista = document.getElementById('lista');
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach((element) => {
    addItem(element);
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const nome = event.target.elements['nome'];
    const quantidade = event.target.elements['quantidade'];

    const existe = itens.find(element => element.nome === nome.value);

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (existe) {
        itemAtual.id = existe.id;

        updateItem(itemAtual);

        itens[itens.findIndex(element => element.id === existe.id)] = itemAtual;
    } else {
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0;
        addItem(itemAtual);

        itens.push(itemAtual)
    }

    localStorage.setItem("itens", JSON.stringify(itens));

    nome.value = '';
    quantidade.value = '';

});

function addItem(item) {
    const novoItem = document.createElement('li');

    novoItem.classList.add('item');

    const numItem = document.createElement('strong');
    numItem.innerHTML = item.quantidade;

    numItem.dataset.id = item.id;

    novoItem.appendChild(numItem);
    novoItem.innerHTML += item.nome;

    novoItem.appendChild(deleteButton(item.id));

    lista.appendChild(novoItem);
}

function updateItem(item) {
    document.querySelector(`[data-id='${item.id}']`).innerHTML = item.quantidade;
}

function deleteButton(id) {
    const elementoBotao = document.createElement('button');

    elementoBotao.innerText = "X";

    elementoBotao.addEventListener('click', function() {
        deleteItem(this.parentNode, id);
    })

    return elementoBotao;
}

function deleteItem(tag, id) {
    tag.remove();

    itens.splice(itens.findIndex(element => element.id === id), 1);

    localStorage.setItem("itens", JSON.stringify(itens));
}