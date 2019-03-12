/// <reference types="cypress" />


describe('Forgot password', function() {
    it('should return user to sign in page', function() {
        cy.visit('/');
        cy.contains('Sign in').click();
        cy.url().should('include', '/sign-in');
        cy.get('.cy-forgot-btn').click();
        cy.get('input[name=fp-username]').type('admin');
        cy.get('.cy-fp-username-submit').click();
        cy.get('input[name=verification-code]').type('123456');
        cy.url().should('include', '/forgot-password');
        cy.get('input[name=verification-code]').type('123456');
        cy.get('input[name=fp-password1]').type('test01');
        cy.get('input[name=fp-password2]').type('test01');
        cy.get('.cy-forgot-password-submit').click();
        cy.url().should('include', '/home');
    });

    it('should show error if new passwords don\'t match', function() {
    });

    it('should show error if verification code is invalid', function() {
    });

    it('should show error if username does not exist', function() {
    });

});
