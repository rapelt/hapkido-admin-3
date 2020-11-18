/// <reference types="cypress" />


describe('View Technique List', function() {
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

  it('should allow a user to navigate to technique set list page and view technique sets', function() {
    window.localStorage.setItem('login', true);
    cy.visit('/technique/list');
    cy.url().should('include', '/technique/list');

    cy.get('.cy-technique-set-item').then((list) => {
      expect(list.length).to.equal(4);
      expect(list[0].textContent).to.contain('Makko Chigi');
      expect(list[1].textContent).to.contain('Joo Mook Makki');
      expect(list[2].textContent).to.contain('Son Bakki');
      expect(list[3].textContent).to.contain('Ki Bon Su');
    });
  });

  it('should allow a user to search the list', function() {
    window.localStorage.setItem('login', true);
    cy.visit('/technique/list');

    cy.get('.searchbar-input').clear()
      .type('Ki Bon');

    cy.wait(200);

    cy.get('.cy-technique-set-item').then((list) => {
      expect(list.length).to.equal(1);
      expect(list[0].textContent).to.contain('Ki Bon Su');
    });
  });

  it('should be able to see bookmarks', function() {
    window.localStorage.setItem('login', true);
    cy.visit('/technique/list');
    cy.get('.cy-breadcrumb-0').contains('Techniques')
  });

  it('should be able to click a techniqie set', function() {
    window.localStorage.setItem('login', true);
    cy.visit('/technique/list');
    cy.get('.technique-set-7').click()
    cy.get('.cy-breadcrumb-1').contains('Joo Mook Makki')
    cy.visit('/technique/list/1');

  });

  it('should allow a user to add a new technique set', function() {
    const techniqueSet = { id: 10, name: 'New Technique Set'};

    cy.route({
      method: 'POST',
      response: techniqueSet,
      status: 200,
      url: '/technique/set/create',
    }).as('createTechniqueSet');

    window.localStorage.setItem('login', true);
    cy.visit('/technique/list');

    cy.get('.cy-add-technique-set-btn').click();

    cy.get('input[name=title]').type(techniqueSet.name);

    cy.get('.cy-save').click();

    cy.wait('@createTechniqueSet').then((xhr) => {
      assert.equal(xhr.request.body.techniqueSet, techniqueSet.name);
    });
  });
});
