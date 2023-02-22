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
    
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    addItem(itemAtual);

    itens.push(itemAtual)

    localStorage.setItem("itens", JSON.stringify(itens));

    nome.value = '';
    quantidade.value = '';

});

function addItem(item) {
    const novoItem = document.createElement('li');

    novoItem.classList.add('item');

    const numItem = document.createElement('strong');
    numItem.innerHTML = item.quantidade;

    novoItem.appendChild(numItem);
    novoItem.innerHTML += item.nome;

    lista.appendChild(novoItem);
}