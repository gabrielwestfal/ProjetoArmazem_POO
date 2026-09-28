import { Fornecedor } from "./Fornecedor.js";
import { Produto } from "./Produto.js";

export class ArmazemController {
    #vetProdutos;
    #vetFornecedores;
    
    // Parte Fornecedor


    

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