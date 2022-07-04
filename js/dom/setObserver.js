export default function setObserver(container, add){
    const callback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                add();
            }
        })
    }

    const options = {
        threshold: 0.9
    }
    const observer = new IntersectionObserver(callback, options);
    observer.observe(container.lastElementChild);
}

