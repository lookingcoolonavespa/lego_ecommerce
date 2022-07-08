import React from 'react';
import Slider from '../../components/Slider';
import Recommended from '../../components/Recommended';
import { RECOMMENDED } from '../../utils/constants';

describe('Slider', () => {
  it('slides correctly', async () => {
    cy.mount(<Recommended products={RECOMMENDED} />);
    cy.document().then((doc) => {
      const slideFrame = doc.querySelector('.slide_frame') as Element;
      const slideFrameWidth = window.getComputedStyle(slideFrame).width;

      const nextBtn = cy.get('[aria-label="right"]');
      nextBtn.click();

      const slideWidth = 290;
      const expectedTranslateVal =
        Math.floor(Number(slideFrameWidth.slice(0, -2)) / slideWidth) *
        slideWidth;

      cy.get('.slides_ctn')
        .should('have.attr', 'style')
        .should('contain', `transform: translateX(-${expectedTranslateVal}px)`);

      const prevBtn = cy.get('[aria-label="left"]');
      prevBtn.click();

      cy.get('.slides_ctn')
        .should('have.attr', 'style')
        .should('contain', `transform: translateX(0px)`);
    });
  });

  it('doesnt go past first page', () => {
    cy.mount(<Recommended products={RECOMMENDED} />);

    const prevBtn = cy.get('[aria-label="left"]');
    prevBtn.click();

    cy.get('.slides_ctn')
      .should('have.attr', 'style')
      .should('contain', `transform: translateX(0px)`);
  });

  it('doesnt go past last product', () => {
    cy.mount(<Recommended products={RECOMMENDED} />);
    cy.document().then((doc) => {
      const slideFrame = doc.querySelector('.slide_frame') as Element;
      const slideFrameWidth = Number(
        window.getComputedStyle(slideFrame).width.slice(0, -2)
      );
      const slideCtn = doc.querySelector('.slides_ctn') as Element;
      const slideCtnWidth = Number(
        window.getComputedStyle(slideCtn).width.slice(0, -2)
      );

      const nextBtn = cy.get('[aria-label="right"]');
      nextBtn.click();
      nextBtn.click();
      nextBtn.click();
      nextBtn.click();
      nextBtn.click();
      nextBtn.click();
      nextBtn.click();
      nextBtn.click();
      nextBtn.click();
      nextBtn.click();
      nextBtn.click();
      nextBtn.click();

      const expectedTranslateVal = slideCtnWidth - slideFrameWidth;

      cy.get('.slides_ctn')
        .should('have.attr', 'style')
        .should('contain', `transform: translateX(-${expectedTranslateVal}px)`);
    });
  });

  it('doesnt go past last product even when resized', () => {
    cy.mount(<Recommended products={RECOMMENDED} />);
    cy.document().then((doc) => {
      const nextBtn = cy.get('[aria-label="right"]');
      nextBtn.click();
      nextBtn.click();
      nextBtn.click();
      nextBtn.click();
      nextBtn.click();
      nextBtn.click();
      nextBtn.click();
      nextBtn.click();
      nextBtn.click();
      nextBtn.click();
      nextBtn.click();
      nextBtn.click();

      cy.viewport('macbook-15');

      const slideCtn = doc.querySelector('.slides_ctn') as Element;
      const slideCtnWidth = Number(
        window.getComputedStyle(slideCtn).width.slice(0, -2)
      );
      const slideFrame = doc.querySelector('.slide_frame') as Element;
      const slideFrameWidth = Number(
        window.getComputedStyle(slideFrame).width.slice(0, -2)
      );
      cy.log(`${slideFrameWidth}`);

      const expectedTranslateVal = slideCtnWidth - slideFrameWidth;

      cy.get('.slides_ctn')
        .should('have.attr', 'style')
        .should('contain', `transform: translateX(-${expectedTranslateVal}px)`);
    });
  });
});