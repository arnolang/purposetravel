import { z } from 'zod';

// Schema definitions per form
export const schemas = {
  'interest-form': z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Invalid email'),
    message: z.string().min(5, 'Message is required'),
  }),
  'contact-form': z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Invalid email'),
    message: z.string().min(5, 'Message is required'),
  }),
};

function attachValidation(formId) {
  const form = document.getElementById(formId);
  if (!form) return;

  // Ensure error containers exist
  [...form.elements].forEach((el) => {
    if (!(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement)) return;
    let errorEl = el.nextElementSibling;
    if (!errorEl || !errorEl.classList.contains('error-msg')) {
      errorEl = document.createElement('span');
      errorEl.className = 'error-msg';
      errorEl.setAttribute('aria-live', 'polite');
      el.after(errorEl);
    }
  });

  const schema = schemas[formId];

  function renderErrors(errors) {
    // Reset
    const spans = form.querySelectorAll('.error-msg');
    spans.forEach((s) => (s.textContent = ''));

    errors.forEach(({ path, message }) => {
      const field = form.querySelector(`[name="${path[0]}"]`);
      if (field) {
        const errSpan = field.nextElementSibling;
        if (errSpan) errSpan.textContent = message;
      }
    });
  }

  form.addEventListener('input', () => {
    const data = Object.fromEntries(new FormData(form).entries());
    const result = schema.safeParse(data);
    if (result.success) {
      renderErrors([]);
    } else {
      renderErrors(result.error.issues);
    }
  });

  form.addEventListener('submit', (e) => {
    const data = Object.fromEntries(new FormData(form).entries());
    const result = schema.safeParse(data);
    if (!result.success) {
      e.preventDefault();
      renderErrors(result.error.issues);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  Object.keys(schemas).forEach(attachValidation);
});