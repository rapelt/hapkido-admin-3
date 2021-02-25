/// <reference types="cypress" />


describe('View Technique', function() {
  beforeEach(() => {
    cy.server();
    cy.fixture('tags.json').as('tagsJSON');
    cy.fixture('technique.json').as('techniquesJSON');
    cy.fixture('technique-sets.json').as('techniqueSetsJSON');

    cy.route({
      method: 'GET',      // Route all GET requests
      response: '@tagsJSON',
      url: '/tag/all',    // that have a URL that matches '/users/*'
    });

    cy.route({
      method: 'GET',      // Route all GET requests
      response: '@techniquesJSON',
      url: '/technique/all',    // that have a URL that matches '/users/*'
    });

    cy.route({
      method: 'GET',      // Route all GET requests
      response: '@techniqueSetsJSON',
      url: '/technique/set/all',    // that have a URL that matches '/users/*'
    });
  }) ;

  it('should allow a user to navigate to technique list page and view techniques', function() {
    window.localStorage.setItem('login', true);
    cy.visit('/technique/list/1');
    cy.url().should('include', '/technique/list/1');

    cy.get('.cy-technique-item').then((list) => {
      expect(list.length).to.equal(5);
      expect(list[0].textContent).to.contain('Makko Chigi 1');
      expect(list[0].textContent).to.contain('Y1');

      expect(list[1].textContent).to.contain('Makko Chigi 2');
      expect(list[1].textContent).to.contain('Y2');

      expect(list[2].textContent).to.contain('Makko Chigi 3');
      expect(list[2].textContent).to.contain('Y3');

      expect(list[3].textContent).to.contain('Makko Chigi 4');
      expect(list[3].textContent).to.contain('B1');

      expect(list[4].textContent).to.contain('Makko Chigi 5');
      expect(list[4].textContent).to.contain('B2');


    });
  });

  it('should allow a user to search the list', function() {
    window.localStorage.setItem('login', true);
    cy.visit('/technique/list/1');

    cy.get('.searchbar-input').clear()
      .type('2');

    cy.wait(200);

    cy.get('.cy-technique-item').then((list) => {
      expect(list.length).to.equal(1);
      expect(list[0].textContent).to.contain('Makko Chigi 2');
      expect(list[0].textContent).to.contain('Y2');
    });
  });

  it('should be able to click on bookmark', function() {
    window.localStorage.setItem('login', true);
    cy.visit('/technique/list/1');
    cy.url().should('include', '/technique/list/1');

    cy.get('.cy-breadcrumb-0').click();

    cy.wait(200);

    cy.url().should('include', '/technique/list');
  });

  it('should be able to see bookmarks', function() {
    window.localStorage.setItem('login', true);
    cy.visit('/technique/list/1');
    cy.get('.cy-breadcrumb-0').contains('Techniques')
    cy.get('.cy-breadcrumb-1').contains('Makko Chigi')
  });

  it('should be able to click a technique', function() {
    window.localStorage.setItem('login', true);
    cy.visit('/technique/list/1');
    cy.get('.technique-2').click()
    cy.get('.cy-breadcrumb-2').contains('Makko Chigi 2')
    cy.visit('/technique/view/2');

  });

  it('should show tags', function() {
    cy.viewport(900, 600);
    window.localStorage.setItem('login', true);
    cy.visit('/technique/list/1');
    cy.get('.technique-4 .tag').then((tagList) => {
      expect(tagList.length).to.equal(3);
      expect(tagList[0].textContent).to.contain('More Tags');
      expect(tagList[1].textContent).to.contain('Weapon');
      expect(tagList[2].textContent).to.contain('Basics');
    })
  });

  it('should allow a user to add a new technique', function() {
    cy.viewport(900, 600);

    const technique = {
      "description": "A Description",
      "grade": 3,
      "id": 6,
      "media": [],
      "tags": [3, 5],
      "techniqueSet": {
        "id": 1,
        "name": "Makko Chigi"
      },
      "title": "Makko Chigi 6"
    };

    cy.route({
      method: 'POST',
      response: technique,
      status: 200,
      url: '/technique/create',
    }).as('createTechnique');

    window.localStorage.setItem('login', true);
    cy.visit('/technique/list/1');

    cy.get('.cy-add-technique-btn').click();

    cy.get('.cy-input-title').type(technique.title);
    cy.get('.cy-textarea-description').type(technique.description);

    cy.get('.cy-grade-selector').click();
    cy.get('#alert-input-1-3 > .alert-button-inner > .alert-radio-label').click();
    cy.get('.alert-button-group > :nth-child(2) > .alert-button-inner').click();

    cy.get('.cy-tags-selector').click();
    cy.get('#alert-input-2-2 > .alert-button-inner > .alert-checkbox-label').click();
    cy.get('#alert-input-2-4 > .alert-button-inner > .alert-checkbox-label').click();
    cy.get('.alert-button-group > :nth-child(2) > .alert-button-inner').click()

    cy.get('.cy-save').click();

    cy.wait('@createTechnique').then((xhr) => {
      assert.equal(xhr.request.body.description, technique.description);
      assert.equal(xhr.request.body.grade, technique.grade);
      assert.deepEqual(xhr.request.body.tags, technique.tags);
      assert.equal(xhr.request.body.title, technique.title);
      assert.equal(xhr.request.body.techniqueSet.id, technique.techniqueSet.id);
    });
  });


});
