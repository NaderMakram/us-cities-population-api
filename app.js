const form = document.querySelector('form')

form.addEventListener('submit', e => {
  e.preventDefault()
})


const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

let cities = [];
const input = document.querySelector('input')
const ul = document.querySelector('ul')

axios.get(endpoint)
  .then(res => { cities.push(...res.data) })

function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi')
    return place.city.match(regex) || place.state.match(regex)
  })
}

function dataTemplate(data) {
  if (!data) { return `` }
  return data.map(obj => {
    let regex = new RegExp(input.value, 'gi')
    const cityName = obj.city.replace(regex, `<span class="hl">${input.value}</span>`)
    const stateName = obj.state.replace(regex, `<span class="hl">${input.value}</span>`)
    return `
        <li>
          <span class="name">${cityName}, ${stateName}</span>
          <span class="population">${numberWithCommas(obj.population)}</span>
        </li>
        `
  }).join('').replace()
}

input.addEventListener('keyup', (event) => {
  let data = findMatches(input.value, cities)
  if (!input.value) {
    ul.innerHTML = ``
  } else {
    ul.innerHTML = dataTemplate(data)
  }
})