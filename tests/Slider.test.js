import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // optional
import userEvent from '@testing-library/user-event';
import { RECOMMENDED } from '../utils/constants';
import Slider from '../components/Slider';
import { act } from 'react-dom/test-utils';

it('slides correctly', async () => {
  const user = userEvent.setup();
  let wrapper;

  await act(async () => (wrapper = render(<Slider lastPage={1} />)));

  const nextBtn = wrapper.getByRole('button', { name: 'right' });
  await act(async () => await user.click(nextBtn));
  await new Promise((resolve) => setTimeout(resolve, 800));

  const slider = wrapper.getByTestId('slider');

  expect(slider).toHaveStyle('transform: translateX(-812px)');

  const prevBtn = wrapper.getByRole('button', { name: 'left' });
  await act(async () => await user.click(prevBtn));
  await new Promise((resolve) => setTimeout(resolve, 800));

  expect(slider).toHaveStyle('transform: translateX(0px)');
});

it('doesnt go past the last page', async () => {
  const user = userEvent.setup();
  let wrapper;

  await act(async () => (wrapper = render(<Slider lastPage={1} />)));

  const nextBtn = wrapper.getByRole('button', { name: 'right' });
  console.log(nextBtn);
  await act(async () => await user.click(nextBtn));

  await act(async () => await user.click(nextBtn));

  await act(async () => await user.click(nextBtn));
  await new Promise((resolve) => setTimeout(resolve, 800));

  const slider = wrapper.getByTestId('slider');

  expect(slider).toHaveStyle('transform: translateX(-812px)');
});

it('doesnt go past the first page', async () => {
  const user = userEvent.setup();
  let wrapper;

  await act(async () => (wrapper = render(<Slider lastPage={1} />)));

  const prevBtn = wrapper.getByRole('button', { name: 'left' });
  await act(async () => await user.click(prevBtn));

  await act(async () => await user.click(prevBtn));

  await act(async () => await user.click(prevBtn));
  await new Promise((resolve) => setTimeout(resolve, 800));

  const slider = wrapper.getByTestId('slider');

  expect(slider).toHaveStyle('transform: translateX(0px)');
});
