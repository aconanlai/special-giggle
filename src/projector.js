// use state object to store application state
const state = {
  msgs: [],
};

// promise returns all msgs
const fetchMsgs = () => {
  return (
    fetch('/msgs').then((response) => {
      return response.json();
    }).then((json) => {
      return json;
    })
  );
};

// create DOM element - div with text
const makeElem = (msg) => {
  const elem = document.createElement('div');
  elem.className += 'msg';
  const text = document.createTextNode(msg);
  elem.appendChild(text);
  const target = document.getElementById('msgs');
  const first = target.firstChild;
  target.insertBefore(elem, first);
  elem.className += ' fade';
};

const placeElems = () => {
  const shuffled = state.msgs.sort(() => 0.5 - Math.random());
  const selected = shuffled[0];

  const msgs = document.querySelectorAll('.msg');
  for (let i = 0; i < msgs.length; i += 1) {
    msgs[i].className += ' fadeaway';
  }
  setTimeout(() => {
    const target = document.getElementById('msgs');
    target.innerHTML = '';
    makeElem(selected);
  }, 1000);
};

// fetch messages, extract text from response
// update state if there are new msgs
const processNewMsgs = () => {
  return (
    fetchMsgs().then((res) => {
      const msgs = res.map(msg => msg.message);
      if (state.msgs.length !== msgs.length) {
        state.msgs = msgs;
        placeElems();
      }
    })
  );
};

// call first time to populate initial page paint
processNewMsgs();

// then repeat every x seconds
setInterval(() => {
  processNewMsgs();
}, 5000);
