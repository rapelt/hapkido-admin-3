/// <reference types="cypress" />
describe('Attendance', function() {

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

  it('be able to navigate to attendance for a class', function() {
    window.localStorage.setItem('login', true);
    cy.visit('/class/view/2');
    cy.url().should('include', '/class/view/2');
    cy.get('.cy-class-type').contains('Adults');
    cy.get('.cy-add-attendance-btn').click();
    cy.wait(200);
    cy.url().should('include', '/attendance/2');
  });

  it('should be able to see student who attended a class', function() {
    window.localStorage.setItem('login', true);
    cy.visit('/attendance/2');
    cy.url().should('include', '/attendance/2');
    cy.wait(1000);

    cy.get('.student-hb001').should('exist');
    cy.get('.student-hb002').should('exist');
    cy.get('.student-hb003').should('exist');
    cy.get('.student-hb004').should('not.exist');
    cy.get('.student-hb005').should('not.exist');
    cy.get('.student-hb006').should('not.exist');
  });

  it('should be able to active non attended students', function() {
    window.localStorage.setItem('login', true);
    cy.visit('/attendance/2');
    cy.url().should('include', '/attendance/2');
    cy.wait(1000);
    cy.get('.cy-not-attended-btn').click();
    cy.wait(1000);

    cy.get('.student-hb001').should('have.class', 'item-disabled');
    cy.get('.student-hb002').should('have.class', 'item-disabled');
    cy.get('.student-hb003').should('have.class', 'item-disabled');
    cy.get('.student-hb004').should('exist');
    cy.get('.student-hb005').should('not.exist'); // Not Active
    cy.get('.student-hb006').should('exist');
  });

  // it('be able to add a student to a class', function() {
  //   cy.route({
  //     method: 'POST',
  //     response: {"message": "Student has been added to class","studentId":"Hb002"},
  //     status: 200,
  //     url: '/class/addtoclass/*',
  //   }).as('addtoclass');
  //
  //   window.localStorage.setItem('login', true);
  //   cy.visit('/attendance/2');
  //   cy.url().should('include', '/attendance/2');
  //   cy.wait(1500);
  //   cy.get('.cy-not-attended-btn').click();
  //   cy.wait(1000);
  //
  //   cy.get('.student-hb006').first().trigger('mouseover');
  //   cy.wait(200);
  //
  //   cy.get('.student-hb006').first().click();
  //   cy.wait(200);
  //
  //   // TODO figure out how to do this
  // });

  // it('be able to remove a student from a class', function() {
  //   cy.route({
  //     method: 'POST',
  //     response: {"message": "Student has been added to class","studentId":"Hb002"},
  //     status: 200,
  //     url: '/class/removestudentfromclass/*',
  //   }).as('removestudentfromclass');
  //
  //   window.localStorage.setItem('login', true);
  //   cy.visit('/attendance/2');
  //   cy.url().should('include', '/attendance/2');
  //   cy.wait(1500);
  //
  //   cy.get('.student-hb001').trigger('mouseover');
  //   cy.wait(200);
  //
  //   cy.get('.student-hb001').click();
  //   cy.wait(200);
  //   // TODO figure out how to do this
  // });

  it('be see an empty attendance list', function() {
    window.localStorage.setItem('login', true);
    cy.visit('/attendance/4');
    cy.url().should('include', '/attendance/4');
    cy.wait(1000);

    cy.get('.no-students').should('be.visible');
  });

  // it('be see an empty non-attendance list', function() {
  //   window.localStorage.setItem('login', true);
  //   cy.visit('/attendance/7');
  //   cy.url().should('include', '/attendance/7');
  //   cy.wait(1000);
  //   cy.get('.cy-not-attended-btn').click();
  //   cy.wait(200);
  //   cy.get('.no-students').should('exist');
  // });
});
