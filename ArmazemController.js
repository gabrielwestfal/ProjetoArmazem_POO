import { Fornecedor } from "./Fornecedor.js";
import { Produto } from "./Produto.js";

export class ArmazemController {
    #vetProdutos;
    #vetFornecedores;
    
    // Parte Fornecedor

    cadastrarFornecedor(razaoSocial, cnpj, telefone, endereco, credito) {
        let jaCadastrado = this.#vetFornecedores.find(fornecedor => fornecedor.cnpj == cnpj);
        if (jaCadastrado == undefined) {
            this.#vetFornecedores.push(new Fornecedor(razaoSocial, cnpj, telefone, endereco, credito))
            return "CADASTRO_REALIZADO"
        }
        else {
            return "CADASTRO_NÃO_REALIZADO"
        }
    }
    excluirFornecedor(cnpj) {
        let indCadastro = this.#vetFornecedores.findIndex(fornecedor => fornecedor.cnpj == cnpj);
        let indProduto = this.#vetProdutos.findIndex(produto => produto.fornecedor.cnpj == cnpj)
        if (indCadastro == -1) {
            this.#vetFornecedores.splice(indCadastro, 1)
            return "FORNECEDOR_NÃO_CADASTRADO"
        }
        else if (indProduto !== -1){
            return "FORNECEDOR_VINCULADO_EM_PRODUTO"
        }
        else {
            return "FORNECEDOR_DELETADO"
        }
    }
    consultarFornecedor(cnpj) {
        let cadastro = this.#vetFornecedores.find(fornecedor => fornecedor.cnpj == cnpj);
        if (cadastro !== undefined) {
            return {
                razaoSocial: cadastro.razaoSocial,
                cnpj: cnpj,
                telefone: cadastro.telefone,
                endereco: cadastro.endereco,
                credito: cadastro.creditoDisponibilizado
            };
        }
        else {
            return "FORNECEDOR_NÃO_ENCONTRADO";
        }

    }
    alterarFornecedor(cnpj, razaoSocial, telefone, endereco, credito) {
        let cadastro = this.#vetFornecedores.find(fornecedor => fornecedor.cnpj == cnpj);
        if (cadastro !== undefined) {
            // Caso o cadastro seja encontrado, verifica cada campo preenchido e apenas 
            // altera o objeto caso os parâmetros tenham sido informados
            cadastro.razaoSocial = razaoSocial || cadastro.razaoSocial;
            cadastro.telefone = telefone || cadastro.telefone;
            cadastro.endereco = endereco || cadastro.endereco;
            cadastro.creditoDisponibilizado = credito || cadastro.creditoDisponibilizado;
        }
        else {
            return "FORNECEDOR_NÃO_ENCONTRADO";
        }
    }
    listarFornecedores() {
        let fornecedores = this.#vetFornecedores.map(fornecedor => {
            return {
                razaoSocial: fornecedor.razaoSocial,
                cnpj: fornecedor.cnpj,
                telefone: fornecedor.telefone,
                endereco: fornecedor.endereco,
                credito: fornecedor.creditoDisponibilizado
            };
        })
        return fornecedores;
    }

    filtrarFornecedoresPorCredito (valorConsiderado) {
        // Referência aos objetos que passarem na filtragem
        let fornecedores = this.#vetFornecedores.filter(fornecedor => fornecedor.creditoDisponibilizado > valorConsiderado);
        
        // Transforma as referências em um objeto não referenciado
        return fornecedores.map(fornecedor => {
            return {
                razaoSocial: fornecedor.razaoSocial,
                cnpj: fornecedor.cnpj,
                telefone: fornecedor.telefone,
                endereco: fornecedor.endereco,
                credito: fornecedor.creditoDisponibilizado
            };
        })
        
    }
    // Parte Produto

    cadastrarProduto(descricao,precoCompra,precoVenda,estoque,fornecedor) {
        let novoProduto = this.pesquisarProduto(descricao);

        if(novoProduto == undefined){
            this.#vetProdutos.push(new Produto(descricao,precoCompra,precoVenda,estoque,fornecedor));
            return true;
        }
        return false;
    }
    pesquisarProduto(descricao){
        return this.#vetProdutos.find(
            (produto) => produto.descricao == descricao.toUpperCase()
        );
    }
    excluirProduto(descricao){
        let indProdutoExcluido = this.#vetProdutos.findIndex((produto) =>
             produto.descricao == descricao.toUpperCase());
        if(indProdutoExcluido == -1){
            return false;
        }else{
            this.#vetProdutos.forEach((fornecedor) => {
                fornecedor.excluirProduto(this.#vetProdutos[indProdutoExcluido])
            });
            this.#vetProdutos.slice(indProdutoExcluido,1);
            return true;    
        }
        
    }
    alterarProduto(descricao,precoCompra,precoVenda,estoque,fornecedor){
        let produto = this.pesquisarProduto(descricao);

        if(produto != undefined){
            produto.descricao = descricao;
            produto.precoCompra = precoCompra;
            produto.precoVenda = precoVenda;
            produto.estoque = estoque;
            produto.fornecedor = fornecedor;
            return true;
        }
        return false;
    }
}