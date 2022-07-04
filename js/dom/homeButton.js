const d = document;

export default function home(container, item, button, input){
    let $button = d.getElementById(button),
        $container = d.getElementById(container);

    $button.addEventListener('click', ()=>{
        $container.removeChild(d.querySelector('.country-container'));
        $container.append(item);
        $button.classList.add('hide');
        input.textContent = 'Filter by Region',
        d.getElementById('input-search').value = '';
    })

}