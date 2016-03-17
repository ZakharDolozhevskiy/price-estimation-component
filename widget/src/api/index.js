import fetch from 'isomorphic-fetch';

const BASE_URL = 'http://www.pkw.de/api/v1/procurement';
const headers  = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
const onJSON   = (res) => res.json();

export function fetchBrands() {
  return fetch(`${BASE_URL}/brands`).then(onJSON);
}

export function fetchModels(brandID) {
  return fetch(`${BASE_URL}/brands/${brandID}/models`).then(onJSON)
}

export function fetchProductionYear(modelID) {
  return fetch(`${BASE_URL}/models/${modelID}/production_years`).then(onJSON);
}

export function fetchAboutBodytype(modelID, year) {
  return fetch(`${BASE_URL}/models/${modelID}/${year}/body_types`, { headers }).then(onJSON);
}

export function fetchAboutEnginesType(modelID, year, bodytype) {
  const PARAMS = `body_type=${bodytype}`;

  return fetch(`${BASE_URL}/models/${modelID}/${year}/engines?${PARAMS}`).then(onJSON);
}

export function fetchExtras(modelID, year, bodytype, engine) {
  const PARAMS = `body_type=${bodytype}&engine=${engine}`;

  return fetch(`${BASE_URL}/models/${modelID}/${year}/car?${PARAMS}`).then(onJSON);
}
