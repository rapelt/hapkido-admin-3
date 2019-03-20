/// <reference types="cypress" />


describe('Students', function() {
    it('should allow a user to navigate to students list', function() {
        window.localStorage.setItem('login', true);
        cy.visit('/students');
        cy.url().should('include', '/students/list');
    });
});
