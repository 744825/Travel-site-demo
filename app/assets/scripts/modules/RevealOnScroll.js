import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'

class RevealOnScroll{
constructor(els,threshold){
    this.itemsToReveal = els;
    this.thresholdPrecent = threshold;
    this.hidIntially();
    this.scrollThrottle = throttle(this.calcCaller,200).bind(this)
    this.events();
    this.browserHeight= window.innerHeight
}

// events (){
//     window.addEventListener("scroll", () =>{
//         this.itemsToReveal.forEach(element => {
//             this.calculateIfscrolledTo(element)
//         })
//     })
// }


events(){
    window.addEventListener("scroll",this.scrollThrottle)
    window.addEventListener("resize",debounce(()=>{
        console.log("resizing just ran");
        this.browserHeight = window.innerHeight
    },333))
}


calcCaller(){
    console.log("scroll ran//calcClaller");
    this.itemsToReveal.forEach(element => {
       if (element.isRevealed==false){
        this.calculateIfscrolledTo(element)
       }
    })
}

calculateIfscrolledTo(element){
    if(window.scrollY +this.browserHeight> element.offsetTop){
        let scrollPercent = (element.getBoundingClientRect().y/this.browserHeight) *100

    if (scrollPercent <this.thresholdPrecent){
        element.classList.add("reveal-item--is-visible")
        element.isRevealed = true
        if(element.isLastItem){
            window.removeEventListener("scroll",this.scrollThrottle)
        }
    }
    console.log("Element was scrolled");
    }
}

hidIntially (){
    this.itemsToReveal.forEach(element =>{
        element.classList.add("reveal-item")
        element.isRevealed = false
    })
    this.itemsToReveal[this.itemsToReveal.length-1].isLastItem = true
}
}

export default RevealOnScroll;