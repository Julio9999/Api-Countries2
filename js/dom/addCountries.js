const d = document;
import setObserver from "./setObserver.js";
export default function addCountries(template, json, container, e) {

    let $fragment = d.createDocumentFragment(),
        k = 0;

    if (d.querySelector('.country-container')) d.querySelector('.country-container').innerHTML = '';

    if(e){
        if(e.type != 'DOMContentLoaded'){
            if(d.getElementById('button')){
                let $button = d.getElementById('button');
                $button.classList.remove('hide');
            }
        }
    }
    add();

    async function add() {
        let internationalNumberFormat = new Intl.NumberFormat('en-US')
        let $template = d.getElementById(template).content;
        
        if(json == undefined) {
            container.innerHTML = '<p class="error">There are no results for your search</p>'
            return;
        }
        for (let i = 0; i < 10 && k < json.length; i++, k++) {
            let $clone_template = d.importNode($template, true);
            $clone_template.querySelector('.name').textContent = json[k].name.common;
            $clone_template.querySelector('.country__flag').src = json[k].flags.png;

            if (json[k].name.nativeName != undefined) {
                let nativeName = Object.values(json[k].name.nativeName)[0];
                $clone_template.querySelector('.native-name .response').textContent = nativeName.common;
            } else {
                $clone_template.querySelector('.native-name').innerHTML = '';
            }

            if (json[k].subregion != undefined) {
                $clone_template.querySelector('.sub-region .response').textContent = json[k].subregion
            } else {
                $clone_template.querySelector('.sub-region').innerHTML = '';
            }

            if (json[k].capital != undefined) {
                if (json[k].capital.length > 1) {
                    let capitals = '';
                    json[k].capital.forEach(cap => {
                        capitals += " " + cap + ",";
                    })
                    $clone_template.querySelector('.capital .response').textContent = " " + (capitals.replace(/,$/, '.'));
                } else {
                    $clone_template.querySelector('.capital .response').textContent = json[k].capital;
                }
            } else {
                $clone_template.querySelector('.capital').innerHTML = '';
            }

            if (json[k].currencies != undefined) {
                let currencies = '';
                for (let currencie in json[k].currencies) {
                    currencies += " " + json[k].currencies[currencie].name + " " + json[k].currencies[currencie].symbol + ',';
                }
                $clone_template.querySelector('.currencies .response').textContent = " " + (currencies.replace(/,$/, '.'));
            } else {
                $clone_template.querySelector('.currencies').innerHTML = '';
            }

            if (json[k].languages != undefined) {
                let languages = '';
                for (let language in json[k].languages) {
                    languages += " " + json[k].languages[language] + ",";
                }
                $clone_template.querySelector('.languages .response').textContent = " " + (languages.replace(/,$/, '.'));
            } else {
                $clone_template.querySelector('.languages').innerHTML = " ";
            }
            $clone_template.querySelector('.population .response').textContent = internationalNumberFormat.format(json[k].population);
            $clone_template.querySelector('.region .response').textContent = json[k].region;
            if (json[k].hasOwnProperty('tld')) $clone_template.querySelector('.top-level .response').textContent = json[k].tld[0];

            if (json[k].borders != undefined) {
                let borders = json[k].borders,
                    borders2 = [],
                    countryborders = [];
                let data = d.getElementById('data');
                for (let m = 0; m < borders.length; m++) {
                    JSON.parse(data.innerHTML).forEach(country => {
                        if (country.cca3 === borders[m]) {
                            borders2.push(country.name.common);
                            countryborders.push(country);
                        }
                    })
                }
                $clone_template.querySelector('.borders ').innerHTML = 'Border Countries: '
                let $border_container = d.createElement('div');
                $border_container.classList.add('border_container');
                for (let j = 0; j < borders2.length; j++) {
                    $border_container.innerHTML += `<span class="border" data-theme>${borders2[j]} <span class="countryBorders">${JSON.stringify(countryborders[j])}</span></span>`
                }
                $clone_template.querySelector('.borders ').append($border_container);

            } else {
                $clone_template.querySelector('.borders ').innerHTML = '';
            }

            $fragment.append($clone_template);
            if (json.length > 1) {
                if (i == 9 || k + 1 == json.length) {
                    container.append($fragment);
                    setObserver(container, add);
                }
            } else {
                container.append($fragment);
            }
        }
    }
}
