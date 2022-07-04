import setMutationObserver from "./setMutationObserver.js";
import addCountries from "./addCountries.js";

const d = document;

export default function getCountryDetails(container, main, country, country2) {
    let $container = d.getElementById(container),
        $clone_country = d.importNode(country, true),
        $elements = $clone_country.querySelectorAll('.hide'),
        altura = d.documentElement.scrollTop;

    d.documentElement.scrollTo(0, 0);
    $clone_country.classList.replace('country', 'country-clone');
    $elements.forEach(el => el.classList.remove('hide'));



    $container.removeChild(main);
    $container.append($clone_country);
    
    setMutationObserver(d.body, () => {
        $clone_country.classList.toggle('light-theme');
        $clone_country.querySelector('.country__button-back').classList.toggle('light-theme');
        $clone_country.querySelectorAll('.border').forEach(el => el.classList.toggle('light-theme'));
    })


    if (d.body.classList.contains('light-theme')){
        $clone_country.classList.add('light-theme');
        $clone_country.querySelector('.country__button-back').classList.add('light-theme');
        $clone_country.querySelectorAll('.border').forEach(el => el.classList.add('light-theme'));
    }

    $clone_country.querySelector('.country__button-back').addEventListener('click', (e) => {
        if(main == country){
            $container.removeChild($clone_country);
            $container.append(country2);
        }else{
            $container.removeChild($clone_country);
            $container.append(main);
        }
        d.documentElement.scrollTo(0, altura);
    })

    /*
    $clone_country.addEventListener('click', (e) => {
        if (e.target.matches('.border')) {
            $container.removeChild($clone_country);
            addCountries('template', [JSON.parse(e.target.querySelector('.countryBorders').innerHTML)], $container, e);
            let $country = d.querySelector('.country');
            getCountryDetails('container', $country, $country, $clone_country)
        }
    })
    */
}
