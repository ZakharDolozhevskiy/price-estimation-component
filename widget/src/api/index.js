import fetch from 'isomorphic-fetch';

const BASE_URL = 'http://www.pkw.de/api/v1';
const onJSON   = (res) => res.json();

export function fetchBrands () {
  return fetch(`${BASE_URL}/brands/models`).then(onJSON);
}

export function fetchProductionYear (modelID) {
  return fetch(`${BASE_URL}/procurement/models/${modelID}/production_years`).then(onJSON);
}

export function fetchAboutBodytype (modelID, year) {
  return fetch(`${BASE_URL}/procurement/models/${modelID}/${year}/body_types`).then(onJSON);
}

export function fetchAboutEnginesType (modelID, year, bodytype) {
  const PARAMS = `body_type=${bodytype}`;

  return fetch(`${BASE_URL}/procurement/models/${modelID}/${year}/engines?${PARAMS}`).then(onJSON);
}

export function fetchExtras (modelID, year, bodytype, engine) {
  const PARAMS = `body_type=${bodytype}&engine=${engine}`;

  return fetch(`${BASE_URL}/procurement/models/${modelID}/${year}/car?${PARAMS}`).then(onJSON);
}

export function fetchPrediction (payload) {
  const reqParams = {
    method  : 'post',
    body    : JSON.stringify(payload),
    headers : {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  };

  return fetch(`${BASE_URL}/cars/search`, reqParams).then(onJSON);
}
