// atoms.js
import { atom } from 'recoil';

export const counterState = atom({
  key: 'counterState', // unique ID
  default: 0, // default value
});


export const hoveredZoneState = atom({
  key: 'hoveredZoneState',
  default: ''
});

export const clickedZoneState = atom({
  key: 'clickedZoneState',
  default: ''
});


export const zonesState = atom({
  key: 'zonesState',
  default: ''
});


export const productListState = atom({
  key: 'productListState',
  default: []
});

export const zoneSelectedState = atom({
  key: 'zoneSelectedState',
  default: []
})

export const productSelectedState = atom({
  key: 'productSelectedState',
  default: ''
});