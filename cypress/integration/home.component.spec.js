/// <reference types="cypress" />
describe('My Home Test', function () {
    it('Visit home', function () {
        cy.visit('/');
        cy.contains('sign-in').click();
        cy.url().should('include', '/sign-in');
    });
});
