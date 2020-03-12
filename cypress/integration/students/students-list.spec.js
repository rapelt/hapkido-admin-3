/// <reference types="cypress" />


describe('Students List', function() {
    it('should allow a user to navigate to students list', function() {
        window.localStorage.setItem('login', true);
        cy.visit('/student');
        cy.url().should('include', '/student/list');
    });

    it('should show a list of active students', function() {
        cy.server();
        cy.fixture('students.json').as('studentsJSON');

        cy.route({
            method: 'GET',      // Route all GET requests
            response: '@studentsJSON',
            url: '/student/all',    // that have a URL that matches '/users/*'
        });

        window.localStorage.setItem('login', true);
        cy.visit('/student');
        cy.wait(100);
        cy.get('.cy-student-list-item').then((list) => {
            expect(list.length).to.equal(5);
            expect(list[0].textContent).to.contain('Firstname0 Lastname0');
            expect(list[0].textContent).to.contain('Wh');

            expect(list[1].textContent).to.contain('Firstname1 Lastname1');
            expect(list[1].textContent).to.contain('Y2');

            expect(list[2].textContent).to.contain('Firstname2 Lastname2');
            expect(list[2].textContent).to.contain('R1');

            expect(list[3].textContent).to.contain('Firstname3 Lastname3');
            expect(list[3].textContent).to.contain('1D');

            expect(list[4].textContent).to.contain('Firstname5 Lastname5');
            expect(list[4].textContent).to.contain('5D');

        });
    });

    it('should show a list of inactive students', function() {
        cy.server();
        cy.fixture('students.json').as('studentsJSON');

        cy.route({
            method: 'GET',      // Route all GET requests
            response: '@studentsJSON',
            url: '/student/all',    // that have a URL that matches '/users/*'
        });

        window.localStorage.setItem('login', true);
        cy.visit('/student/list/inactive');
        cy.wait(100);

        cy.get('.cy-student-list-item').then((list) => {
            expect(list.length).to.equal(1);
            expect(list[0].textContent).to.contain('Firstname4 Lastname4');
            expect(list[0].textContent).to.contain('R3');

        });
    });

    it('should be able to search for a student', function() {
        cy.server();
        cy.fixture('students.json').as('studentsJSON');

        cy.route({
            method: 'GET',      // Route all GET requests
            response: '@studentsJSON',
            url: '/student/all',    // that have a URL that matches '/users/*'
        });

        window.localStorage.setItem('login', true);
        cy.visit('/student/list/active');
        cy.wait(100);


        cy.get('.searchbar-input').type('lastname3');

        cy.wait(500);

        cy.get('.cy-student-list-item').then((list) => {
            expect(list.length).to.equal(1);
            expect(list[0].textContent).to.contain('Firstname3 Lastname3');
            expect(list[0].textContent).to.contain('1D');
        });
    });
});
