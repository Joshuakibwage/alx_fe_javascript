
//Array of quote objects where each has array has text and category
const quotes = [
    {text: 'It never gets easier you just get better, stronger and more resilient. Keep fighting the good fight.', category: "motivation"},
    {text: 'The cold water does not get warmer if jump in late.', category: "motivation"},
    {text: 'The path of self improvement is never ending but very rewarding.', category: "discipline"},
    {text: 'The biggest risk is not taking a risk. In a world that\’s changing really quickly, the only strategy that is guaranteed to fail is not taking risks.', category: "life"}
];

//implementing functions to display a random quote

function showRandomQuote(){
     
    const random = math.floor(math.random());
      //get quote object
    const randomQuote =  quotes[random];
    //the div where the quote will be displayed
    const quoteDisplay = document.getElementById('quoteDisplay');
    //update the content of the div with text and category
    quoteDisplay.innerHTML = `<p>${randomQuote.text}</p><p>${randomQuote.category}</p>`;
}
document.getElementById('newQuote').addEventListener('click', showRandomQuote);