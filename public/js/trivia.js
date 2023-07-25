
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
        console.log('fjghkdfjghdkfj')
      alert(error);
      location.href = '/';
  }
  });

  socket.on('message', ({ playerName, text, createdAt }) => {
    console.log('ldjgkdfh.')
    const chatMessages = document.querySelector('.chat__messages');
    const messageTemplate = document.querySelector('#message-template').innerHTML;
    const template = Handlebars.compile(messageTemplate);
  
    const html = template({
      playerName,   
      text,
      createdAt: moment(createdAt).format('h:mm a'),
    });
    chatMessages.insertAdjacentHTML('afterBegin', html);
  });
  socket.on("room", ({ room, players }) => {
   
    // target the container where we'll attach the info to
    const gameInfo = document.querySelector(".game-info");
  
    // target the Handlebars template we'll use to format the game info
    const sidebarTemplate = document.querySelector(
      "#game-info-template"
    ).innerHTML;
  
    // Compile the template into HTML by calling Handlebars.compile(), which returns a function
    const template = Handlebars.compile(sidebarTemplate);
  
    const html = template({
      room,
      players,
    });
  
    // set gameInfo container's html content to the new html
    gameInfo.innerHTML = html;
  });

  socket.on('room', ({ room, players }) => {
    const gameInfo = document.querySelector('.game-info');
    const sidebarTemplate = document.querySelector('#game-info-template')
      .innerHTML;
  
    const template = Handlebars.compile(sidebarTemplate);
  
    const html = template({
      room,
      players,
    });
  
    gameInfo.innerHTML = html;
  });
  
  /*
    CHAT SECTION
  */
  const chatForm = document.querySelector('.chat__form');
  
  chatForm.addEventListener('submit', event => {
    event.preventDefault();
  
    const chatFormInput = chatForm.querySelector('.chat__message');
    const chatFormButton = chatForm.querySelector('.chat__submit-btn');
  
    chatFormButton.setAttribute('disabled', 'disabled');
  
    const message = event.target.elements.message.value;
  
    socket.emit('sendMessage', message, error => {
      chatFormButton.removeAttribute('disabled');
      chatFormInput.value = '';
      chatFormInput.focus();
  
      if (error) return alert(error);
    });
  });
  