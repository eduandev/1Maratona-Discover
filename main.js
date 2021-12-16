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
        description: 'Salario',
        amount: 200000,
        date: '13/05/2020',
    },
    {
        description: 'Agua',
        amount: -3000,
        date: '13/05/2020',
    },
    {
        description: 'Luz',
        amount: -9000,
        date: '13/05/2020',
    }
];

//===========================================================

const amounTransactions = {  // Transaction Somar entradas

    all: objectsTransactions,

    add(transaction){
        amounTransactions.all.push(transaction)
        
        App.reload();
    },

    remove(index){
      amounTransactions.all.splice(index, 1)
      App.reload();
    },

    incomes(){
        let income = 0;
        amounTransactions.all.forEach(transaction => {

            if (transaction.amount > 0) {

                income += transaction.amount;
            }
        })

        return income;
    },

    expenses(){ // Somar saídas
        let expense = 0;
        amounTransactions.all.forEach(transaction => {

            if (transaction.amount < 0) {

                expense += transaction.amount;

            }

        })

        return expense;
    },

    total(){ // Obter o valor total

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

    //------------------------------------------------------

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
    },
    clearTransaction(){
        manipulate.transactionContainer.innerHTML = ""
    },
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

const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),


// Campo responsável por pescar os dados
    getValues(){
    return{
        description: Form.description.value,
        amount: Form.amount.value,
        date: Form.date.value,
    }
    },

// Campo responsável por verificar se os dados foram formatados
    formatData(){
         

    },

// Campo  responsável por verificar se as informações foram preechidas
    validateField(){ 

    const {description, amount, date} = Form.getValues();
    
    console.log(Form.getValues());
        if(description.trim() === "" ||  // trim() - Serve para fazer uma limpeza dos espaços vazios
           amount.trim() === "" || 
           date.trim() === ""){

           throw new Error("Por favor, preencha todos os campos")
           }
    },

    submit(event){
        
//Função que retira o comportamento padrão do envio do formulario
       event.preventDefault() 
       
       
        // try{

         //}


    Form.formatData()    
    Form.validateField()

    }
}


//===========================================================

const App = {
    init(){

        amounTransactions.all.forEach(transaction => {
            manipulate.addTransaction(transaction)
        });

        manipulate.updateBalance();

    },

    reload(){

        manipulate.clearTransaction();
        App.init();

    },
};

App.init();


amounTransactions.remove(1)



