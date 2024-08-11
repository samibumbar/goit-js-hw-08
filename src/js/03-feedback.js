import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const LOCAL_STORAGE_KEY = 'feedback-form-state';

// Initializează starea formularului cu valorile din local storage
const savedFormData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
form.email.value = savedFormData.email || '';
form.message.value = savedFormData.message || '';

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
