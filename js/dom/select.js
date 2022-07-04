const d = document;
export default function select(select_container, list, option, focus, arrow){
    let $list = d.querySelector(list),
    $arrow = d.querySelector(arrow),
    $focus = d.getElementById(focus);

    d.addEventListener('click', (e)=>{
        if(e.target.matches(`${select_container} *`)){
            if(e.target.matches(option)){
                $focus.textContent = e.target.textContent;
                $list.classList.toggle('is-active');
                $arrow.classList.toggle('is-active');
            }else{
                $list.classList.toggle('is-active');
                $arrow.classList.toggle('is-active');
            }
        }else{
            if($list.classList.contains('is-active')){
                $list.classList.toggle('is-active');
                $arrow.classList.toggle('is-active');
            }
        }
    })
}


