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

const objectsTransactions = [

    {   
        id: '1',
        description: 'Salario',
        amount: 200000,
        date:13/05/2020
    },
    {   
        id: '1',
        description: 'Agua',
        amount: -3000,
        date:13/05/2020
    },
    {   
        id: '1',
        description: 'Luz',
        amount: -9000,
        date:13/05/2020
    }
];

const amounTransactions = {

    incomes(){ // Somar entradas

    },

    expensives(){ // Somar saídas
    
    },

    total(){ // Obter o valor total
    
    }
};

const manipulate = {

    transactionContainer: document.querySelector('#data-table tbody'),

    addTransaction(objectsTransactions, index){
        const tr = document.createElement('tr')
        tr.innerHTML = manipulate.innerHtmlTransactions(objectsTransactions)
        
        
            
    },

    innerHtmlTransactions(objectsTransactions){
        const html = 
            `<td class="description">${objectsTransactions.description}</td>
            <td class="expense">${objectsTransactions.amount}</td>
            <td class="date">${objectsTransactions.date}</td>
            <td>
            <img src="./assets/minus.svg" alt="Remover transação">
            </td> `
        return html;    
    }
};

manipulate.addTransaction(objectsTransactions[2]);