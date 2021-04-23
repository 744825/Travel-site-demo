import '../styles/styles.css'
import MobileMenu from './modules/MobileMenu'
import RevealOnScroll from './modules/RevealOnScroll'
import StickyHeader from './modules/StickyHeader'
import "lazysizes"
import ClientArea from "./modules/ClientArea"

import UploadProcess from "./modules/FileUploader"

new ClientArea()

let stickyHeader = new StickyHeader()
new RevealOnScroll(document.querySelectorAll(".feature-item"), 75)
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60)
let mobileMenu = new MobileMenu();

document.getElementById("upload").addEventListener("click", UploadProcess)




let modal 
document.querySelectorAll(".open-modal").forEach((el)=>el.addEventListener("click", e => {
  e.preventDefault();
  if (typeof modal == "undefined" ){
    import(/* webpackChunkName: "modal" */ "./modules/Modal").then(x => {
      modal= new x.default()
      setTimeout(()=> modal.openTheModal() ,200)
    }).catch(() => console.log("There was a error in loading modal"))
  } else{
    modal.openTheModal()
  }
}))



if (module.hot) {
  module.hot.accept()
}