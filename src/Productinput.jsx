// ProductInputComponent.js
import {React,useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { productSelectedState } from './Atoms';
import { Input } from "@chakra-ui/react";



function Productinput() {
  const [productSelected, setProductSelected] = useRecoilState(productSelectedState);

  const handleChange = (event) => {
    setProductSelected(event.target.value);
  };

  useEffect(() => {
    console.log('productSelected has changed:', productSelected);
  }, [productSelected]);
  return (
    <Input
      type="text"
      value={productSelected}
      onChange={handleChange}
      placeholder="Enter product"
    />
  );
}

export default Productinput;
