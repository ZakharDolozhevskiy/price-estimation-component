import fetch from 'isomorphic-fetch';

const BASE_URL = `http://www.pkw.de/api/v1`;
const onJSON   = (res) => { return res.json() };

export function fetchBrands () {
  return fetch(`${BASE_URL}/brands/models`).then(onJSON)
}

export function fetchProductionYear (modelID) {
  return fetch(`${BASE_URL}/procurement/models/${modelID}/production_years`).then(onJSON)
}

export function fetchAboutBodytype (modelID, year) {
  return fetch(`${BASE_URL}/procurement/models/${modelID}/${year}/body_types`).then(onJSON)
}

export function fetchAboutEnginesType (modelID, year, bodytype) {
  return fetch(`${BASE_URL}/procurement/models/${modelID}/${year}/engines?body_type=${bodytype}`).then(onJSON)
}

export function fetchExtras (modelID, year, bodytype, engine) {
  return fetch(`${BASE_URL}/procurement/models/${modelID}/${year}/car?body_type=${bodytype}&engine=${engine}`)
    .then(onJSON)
}

export function fetchPrediction (payload) {
  const reqParams = {
    method  : 'post',
    body    : JSON.stringify(payload),
    headers : {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

  return fetch(`${BASE_URL}/cars/search`, reqParams).then(onJSON)
}
