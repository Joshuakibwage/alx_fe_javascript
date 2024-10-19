
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

        
        //add new quote to this array
        quotes.push({text: newQuoteText, text: newQuoteCategory});

        saveQuotes();

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


/*if(localStorage.getItem('quotes')){
    quotes = JSON.parse(localStorage.getItem('quotes'));
}
*/
//save quotes to local storage
function saveQuotes(){

    localStorage.setItem('quotes', JSON.stringify('quotes'));
}

//export JSON
function exportToJsonFile(){

    const dataString = JSON.stringify(quotes, null, 2);
    const blob = new Blob ([dataString], {type: application/json});
    const url = URL.createObjectURL(blob);

    //
    const link = document.createElement('a');
    link.href = url;
    link.download = 'quotes.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  
}


//function to import quotes from a json file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  }