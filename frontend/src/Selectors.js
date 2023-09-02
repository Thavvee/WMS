// recoilState.js
import { selector } from 'recoil';

export const fetchProductList = selector({
  key: 'fetchProductList', 
  get: async () => {
    const response = await fetch('http://127.0.0.1:8000/api/products/');
    const products = await response.json();
    return products;
  },
});
