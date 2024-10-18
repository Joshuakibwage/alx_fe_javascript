
//Array of quote objects where each has array has text and category
const quotes = [
    {text: 'It never gets easier you just get better, stronger and more resilient. Keep fighting the good fight.', category: "motivation"},
    {text: 'The cold water does not get warmer if jump in late.', category: "motivation"},
    {text: 'The path of self improvement is never ending but very rewarding.', category: "discipline"},
    {text: 'The biggest risk is not taking a risk. In a world that\’s changing really quickly, the only strategy that is guaranteed to fail is not taking risks.', category: "life"}
];

//implementing functions to display a random quote

function showRandomQuote(){
     
    const random = math.floor(Math.random() * quotes.length);
      //get quote object
    const randomQuote =  quotes[random];
    //the div where the quote will be displayed
    const quoteDisplay = document.getElementById('quoteDisplay');
    //update the content of the div with text and category
    quoteDisplay.innerHTML = `<p>${randomQuote.text}</p><small>${randomQuote.category}</small>`;
}

document.getElementById('newQuote').addEventListener('click', showRandomQuote);

function createAddQuoteForm(){

    const formElement = document.createElement('Form');

    formElement.innerHTML = `
        <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
        <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
        <button onclick="addQuote()">Add Quote</button>
    `;

    formElement.appendChild('form');
}

//function to add new quote

function addQuote(){

    //getting values from for input
    const newQuoteText = document.getElementById('newQuoteText').value;

    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if(newQuoteText && newQuoteCategory){

        const newQuote = {
            text: newQuoteText,
            category: newQuoteCategory
        };
        //add new quotes into the quote array
        quotes.push(newQuote);

        //clearing fields after putting new quotes
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';

        //show new added quote
        const quoteDisplay = document.getElementById('quoteDisplay');
        quoteDisplay.innerHTML = `<p>${newQuote.text}</p><small>${newQuote.category}</small>`;

        alert('Quote added successfully!');

    }else {
        alert('Please! Enter both quote and category.')
    }
    
}

