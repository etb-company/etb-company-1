

export default function intersectionOb(){
    const ratio = .3
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: ratio
    }

    const handleIntersect = function(entries, observer){
        entries.forEach(function(entry) {
            if(entry.intersectionRatio > ratio){
                observer.unobserve(entry.target)
                entry.target.classList.add('reveal-visible')
            }
        })
    }

    const observer = new IntersectionObserver(handleIntersect, options)
    document.querySelectorAll('[class*="reveal-top-"]').forEach((el) => {
        observer.observe(el)
    })
    document.querySelectorAll('[class*="reveal-bottom-"]').forEach((el) => {
        observer.observe(el)
    })
    document.querySelectorAll('[class*="reveal-left-"]').forEach((el) => {
        observer.observe(el)
    })
    document.querySelectorAll('[class*="reveal-right-"]').forEach((el) => {
        observer.observe(el)
    })
}