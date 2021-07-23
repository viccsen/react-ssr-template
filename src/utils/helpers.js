import fetch from 'cross-fetch';

export const loadData = resourceType => {
  return fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
    .then(res => {
      return res.json();
    })
    .then(data => {
      // only keep 10 first results
      return data.filter((_, idx) => idx < 10);
    });
};