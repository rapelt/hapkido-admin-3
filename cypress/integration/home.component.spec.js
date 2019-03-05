/// <reference types="cypress" />
describe('My Home Test', function () {
    it('Vist home', function () {
        cy.visit('/');
        cy.contains('List').click();
        cy.url().should('include', '/list');
    });
});
