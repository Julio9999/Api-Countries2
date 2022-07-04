import getData from "./dom/getData.js";
import select from "./dom/select.js";
import changeTheme from "./dom/dark-mode.js";
import addCountries from "./dom/addCountries.js";
import getCountryDetails  from "./dom/getCountryDetails.js";
import home from "./dom/homeButton.js";
import upButton from "./dom/upBotton.js";
const d = document,
loader = d.getElementById('loader-modal');
let json = '';


d.addEventListener('click', async(e)=> {
    
    if(e.target.matches('.select-list__option')){
        loader.showModal();
        json = await getData(`https://restcountries.com/v3.1/region/${e.target.dataset.name}`);
        loader.close();
        let $container = d.importNode(d.querySelector('.country-container'));
        d.querySelector('.main').removeChild(d.querySelector('.country-container'))
        d.querySelector('.main').append($container);
        addCountries('template', json, $container , e);
    }else if(e.target.matches('.input-group__icon')){
        let name = d.querySelector('.input-group__input').value;
        loader.showModal();
        json = await getData(`https://restcountries.com/v3.1/name/${name}`);
        loader.close();
        let $container = d.importNode(d.querySelector('.country-container'));
        d.querySelector('.main').removeChild(d.querySelector('.country-container'))
        d.querySelector('.main').append($container);
        addCountries('template', json, $container , e);
    }else if(e.target.matches('.country *')){
        
        let $country = e.target;
        while(!$country.parentElement.matches('.country')){
            $country = $country.parentElement;
        }
        
        $country = $country.parentElement;
        getCountryDetails('container', d.querySelector('.main'), $country);
    }
})


d.addEventListener('DOMContentLoaded', async(e)=>{
    changeTheme('[data-theme]', 'icon', 'country-container');
    select('.select-group', '.select-list','.select-list__option', 'select-focus', '.select__arrow');
    loader.showModal();
    json = await getData('https://restcountries.com/v3.1/all');
    loader.close();
    let data = d.createElement('span');
    data.setAttribute('id', 'data');
    data.innerHTML = JSON.stringify(json)
    data.style.setProperty('display','none');
    d.body.append(data);
    let $container = d.querySelector('.country-container')
    addCountries('template',json, $container, e);
    let $item = d.querySelector('.country-container');
    home('main', $item, 'button', d.getElementById('select-focus'));
    upButton(d.getElementById('up-button'));
})


d.addEventListener('submit', async (e)=> {
    e.preventDefault();
    let name = d.querySelector('.input-group__input').value;
    loader.showModal();
    let json = await getData(`https://restcountries.com/v3.1/name/${name}`);
    loader.close();
    let $container = d.importNode(d.querySelector('.country-container'));
    d.querySelector('.main').removeChild(d.querySelector('.country-container'))
    d.querySelector('.main').append($container);
    addCountries('template',json,$container , e);
})
