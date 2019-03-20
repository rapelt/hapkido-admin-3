/// <reference types="cypress" />


describe('Settings', function() {
    it('should see settings', function() {
        window.localStorage.setItem('login', true);
        cy.visit('/settings');
        cy.url().should('include', '/settings');
        cy.contains('Username');
        cy.contains('rebekah');
        cy.contains('Email');
        cy.contains('rebekahapelt@gmail.com');
    });

    it('should ask to verify email', function() {
        window.localStorage.setItem('login', true);
        cy.visit('/settings');
        cy.url().should('include', '/settings');
        cy.contains('To make sure you can reset your password if you forget it we need to make sure your email is verified.');
        cy.get('.cy-send-email-verify-code').click();
        cy.get('input[name=verify-email-code]').type('123456');
        cy.get('.cy-verify-email').click();
        cy.get('cy-email-is-not-verified').should('not.exist');
    });

});
