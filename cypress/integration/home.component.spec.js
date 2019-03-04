/// <reference types="cypress" />
describe('My First Test', function () {
    it('Does not do much!', function () {
        expect(true).to.equal(true);
    });
});
describe('My Home Test', function () {
    it('Vist home', function () {
        cy.visit('http://localhost:8000');
        cy.contains('List').click();
        cy.pause();
        cy.url().should('include', '/list');
    });
});
