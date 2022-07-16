import React, { ChangeEvent } from 'react';

export interface SvgProps {
  height: string;
  width: string;
}

export interface ProductInterface {
  imgSrc: string;
  title: string;
  price: string;
  rating: string | null;
}

export interface LinkInterface {
  text: string;
  href?: string;
}

export interface InputDetailsInterface {
  type: 'text' | 'number';
  name?: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<Element>) => void;
  value: string | number;
}

export interface InputStatusInterface {
  message: string;
  type: 'error' | 'success' | undefined;
}
