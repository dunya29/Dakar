/* const infra = document.querySelector(".infra .container")
const infraSlides = document.querySelectorAll(".infra .swiper-slide")
const parent = infra.parentNode
let parentPaddVal = getComputedStyle(parent).getPropertyValue("padding-bottom").replace("px","")
let scrollDur = 300
let infraTop =  infra.getBoundingClientRect().top +  window.pageYOffset
let parentBott =  parent.getBoundingClientRect().bottom +  window.pageYOffset - parentPaddVal
let topPos = window.innerHeight/2 - infra.clientHeight/2
parent.style.height = parent.clientHeight + scrollDur * infraSlides.length + "px"
window.addEventListener("scroll", () => {
  let windowTop = window.pageYOffset || document.documentElement.scrollTop; 
 if (windowTop + topPos  + infra.clientHeight >  parentBott ) {
    infra.style.position = "static"
    infra.style.transform = "translate(0,0)"
    infra.style.marginTop = "auto"
  }else if (windowTop + topPos  > infraTop ) {
    infra.style.position = "fixed"
    infra.style.top = "50%"
    infra.style.left = "50%"
    infra.style.transform = "translate(-50%,-50%)"
    infra.style.marginTop = "0"
    infraswiper.slideTo(Math.floor(Math.abs(infraTop - windowTop)/scrollDur))
  }
  else {
    infra.style.position = "static"
    infra.style.transform = "translate(0%,0%)"
    infra.style.marginTop = "0"
  }
})


const infra = document.querySelector(".infra .container")
const slLen = document.querySelectorAll(".infra .swiper-slide")
let out = 300
infra.parentNode.style.height = infra.parentNode.clientHeight + out * slLen.length + "px"

let itemTop =  infra.getBoundingClientRect().top +  window.pageYOffset
let d = getComputedStyle(infra.parentNode).getPropertyValue("padding-bottom").replace("px","")
let par =  infra.parentNode.getBoundingClientRect().top +  window.pageYOffset + infra.parentNode.clientHeight - d
let val = window.innerHeight/2 - infra.clientHeight/2
window.addEventListener("scroll", () => {
 if (window.pageYOffset + val  + infra.clientHeight >  par ) {//4396
    infra.style.position = "static"
        infra.style.transform = "translate(0,0)"
        infra.style.marginTop = "auto"
  }else if (window.pageYOffset + val  > itemTop ) {//4396
    infra.style.position = "fixed"
        infra.style.top = "50%"
        infra.style.left = "50%"
        infra.style.transform = "translate(-50%,-50%)"
        infra.style.marginTop = "0"
        console.log(itemTop - window.pageYOffset)
        let f = Math.floor(Math.abs(itemTop - window.pageYOffset)/out)
        infraswiper.slideTo(f)
  }
  else {
    infra.style.position = "static"
    infra.style.transform = "translate(0%,0%)"
    infra.style.marginTop = "0"
  }
}) *//* 
if (document.querySelector(".flat__images")) {
  const btn = document.querySelector(".flat__btn")
  let thumbsSwiper = new Swiper(".flat__thumbswiper", {
    slidesPerView: 6,
    spaceBetween: 20,
    direction: 'vertical',
    observer: true,
    observeParents: true,
    freeMode: true,
    speed: 800
  })
  let mainSwiper = new Swiper(".flat__swiper", {
    slidesPerView: 1,
    observer: true,
    observeParents: true,
    effect: 'fade',
    thumbs: {
      swiper: thumbsSwiper,
    },
    speed: 300
  })
  btn.addEventListener("click", () => {
    mainSwiper.slides[mainSwiper.activeIndex].click()
  })
  btn.addEventListener("click", () => {
    let imgSrc = []
    document.querySelector(".flat__swiper").querySelectorAll(".swiper-slide").forEach(slide => imgSrc.push(slide.getAttribute("data-img")))
    document.querySelector("footer").insertAdjacentHTML('afterend', `
    <div class="modal flat-plan-modal">
        <div class="modal__overlay">
           <div class="modal__content">
               <button class="modal__close" aria-label="Закрыть всплывающее окно"></button>
               <div class="swiper flat-plan-swiper">
                   <div class="swiper-wrapper">
                       ${imgSrc.map(item => `<div class="swiper-slide">
                            <div class="media-contain">
                                <img src=${item} alt="">
                            </div>
                        </div>`
    ).join("")}
                   </div>
               </div>
           </div>
        </div>
    </div>
  `);
    let swiper = new Swiper(".flat-plan-swiper", {
      slidesPerView: 2.33,
      observer: true,
      observeParents: true,
      centeredSlides: true,
      spaceBetween: 40,
      initialSlide: mainSwiper.activeIndex
    })
    const flatModal = document.querySelector(".flat-plan-modal")
    openModal(flatModal)
    flatModal.addEventListener("click", e => {
      if (!flatModal.querySelector(".modal__content").contains(e.target) || flatModal.querySelector(".modal__close").contains(e.target)) {
        closeModal(flatModal)
        setTimeout(() => {
          flatModal.remove()
        }, modalAnimSpd);
      }
    })
  }) 
}*/