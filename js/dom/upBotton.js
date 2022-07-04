const d = document;

export default function upButton(button){
    d.addEventListener('scroll', ()=>{
        
        if(d.documentElement.scrollTop >= 1000){
            if(button.classList.contains('hide')){
                button.classList.remove('hide');
            }
        }else{
            if(!button.classList.contains('hide')){
                button.classList.add('hide');
            }
        }
    })

    button.addEventListener('click', ()=>{
        d.documentElement.scrollTo({
            behavior: 'smooth',
            top:0
        });
    })
}