import React from 'react';
import Slider from '../../components/Slider';
import Recommended from '../../components/Recommended';
import { RECOMMENDED } from '../../utils/constants';

describe('Slider', () => {
  it('slides correctly', () => {
    cy.mount(<Recommended products={RECOMMENDED} />);
  });
});
