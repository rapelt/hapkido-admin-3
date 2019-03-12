/// <reference types="cypress" />


describe('Sign In', function() {
  it('should allow a user to sign in', function() {
    cy.visit('/');
    cy.contains('Sign in').click();
    cy.url().should('include', '/sign-in');
    cy.get('input[name=username]').type('testAdmin');
    cy.get('input[name=password]').type('test01');
    cy.get('.cy-sign-in-btn').click();
    cy.url().should('include', '/home');
  });

  it('should auto sign in on refresh', function() {
    cy.visit('/');
    cy.contains('Sign in').click();
    cy.url().should('include', '/sign-in');
    cy.get('input[name=username]').type('testAdmin');
    cy.get('input[name=password]').type('test01');
    cy.get('.cy-sign-in-btn').click();
    cy.url().should('include', '/home');
    cy.visit('/');
    cy.url().should('include', '/home');
  });

  it('should auto sign in within a month', function() {
    window.localStorage.setItem('login', true);
    cy.visit('/');
    cy.url().should('include', '/home');
  });


});
