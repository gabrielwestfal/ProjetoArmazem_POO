import { Fornecedor } from "./Fornecedor.js";
import { Produto } from "./Produto.js";

export class ArmazemController {
    #vetProdutos = [];
    #vetFornecedores = [];
    
    // Parte Fornecedor

    cadastrarFornecedor(razaoSocial, cnpj, telefone, endereco, credito) {
        let jaCadastrado = this.#vetFornecedores.find(fornecedor => fornecedor.cnpj == cnpj);
        if (jaCadastrado == undefined) {
            this.#vetFornecedores.push(new Fornecedor(razaoSocial, cnpj, telefone, endereco, credito))
            return true
        }
        else {
            return false
        }
    }
    excluirFornecedor(cnpj) {
        let indFornecedor = this.#vetFornecedores.findIndex(fornecedor => fornecedor.cnpj == cnpj);
        let indProduto = this.#vetProdutos.findIndex(produto => produto.fornecedor.cnpj == cnpj)
        if (indFornecedor == -1) return "FORNECEDOR_NAO_ENCONTRADO";
        else if (indProduto != -1) return "FORNECEDOR_COM_PRODUTOS";
        else {
            this.#vetFornecedores.splice(indFornecedor, 1)
            return "SUCESSO"
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
                creditoDisp: cadastro.creditoDisponibilizado
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
            cadastro.razaoSocial = razaoSocial !== "" ? razaoSocial : cadastro.razaoSocial;
            cadastro.telefone = telefone !== "" ? telefone : cadastro.telefone;
            cadastro.endereco = endereco !== "" ? endereco : cadastro.endereco;
            cadastro.creditoDisponibilizado = credito !== 0 ? credito : cadastro.creditoDisponibilizado;

            return true
        }
        else {
            return false;
        }
    }
    listarFornecedores() {
        let fornecedores = this.#vetFornecedores.map(fornecedor => {
            return {
                razaoSocial: fornecedor.razaoSocial,
                cnpj: fornecedor.cnpj,
                telefone: fornecedor.telefone,
                endereco: fornecedor.endereco,
                creditoDisp: fornecedor.creditoDisponibilizado
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
                creditoDisp: fornecedor.creditoDisponibilizado
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