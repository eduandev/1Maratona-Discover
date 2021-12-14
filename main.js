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

//===========================================================

const objectsTransactions = [

    {
        id: '1',
        description: 'Salario',
        amount: 200000,
        date: '13/05/2020',
    },
    {
        id: '2',
        description: 'Agua',
        amount: -3000,
        date: '13/05/2020',
    },
    {
        id: '3',
        description: 'Luz',
        amount: -9000,
        date: '13/05/2020',
    }
];

//===========================================================

const amounTransactions = {  // Transaction Somar entradas

    all: objectsTransactions,

    incomes() {
        let income = 0;
        amounTransactions.all.forEach(transaction => {

            if (transaction.amount > 0) {

                income += transaction.amount;
            }
        })

        return income;
    },

    expenses() { // Somar saídas
        let expense = 0;
        amounTransactions.all.forEach(transaction => {

            if (transaction.amount < 0) {

                expense += transaction.amount;

            }

        })

        return expense;
    },

    total() { // Obter o valor total

        return amounTransactions.incomes() + amounTransactions.expenses();
    }
};

//===========================================================

const manipulate = {   // Dom

    transactionContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = manipulate.innerHtmlTransactions(transaction)

        manipulate.transactionContainer.appendChild(tr)
    },

    //--------------------------------------------------------------------

    innerHtmlTransactions(transaction) {

        const CSSclass = transaction.amount > 0 ? "income" : "expense" // ? - Então, : - Se não

        const amountForm = Utils.formatCurrency(transaction.amount)

        const html =
            `<td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amountForm}</td>
        <td class="date">${transaction.date}</td>
        <td>
        <img src="./assets/minus.svg" alt="Remover transação">
        </td> `
        return html;
    },

    //------------------------------------------------------------------------------

    updateBalance() {
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(amounTransactions.incomes());
        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(amounTransactions.expenses());
        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(amounTransactions.total());
    }
};

//===========================================================

const Utils = {
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

//===========================================================

objectsTransactions.forEach(function (transaction) {
    manipulate.addTransaction(transaction)
});

//===========================================================

manipulate.updateBalance();