/// <reference types="cypress" />
describe('Grading', function() {

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

  it('should be able to navigate to grading', function() {
    window.localStorage.setItem('login', true);
    cy.visit('/class/view/2');
    cy.url().should('include', '/class/view/2');
    cy.get('.cy-class-details-grading').click();
    cy.wait(500);
    cy.get('.cy-add-attendance-btn').click();
    cy.url().should('include', '/gradings/2');

  });

  it('should be able to add a single grading', function() {
    var student = {
      "email": "test@user.com",
      "grade": 7,
      "gradingDates": [
        {
          "date": "2010-02-18T05:20:02.000Z",
          "grade": 7
        },
        {
          "date": "2020-02-19T08:51:28.000Z",
          "grade": 8
        }
      ],
      "hbId": "hb003",
        "isActive": true,
        "isAdmin": true,
      "isKumdoStudent": false,
      "name": {
        "firstname": "firstname2",
        "lastname": "lastname2",
      },
      "pinNumber": null,
      "preferredClass": "Family",
      };

    cy.route({
      method: 'POST',
      response: student,
      status: 200,
      url: '/student/addgrading/hb003',
    }).as('addgrading');

    window.localStorage.setItem('login', true);
    cy.visit('/gradings/2');
    cy.url().should('include', '/gradings/2');

    cy.get('.ut-short-name').should('have.length', 5);

    cy.get('.cy-graded-student-hb003 > .item-options-md > .cy-single').click({force: true});

    cy.get('.ut-short-name').should('have.length', 6);

    cy.get('.cy-graded-student-hb003').contains('R1');
    cy.get('.cy-graded-student-hb003').contains('R2');

  });

  it('should be able to add a double grading', function() {
    var student = {
      "email": "test@user.com",
      "grade": 7,
      "gradingDates": [
        {
          "date": "2010-02-18T05:20:02.000Z",
          "grade": 7
        },
        {
          "date": "2020-02-19T08:51:28.000Z",
          "grade": 8
        },
        {
          "date": "2020-02-19T08:51:28.000Z",
          "grade": 9
        }
      ],
      "hbId": "hb003",
      "isActive": true,
      "isAdmin": true,
      "isKumdoStudent": false,
      "name": {
        "firstname": "firstname2",
        "lastname": "lastname2",
      },
      "pinNumber": null,
      "preferredClass": "Family",
    };

    cy.route({
      method: 'POST',
      response: student,
      status: 200,
      url: '/student/addgrading/hb003',
    }).as('addgrading');

    window.localStorage.setItem('login', true);
    cy.visit('/gradings/2');
    cy.url().should('include', '/gradings/2');

    cy.get('.ut-short-name').should('have.length', 5);

    cy.get('.cy-graded-student-hb003 > .item-options-md > .cy-double').click({force: true});

    cy.get('.ut-short-name').should('have.length', 6);

    cy.get('.cy-graded-student-hb003').contains('R1');
    cy.get('.cy-graded-student-hb003').contains('R3');

  });

  it('should be able to remove a grading', function() {
    var student = {
      "email": "test@user.com",
      "grade": 7,
      "gradingDates": [
        {
          "date": "2010-02-18T05:20:02.000Z",
          "grade": 7
        },
        {
          "date": "2020-02-19T08:51:28.000Z",
          "grade": 8
        }
      ],
      "hbId": "hb003",
      "isActive": true,
      "isAdmin": true,
      "isKumdoStudent": false,
      "name": {
        "firstname": "firstname2",
        "lastname": "lastname2",
      },
      "pinNumber": null,
      "preferredClass": "Family",
    };

    var studentRemove = {
      "email": "test@user.com",
      "grade": 7,
      "gradingDates": [
        {
          "date": "2010-02-18T05:20:02.000Z",
          "grade": 7
        }
      ],
      "hbId": "hb003",
      "isActive": true,
      "isAdmin": true,
      "isKumdoStudent": false,
      "name": {
        "firstname": "firstname2",
        "lastname": "lastname2",
      },
      "pinNumber": null,
      "preferredClass": "Family",
    };
    cy.route({
      method: 'POST',
      response: student,
      status: 200,
      url: '/student/addgrading/hb003',
    }).as('addgrading');

    cy.route({
      method: 'POST',
      response: studentRemove,
      status: 200,
      url: '/student/removeGrading/hb003',
    }).as('removeGrading');

    window.localStorage.setItem('login', true);
    cy.visit('/gradings/2');
    cy.url().should('include', '/gradings/2');

    cy.get('.ut-short-name').should('have.length', 5);

    cy.get('.cy-graded-student-hb003 > .item-options-md > .cy-single').click({force: true});

    cy.get('.ut-short-name').should('have.length', 6);

    cy.get('.cy-graded-student-hb003').contains('R1');
    cy.get('.cy-graded-student-hb003').contains('R2');

    cy.get('.cy-graded-student-hb003 > .item-options-md > .cy-none').click({force: true});

    cy.get('.ut-short-name').should('have.length', 5);

    cy.get('.cy-graded-student-hb003').contains('R1');
  });
});
