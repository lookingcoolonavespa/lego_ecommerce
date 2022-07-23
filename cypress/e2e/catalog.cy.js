beforeEach(() => {
  cy.visit('http://localhost:3000/shop');
});

describe('sort methods work', () => {
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

describe.only('checkboxes work', () => {
  it('checks the input when the label is clicked', () => {
    cy.viewport('macbook-16');

    cy.get('.Sidebar_main__VH1Ms .accordion_title_row').click({
      multiple: true,
    });

    cy.get('.Sidebar_main__VH1Ms .Accordion_content__IOxFL label').click({
      multiple: true,
    });

    cy.get('.Sidebar_main__VH1Ms input[type="checkbox"]').each((input) => {
      expect(input[0].checked).to.equal(true);
    });
  });

  it('unchecks the input when the label is clicked and input is checked', () => {
    it('checks the input when the label is clicked', () => {
      cy.viewport('macbook-16');

      cy.get('.Sidebar_main__VH1Ms .accordion_title_row').click({
        multiple: true,
      });

      cy.get('.Sidebar_main__VH1Ms .Accordion_content__IOxFL label').click({
        multiple: true,
      });

      cy.get('.Sidebar_main__VH1Ms .Accordion_content__IOxFL label').click({
        multiple: true,
      });

      cy.get('.Sidebar_main__VH1Ms input[type="checkbox"]').each((input) => {
        expect(input[0].checked).to.equal(false);
      });
    });
  });

  it('turns filters off if last filter is unchecked', () => {
    cy.viewport('macbook-16');

    cy.get('.Sidebar_main__VH1Ms .accordion_title_row').first().click();

    cy.get('.Sidebar_main__VH1Ms .Accordion_content__IOxFL label')
      .first()
      .click();

    cy.get('.Sidebar_apply_filters__n1dlg').click();

    cy.get('.Sidebar_main__VH1Ms .Accordion_content__IOxFL label')
      .first()
      .click();

    cy.get('button[aria-label="Goto page 11"]').should('exist');
  });
});

describe('price filters work', () => {
  it('has a minimum of 0', () => {
    cy.get('input[name="From"]').type(`{leftArrow}-1000`);
    cy.get('input[name="To"]').type(`{leftArrow}-1000`);

    cy.get('input[name="From"]').should('have.value', '1000');
    cy.get('input[name="To"]').should('have.value', '1000');
  });

  it('has a maximum of 9999', () => {
    cy.get('input[name="From"]').type(`10000`);
    cy.get('input[name="To"]').type(`10000`);

    cy.get('input[name="From"]').should('have.value', '1000');
    cy.get('input[name="To"]').should('have.value', '1000');
  });
});

describe('remove filters work', () => {
  it('resets price filter inputs', () => {
    cy.get('input[name="From"]').type(`10000`);
    cy.get('input[name="To"]').type(`10000`);

    cy.get('.Sidebar_remove_filters__x6qzH').click();

    cy.get('input[name="From"]').should('have.value', '0');
    cy.get('input[name="To"]').should('have.value', '0');
  });

  it('unchecks all checked themes + ages', () => {
    cy.viewport('macbook-16');

    cy.get('.Sidebar_main__VH1Ms .accordion_title_row').click({
      multiple: true,
    });

    cy.get('.Sidebar_main__VH1Ms .Accordion_content__IOxFL label').click({
      multiple: true,
    });

    cy.get('.Sidebar_remove_filters__x6qzH').click();

    cy.get('.Sidebar_main__VH1Ms input[type="checkbox"]').each((input) => {
      expect(input[0].checked).to.equal(false);
    });
  });

  it('turns filters off', () => {
    cy.viewport('macbook-16');

    cy.get('.Sidebar_main__VH1Ms .accordion_title_row').click({
      multiple: true,
    });

    cy.get('.Sidebar_main__VH1Ms .Accordion_content__IOxFL label').click({
      multiple: true,
    });

    cy.get('.Sidebar_apply_filters__n1dlg').click();

    cy.get('.Sidebar_remove_filters__x6qzH').click();
    cy.get('button[aria-label="Goto page 11"]').should('exist');
  });
});
