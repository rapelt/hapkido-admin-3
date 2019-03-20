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

  it('should allow a user to sign in with extra spaces', function() {
    cy.visit('/');
    cy.contains('Sign in').click();
    cy.url().should('include', '/sign-in');
    cy.get('input[name=username]').type('testAdmin ');
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

  it('should be able to sign out', function() {
    cy.viewport(2000,1000);
    window.localStorage.setItem('login', true);
    cy.visit('/');
    cy.url().should('include', '/home');
    cy.wait(100);
    cy.contains('Welcome to Ionic');
    cy.get('.cy-sign-out').click();
    cy.url().should('include', '/sign-in');
    cy.visit('/home');
    cy.url().should('include', '/sign-in');

  });
});
