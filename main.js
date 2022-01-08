const Modal = {
    open() {  // Abrir modal, adiciona a class ative no modal

        document
            .querySelector('.modal-overlay')
            .classList
            .add('active');
    },

    close() { // Fechar modal, retira a class ative no modal

        document
            .querySelector('.modal-overlay')
            .classList
            .remove('active');
    }
};

const Storage = {

    get() {

        return JSON.parse(localStorage.getItem('devfinances:transaction')) || [];
    },
    set(transaction) {

        localStorage.setItem("devfinances:transaction", JSON.stringify(transaction))
    }
};

//===========================================================

const Transaction = {  // Transaction Somar entradas

    all: Storage.get(),

    add(transaction) {
        Transaction.all.push(transaction)
        App.reload()
    },

    remove(index) {
        Transaction.all.splice(index, 1)
        App.reload()
    },

    incomes() {
        let income = 0;
        Transaction.all.forEach(transaction => {

            if (transaction.amount > 0) {

                income += transaction.amount;
            }
        })

        return income;
    },

    expenses() { // Somar saídas
        let expense = 0;
        Transaction.all.forEach(transaction => {

            if (transaction.amount < 0) {

                expense += transaction.amount;
            }
        })

        return expense;
    },

    total() { // Obter o valor total

        return Transaction.incomes() + Transaction.expenses();
    }
};

//===========================================================

const manipulate = {   // Dom

    transactionContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = manipulate.innerHtmlTransactions(transaction, index)
        tr.dataset.index = index

        manipulate.transactionContainer.appendChild(tr)
    },

    //--------------------------------------------------------------------

    innerHtmlTransactions(transaction, index) {

        const CSSclass = transaction.amount > 0 ? "income" : "expense" // ? - Então, : - Se não

        const amountForm = Utils.formatCurrency(transaction.amount)

        const html =
            `<td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amountForm}</td>
        <td class="date">${transaction.date}</td>
        <td>
        <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação">
        </td> `
        return html;
    },

    //------------------------------------------------------

    updateBalance() {
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes());
        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses());
        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total());
    },
    clearTransaction() {
        manipulate.transactionContainer.innerHTML = ""
    },
};

//===========================================================

const Utils = {

    // Função responsável por formatar o valor da quantia digitado pelo usuário
    formatAmount(value) {
        value = Number(value) * 100; // Recebe o valor em forma de String ou pontos e virgulas, pra ser formatado 
        return Math.round(value)     // Arredondar para que haja um valor legivel
    },

    // Função responsável por formatar a data digitado pelo usuário
    formatDate(date) {
        const splitDate = date.split('-');
        return `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}` // Retorna essa ordem da data 
    },

    // Função responsável por formatar os dados da moeda
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")  // /\D/ - Expressão regular faz a troca global(g) de tudo que não é numero por "".
        value = Number(value) / 100
        value = value.toLocaleString('pt-BR', { // Local Brasil
            style: "currency", // Moeda
            currency: "BRL", // Real Brasileiro
        })

        return signal + value;
    }
};

const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),


    // Campo responsável por pescar os dados
    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value,
        }
    },

    // Campo responsável por verificar se os dados foram formatados
    formatValue() {

        let { description, amount, date } = Form.getValues()

        amount = Utils.formatAmount(amount);
        date = Utils.formatDate(date);

        return {
            description,
            amount,
            date
        }
    },

    // Campo  responsável por verificar se as informações foram preenchidas
    validateField() {

        const { description, amount, date } = Form.getValues();

        if (description.trim() === "" ||  // trim() - Serve para fazer uma limpeza dos espaços vazios
            amount.trim() === "" ||
            date.trim() === "") {

            throw new Error("Por favor, preencha todos os campos")
        }
    },

    // Campo  responsável por limpar as informações que foram preenchidas
    clearField() {
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },

    submit(event) {

        //Função que retira o comportamento padrão do envio do formulario
        event.preventDefault()

        try {   // Tente executar esses passos

            // Validar os dados do formulario
            Form.validateField()

            // Salvar os dados do formulario
            const transaction = Form.formatValue()
            Transaction.add(transaction)

            // Apagar os dados do formulario
            Form.clearField()

            // Fechar o modal
            Modal.close()

            // Atualizar a aplicação
            App.reload()

        } catch (error) { // Caso passos não executado captura o erro

            alert(error.message)
        }

        Form.formatValue()
    }
};

//===========================================================

const App = {
    init() {

        Transaction.all.forEach(manipulate.addTransaction)
        manipulate.updateBalance();
        Storage.set(Transaction.all);
    },

    reload() {

        manipulate.clearTransaction();
        App.init();
    },
};

App.init();








