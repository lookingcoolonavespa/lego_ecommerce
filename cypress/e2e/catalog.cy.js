describe('sort methods work', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/shop');
  });

  it('doesnt sort when Popular is selected', () => {
    cy.get('.sort_by > select').select('Price: High to Low');
    cy.get('.sort_by > select').select('Popular');

    cy.get('.Catalog_product_wrapper__HFNqu')
      .first()
      .find('.ProductPreview_title_wrapper__Q7c1m')
      .should('have.text', 'T. rex Breakout');
  });

  it('displays highest priced item first and lowest priced item last when Price: High to Low is selected', () => {
    cy.get('.sort_by > select').select('Price: High to Low');

    cy.get('.Catalog_product_wrapper__HFNqu')
      .first()
      .find('.ProductPreview_price_wrapper__n_sPD')
      .should('have.text', '799.99 $');

    cy.get('[aria-label="Goto page 11"]').click();
    cy.get('.Catalog_product_wrapper__HFNqu')
      .last()
      .find('.ProductPreview_price_wrapper__n_sPD')
      .should('have.text', '34.99 $');
  });

  it('displays lowest priced item first and highest priced item last when Price: Low to High is selected', () => {
    cy.get('.sort_by > select').select('Price: Low to High');

    cy.get('.Catalog_product_wrapper__HFNqu')
      .first()
      .find('.ProductPreview_price_wrapper__n_sPD')
      .should('have.text', '34.99 $');

    cy.get('[aria-label="Goto page 11"]').click();
    cy.get('.Catalog_product_wrapper__HFNqu')
      .last()
      .find('.ProductPreview_price_wrapper__n_sPD')
      .should('have.text', '799.99 $');
  });
});
