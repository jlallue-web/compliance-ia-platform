function texto(mensagem) {
    return {
        tipo: "TEXTO",
        texto: mensagem
    };
}

function lista(mensagem, itens) {
    return {
        tipo: "LISTA",
        texto: mensagem,
        itens
    };
}

function pdf(mensagem, documento) {
    return {
        tipo: "PDF",
        texto: mensagem,
        documento
    };
}

module.exports = {
    texto,
    lista,
    pdf
};