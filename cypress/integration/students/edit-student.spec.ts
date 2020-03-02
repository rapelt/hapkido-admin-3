/// <reference types="cypress" />

describe('Edit Students', () => {
    beforeEach(() => {
        cy.server();
        cy.fixture('families.json').as('familiesJSON');
        cy.fixture('students.json').as('studentsJSON');
        cy.fixture('classes.json').as('classesJSON');

        cy.route({
            method: 'GET', // Route all GET requests
            response: '@classesJSON',
            url: '/class/all', // that have a URL that matches '/users/*'
        });

        cy.route({
            method: 'GET', // Route all GET requests
            response: '@studentsJSON',
            url: '/student/all', // that have a URL that matches '/users/*'
        });

        cy.route({
            method: 'GET', // Route all GET requests
            response: '@familiesJSON',
            url: '/family/all', // that have a URL that matches '/users/*'
        });
    });

    it('should allow a user to navigate to edit students page', () => {
        window.localStorage.setItem('login', 'true');
        cy.visit('/student/view/hb003');
        cy.url().should('include', '/student/view/hb003');

        cy.get('.cy-edit-student').click();
        cy.wait(200);

        cy.url().should('include', '/student/edit/hb003');
    });

    it('should allow a user to edit details', () => {
        const firstname = 'First edit';
        const lastname = 'Last edit';
        const email = 'redit@r.com';

        const student = {
            preferredClass: 'Adults',
            isKumdoStudent: false,
            isActive: true,
            isAdmin: false,
            grade: 3,
            pinNumber: null,
            email: email,
            hbId: 'hb003',
            gradingDates: [{ date: '2019-04-07T14:00:00.000Z', grade: 3 }],
            name: { lastname: lastname, firstname: firstname },
        };

        cy.route({
            method: 'GET', // Route all GET requests
            response: '@studentsJSON',
            url: '/student/all', // that have a URL that matches '/users/*'
        });

        cy.route({
            method: 'POST',
            response: { ...student },
            status: 200,
            url: '/student/update/*',
        }).as('editStudent');

        window.localStorage.setItem('login', 'true');
        cy.visit('/student/edit/hb003');
        cy.url().should('include', '/student/edit/hb003');
        cy.wait(200);

        cy.get('input[name=firstname]')
            .clear()
            .type(firstname);
        cy.get('input[name=lastname]')
            .clear()
            .type(lastname);
        cy.get('input[name=email]')
            .clear()
            .type(email);

        cy.route({
            method: 'GET', // Route all GET requests
            response: [student],
            url: '/student/all', // that have a URL that matches '/users/*'
        });

        cy.get('.cy-class-type').click();
        cy.wait(200);
        cy.get(
            '#alert-input-1-0 > .alert-button-inner > .alert-radio-label'
        ).click();
        cy.wait(200);
        cy.get('.alert-button-group > :nth-child(1)').click();

        cy.get('.cy-save').click();
        cy.wait(200);

        cy.get('.ut-email').contains(email);
        cy.get('.ut-preferred-class').contains('Adults');
        cy.get('h1').contains(firstname + ' ' + lastname);
    });
});
