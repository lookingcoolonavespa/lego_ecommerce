describe('add to cart works', () => {
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

describe('updating cart works', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');

    cy.get('.ProductPreview_add_to_cart__ltT1F').first().click();

    cy.visit('http://localhost:3000/cart');
  });

  it('product in cart shows correct quantity', () => {
    cy.get('select').should('have.value', '1');
  });

  it('updates correctly when selecting a nonzero number', () => {
    cy.get('select').select('2');
    cy.get('select').should('have.value', '2');

    cy.get('.cart_counter').should('have.text', '2');
  });

  it('deletes product when selecting zero', () => {
    cy.get('select').select('0');

    cy.get('.CartProductWrapper_main__TH6HN').should('have.length', 0);
    cy.contains('No items are in your cart').should('have.length.at.least', 1);
  });

  it('shows correct price', () => {
    cy.get('select').select('2');

    cy.contains('Item(s) total:').next().should('have.text', '$339.98');
    cy.contains('Total:').next().should('have.text', '$344.98');
  });

  it('shows dashes for total when no items are in cart', () => {
    cy.get('select').select('0');

    cy.contains('Total:').next().should('have.text', '--');
  });
});
