# 📦 Armazém Xampu — Sistema de Gerenciamento de Armazém

<p align="center">
  <img src="box.png" alt="Logo do Armazém Xampu" width="150">
</p>

<p align="center">
  Sistema desenvolvido para o gerenciamento de produtos, estoque, vendas e fornecedores.
</p>

---

## 📋 Sobre o projeto

O **Armazém Xampu** é um projeto acadêmico desenvolvido para a disciplina de **Programação Orientada a Objetos (POO)**, ministrada pelo professor **Archimedes Detoni**, no Instituto Federal do Espírito Santo (IFES).

O sistema foi criado com o objetivo de colocar em prática os conceitos estudados durante a disciplina, desenvolvendo uma aplicação capaz de auxiliar no controle de um armazém.

Por meio de uma interface simples, é possível gerenciar produtos e fornecedores, acompanhar o estoque, registrar compras e vendas e consultar informações importantes para o controle do negócio.

## 🎯 Objetivos

- Aplicar os conceitos de Programação Orientada a Objetos.
- Desenvolver um sistema funcional utilizando JavaScript.
- Organizar o código por meio de classes e módulos.
- Facilitar o gerenciamento de produtos e fornecedores.
- Trabalhar com operações de estoque, compras e vendas.
- Praticar a validação de dados e a organização das funcionalidades.

## ⚙️ Funcionalidades

### 📦 Gerenciamento de produtos

- Cadastrar novos produtos.
- Consultar informações dos produtos.
- Alterar preços e quantidades em estoque.
- Excluir produtos cadastrados.
- Listar todos os produtos.
- Filtrar produtos de acordo com a quantidade em estoque.
- Consultar produtos vinculados a fornecedores.

### 🏢 Gerenciamento de fornecedores

- Cadastrar fornecedores com razão social, CNPJ, telefone e endereço.
- Consultar os dados dos fornecedores.
- Alterar informações cadastradas.
- Excluir fornecedores quando não possuem produtos vinculados.
- Listar todos os fornecedores.
- Filtrar fornecedores pelo crédito disponibilizado.

### 💰 Controle de compras e vendas

- Registrar compras de produtos.
- Atualizar o estoque após as operações.
- Registrar vendas e calcular o valor total.
- Verificar se existe estoque suficiente para uma venda.
- Considerar o crédito disponível do fornecedor durante as compras.

### 📊 Relatórios e consultas

- Consultar a quantidade total vendida de um produto no ano.
- Identificar o produto mais vendido em determinado mês.
- Consultar o faturamento mensal.
- Visualizar a tabela de vendas dos meses do ano.
- Consultar informações sobre estoque e fornecedores.

## 🧠 Conceitos de Programação Orientada a Objetos

Durante o desenvolvimento, foram aplicados conceitos importantes de POO:

- **Classes e objetos:** representação de produtos, fornecedores e do controle do armazém.
- **Atributos:** armazenamento das características de cada objeto.
- **Métodos:** implementação das operações disponíveis no sistema.
- **Encapsulamento:** utilização de atributos privados para controlar o acesso aos dados.
- **Modularização:** divisão do código em arquivos com responsabilidades diferentes.
- **Organização MVC simplificada:** separação entre a interface, a lógica de controle e as classes que representam os dados.

## 🛠️ Tecnologias utilizadas

- **HTML5:** estrutura da página.
- **CSS3:** estilização da interface.
- **JavaScript:** implementação da lógica e das funcionalidades.
- **Módulos ES6:** organização e importação das classes entre arquivos.
- **Git e GitHub:** versionamento e compartilhamento do código.

## 📁 Estrutura do projeto

```text
ProjetoArmazem_POO/
├── ArmazemController.js
├── Fornecedor.js
├── Produto.js
├── armazem.html
├── armazem.css
├── armazemView.js
├── box.png
└── README.md
```

**Principais arquivos:**

- `ArmazemController.js`: controla as operações de produtos e fornecedores.
- `Fornecedor.js`: define a classe e os dados dos fornecedores.
- `Produto.js`: define a classe dos produtos e seus dados, incluindo as vendas mensais.
- `armazem.html`: estrutura da interface do sistema.
- `armazem.css`: estilos e aparência da página.
- `armazemView.js`: conecta a interface às funcionalidades do sistema.
- `box.png`: imagem utilizada na identificação visual do armazém.

## ▶️ Como executar o projeto

1. Faça o download do projeto ou clone o repositório:

   ```bash
   git clone https://github.com/gabrielwestfal/ProjetoArmazem_POO.git
   ```

2. Entre na pasta do projeto:

   ```bash
   cd ProjetoArmazem_POO
   ```

3. Abra a pasta no Visual Studio Code.

4. Execute o arquivo `armazem.html` utilizando uma extensão de servidor local, como o Live Server, para permitir o funcionamento correto dos módulos JavaScript.

5. Utilize as opções da interface para cadastrar produtos, gerenciar fornecedores e realizar consultas e operações de compra e venda.

## 👨‍💻 Integrantes

- **Gabriel Westfal**
- **Leonardo Beling**

## 👨‍🏫 Professor responsável

**Archimedes Detoni**

Disciplina: Programação Orientada a Objetos (POO)

Instituição: Instituto Federal do Espírito Santo (IFES)

## 🔗 Repositório

[**Acessar o ProjetoArmazem_POO no GitHub**](https://github.com/gabrielwestfal/ProjetoArmazem_POO)

---

<p align="center">
  Desenvolvido por Gabriel Westfal e Leonardo Beling como trabalho acadêmico da disciplina de Programação Orientada a Objetos.
</p>
