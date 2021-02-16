var moment = require('moment');


/// <reference types="cypress" />

describe('Add Classes', function() {

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

  it('should allow a user to navigate to add class', function() {
    window.localStorage.setItem('login', true);
    cy.visit('/class');
    cy.url().should('include', '/class/list');

    cy.get('.cy-add-class-btn > .md').click();
    cy.url().should('include', '/class/add');
  });

  it('should allow a user to add one new class on 2 days', function() {
    window.localStorage.setItem('login', true);
    cy.visit('/class/add');
    cy.url().should('include', '/class/add');

    // GO to year view
    cy.get('.ion-calendar-header-title').should('be.visible').trigger('mouseover');
    cy.wait(200);

    cy.get('.ion-calendar-header-title').click();
    cy.wait(200);
    cy.get('.ion-calendar-header-title').contains('2021');

    cy.wait(200);

    // Go to month view
    cy.get('.cy-day-Feb').should('be.visible').trigger('mouseover');
    cy.wait(200);
    cy.get('.cy-day-Feb').click();
    cy.get('.ion-calendar-header-title').contains('Feb 2021');

    // Select date of month
    cy.get('.cy-day-19').contains('19').should('be.visible').trigger('mouseover');
    cy.wait(200);
    cy.get('.cy-day-19').click();

    // Select date of month
    cy.get('.cy-day-11').contains('11').should('be.visible').trigger('mouseover');
    cy.wait(200);
    cy.get('.cy-day-11').click();

    cy.get('.cy-add-class-submit').click();
    cy.url().should('include', '/class/list');

    cy.wait('@addClassCheck').then((xhr) => {
      assert.equal(xhr.requestBody.classes.length, 2);
    });
    // Delete Classes that I create

  });

  it('should allow a user to add a new family class', function() {
    window.localStorage.setItem('login', true);
    cy.visit('/class/add');
    cy.url().should('include', '/class/add');

    // GO to year view
    cy.get('.ion-calendar-header-title').should('be.visible').trigger('mouseover');
    cy.wait(200);
    cy.get('.ion-calendar-header-title').click();
    cy.wait(200);
    cy.get('.ion-calendar-header-title').contains('2021');

    cy.wait(200);

    // Go to month view
    cy.get('.cy-day-Feb').should('be.visible').trigger('mouseover');
    cy.wait(200);
    cy.get('.cy-day-Feb').click();
    cy.get('.ion-calendar-header-title').contains('Feb 2021');

    // Select date of month
    cy.get('.cy-day-12').contains('12').should('be.visible').trigger('mouseover');
    cy.wait(200);
    cy.get('.cy-day-12').click();

    cy.get('.cy-class-type').should('be.visible').trigger('mouseover');
    cy.wait(200);
    cy.get('.cy-class-type').click();
    cy.wait(200);

    cy.get('#alert-input-1-1 > .alert-button-inner > .alert-radio-label').click();
    cy.get('.alert-button-group > :nth-child(2)').click();

    cy.get('.item-datetime').click();
    cy.get('.picker-opts-right > .picker-opts > [opt-index="3"]').click();
    cy.get(':nth-child(2) > .picker-button').click();
    cy.wait(200);

    cy.get('ion-toggle').click();

    cy.get('.cy-add-class-submit').click();
    cy.wait(200);
    cy.url().should('include', '/class/list');


    cy.wait('@addClassCheck').then((xhr) => {
      assert.equal(xhr.requestBody.classes.length, 1);

      const classes = xhr.requestBody.classes;
      assert.equal(classes[0].classType, 'Family');
      assert.equal(classes[0].attendance.length, 0);
      assert.equal(classes[0].isGrading, true);
    });
  });
});
