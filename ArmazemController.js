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

    filtrarFornecedoresPorCredito(valorConsiderado) {
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

    cadastrarProduto(descricao, precoCompra, precoVenda, estoque) {
        let produto = this.#vetProdutos.find(
            (produto) => produto.descricao == descricao.toUpperCase()
        )
        // let fornecedor = this.#vetFornecedores.find(
        //     (fornecedor) => fornecedor.cnpj == cnpjFornecedor
        // );
        if (produto == undefined) {
            this.#vetProdutos.push(new Produto(descricao, precoCompra, precoVenda, estoque));
            return true;
        }
        return false;
    }
    consultarProduto(descricao) {
        let produto = this.#vetProdutos.find(
            (produto) => produto.descricao == descricao.toUpperCase()
        );
        if (produto == undefined) {
            return undefined;
        }
        return {
            descricao: produto.descricao,
            precoCompra: produto.precoCompra,
            precoVenda: produto.precoVenda,
            qtdEstoque: produto.estoque,
            nomeForn: produto.fornecedor == undefined ? "" : produto.fornecedor.razaoSocial,
            cnpjForn: produto.fornecedor == undefined ? "" : produto.fornecedor.cnpj
        }
    }
    listarProdutos() {
        return this.#vetProdutos.map((produto) => {
            let totalVendasAno = produto.vendas.reduce((vendaMes, acumulador) => acumulador + vendaMes);
            return {
                descricao: produto.descricao,
                precoCompra: produto.precoCompra,
                precoVenda: produto.precoVenda,
                qtdEstoque: produto.estoque,
                totalAno: totalVendasAno,
                nomeForn: produto.fornecedor == undefined ? "" : produto.fornecedor.razaoSocial,
                cnpjForn: produto.fornecedor == undefined ? "" : produto.fornecedor.cnpj
            }
        });
    }
    excluirProduto(descricao) {
        let indProdutoExcluido = this.#vetProdutos.findIndex(
            (produto) => produto.descricao == descricao.toUpperCase()
        );
        if (indProdutoExcluido != -1) {
            this.#vetProdutos.splice(indProdutoExcluido, 1)
            return true;
        }
        return false;
    }
    alterarProduto(descricao, precoCompra, precoVenda, estoque, cnpjFornecedor) {
        let produto = this.#vetProdutos.find(
            (produto) => produto.descricao == descricao.toUpperCase());

        if (produto != undefined) {
            if (cnpjFornecedor != "") {
                let fornecedor = this.#vetFornecedores.find(
                    (fornecedor) => fornecedor.cnpj == cnpjFornecedor
                );
                if (fornecedor != undefined) {
                    produto.fornecedor = fornecedor;
                } else {
                    return "FORNECEDOR_NAO_ENCONTRADO";
                }
            }
            produto.precoCompra = precoCompra !== "" ? precoCompra : produto.precoCompra;
            produto.precoVenda = precoVenda !== "" ? precoVenda : produto.precoVenda;
            produto.estoque = estoque !== "" ? estoque : produto.estoque;
            return "SUCESSO";
        }
        return "PRODUTO_NAO_ENCONTRADO";
    }
    alterarVendasMes(descricao, mes, quantidade) {
        let produto = this.#vetProdutos.find((produto) => produto.descricao == descricao.toUpperCase());
        if (produto == undefined) {
            return "PRODUTO_NAO_ENCONTRADO";
        } else if (mes < 1 || mes > 12) {
            return "MES_INVALIDO";
        }
        produto.alterarVendas(quantidade, mes)
        return "SUCESSO";
    }
    comprarProduto(descricao, quantidade, precoCompra, precoVenda, cnpjFornecedor) {
        let produto = this.#vetProdutos.find(
            (produto) => produto.descricao == descricao.toUpperCase()
        );
        if (produto == undefined) {
            return "PRODUTO_NAO_ENCONTRADO";
        }
        let fornecedor = produto.fornecedor;
        if (cnpjFornecedor != "") {
            fornecedor = this.#vetFornecedores.find(
                (fornecedor) => fornecedor.cnpj == cnpjFornecedor
            );
            if (cnpjFornecedor != undefined) {
                fornecedor = this.#vetFornecedores.find(
                    (fornecedor) => fornecedor.cnpj == cnpjFornecedor
                );
            }
            if (fornecedor == undefined) {
                return "FORNECEDOR_NAO_ENCONTRADO";
            }
            produto.fornecedor = fornecedor;
        }
        produto.precoCompra = precoCompra != "" ? precoCompra : produto.precoCompra;
        produto.precoVenda = precoVenda != "" ? precoVenda : produto.precoVenda;

        let total = quantidade * produto.precoCompra;
        if (fornecedor != undefined && fornecedor.creditoDisponibilizado < total) {
            return "CREDITO_INSUFICIENTE";
        }
        produto.estoque += quantidade;
        return "SUCESSO";
    }
    venderProduto(descricao, qtd) {
        let produto = this.#vetProdutos.find(
            (produto) => produto.descricao == descricao.toUpperCase()
        );
        if (produto == undefined) {
            return { codigo: "PRODUTO_NAO_ENCONTRADO" };
        }
        if (qtd > produto.estoque) {
            return { codigo: "ESTOQUE_INSUFICIENTE", estoqueAtual: produto.estoque};
        }
        let totalVenda = qtd * produto.precoVenda;
        produto.estoque -= qtd;
        return { codigo: "SUCESSO", totalVenda: totalVenda };

    }
    consultarTotalVendasAno(descricao) {
        let produto = this.#vetProdutos.find((produto) => produto.descricao == descricao.toUpperCase());
        if (produto) {
            let faturamento = produto.vendas.reduce((acumulador, atual) => acumulador + atual, 0);
            return {
                descricao: produto.descricao,
                totalVendas: faturamento
            }
        }
        return undefined;
    }
    consultarMaisVendidoMes(mes) {
        let meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
        let maisVendido = {
            descricao: undefined,
            qtdVendida: 0,
            mes: meses[mes - 1]
        }
        this.#vetProdutos.forEach(produto => {
            if (produto.vendas[mes] >= maisVendido.qtdVendida) {
                maisVendido.descricao = produto.descricao;
                maisVendido.qtdVendida = produto.vendas[mes];
            }
        })
        return this.#vetProdutos.length == 0 ? undefined : maisVendido;
    }
    consultarFaturamentoMes(mes) {
        let meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
        let faturamento = 0
        this.#vetProdutos.map(produto => {
            // Soma a venda de todos os meses de determinado produto;
            faturamento += produto.vendas[mes - 1] * produto.precoVenda

        })
        return {
            mes: meses[mes - 1],
            faturamento: faturamento
        }
    }
    listarTabelaVendasAnual() {
        // Retorna uma lista com descricao, 
        let lista = this.#vetProdutos.map(produto => {
            let totalAno = 0;
            let vendas = produto.vendas.map(vendasMes => {
                totalAno += vendasMes;
                return vendasMes;
            })
            return {
                descricao: produto.descricao,
                vendasMensais: vendas,
                totalAno: totalAno
            };
        })
        return lista
    }
    listarProdutosFornecedor(cnpjFornecedor) {
        // Retorna undefined se o fornecedor não existir;
        // Retorna um array vazio se o fornecedor for encontrado, mas o mesmo não tiver produtos vinculados;
        // Retorna uma lista de produtos, caso hajam produtos vinculados ao servidor
        if (this.#vetFornecedores.find(fornecedor => fornecedor.cnpj == cnpjFornecedor)) {
            let produtos = this.#vetProdutos.filter(
                produto => produto.fornecedor !== undefined ? produto.fornecedor.cnpj : "" == cnpjFornecedor
            );
            return produtos.map((produto) => {
                let totalVendasAno = produto.vendas.reduce((vendaMes, acumulador) => acumulador + vendaMes);
                return {
                    descricao: produto.descricao,
                    precoCompra: produto.precoCompra,
                    precoVenda: produto.precoVenda,
                    qtdEstoque: produto.estoque,
                    totalAno: totalVendasAno,
                    nomeForn: produto.fornecedor == undefined ? "" : produto.fornecedor.razaoSocial,
                    cnpjForn: produto.fornecedor == undefined ? "" : produto.fornecedor.cnpj
                }
            });
        }
        return undefined;
    }
}
