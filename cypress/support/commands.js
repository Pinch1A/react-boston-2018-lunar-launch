/// <reference types="cypress" />
const host = 'http://localhost:3001';

Cypress.Commands.add('store', method => {
  cy.request('POST', `${host}/store/${method}`);
});

Cypress.Commands.add('mock', mocks => {
  const serializedMocks = Object.keys(mocks).reduce(
    (packet, key) => Object.assign(packet, {[key]: mocks[key].toString()}),
    {}
  );

  cy.request('POST', `${host}/store/mock`, serializedMocks);
});

Cypress.Commands.add('blob', alias => {
  return cy.wait(alias, {log: false})
    .then(r => Cypress._.get(r, 'response.body'))
    .then(Cypress.Blob.blobToBase64String)
    .then(x => atob(x))
    .then(JSON.parse)
    .then((x) => {
      Cypress.log({
        name: 'wait blob',
        displayName: `Wait ${alias}`,
        consoleProps: () => {
          return x
        }
      })
      return x
    })
})
