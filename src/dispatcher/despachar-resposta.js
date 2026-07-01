async function despacharResposta(resposta) {

    switch (resposta.tipo) {

        case "TEXTO":
            console.log("\n=== TEXTO ===");
            console.log(resposta.texto);
            break;

        case "LISTA":
            console.log("\n=== LISTA ===");
            console.log(resposta.texto);
            break;

        case "PDF":
            console.log("\n=== PDF ===");
            console.log(resposta.texto);
            console.log("Arquivo:", resposta.documento.google_drive_path);
            break;

        default:
            console.log("Tipo desconhecido.");
    }

}

module.exports = {
    despacharResposta
};