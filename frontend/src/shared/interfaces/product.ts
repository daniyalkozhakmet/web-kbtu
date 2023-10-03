export type productsDataType = {
  data: productType[];
  meta: metaType;
};
export type productType = {
  id: number;
  name: string;
  image: string;
  price: number;
  rating: number;
  description: string;
  categories: categoryType[];
};
export type categoryType = {
  id: number;
  name: string;
  image: string;
};
export type metaType = {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
  links: linkType[];
};
export type linkType = {
  url: string;
};
