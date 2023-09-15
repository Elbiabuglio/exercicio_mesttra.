const prompt = require("prompt-sync")();

console.clear();

// Função para validar a senha
function validarSenha() {
    // Solicitar entrada do usuário
    const nomeCompleto = prompt("Digite seu nome completo:");
    const dataNascimento = prompt("Digite sua data de nascimento (dd/mm/aaaa):");
    const senha = prompt("Digite uma senha:");

    // Definir conjuntos de caracteres permitidos
    const senhaNumero = "0123456789";
    const senhaMaiusculo = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const senhaMinusculo = "abcdefghijklmnopqrstuvwxyz";
    const senhaCaracteres = "\\!@#$%^&*()_+-=[]{}|;:',.<>?/"; // Adicionamos barras invertidas para escapar caracteres especiais

    // Inicializar variável para verificar critérios
    let possuiCriterios = false;

    // Iterar pelos caracteres da senha usando forEach
    [...senha].forEach(parametros => {
        
        // Verificar se a senha possui números, maiúsculas, minúsculas ou caracteres especiais
        if (!possuiCriterios && senhaNumero.includes(parametros)) {
            possuiCriterios = true;
        }

        if (!possuiCriterios && senhaMaiusculo.includes(parametros)) {
            possuiCriterios = true;
        }

        if (!possuiCriterios && senhaMinusculo.includes(parametros)) {
            possuiCriterios = true;
        }

        if (!possuiCriterios && senhaCaracteres.includes(parametros)) {
            possuiCriterios = true;
        }
    });

    // Verificar critérios adicionais
    const criteriosTamanho = senha.length >= 8;
    const criteriosRepetidos = !verificaRepeticao(senha);
    const criteriosSequencia = !verificaSequencial(senha);
    const criteriosNome = !verificaNome(nomeCompleto, senha);
    const criteriosData = !verificaData(dataNascimento, senha);

    // Verificar se todos os critérios são atendidos
    const criteriosValidos = criteriosTamanho && criteriosRepetidos && criteriosSequencia && criteriosNome && criteriosData;

    // Exibir mensagem com base nos critérios
    if (possuiCriterios && criteriosValidos) {
        console.log("A senha atende aos critérios.");
    } else {
        console.log("A senha não atende a todos os critérios.");
    }

    // Função para verificar repetições na senha
    function verificaRepeticao(senha) {
        for (let i = 0; i < senha.length - 2; i++) {
            if (senha[i] === senha[i + 1] && senha[i] === senha[i + 2]) {
                return false;
            }
        }
        return true;
    }

    // Função para verificar sequências proibidas na senha
    function verificaSequencial(senha) {
        const sequenciasProibidas = ["abc", "bcd", "234", "!@#", "$%^", "&*(", "_+-"];

        for (const sequencia of sequenciasProibidas) {
            if (senha.includes(sequencia)) {
                return false;
            }
        }
        return true;
    }

    // Função para verificar se o nome está na senha
    function verificaNome(nome, senha) {
        const nomes = nome.split(' ');

        for (const nome of nomes) {
            if (senha.includes(nome)) {
                return false;
            }
        }
        return true;
    }

    // Função para verificar se a data de nascimento está na senha
    function verificaData(data, senha) {
        const partesData = data.split(/[\/-]/);

        for (const elementoData of partesData) {
            if (senha.includes(elementoData)) {
                return false;
            }
        }
        return true;
    }
}

// Chamar a função para iniciar a validação da senha
validarSenha();