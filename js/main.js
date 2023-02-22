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

        itens[existe.id] = itemAtual;
    } else {
        itemAtual.id = itens.length;
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

    lista.appendChild(novoItem);
}

function updateItem(item) {
    document.querySelector(`[data-id='${item.id}']`).innerHTML = item.quantidade;
}