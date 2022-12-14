import React from 'react';
import ProductSlider from '../../components/ProductSlider';
import { RECOMMENDED } from '../../utils/constants';

describe('Slider', () => {
  it('slides correctly', async () => {
    cy.mount(<ProductSlider products={RECOMMENDED} />);
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
    cy.mount(<ProductSlider products={RECOMMENDED} />);

    const prevBtn = cy.get('[aria-label="left"]');
    prevBtn.click();

    cy.get('.slides_ctn')
      .should('have.attr', 'style')
      .should('contain', `transform: translateX(0px)`);
  });

  it('doesnt go past last product', () => {
    cy.mount(<ProductSlider products={RECOMMENDED} />);
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

  it('doesnt go past last slider item even when resized', () => {
    cy.mount(<ProductSlider products={RECOMMENDED} />);

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

    cy.viewport('macbook-16');

    cy.document().then((doc) => {
      const slideCtn = doc.querySelector('.slides_ctn') as Element;
      const slideCtnWidth = Number(
        window.getComputedStyle(slideCtn).width.slice(0, -2)
      );
      const slideFrame = doc.querySelector('.slide_frame') as Element;
      const slideFrameWidth = Number(
        window.getComputedStyle(slideFrame).width.slice(0, -2)
      );

      const expectedTranslateVal = slideCtnWidth - slideFrameWidth;

      cy.get('.slides_ctn')
        .should('have.attr', 'style')
        .should('contain', `transform: translateX(-${expectedTranslateVal}px)`);
    });
  });

  it('keeps the same translateX value on resize if the slider doesnt go past last slider item', () => {
    cy.mount(<ProductSlider products={RECOMMENDED} />);

    const nextBtn = cy.get('[aria-label="right"]');
    nextBtn.click();
    nextBtn.click();

    cy.document().then((doc) => {
      const slideCtn = doc.querySelector('.slides_ctn') as HTMLElement;
      const slideCtnTranslate = slideCtn.style.transform;

      cy.viewport('macbook-15');

      cy.get('.slides_ctn')
        .should('have.attr', 'style')
        .should('contain', `transform: ${slideCtnTranslate}`);
    });
  });

  it('prev button works after resize', () => {
    cy.mount(<ProductSlider products={RECOMMENDED} />);

    const nextBtn = cy.get('[aria-label="right"]');
    nextBtn.click();
    nextBtn.click();

    cy.viewport('macbook-15');

    const prevBtn = cy.get('[aria-label="left"]');
    prevBtn.click();

    cy.get('.slides_ctn')
      .should('have.attr', 'style')
      .should('contain', `transform: translateX(0px)`);
  });

  it('on resize, places slider at the end if the last slider item was visible before resize', () => {
    cy.mount(<ProductSlider products={RECOMMENDED} />);
    cy.viewport('macbook-15');
    const nextBtn = cy.get('[aria-label="right"]');
    nextBtn.click();
    nextBtn.click();
    nextBtn.click();

    cy.viewport(772, 500);

    cy.document().then((doc) => {
      const slideCtn = doc.querySelector('.slides_ctn') as Element;
      const slideCtnWidth = Number(
        window.getComputedStyle(slideCtn).width.slice(0, -2)
      );
      const slideFrame = doc.querySelector('.slide_frame') as Element;
      const slideFrameWidth = Number(
        window.getComputedStyle(slideFrame).width.slice(0, -2)
      );

      const expectedTranslateVal = slideCtnWidth - slideFrameWidth;

      cy.get('.slides_ctn')
        .should('have.attr', 'style')
        .should('contain', `transform: translateX(-${expectedTranslateVal}px)`);
    });
  });

  it.only('slides even on mobile', () => {
    cy.viewport(375, 812);

    cy.mount(<ProductSlider products={RECOMMENDED} />);
    cy.document().then((doc) => {
      const slideFrame = doc.querySelector('.slide_frame') as Element;
      const slideFrameWidth = window.getComputedStyle(slideFrame).width;

      const nextBtn = cy.get('[aria-label="right"]');
      nextBtn.click();

      const slideWidth = 290;
      const expectedTranslateVal =
        Math.max(
          Math.floor(Number(slideFrameWidth.slice(0, -2)) / slideWidth),
          1
        ) * slideWidth;

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
});
