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
    cy.wait(500);
    cy.get('.cy-student-list').then((student) => {
      expect(student[0].textContent).to.contain('Firstname0 Lastname0');
      expect(student[1].textContent).to.contain('Firstname1 Lastname1');
      expect(student[2].textContent).to.contain('Firstname2 Lastname2');
    });
  });

  it('should be able to see no student left when all attended', function() {
    window.localStorage.setItem('login', true);
    cy.visit('/attendance/2');
    cy.url().should('include', '/attendance/2');
    cy.wait(500);
    cy.get('.cy-not-attended-btn').click();
    cy.wait(200);


    cy.get('.cy-student-list').then((student) => {
      expect(student[0].textContent).to.contain('Firstname3 Lastname3');
      expect(student[1].textContent).to.contain('Firstname4 Lastname4');
      expect(student[2].textContent).to.contain('Firstname5 Lastname5');
    });

    // No students have attended
  });

  it('be able to add a student to a class', function() {
    cy.route({
      method: 'POST',
      response: {"message": "Student has been added to class","studentId":"Hb002"},
      status: 200,
      url: '/class/addtoclass/*',
    }).as('addtoclass');

    window.localStorage.setItem('login', true);
    cy.visit('/attendance/2');
    cy.url().should('include', '/attendance/2');
    cy.wait(500);
    cy.get('.cy-not-attended-btn').click();
    cy.wait(200);

    cy.get('.student-hb006').trigger('mouseover');
    cy.wait(200);

    cy.get('.student-hb006').click();
    cy.wait(200);

    // TODO figure out how to do this


    // cy.get('.cy-student-list').then((student) => {
    //   cy.wait(200);
    //
    //   expect(student[0].textContent).to.contain('Firstname4 Lastname4');
    //   expect(student[1].textContent).to.contain('Firstname5 Lastname5');
    //
    //   cy.wait(200);
    //   cy.get('.cy-attended-btn').click();
    //   cy.wait(200);
    //
    //   cy.get('.cy-student-list').then((student) => {
    //     console.log(student);
    //     expect(student[0].textContent).to.contain('Firstname0 Lastname0');
    //     expect(student[1].textContent).to.contain('Firstname1 Lastname1');
    //     expect(student[2].textContent).to.contain('Firstname2 Lastname2');
    //     expect(student[3].textContent).to.contain('Firstname3 Lastname3');
    //   });
    //
    // });
  });

  it('be able to remove a student from a class', function() {
    cy.route({
      method: 'POST',
      response: {"message": "Student has been added to class","studentId":"Hb002"},
      status: 200,
      url: '/class/removestudentfromclass/*',
    }).as('removestudentfromclass');

    window.localStorage.setItem('login', true);
    cy.visit('/attendance/2');
    cy.url().should('include', '/attendance/2');
    cy.wait(500);

    cy.get('.student-hb001').trigger('mouseover');
    cy.wait(200);

    cy.get('.student-hb001').click();
    cy.wait(200);
    // TODO figure out how to do this

    // No students have attended
  });

  it('be see an empty attendance list', function() {
    window.localStorage.setItem('login', true);
    cy.visit('/attendance/4');
    cy.url().should('include', '/attendance/4');
    cy.wait(500);

    cy.get('.no-students').should('be.visible');
  });

  it('be see an empty non-attendance list', function() {
    window.localStorage.setItem('login', true);
    cy.visit('/attendance/7');
    cy.url().should('include', '/attendance/7');
    cy.wait(500);
    cy.get('.cy-not-attended-btn').click();
    cy.wait(200);
    cy.get('.no-students').should('be.visible');
  });
});
