import { describe, it, expect } from 'vitest';
import { schemas } from '../js/form-validation.js';

const validData = {
  name: 'John Doe',
  email: 'john@example.com',
  message: 'Hello world',
};

describe('Form validation schemas', () => {
  it('accepts valid interest-form data', () => {
    const result = schemas['interest-form'].safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('rejects invalid email', () => {
    const data = { ...validData, email: 'invalid' };
    const result = schemas['interest-form'].safeParse(data);
    expect(result.success).toBe(false);
  });

  it('rejects empty required fields', () => {
    const data = { name: '', email: '', message: '' };
    const result = schemas['interest-form'].safeParse(data);
    expect(result.success).toBe(false);
  });
});