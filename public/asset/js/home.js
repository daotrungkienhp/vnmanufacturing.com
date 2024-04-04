let trendCat1 = '0x00190x-category-0-0-6'
let trendCat2 = '0x00190x-category-0-0-7'
let trendCat3 = '0x00190x-category-0-0-10'
let trendCat4 = '0x00190x-category-0-0-8'

// Count Trending Cat 1
countCatProducts(trendCat1, (countPro) => {
    let countProEl = document.getElementById('countCatPro1')
    countProEl.insertAdjacentHTML("beforeend", countPro + " Products");
})
// Count Trending Cat 2
countCatProducts(trendCat2, (countPro) => {
    let countProEl = document.getElementById('countCatPro2')
    countProEl.insertAdjacentHTML("beforeend", countPro + " Products");
})
// Count Trending Cat 3
countCatProducts(trendCat3, (countPro) => {
    console.log('catTrend3: ',countPro)
    let countProEl = document.getElementById('countCatPro3')
    countProEl.insertAdjacentHTML("beforeend", countPro + " Products");
})
// Count Trending Cat 4
countCatProducts(trendCat4, (countPro) => {
    console.log('catTrend4: ',countPro)
    let countProEl = document.getElementById('countCatPro4')
    countProEl.insertAdjacentHTML("beforeend", countPro + " Products");
})

catDescription();

// Latest Products
let catOfficeProductLoc = '0x00190x-category-0-0-5'
let catUnderplateLoc = '0x00190x-category-0-0-6'
let catTablewareLoc = '0x00190x-category-0-0-7'
let catStorageBasketLoc = '0x00190x-category-0-0-8'
let catBathroomBasketLoc = '0x00190x-category-0-0-9'
let catHomeDecorLoc = '0x00190x-category-0-0-10'

let officeProductEl = document.getElementById('products-tab-1')
let UnderplatesEl = document.getElementById('products-tab-2')
let tablewareEl = document.getElementById('products-tab-3')
let storageBasketEl = document.getElementById('products-tab-4')
let bathroomBasketEl = document.getElementById('products-tab-5')
let homeDecorEl = document.getElementById('products-tab-6')

getAllCatProducts(catOfficeProductLoc, officeProductEl, 8)
getAllCatProducts(catUnderplateLoc, UnderplatesEl, 8)
getAllCatProducts(catTablewareLoc, tablewareEl, 8)
getAllCatProducts(catStorageBasketLoc, storageBasketEl, 8)
getAllCatProducts(catBathroomBasketLoc, bathroomBasketEl, 8)
getAllCatProducts(catHomeDecorLoc, homeDecorEl, 8)

function countCatProducts(catLoc, callback) {
    let countPro = 0
    var option = {
        spaceLoc: '0x00190x-product',
        where: `publishStatus=published&categories<>${catLoc}`,
        limit: 1000
    }
    searchProducts()
    function searchProducts() {
        net.obj.search(option, (res) => {
            let offset = res.data.offset;
            let end = res.data.end;
            let list = res.data.list;
            console.log(countPro, list)
            countPro = list.length
            if (end === true) {
                // console.log('gmesList', gmesList)
                if (callback) callback(countPro);
                return;
            }

            option.offset = offset;
            searchProducts();
        });
    }
}

function catDescription() {
    let catDesc1El = document.getElementById('catDesc1')
    let catDesc2El = document.getElementById('catDesc2')
    let catDesc3El = document.getElementById('catDesc3')
    let catDesc4El = document.getElementById('catDesc4')

    net.obj.get(trendCat1, (res) => {
        catDesc1El.insertAdjacentHTML("beforeend", `${res.data.description}`);
    })

    net.obj.get(trendCat2, (res) => {
        catDesc2El.insertAdjacentHTML("beforeend", `${res.data.description}`);
    })

    net.obj.get(trendCat3, (res) => {
        catDesc3El.insertAdjacentHTML("beforeend", `${res.data.description}`);
    })

    net.obj.get(trendCat4, (res) => {
        catDesc4El.insertAdjacentHTML("beforeend", `${res.data.description}`);
    })
}

function getAllCatProducts(catLoc, pElementID, numPro) {

    var option = {
        spaceLoc: '0x00190x-product',
        where: `publishStatus=published&categories<>${catLoc}`,
        limit: 1000
    }
    console.log('optionPList', option)

    net.obj.search(option, (res) => {
        if (res.code != 0) { return alert('Error load post, please try again.') }

        let list = res.data.list;

        list.slice(-numPro).forEach(pItem => {
            let html

            html = `<a class="flex flex-col group bg-white border shadow-sm rounded-xl overflow-hidden hover:shadow-lg transition dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]"
                        href="./${pItem.slug}.html">
                        <div class="relative pt-[100%] rounded-t-xl overflow-hidden">
                            <img class="size-full absolute top-0 start-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-t-xl"
                                src="${pItem.thumb}"
                                alt="">
                        </div>
                        <div class="p-4 md:p-5">
                            <h3
                                class="tca-product-title-truncate text-lg font-bold text-gray-800 dark:text-white">
                                ${pItem.title}
                            </h3>
                            <p>${pItem.sku}</p>
                            <p
                                class="mt-3 font-normal text-gray-700 text-sm md:text-base md:min-h-[1rem] min-h-[2.5rem] max-w-sm">

                            <p class="tca-product-desc-truncate mt-1 text-gray-500 dark:text-gray-400">
                                ${pItem.excerpt}
                            </p>
                            <div
                                class="mt-3 capitalize font-bold leading-6 hover:text-tca-color-hover hover:cursor-pointer flex items-center">
                                <span>View Details</span>
                                <span><svg class="svg-icon ml-1 w-6 h-6">
                                        <use xlink:href="asset/img/svg-grid.svg?v=1.0#arrow-right"></use>
                                    </svg></span>
                            </div>
                        </div>

                    </a>`

            pElementID.insertAdjacentHTML("beforeend", html);

        });
    });
}

//run stats count number on scroll
function startCounts() {
    let startsCounterEl = document.getElementById('statsCounter');
    let countTradeStaffEl = document.getElementById('countTradeStaff')
    let startsTop = startsCounterEl.scrollTop;

    if (startsTop > 100) {

    }
}

function scrollTrigger(selector, options = {}) {
    let els = document.getElementById(selector)
    els = Array.from(els)
    els.forEach(el => {
        addObserver(el, options)
    })
}

function addObserver(el, options) {
    if (!('IntersectionObserver' in window)) {
        if (options.cb) {
            options.cb(el)
        } else {
            entry.target.classList.add('active')
        }
        return
    }
    let observer = new IntersectionObserver((entries, observer) => { //this takes a callback function which receives two arguments: the elemts list and the observer instance
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (options.cb) {
                    options.cb(el)
                } else {
                    entry.target.classList.add('stats-count-tradestaff')
                }
                observer.unobserve(entry.target)
            }
        })
    }, options)
    observer.observe(el)
}
// Example usages:
scrollTrigger('statsCounter')

scrollTrigger('countTradeStaff', {
    rootMargin: '-200px',
})

scrollTrigger('.loader', {
    rootMargin: '-200px',
    cb: function (el) {
        el.innerText = 'Loading...'
        setTimeout(() => {
            el.innerText = 'Task Complete!'
        }, 1000)
    }
})


