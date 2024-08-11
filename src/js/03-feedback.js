import throttle from 'lodash.throttle';

// Selectează formularul și definește cheia pentru Local Storage
const form = document.querySelector('.feedback-form');
const LOCAL_STORAGE_KEY = 'feedback-form-state';

// Initializează starea formularului cu valorile din local storage
const savedFormData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
form.email.value = savedFormData.email || '';
form.message.value = savedFormData.message || '';

// Funcție pentru a salva datele formularului în Local Storage
const saveFormData = throttle(() => {
  const formData = {
    email: form.email.value,
    message: form.message.value,
  };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
}, 500);

form.addEventListener('input', saveFormData);

form.addEventListener('submit', event => {
  event.preventDefault();
  console.log({
    email: form.email.value,
    message: form.message.value,
  });
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  form.reset();
});

// Funcție pentru a centra formularul pe pagină
function centerForm() {
  form.style.position = 'absolute';
  form.style.top = '50%';
  form.style.left = '50%';
  form.style.transform = 'translate(-50%, -50%)';

  form.style.width = '300px';
  form.style.padding = '20px';
  form.style.border = '1px solid #ccc';
  form.style.backgroundColor = '#fff';
}

window.addEventListener('load', centerForm);
