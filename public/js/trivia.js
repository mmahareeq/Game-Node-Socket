
// uses it for transfering data between client and server
const socket = io(); 

// using https://handlebarsjs.com/guide/#installation for generateing player name and room
const SearchParams = new URLSearchParams(window.location.search);
const playerName = SearchParams.get("playerName");
const room = SearchParams.get('room');

const mainHeadingTemplate = document.querySelector(
    "#main-heading-template"
  ).innerHTML;



  // Compile the template into HTML by calling compile method
  const welcomeHeadingHTML = Handlebars.compile(mainHeadingTemplate);
  document.querySelector('main').insertAdjacentHTML(
    'afterBegin',
    welcomeHeadingHTML({
      playerName,
    })
  );
  // send event to server , describes the name of event , join to room
  socket.emit('join', { playerName, room }, error => {
    if (error) {
      alert(error);
      location.href = '/';
  }
  });
