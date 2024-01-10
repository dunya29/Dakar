
const fixedBlocks = document.querySelectorAll(".fixed-block")
const overlay = document.querySelector(".overlay")
const header = document.querySelector(".header")
const modalShowBtn = document.querySelectorAll(".modal-show")
const modal = document.querySelectorAll(".modal")
const feedbackModal = document.querySelector(".feedback-modal")
const successModal = document.querySelector(".success-modal")
const errorModal = document.querySelector(".error-modal")
const desktopHeader = document.querySelector(".desktop-header")
const mobHeader = document.querySelector(".mob-header")
let animSpd = 400
//get path to sprite id
function sprite(id) {
  return '<svg><use xlink:href="img/icons/sprite.svg#' + id + '"></use></svg>'
}
//enable scroll
function enableScroll() {
  if (fixedBlocks) {
    fixedBlocks.forEach(block => block.style.paddingRight = '0px')
  }
  document.body.style.paddingRight = '0px'
  document.body.classList.remove("no-scroll")
}
//disable scroll
function disableScroll() {
  paddingValue = window.innerWidth > 325 ? window.innerWidth - document.documentElement.clientWidth + 'px' : 0
  if (fixedBlocks) {
    fixedBlocks.forEach(block => block.style.paddingRight = paddingValue)
  }
  document.body.style.paddingRight = paddingValue
  document.body.classList.add("no-scroll");
}
//smoothdrop
function smoothDrop(header, body) {
  if (!header.classList.contains("active")) {
    body.style.height = 'auto';
    let height = body.clientHeight + 1 + 'px';
    body.style.height = '0px';
    setTimeout(function () {
      body.style.height = height;
    }, 0);
  } else {
    body.style.height = '0px';
  }
  header.classList.toggle("active")
}
//swhitch tab
function tabSwitch(nav,block) {
  nav.forEach((item,idx) => {
    item.addEventListener("click", () => {
      let href = item.getAttribute("data-nav")
      nav.forEach(el => {
        el.classList.remove("active")
      })
      block.forEach(el => {
        el.classList.remove("active")
      })
      item.classList.add("active")
      block[idx].classList.add("active")
      item.style.opacity = "0"
        block[idx].style.opacity = "0"
      setTimeout(() => {
        item.style.opacity = "1"
        block[idx].style.opacity = "1"
      }, 0);
    })
  });
}
// formSuccess
function formSuccess(form) {
  form.querySelectorAll(".item-form").forEach(item => item.classList.remove("error"))
  form.querySelectorAll("input").forEach(inp => {
    if (!["hidden", "checkbox", "radio"].includes(inp.type) ) {
      inp.value = ""      
    }
    if (["checkbox", "radio"].includes(inp.type) && !inp.classList.contains("required")) {
      inp.checked = false
    }
  })
  if (form.querySelector("textarea")) {
    form.querySelector("textarea").value = ""
  }
  if (form.querySelector(".file-form__item")) {
    form.querySelector(".file-form__items").innerHTML = ""
  }
  let modal = document.querySelector(".modal.open")
  if (modal) {
    modal.classList.remove("open")
  }
  openModal(successModal)
}
//open modal
function openModal(modal) {
  if (!mobHeader.classList.contains("show")) {
    disableScroll()
  }
  modal.classList.add("open")
}
//close modal
function closeModal(modal) {
  modal.classList.remove("open")
  setTimeout(() => {
    if (!mobHeader.classList.contains("show")) {
      enableScroll()
    }
  }, animSpd);
}
// modal click outside
modal.forEach(mod => {
  mod.addEventListener("click", e => {
    if (!mod.querySelector(".modal__content").contains(e.target) || mod.querySelector(".modal__close").contains(e.target)) {
      closeModal(mod)
    }
  })
})
// modal button on click
modalShowBtn.forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault()
    let href = btn.getAttribute("data-modal")
    openModal(document.getElementById(href))
  })
})
//desktop menu hover
desktopHeader.querySelectorAll(".menu__item").forEach(item => {
  if(item.querySelector(".menu__subnavs")) {
    item.addEventListener("mouseenter", () => {
      if (window.innerWidth > 1260.98) {
        item.querySelector(".menu__subnavs").style.paddingTop = header.scrollHeight + "px"
        disableScroll()
        overlay.classList.add("show")
      }
    })
    item.addEventListener("mouseleave", () => {
      if(window.innerWidth > 1260.98) {
        enableScroll()
        overlay.classList.remove("show")
      }
    })
  }
})
// open mob menu
desktopHeader.querySelector(".icon-menu").addEventListener("click", () => {
  window.scrollTo(0, 0)
  overlay.classList.add("show")
  mobHeader.classList.add("show")
  disableScroll()
})
//close mob menu
mobHeader.querySelector(".icon-menu").addEventListener("click", () => {
  mobHeader.classList.remove("show")
  overlay.classList.remove("show")
  enableScroll()
  $(mobHeader).find(".menu__item").each(function() {
    $(this).removeClass("active").find(".menu__subnavs").slideUp()
  })
  mobHeader.querySelectorAll(".menu__subnavs").forEach(item => {
    item.querySelector(".stroke-btn").textContent = "Посмотреть всё"
    item.classList.remove("showAll")
  })
})
// close mob menu on resize
window.addEventListener("resize", () => {
  if (window.innerWidth > 1260.98 && mobHeader.classList.contains("show")) {
    mobHeader.querySelector(".icon-menu").click()
  }
})
// mob menu link onclick
mobHeader.querySelectorAll(".menu__link").forEach(item => {
  item.addEventListener("click", e => {
    if (item.parentNode.querySelector(".menu__subnavs")) {
      e.preventDefault()
      if (!item.parentNode.classList.contains("active")) {
        $(item).parents(".menu__item").addClass("active").find(".menu__subnavs").slideDown()
        $(item).parents(".menu__item").siblings(".menu__item").removeClass("active").find(".menu__subnavs").slideUp()
      } else {
        $(item).parents(".menu__item").removeClass("active").find(".menu__subnavs").slideUp()
      }
    }
  })
})
// mob menu subnavs btn
mobHeader.querySelectorAll(".menu__subnavs").forEach(item => {
  const btn = item.querySelector(".stroke-btn")
  if (item.querySelectorAll("li").length > 12) {
    btn.style.display = "flex"
    btn.addEventListener("click", () => {
      if (!item.classList.contains("showAll")) {
        btn.textContent = "Скрыть всё"
        item.classList.add("showAll")
      } else {
        btn.textContent = "Посмотреть всё"
        item.classList.remove("showAll")
      }
    })
  }
})
// input file type
let fileTypes = ["image/png", "image/jpeg", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/pdf", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]
document.querySelectorAll(".file-form").forEach(item => {
  item.querySelector("input").addEventListener("change", e => {  
    let files = e.target.files
    for (let i = 0; i < files.length; i++) {
      let file = files[i]
      if (file.size >  10 * 1024 * 1024) {
        item.querySelector("input").value = "" 
        item.classList.add("error")
        item.querySelector(".file-form__items").innerHTML = "" 
        item.querySelector("[data-error]").textContent = "Файл должен быть менее 10 МБ"
      } else if (!fileTypes.includes(file.type)) {
        item.querySelector("input").value = "" 
        item.classList.add("error")
        item.querySelector(".file-form__items").innerHTML = "" 
        item.querySelector("[data-error]").textContent = 'Разрешённые форматы: doc, docx, pdf, xls, xlsx, jpg, png'
      } else {
        item.classList.remove("error")
        item.querySelector("[data-error]").textContent = "" 
        item.querySelector(".file-form__items").innerHTML = `<div class="file-form__item">
        <span class="file-form__name">${file.name} ${(file.size / 1024).toFixed(2)}KB</span>
        <span class="file-form__del">${sprite("del")}</span>
        </div>
    `
      }
    }
  })
  item.addEventListener("click", e => {
    const del = item.querySelector(".file-form__del")
    if (del && del.contains(e.target)) {
      item.querySelector("input").value = ""
      setTimeout(() => {
        item.querySelector(".file-form__items").innerHTML = ""   
      }, 0);
    }
  }) 
})
//switch active tab/block
const switchBlock = document.querySelectorAll(".switch-block")
if (switchBlock) {
  switchBlock.forEach(item => {
    tabSwitch(item.querySelectorAll("[data-nav]"),item.querySelectorAll("[data-block]"))
  })
}
//mask input
const inp = document.querySelectorAll('input[type=tel]')
if (inp) {
  inp.forEach(item => {
    Inputmask({ "mask": "+7 999 999-99-99" }).mask(item);
  })
}
// swiper 4 el
const swiper4 = document.querySelectorAll('.swiper-grid-4')
if (swiper4) {
  swiper4.forEach(item => {
    const swiper = new Swiper(item, {
      slidesPerView: 1.4,
      spaceBetween: 8,
      observer: true,
      observeParents: true,
      watchSlidesProgress: true,
      breakpoints: {
        1260.98: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
        991.98: {
          slidesPerView: 4,
          spaceBetween: 16,
        },
        767.98: {
          slidesPerView: 3,
          spaceBetween: 16,
        },
        479.98: {
          slidesPerView: 2,
          spaceBetween: 16
        },
        374.98: {
          slidesPerView: 2,
          spaceBetween: 8
        }
      },
      navigation: {
        prevEl: item.parentNode.querySelector(".swiper-btn.prev"),
        nextEl: item.parentNode.querySelector(".swiper-btn.next")
      },
      speed: 800
    })
  })
}
// swiper 3 el
const swiper3 = document.querySelectorAll('.swiper-grid-3')
if (swiper3) {
  swiper3.forEach(item => {
    const swiper = new Swiper(item, {
      slidesPerView: 2,
      spaceBetween: 8,
      observer: true,
      observeParents: true,
      watchSlidesProgress: true,
      breakpoints: {
        1260.98: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        991.98: {
          slidesPerView: 3,
          spaceBetween: 16,
        },
        575.98: {
          slidesPerView: 3,
          spaceBetween: 16
        },
        479.98: {
          slidesPerView: 3,
          spaceBetween: 16
        },
      },
      navigation: {
        prevEl: item.parentNode.querySelector(".swiper-btn.prev"),
        nextEl: item.parentNode.querySelector(".swiper-btn.next")
      },
      speed: 800
    })
  })
}
// swiper 2 el
const swiper2 = document.querySelectorAll('.swiper-grid-2')
if (swiper2) {
  swiper2.forEach(item => {
    const swiper = new Swiper(item, {
      slidesPerView: 1,
      spaceBetween: 8,
      observer: true,
      observeParents: true,
      watchSlidesProgress: true,
      breakpoints: {
        1260.98: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        991.98: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
        767.98: {
          slidesPerView: 1.5,
          spaceBetween: 16
        },
        479.98: {
          slidesPerView: 1.2,
          spaceBetween: 16
        },
      },
      navigation: {
        prevEl: item.parentNode.querySelector(".swiper-btn.prev"),
        nextEl: item.parentNode.querySelector(".swiper-btn.next")
      },
      speed: 800
    })
  })
}
// intro swiper
const intro = document.querySelector('.intro')
if (intro) {
  const swiper = new Swiper(intro.querySelector(".swiper"), {
    slidesPerView: 1,
    spaceBetween: 16,
    observer: true,
    observeParents: true,
    effect: "fade",
    breakpoints: {
      1260.98: {
        spaceBetween: 24,
      },
    },
    navigation: {
      prevEl: intro.querySelector(".swiper-btn.prev"),
      nextEl: intro.querySelector(".swiper-btn.next")
    },
    pagination: {
      el: intro.querySelector(".swiper-pagination"),
      clickable: true
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    speed: 500
  })
}
// catalog filter
const catTabs = document.querySelector('.catalog .tabs')
function allInputsAreChecked(inputs) {
  inputs.forEach(item => {
    item.checked = false
    item.removeAttribute("checked")
  })
}
if ( catTabs) {
  const allInp = catTabs.querySelectorAll("label input")[0]
  const inputs = Array.from(catTabs.querySelectorAll("label input")).slice(1)
  if(allInp.checked) {
    allInputsAreChecked(inputs)
    allInp.parentNode.classList.add("disabled")
  }
  allInp.addEventListener("change", () => {
    if(allInp.checked) {
      allInputsAreChecked(inputs)
      allInp.parentNode.classList.add("disabled")
    }
  })
  inputs.forEach(item => {
    item.addEventListener("change", () => {
      let findCheckedInp = inputs.find(item => item.checked)
      if (findCheckedInp) {
        allInp.checked = false
        allInp.removeAttribute("checked")
        allInp.parentNode.classList.remove("disabled")
      } else {
        allInp.checked = true
        item.setAttribute("checked","")
        allInputsAreChecked(inputs)
        allInp.parentNode.classList.add("disabled")
      }
    })
  })
}
// accordion slidedown/slideup
const accHeader = document.querySelectorAll(".accordion__header")
const accBody = document.querySelectorAll(".accordion__body")
if(accHeader && accBody) {
  accHeader.forEach( (item,idx) => {
    item.addEventListener("click", () => {
      accHeader.forEach( el => {
        if (!item.classList.contains("active") && el.classList.contains("active")) {
          el.click()
        }
      })
      smoothDrop(accHeader[idx], accBody[idx])
    })
  })
  window.addEventListener("resize", () => {
    accHeader.forEach( (item,idx) => {
      if (item.classList.contains("active")) {
        accBody[idx].style.height = 'auto';
        accBody[idx].style.height = accBody[idx].scrollHeight + 'px';
      }
    })
  })
}
// product images slider
let productSwiperMobInit = false
let productSwiperDeskInit = false
let productThumbSwiper
let productSwiperMob
let productSwiperDesk
if (document.querySelector(".product")) {
  function productSwiperInit() {
    if (window.innerWidth <= 991) {
      if (productSwiperDeskInit) {
        productSwiperDesk.destroy()
        productThumbSwiper.destroy()
        productSwiperDeskInit = false
      }
      if (!productSwiperMobInit) {
        productSwiperMob = new Swiper(".product__mainswiper", {
          slidesPerView: 1,
          observer: true,
          observeParents: true,
          spaceBetween: 8,
          autoplay: {
            delay: 5000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false
          },
          breakpoints: {
            767.98: {
              slidesPerView: 1.3,
              spaceBetween: 16,
            },
            479.98: {
              slidesPerView: 1.1,
              spaceBetween: 16,
            }
          },
          speed: 800
        })
        productSwiperMobInit = true
      }
    } else {
      if (productSwiperMobInit) {
        productSwiperMob.destroy()
        productSwiperMobInit = false
      }
      if (!productSwiperDeskInit) {
        productThumbSwiper = new Swiper(".product__thumbswiper", {
          slidesPerView: 4,
          observer: true,
          observeParents: true,
          watchSlidesProgress: true,
          spaceBetween: 16,
          breakpoints: {
            1260.98: {
              spaceBetween: 24,
            },
          },
        })
        productSwiperDesk = new Swiper(".product__mainswiper", {
          slidesPerView: 1,
          observer: true,
          observeParents: true,
          effect: 'fade',
          thumbs: {
            swiper: productThumbSwiper,
          },
          speed: 500,
        })
        productSwiperDeskInit = true
      }
    }
  }
  productSwiperInit()
  window.addEventListener("resize", productSwiperInit)
}


// works slider
function worksSlider() {
  document.querySelectorAll(".works .item-work").forEach(item => {
    const worksImg = item.querySelectorAll(".item-work__img")
    for (let i = 0; i < worksImg.length; i++) {
      let span1 = document.createElement("span")
      let span2 = document.createElement("span")
      item.querySelector(".item-work__hovers").append(span1)
      item.querySelector(".item-work__controls").append(span2)
    }
    function move(el, pos) {
      let parentLeft = item.querySelector(".item-work__hovers").getBoundingClientRect().left
      let elWidth = el.clientWidth
      let activeEl = Math.ceil((pos - parentLeft) / elWidth)
      if (activeEl >= 1 && activeEl <= worksImg.length) {
        setActive(activeEl)
      } else {
        setActive(1)
      }
    }
    function leave() {
      setActive(1)
    }
    function setActive(activeEl) {
      item.querySelectorAll(".item-work__img").forEach(img => img.style.opacity = 0)
      item.querySelectorAll(".item-work__img")[activeEl - 1].style.opacity = 1
      item.querySelectorAll(".item-work__controls span").forEach(span => span.style.backgroundColor = "#ffffff")
      item.querySelectorAll(".item-work__controls span")[activeEl - 1].style.backgroundColor = "#2667FF"
    }
    item.querySelectorAll(".item-work__hovers span").forEach((el, idx) => {
      el.addEventListener("click", () => {
        item.querySelectorAll(".item-work__img")[idx].click()
      })
      el.addEventListener("touchmove", (e) => {
        move(el, e.touches[0].clientX)
      })
      el.addEventListener("touchend", () => leave())
      el.addEventListener("mousemove", (e) => {
        move(el, e.clientX)
      })
      el.addEventListener("mouseleave", () => leave())
    })
  })
}
if (document.querySelector(".works .item-work")) {
  worksSlider()
}
//custom fancybox
const fancyItems = document.querySelectorAll("[data-fancy]")
fancyItems.forEach(item => {
  item.addEventListener("click", e => {
    let imgSrc = []
    let objectFit = item.getAttribute("data-fit") ? item.getAttribute("data-fit") : ""
    let val = item.getAttribute("data-fancy")
    let thumb = item.hasAttribute("data-thumb")
    let txt = item.hasAttribute("data-txt")
    fancyItems.forEach(el => {
      if (!el.closest(".swiper-slide-duplicate") && el.getAttribute("data-fancy") === val) {
        imgSrc.push(el.getAttribute("data-src"))
      }
    })
    let initialSl = imgSrc.indexOf(item.getAttribute("data-src"))

    document.querySelector(".footer").insertAdjacentHTML('afterend', `
    <div class="fancy-modal">
      <div class="custom-scroll fancy-modal__inner">
        <div class="container">
            <div class="mb-60 fancy-modal__top">
            ${txt ? `<h4>${item.getAttribute("data-txt")}</h4>` : ""}
              <button class="btn fancy-modal__close" aria-label="Закрыть всплывающее окно"></button>
            </div>
            <div class="fancy-modal__content">
              <div class="swiper mainswiper">
                <div class="swiper-wrapper">
                   ${imgSrc.map(item => `<div class="swiper-slide">
                         <div class="swiper-img ${objectFit}">
                             <img src=${item} alt="">
                         </div>
                     </div>`).join("")}
                </div>
              </div>
              ${thumb ? `<div class="swiper thumbswiper">
              <div class="swiper-wrapper grid-container">
                ${imgSrc.map(item => `<a class="swiper-slide">
                   <div class="swiper-img cover">
                       <img src=${item} alt="">
                   </div>
               </a>`).join("")}
             </div>
            </div>` : ""}
            </div>
        </div>
      </div>
    </div>
   `);
    let fancyThumbSwiper = new Swiper(".fancy-modal .thumbswiper", {
      slidesPerView: 4,
      spaceBetween: 8,
      direction: 'horizontal',
      observer: true,
      observeParents: true,
      watchSlidesProgress: true,
      initialSlide: initialSl,
      grid: {
        rows: 1,
        fill: "column"
      },
      breakpoints: {
        1260.98: {
          slidesPerView: 4,
          spaceBetween: 24,
          direction: "vertical",
          grid: {
            rows: 2,
            fill: "column"
          },
        },
        767.98: {
          slidesPerView: 4,
          spaceBetween: 16,
          direction: "vertical",
          grid: {
            rows: 2,
            fill: "column"
          },
        },
        479.98: {
          slidesPerView: 5,
          spaceBetween: 16,
          direction: "horizontal",
          grid: {
            rows: 1,
            fill: "column"
          },
        },
      },
    }) 
    let fancyMainSwiper = new Swiper(".fancy-modal .mainswiper", {
      slidesPerView: 1,
      slidesPerGroup: 1,
      observer: true,
      observeParents: true,
      initialSlide: initialSl,
      effect: "fade",
      thumbs: {
        swiper: thumb ? fancyThumbSwiper : null,
      },
      speed: 500,
    })
    const fancyModal = document.querySelector(".fancy-modal")
    if (document.querySelector(".reviews") && document.querySelector(".reviews").contains(e.target)) {
      fancyModal.classList.add("fancy-modal--reviews")
    }
    openModal(fancyModal)
    fancyModal.querySelector(".fancy-modal__close").addEventListener("click", e => {
      closeModal(fancyModal)
      setTimeout(() => {
        fancyModal.remove()
      }, animSpd);
    })
  })

})