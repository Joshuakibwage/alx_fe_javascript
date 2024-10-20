
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


if(localStorage.getItem('quotes')){
    quotes = JSON.parse(localStorage.getItem('quotes'));
}

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

  //populate categories dynamically

  function populateCategories(){
    const categories = [...new set(quotes.map(quote => quote.category))];
    const categoryFilter = document.getElementById('categoryFilter');

    categories.forEach(category => {
        const option = document.getElementById('option')
        option.value = category;
        option.text = category.textContent;
        categoryFilter.appendChild(option);
    });
  }

  //filter quotes by category
  function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);
    const quoteDisplay = document.getElementById('quoteDisplay');

    if(filteredQuotes.length > 0) {
        const random = Math.floor(Math.random() * filteredQuotes.length);
        const quote = filteredQuotes[random];
        quoteDisplay.innerHTML = `'${quote.text}' - ${quote.category}`;

    }else {
        quoteDisplay.innerHTML = 'No quotes available for the selected category.';
    }
  }

  //calling populateCategories when page loads
  window.onload = function() {
    populateCategories();
    showRandomQuote();
  }

  //fetching quotes from the server
  async function fetchQuotesFromServer(){
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();

        const serverQuotes = data.map(item => ({
            text: item.title,
            category: 'server'
        }));

        quotes.push(...serverQuotes);
        saveQuotes();
        alert('Quote synced with server');

    }catch(error){
        console.error('Error fetching quotes from server', error);
    }
  }

  //post quotes to server
  async function postQuoteToServer(quote) {
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(quote),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();
        console.log('Quote posted to server:', result);

    }catch(error){
        console.error('Error posting quote to server:', error);
    }
  }

  //function to resolve conflicts
   // Function to sync local quotes with server
async function syncQuotes() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const serverQuotes = await response.json();
  
      // Transform server data into the quote format
      const serverData = serverQuotes.map(item => ({
        text: item.title,
        category: 'Server'
      }));
  
      // Handle conflicts: server data takes precedence (you can modify this logic)
      const mergedQuotes = resolveQuoteConflicts(serverData, quotes);
  
      // Update local quotes with the resolved data
      quotes = mergedQuotes;
      saveQuotes();
  
      alert('Quotes synced successfully!');
    } catch (error) {
      console.error('Error syncing quotes with the server:', error);
    }
  }
  
 // Function to sync local quotes with server
async function syncQuotes() {
    // Show sync notification
    const syncNotification = document.getElementById('syncNotification');
    syncNotification.style.display = 'block';
  
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const serverQuotes = await response.json();
  
      // Transform server data into the quote format
      const serverData = serverQuotes.map(item => ({
        text: item.title,
        category: 'Server'
      }));
  
      const mergedQuotes = resolveQuoteConflicts(serverData, quotes);
  
      // Update local quotes with the resolved data
      quotes = mergedQuotes;
      saveQuotes();
  
      // Notify user on successful sync
      alert('Quotes synced with server!');
    } catch (error) {
      console.error('Error syncing quotes with the server:', error);
    }
  
    // Hide sync notification after sync completes
    setTimeout(() => {
      syncNotification.style.display = 'none';
    }, 2000);  
  }
  
  // Function to resolve conflicts 
  function resolveQuoteConflicts(serverQuotes, localQuotes) {

    const mergedQuotes = [...serverQuotes]; 
    
    localQuotes.forEach(localQuote => {
      if (!serverQuotes.some(serverQuote => serverQuote.text === localQuote.text)) {
        mergedQuotes.push(localQuote);
      }
    });
  
    return mergedQuotes;
  }
  
  setInterval(syncQuotes, 60000); 
  