const handleSubmit = (event) => {
  event.preventDefault();
  fetch('/msg', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({
      text: document.getElementById('userinput').value,
    }),
  }).then((response) => {
    return response.json();
  }).then((json) => {
    document.getElementById('userinput').value = '';
    return false;
  });
};

const userform = document.getElementById('userform');
userform.addEventListener('submit', e => handleSubmit(e), false);
