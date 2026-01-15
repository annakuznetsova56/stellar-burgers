// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

Cypress.on('uncaught:exception', (err, runnable) => {
  // Игнорируем эту конкретную ошибку
  if (err.message.includes("Cannot read properties of null (reading 'document')")) {
    console.log('Игнорируем ошибку document:', err.message);
    return false; // не проваливать тест
  }
  return true;
});