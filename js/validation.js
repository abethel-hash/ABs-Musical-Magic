document.addEventListener('DOMContentLoaded', () => {
const form = document.getElementById('contact-form');
const inputs = form.querySelectorAll('input, textarea');

function setError(el, message) {
el.classList.add('is-invalid');
let feedback = el.nextElementSibling;
if (!feedback || !feedback.classList.contains('invalid-feedback')) {
feedback = document.createElement('div');
feedback.className = 'invalid-feedback';
el.after(feedback);
}
feedback.textContent = message;
}

function clearError(el) {
el.classList.remove('is-invalid');
const feedback = el.nextElementSibling;
if (feedback && feedback.classList.contains('invalid-feedback')) {
feedback.textContent = '';
}
}

function validateEmail(email) {
return /^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email);
}

form.addEventListener('submit', (e) => {
e.preventDefault();
let valid = true;

```
inputs.forEach(input => {
  clearError(input);
  if (input.hasAttribute('required') && !input.value.trim()) {
    setError(input, 'This field is required');
    valid = false;
  } else if (input.type === 'email' && !validateEmail(input.value)) {
    setError(input, 'Please enter a valid email');
    valid = false;
  }
});

if (valid) {
  form.submit();
}
```

});

inputs.forEach(input => {
input.addEventListener('input', () => {
clearError(input);
});
});
});
