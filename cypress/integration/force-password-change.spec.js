/// <reference types="cypress" />


describe('Force Password Change', function() {
    it('should be triggered first time log in', function() {
        cy.visit('/');
        cy.contains('Sign in').click();
        cy.url().should('include', '/sign-in');
        cy.get('input[name=username]').type('testAdmin');
        cy.get('input[name=password]').type('n');
        cy.get('.cy-sign-in-btn').click();
        cy.url().should('include', '/force-password-change');
    });

    it('should log user in', function() {
        cy.visit('/');
        cy.contains('Sign in').click();
        cy.url().should('include', '/sign-in');
        cy.get('input[name=username]').type('testAdmin');
        cy.get('input[name=password]').type('n');
        cy.get('.cy-sign-in-btn').click();
        cy.url().should('include', '/force-password-change');
        cy.get('input[name=fp-username]').type('testAdmin');
        cy.get('input[name=password1]').type('test01');
        cy.get('input[name=password2]').type('test01');
        cy.get('.cy-force-password-submit').click();
        cy.url().should('include', '/home');
    });

    it('should show error if username does not exist', function() {
    });

    it('should display an error to the user if the passwords don\'t match', function() {
        cy.visit('/');
        cy.contains('Sign in').click();
        cy.url().should('include', '/sign-in');
        cy.get('input[name=username]').type('testAdmin');
        cy.get('input[name=password]').type('n');
        cy.get('.cy-sign-in-btn').click();
        cy.url().should('include', '/force-password-change');
        cy.get('input[name=fp-username]').type('testAdmin');
        cy.get('input[name=password1]').type('test01');
        cy.get('input[name=password2]').type('test02');
        cy.get('.cy-force-password-submit').click();
        cy.wait(100);
        cy.get('.cy-error').then((el) => {
            expect(el).to.be.visible;
        });
        cy.get('input[name=password2]').clear();

        cy.get('input[name=password2]').type('test01');
        cy.get('.cy-force-password-submit').click();
        cy.url().should('include', '/home');
    });
});
