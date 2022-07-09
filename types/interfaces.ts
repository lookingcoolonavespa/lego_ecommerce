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
  type: 'text';
  placeholder?: string;
  onChange?: () => void;
}
