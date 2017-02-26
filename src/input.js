const handleSubmit = (event) => {
  event.preventDefault();
  const val = document.getElementById('userinput').value;
  if (val !== '') {
    fetch('/msg', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        text: val,
      }),
    }).then((response) => {
      return response.json();
    }).then((json) => {
      document.getElementById('userinput').value = '';
      return false;
    });
  }
};

const userform = document.getElementById('userform');
userform.addEventListener('submit', e => handleSubmit(e), false);
