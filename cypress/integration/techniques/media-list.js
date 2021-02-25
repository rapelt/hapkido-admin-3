/// <reference types="cypress" />


describe('View Media', function() {
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

  it('should allow a user to navigate to media list page and view media', function() {
    window.localStorage.setItem('login', true);
    cy.visit('/technique/view/1');
    cy.url().should('include', '/technique/view/1');

    cy.get('.cy-media-item').then((list) => {
      expect(list.length).to.equal(3);
      expect(list[0].textContent).to.contain('Media name 1');
      expect(list[0].innerHTML).to.contain('cy-document-icon');
      expect(list[1].textContent).to.contain('Media name 2');
      expect(list[1].innerHTML).to.contain('cy-photo-icon');
      expect(list[2].textContent).to.contain('Media name 3');
      expect(list[2].innerHTML).to.contain('cy-video-icon');
    });


  });

  it('should allow a user to search the list', function() {
    window.localStorage.setItem('login', true);
    cy.visit('/technique/view/1');

    cy.get('.searchbar-input').clear()
      .type('2');

    cy.wait(200);

    cy.get('.cy-media-item').then((list) => {
      expect(list.length).to.equal(1);
      expect(list[0].textContent).to.contain('Media name 2');
      expect(list[0].innerHTML).to.contain('cy-photo-icon');
    });
  });

  it('should be able to see bookmarks', function() {
    window.localStorage.setItem('login', true);
    cy.visit('/technique/view/1');
    cy.get('.cy-breadcrumb-0').contains('Techniques')
    cy.get('.cy-breadcrumb-1').contains('Makko Chigi')
    cy.get('.cy-breadcrumb-2').contains('Makko Chigi 1')
  });

  it('should be able to click on bookmark 1', function() {
    window.localStorage.setItem('login', true);
    cy.visit('/technique/view/1');
    cy.url().should('include', '/technique/view/1');

    cy.get('.cy-breadcrumb-1').click();

    cy.wait(200);

    cy.url().should('include', '/technique/list/1');
  });

  it('should be able to click on bookmark 0', function() {
    window.localStorage.setItem('login', true);
    cy.visit('/technique/view/1');
    cy.url().should('include', '/technique/view/1');

    cy.get('.cy-breadcrumb-0').click();

    cy.wait(200);

    cy.url().should('include', '/technique/list');
  });

  it('should be able to click a media item', function() {
    window.localStorage.setItem('login', true);
    cy.visit('/technique/view/1');
    cy.get('.media-113').click()
    cy.visit('/technique/media/113');
  });

  it('should show tags', function() {
    cy.viewport(900, 600);
    window.localStorage.setItem('login', true);
    cy.visit('/technique/view/1');
    cy.get('.media-115 .tag').then((tagList) => {
      expect(tagList.length).to.equal(2);
      expect(tagList[0].textContent).to.contain('New tag 3');
      expect(tagList[1].textContent).to.contain('Student');
    })
  });

  // it('should allow see a students name, preferred class and active status', function() {
  //   window.localStorage.setItem('login', true);
  //   cy.visit('/student/view/hb003');
  //   cy.url().should('include', '/student/view/hb003');
  //
  //   cy.get('h1').contains('Firstname2 Lastname2');
  //   cy.get('.ut-short-name').contains('Red 1');
  //   cy.get('.ut-email').contains('test@user.com');
  //   cy.get('.ut-preferred-class').contains('Family');
  //   cy.get('.ut-is-active').contains('Active');
  // });
});
