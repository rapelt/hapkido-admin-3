/// <reference types="cypress" />


// seed users

describe('Authentication', function() {
  it('Sign In', function() {
    cy.visit('/home');
    cy.contains('Sign in').click();
    cy.url().should('include', '/sign-in');
    cy.get('input[name=username]').type('testAdmin');
    cy.get('input[name=password]').type('test01');
    cy.get('.cy-sign-in-btn').click();
    cy.url().should('include', '/home');
  });

  it('Auto Sign in', function() {
    cy.visit('/home');
    cy.contains('Sign in').click();
    cy.url().should('include', '/sign-in');
    cy.get('input[name=username]').type('testAdmin');
    cy.get('input[name=password]').type('test01');
    cy.get('.cy-sign-in-btn').click();
    cy.url().should('include', '/home');
    cy.reload();
    cy.url().should('include', '/home');
  });

});
