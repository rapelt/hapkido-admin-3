/// <reference types="cypress" />
describe('View Class List', function() {

  beforeEach(function () {
    cy.server();
    cy.fixture('classes.json').as('classesJSON');
    cy.fixture('families.json').as('familiesJSON');
    cy.fixture('students.json').as('studentsJSON');

    cy.route({
      method: 'GET',      // Route all GET requests
      response: '@classesJSON',
      url: '/class/all',    // that have a URL that matches '/users/*'
    });

    cy.route({
      method: 'POST',      // Route all GET requests
      url: '/class/create',    // that have a URL that matches '/users/*'
    }).as('addClassCheck');

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
  });

  it('should navigate to class details from the class list page', function() {
    window.localStorage.setItem('login', true);
    cy.visit('/class');
    cy.url().should('include', '/class/list');
    cy.get('.ion-calendar-header-title').click();
    cy.contains('2020');
    cy.get('.ion-calendar-header-title').contains('2020');
    cy.get('.calendar > :nth-child(2) > :nth-child(2)').click();
    cy.get('.ion-calendar-header-title').contains('Feb 2020');
    cy.get(':nth-child(6) > :nth-child(4)').contains('19');
    cy.get(':nth-child(6) > :nth-child(4)').click();
    cy.get('.cy-class-list-date').contains('Classes on 19/Feb/2020');

    cy.get('.cy-class-list-item').then((list) => {
      expect(list.length).to.equal(2);
      expect(list[0].textContent).to.contain('Adults');
      expect(list[0].textContent).to.contain('3');

      expect(list[1].textContent).to.contain('Family');
      expect(list[1].textContent).to.contain('5');
    });

    cy.get('.list-md > :nth-child(1) > .sc-ion-label-md-h').click();
    cy.url().should('include', '/class/view/2');

    // cy.get().click();
  });

  it('should see general class details', function() {
    window.localStorage.setItem('login', true);
    cy.visit('/class/view/2');
    cy.url().should('include', '/class/view/2');
    cy.get('.cy-class-type').contains('Adults');
    cy.get('.cy-date').contains('19 Feb 2020');
    cy.get('.cy-time').contains('6:51 PM');
    cy.get('.cy-grading').contains('True');
    cy.get('.cy-attendance').contains('3');
  });

  it('should be able to set class as a grading', function() {
    cy.route({
      method: 'POST',
      response: {},
      status: 200,
      url: '/class/makeclassagrading/*',
    }).as('makeclassagrading');

    window.localStorage.setItem('login', true);
    cy.visit('/class/view/7');
    cy.url().should('include', '/class/view/7');
    cy.get('.cy-grading').contains('False');
    cy.get('.cy-make-class-a-grading-btn').click();

    cy.wait('@makeclassagrading').then((xhr) => {
      cy.get('.cy-grading').contains('True');
    });

  });
});
