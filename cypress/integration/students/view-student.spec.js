/// <reference types="cypress" />


describe('Students List', function() {
  beforeEach(() => {
    cy.server();
    cy.fixture('families.json').as('familiesJSON');
    cy.fixture('students.json').as('studentsJSON');
    cy.fixture('classes.json').as('classesJSON');

    cy.route({
      method: 'GET',      // Route all GET requests
      response: '@classesJSON',
      url: '/class/all',    // that have a URL that matches '/users/*'
    });

    cy.route({
      method: 'GET',      // Route all GET requests
      response: '@familiesJSON',
      url: '/family/all',    // that have a URL that matches '/users/*'
    });

    cy.route({
      method: 'GET',      // Route all GET requests
      response: '@studentsJSON',
      url: '/student/all',    // that have a URL that matches '/users/*'
    });
  }) ;

  it('should allow a user to navigate to view students page', function() {
        window.localStorage.setItem('login', true);
        cy.visit('/student');
        cy.url().should('include', '/student/list');

        cy.get(':nth-child(3) > ion-item-sliding.md > .cy-student-list-item').should('be.visible').click();
        cy.url().should('include', '/student/view/hb003');
  });

  it('should allow see a students name, preferred class and active status', function() {
    window.localStorage.setItem('login', true);
    cy.visit('/student/view/hb003');
    cy.url().should('include', '/student/view/hb003');

    cy.get('h1').contains('Firstname2 Lastname2');
    cy.get('.ut-short-name').contains('Red 1');
    cy.get('.ut-email').contains('test@user.com');
    cy.get('.ut-preferred-class').contains('Family');
    cy.get('.ut-is-active').contains('Active');
  });

  it('should allow see grading dates and class dates', function() {
    window.localStorage.setItem('login', true);
    cy.visit('/student/view/hb001');
    cy.url().should('include', '/student/view/hb001');
    cy.get(':nth-child(4) > .sc-ion-label-md-h > .ut-is-active').contains('19 Feb 2020');
    cy.get('[value="dates"]').click();

    cy.get('.profile-dates > :nth-child(1) > .item-label').contains('White');
    cy.get('.profile-dates > :nth-child(1) > .item-label').contains('01 Aug 2004');
    cy.get('.profile-dates > :nth-child(2) > :nth-child(2)').contains('19 Feb 2020');
    cy.get('.profile-dates > :nth-child(2) > :nth-child(2)').contains('Family');

  });



});
