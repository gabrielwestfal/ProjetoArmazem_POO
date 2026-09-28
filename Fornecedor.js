export class Fornecedor {
    #razaoSocial;
    #cnpj;
    #telefone;
    #endereco;
    #creditoDisponibilizado;

    constructor(razaoSocial, cnpj, telefone, endereco, creditoDisponibilizado){
        this.#razaoSocial = razaoSocial.toUpperCase();
        this.#cnpj = cnpj;
        this.#telefone = telefone;
        this.#endereco = endereco.toUpperCase();
        this.#creditoDisponibilizado = creditoDisponibilizado; 
    }

    // Uso de IA para gerar os getters e setters.
    get razaoSocial(){
        return this.#razaoSocial;
    }
    set razaoSocial(novaRazaoSocial){
        this.#razaoSocial = novaRazaoSocial;
    }
    get cnpj(){
        return this.#cnpj;
    }
    get telefone(){
        return this.#telefone;
    }
    set telefone(novoTelefone){
        this.#telefone = novoTelefone;
    }
    get endereco(){
        return this.#endereco;
    }
    set endereco(novoEndereco){
        this.#endereco = novoEndereco;
    }
    get creditoDisponibilizado(){
        return this.#creditoDisponibilizado;
    }

    toString(){
        return `Razão Social: ${this.#razaoSocial}
        \nCNPJ: ${this.#cnpj}
        \nTelefone: ${this.#telefone}
        \nEndereço: ${this.#endereco}
        \nCrédito Disponibilizado: ${this.#creditoDisponibilizado}`;
    }
    stringify(){
        return '\n{' +
                '\n\t"razaoSocial" : "' + this.#razaoSocial + '" ,' +
                '\n\t"cnpj" : "' + this.#cnpj + '" ,' +
                '\n\t"telefone" : "' + this.#telefone + '" ,' +
                '\n\t"endereco" : "' + this.#endereco + '" ,' +
                '\n\t"creditoDisponibilizado" : "' + this.#creditoDisponibilizado + '"' +
                '\n}';
    }
    
}
let fornecedor1 = new Fornecedor("Fornecedor A", "12.345.678/0001-90", "(11) 1234-5678", "Rua A, 123", 10000);
console.log(fornecedor1.toString());