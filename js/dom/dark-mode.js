const d = document;

export default function changeTheme(elements, icon, container){
    let $container,
    $icon = d.getElementById(icon),
    $elements = d.querySelectorAll(elements),
    $elementsCountry = d.querySelectorAll('[data-theme-country]'),
    $darkModeText = d.getElementById('dark-mode-text'),
    iconLight = 'fa-sun',
    iconDark = 'fa-moon',
    theme = 'light-theme'


    $container = d.getElementById(container);


    if(localStorage.getItem('theme') == 'dark'){
        $icon.classList.replace(iconDark, iconLight);
        $elements.forEach(el => el.classList.remove(theme));
        $elementsCountry.forEach(el => el.classList.remove(theme));
        $darkModeText.textContent = 'Light Mode'
        
    }else if (localStorage.getItem('theme') == 'light'){
        $elements.forEach(el => el.classList.add(theme));
        $elementsCountry.forEach(el => el.classList.add(theme));
        $icon.classList.replace(iconLight, iconDark);
        $darkModeText.textContent = 'Dark Mode'
    }

    d.addEventListener('click', (e)=>{
        if(e.target.matches('.heading__dark-mode, .heading__dark-mode *')){
            if($icon.classList.contains(iconDark)){
                $icon.classList.replace(iconDark, iconLight);
                localStorage.setItem('theme', 'dark');
                $elements.forEach(el => el.classList.remove(theme));
                $elementsCountry.forEach(el => el.classList.remove(theme));
                $darkModeText.textContent = 'Light Mode'
            }else if($icon.classList.contains(iconLight)){
                $icon.classList.replace(iconLight, iconDark);
                localStorage.setItem('theme', 'light');
                $elements.forEach(el => el.classList.add(theme));
                $elementsCountry.forEach(el => el.classList.add(theme));
                $darkModeText.textContent = 'Dark Mode'
            }
        }
    })

    
    let observer = new MutationObserver(()=>{
        $elementsCountry = d.querySelectorAll('[data-theme-country]')
        observer.observe($container, {childList:true});
        if(localStorage.getItem('theme') == 'dark'){
            $elementsCountry.forEach(el => el.classList.remove(theme));
        }else if (localStorage.getItem('theme') == 'light'){
            $elementsCountry.forEach(el => el.classList.add(theme));
        }
    })
    
   
    observer.observe(d.querySelector('.main'), {childList:true, subtree:true});
}
