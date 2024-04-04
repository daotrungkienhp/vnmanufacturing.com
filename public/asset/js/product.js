let loc = document.getElementById('productLoc').innerText
console.log("loc:",loc)
let editorData

let albumDataEl = document.getElementById('albumData')
console.log('albumEL',albumDataEl)
let albumLink = JSON.parse(decodeURIComponent(albumDataEl.innerText))
console.log('albumLink:',albumLink)

renderRandomProducts();

showAlbum(albumLink, (swiper) => {
    //Initialize Swiper
    var swiper = new Swiper(".mySwiper", {
        loop: true,
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },

    });
    var swiper2 = new Swiper(".mySwiper2", {
        loop: true,
        spaceBetween: 10,
        thumbs: {
            swiper: swiper,
        },
    });
})

function showAlbum(productAlbum, callback) {
    let html = '';
    let pAlbum1 = document.getElementById('product-album1')
    let pAlbum2 = document.getElementById('product-album2')
    
    productAlbum.forEach(item => {
        html = `<div class="swiper-slide"><img src="${item.url}" /></div>`;
        pAlbum1.insertAdjacentHTML("beforeend", html);
        pAlbum2.insertAdjacentHTML("beforeend", html);
    })
    callback();
}

function renderRandomProducts() {
    var option = {
        spaceLoc: '0x00190x-product',
        where: `publishStatus=published`,
        limit: 1000
    }
    net.obj.search(option, (res) => {
        console.log('proList', res)
        if (res.code != 0) { return alert('Error load product categories, please try again.') }

        let list = res.data.list;
        let randomPro = getMultipleRandom(list, 4)
        let relatedProductsEl = document.getElementById('related-products')
        randomPro.forEach(pItem => {
            let html;

            html = `<div class="flex flex-row py-5">
            <img class="w-[80px] aspect-square mr-[10px] border p-[10px]"
                src="${pItem.thumb}" alt="">
            <div class="flex flex-col">
                <div class="tca-product-title-truncate"><a class="hover:text-tca-color-hover" href="${pItem.slug}.html">${pItem.title}</a></div>
                <div><span class="product-price-aside">$${pItem.priceSale}</span><span class="product-pieces-aside">
                        / Piece</span></div>
            </div>
        </div>`

            relatedProductsEl.insertAdjacentHTML("beforeend", html);
        })
    })
}

function getMultipleRandom(arr, num) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, num);
}

// Sticky product menu tab 
var div_top = $('.descriptonTabs').offset().top;
let div_container = document.getElementById('productContainer').clientWidth;
console.log(div_container,document.getElementsByClassName('descriptonTabs')[0])
 
$(window).scroll(function() {
    var window_top = $(window).scrollTop() - 0;
    if (window_top > div_top && $(window).scrollTop() <= $(document).height() / 2) {
        if (!$('.descriptonTabs').is('.sticky')) {
            $('.descriptonTabs').addClass('sticky');
            $('.descriptonTabs').css("width",div_container+"px")
            // document.getElementsByClassName('descriptonTabs')[0].style.width = div_container+"px";
        }
    } else {
        $('.descriptonTabs').removeClass('sticky');
    }
});

// Sticky sidebar 
// let div_sidebar = document.getElementById('asideBar').clientWidth;
// $(function() {
//     var top = $('.stickRightSidebar').offset().top - parseFloat($('.stickRightSidebar').css('marginTop').replace(/auto/, 0));
//     var footTop = $('#footer').offset().top - parseFloat($('#footer').css('marginTop').replace(/auto/, 0));
  
//     var maxY = footTop - $('.stickRightSidebar').outerHeight();
  
//     $(window).scroll(function(evt) {
//       var y = $(this).scrollTop();
//       if (y > top) {
//         if (y < maxY) {
//           $('.stickRightSidebar').addClass('sticky').removeAttr('style');
//         } else {
//           $('.stickRightSidebar').removeClass('sticky').css({
//             position: 'absolute',
//             top: (maxY - top) + 'px'
//           });
//         }
//       } else {
//         $('.stickRightSidebar').removeClass('sticky');
//       }
//     });
//   });