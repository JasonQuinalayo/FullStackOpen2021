/* eslint-disable no-plusplus */
describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.request('POST', 'http://localhost:3003/api/users', {
      name: 'nosaj',
      username: 'jason',
      password: 'sonja',
      blogs: [],
    });
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', () => {
    cy.get('#login').should('be.visible');
  });
  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('#username').type('jason');
      cy.get('#password').type('sonja');
      cy.get('#login-button').click();
      cy.contains('nosaj logged in');
    });

    it('fails with wrong credentials', () => {
      cy.get('#username').type('jason');
      cy.get('#password').type('snja');
      cy.get('#login-button').click();
      cy.contains('Wrong credentials').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
    describe('When logged in', () => {
      beforeEach(() => {
        cy.login({ username: 'jason', password: 'sonja' });
      });

      it('A blog can be created', () => {
        cy.contains('add blog').click();
        cy.get('#title').type('Doege');
        cy.get('#author').type('Doge');
        cy.get('#url').type('muchurl');
        cy.get('#submit-blog').click();
        cy.contains('Doege Doge');
      });

      it('A user can like a blog', () => {
        cy.addBlog({ title: 'Deoge', author: 'Doge', url: 'muchurl' });
        cy.get('.view-blog-details-button').click();
        cy.get('.like-button').click();
        cy.get('.blog-details').should('contain', 'likes: 1');
      });

      it('A user can delete his own added blog', () => {
        cy.addBlog({ title: 'Deoge', author: 'Doge', url: 'muchurl' });
        cy.get('.view-blog-details-button').click();
        cy.get('.delete-blog-button').click();
        cy.get('html').should('not.contain', 'Deoge Doge');
      });

      it('A user cannot delete blogs added by other users', () => {
        cy.addBlog({ title: 'Deoge', author: 'Doge', url: 'muchurl' });
        cy.get('#logout-button').click();
        cy.request('POST', 'http://localhost:3003/api/users', {
          name: 'sonja',
          username: 'nosaj',
          password: 'jason',
          blogs: [],
        });
        cy.login({ username: 'nosaj', password: 'jason' });
        cy.get('.view-blog-details-button').click();
        cy.get('.delete-blog-button').click();
        cy.get('html').should('contain', 'Unauthorized deletion.');
      });

      it('Blogs are sorted by descending number of likes from the top', () => {
        cy.addBlog({ title: 'Deoge1', author: 'Doge', url: 'muchurl' });
        cy.addBlog({ title: 'Deoge2', author: 'Doge', url: 'muchurl' });
        cy.addBlog({ title: 'Deoge3', author: 'Doge', url: 'muchurl' });
        cy.get('#blogs-list').contains('Deoge2').contains('view').click();
        for (let i = 0; i < 3; i++) {
          cy.get('#blogs-list').contains('Deoge2').find('.blog-details').find('.like-button')
            .click();
          cy.wait(100);
        }
        cy.get('#blogs-list').contains('Deoge1').contains('view').click();
        for (let i = 0; i < 2; i++) {
          cy.get('#blogs-list').contains('Deoge1').find('.blog-details').find('.like-button')
            .click();
          cy.wait(100);
        }
        cy.get('#blogs-list').contains('Deoge3').contains('view').click();
        cy.get('#blogs-list').contains('Deoge3').find('.blog-details').find('.like-button')
          .click();
        cy.get('.blog').eq(0).should('contain', 'likes: 3').and('contain', 'Deoge2');
        cy.get('.blog').eq(1).should('contain', 'likes: 2').and('contain', 'Deoge1');
        cy.get('.blog').eq(2).should('contain', 'likes: 1').and('contain', 'Deoge3');
      });
    });
  });
});
