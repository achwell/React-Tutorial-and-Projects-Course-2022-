interface Img {
  url: string;
  width: number;
  height: number;
}

interface Thumbnails {
  small: Img;
  large: Img;
  full: Img;
}

interface Image {
  id: string;
  width: number;
  height: number;
  url: string;
  filename: string;
  size: number;
  type: string;
  thumbnails: Thumbnails;
}

export interface Fields {
  company: string;
  colors: string[];
  featured: boolean;
  price: number;
  name: string;
  image: Image[];
}

export default interface Product {
  id: string;
  fields: Fields;
}
