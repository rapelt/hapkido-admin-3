var moment = require('moment');


/// <reference types="cypress" />

describe('Add Students', function() {

    beforeEach(function () {
        cy.server();
        cy.fixture('families.json').as('familiesJSON');
        cy.fixture('students.json').as('studentsJSON');


        cy.route({
            method: 'GET',      // Route all GET requests
            url: '/family/all',    // that have a URL that matches '/users/*'
            response: '@familiesJSON'
        });

        cy.route({
            method: 'GET',      // Route all GET requests
            url: '/student/all',    // that have a URL that matches '/users/*'
            response: '@studentsJSON'

        });
    });

    it('should allow a user to navigate to add students', function() {
        window.localStorage.setItem('login', true);
        cy.visit('/student');
        cy.url().should('include', '/student/list');
        cy.get('.cy-add-student-btn').click();
        cy.url().should('include', '/student/add');
    });

    it('should allow a user to add a new student', function() {
        const student = {"preferredClass":"Adults","isKumdoStudent":false,"isActive":true,"isAdmin":false,"grade":3,"pinNumber":null,"email":"hb018@r.com","hbId":"hb018","gradingDates":[{"date":"2019-04-07T14:00:00.000Z","grade":3}],"name":{"lastname":"lastname","firstname":"firstname"}};

        cy.route({
            method: 'POST',
            url: '/student/create',
            response: student,
            status: 200,
        }).as('createStudent');

        const firstname = 'firstname';
        const lastname = 'lastname';
        const email = 'r@r.com';
        const hbid = 'hb001';

        window.localStorage.setItem('login', true);
        cy.visit('/student/add');
        cy.url().should('include', '/student/add');
        cy.get('input[name=hbid]').type(hbid);
        cy.get('input[name=firstname]').type(firstname);
        cy.get('input[name=lastname]').type(lastname);
        cy.get('input[name=email]').type(email);

        cy.get('.cy-joining-date').click();
        cy.get(':nth-child(2) > .picker-button').click();

        cy.get('.cy-grade').click();
        cy.get('#alert-input-2-3 > .alert-button-inner > .alert-radio-label').click();
        cy.get('.alert-button-group > :nth-child(2) > .alert-button-inner').click();

        cy.get('.cy-class-type').click();
        cy.get('#alert-input-3-0 > .alert-button-inner > .alert-radio-label').click();
        cy.get('.alert-button-group > :nth-child(2)').click();

        cy.get('.cy-family').click();
        cy.get('#alert-input-4-2 > .alert-button-inner > .alert-radio-label').click();
        cy.get('.alert-button-group > :nth-child(2)').click();

        cy.get('.cy-payment-type').click();
        cy.get('#alert-input-5-0 > .alert-button-inner > .alert-radio-label').click();
        cy.get('.alert-button-group > :nth-child(2)').click();

        cy.get('.cy-add-student-submit').click();

        cy.wait('@createStudent').then((xhr) => {
            const now = moment();
            const date = moment(xhr.request.body.gradingDates[0].date);

            assert.equal(xhr.request.body.name.firstname, 'Firstname', 'firstname strings are not equal');
            assert.equal(xhr.request.body.name.lastname, 'Lastname', 'lastname strings are not equal');
            assert.equal(xhr.request.body.email, email, 'email strings are not equal');
            assert.equal(xhr.request.body.hbId, hbid, 'hbid strings are not equal');

            assert(now.isSame(date, 'day'), 'joining dates are not equal');
            assert.equal(xhr.request.body.gradingDates[0].grade, 3, 'joining grade is not right');

            cy.url().should('include', '/student/list/active');

        });
    });

    it('should not allow a user to add a new student when validation errors', function() {
        window.localStorage.setItem('login', true);
        cy.visit('/student/add');
        cy.url().should('include', '/student/add');
        cy.get('input[name=hbid]').type(' ');
        cy.get('input[name=firstname]').type(' ');
        cy.get('input[name=lastname]').type(' ');
        cy.get('input[name=email]').type(' ');

        cy.get('.cy-add-student-submit').click();

        cy.get('.cy-error').then((el) => {

            expect(el).to.be.visible;
            expect(el['0'].shadowRoot.innerHTML).to.contain('Looks like you have tried to submit an invalid form. Update the form and try again.');
        });


    });
});
