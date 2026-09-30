export class Produto {
    // Atributos da classe
    #descricao;
    #precoCompra;
    #precoVenda;
    #estoque;
    #fornecedor;
    #vendas = [];

    constructor (descricao, precoCompra, precoVenda, estoque, fornecedor = undefined) {
        this.#descricao = descricao.toUpperCase();
        this.#precoCompra = precoCompra;
        this.#precoVenda = precoVenda;
        this.#estoque = estoque;
        // Corrigido : this.#fornecedor deve guardar a referência de um objeto da classe fornecedor
        // this.#fornecedor = fornecedor.toUpperCase();
        this.#fornecedor = fornecedor
    }

    // Getters & Setters

    get descricao () {
        return this.#descricao;
    }
    get precoCompra () {
        return this.#precoCompra;
    }
    get precoVenda () {
        return this.#precoVenda;
    }
    get estoque () {
        return this.#estoque;
    }
    get vendas () {
        return this.#vendas;
    }

    set descricao (descricao) {
        this.#descricao = descricao.toUpperCase(); 
    }
    set precoCompra (preco) {
        this.#precoCompra = preco;
    }
    set precoVenda (preco) {
        this.#precoVenda = preco;
    }

    // Methods
    toString () {
        return `
        <tr>
            <td>${this.#descricao}</td>
            <td>${this.#precoCompra}</td>
            <td>${this.#precoVenda}</td>
            <td>${this.#estoque}</td>
            <td>${this.#fornecedor.razaoSocial}</td>
            <td>${this.#fornecedor.cnpj}</td>
        </tr>
        `;
    }
    alterarEstoque (mes, novoEstoque) {
        if (mes >= 1 && mes <= 12) {
            this.#vendas[mes - 1] = novoEstoque;
            return "Estoque alterado com sucesso";
        }
        else {
            return "Houve um erro ao alterar o estoque";
        }
    }
    comprar (quantidade) {
        this.#estoque += quantidade;
        return `Compra realizada com sucesso`
    }
    vender (quantidade) {
        if (this.#estoque <= 0 || this.#estoque < quantidade) {
            return "Não há estoque suficiente para este produto"
        }
        else {
            this.#estoque -= quantidade;
            return `Venda realizada com sucesso`
        }
    }

}

let prod = new Produto ("Bala Fini", 2.56, 12);
prod.descricao = "Bala Fini 987"
console.log(prod.alterarEstoque(5, 25))
console.log(prod.alterarEstoque(1, 6))
console.log(prod.alterarEstoque(9, 56))
console.log(prod.vendas[11])