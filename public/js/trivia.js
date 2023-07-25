
// uses it for transfering data between client and server
const socket = io(); 

// using https://handlebarsjs.com/guide/#installation for generateing player name 
const SearchParams = new URLSearchParams(window.location.search);
const playerName = SearchParams.get("playerName");

const mainHeadingTemplate = document.querySelector(
    "#main-heading-template"
  ).innerHTML;

  // Compile the template into HTML by calling compile method
  const welcomeHeadingHTML = Handlebars.compile(mainHeadingTemplate);