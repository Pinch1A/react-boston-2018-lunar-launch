import './commands';

// Cypress does not stub "fetch" yet, only XHR
// here we delete window.fetch on every page load
// GraphQL client is thus forced to polyfill with XHR
Cypress.on('window:before:load', win => {
  delete win.fetch
})

beforeEach(() => cy.store('reset'));
