describe('cart works', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');

    cy.get('.ProductPreview_add_to_cart__ltT1F').first().click();
    cy.get('.cart_counter').should('have.text', '1');
  });

  it('displays amount of products in the cart', () => {
    cy.get('.ProductPreview_add_to_cart__ltT1F').first().click();
    cy.get('.cart_counter').should('have.text', '2');
  });

  it('cart carries over from page to page', () => {
    cy.visit('http://localhost:3000/shop');

    cy.get('.cart_counter').should('have.text', '1');
  });
});
