const d = document;

export default function setMutationObserver(container, fun){
    let observer = new MutationObserver(fun);
    
    observer.observe(container, {childList:true, attributes: true});
}