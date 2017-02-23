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

// fetch messages, extract text from response
// update state if there are new msgs
const processNewMsgs = () => {
  return (
    fetchMsgs().then((res) => {
      const msgs = res.map(msg => msg.message);
      if (state.msgs.length !== msgs.length) {
        state.msgs = msgs;
        console.log('it changed');
      }
    })
  );
};

// call first time to populate initial page paint
processNewMsgs();

// then repeat every x seconds
setInterval(() => {
  processNewMsgs();
}, 1000);
