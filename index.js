function toggleFunction() {
    console.log('hh')
    var x = document.getElementById("topnav");
    x.classList.toggle("expanded");
}
// function toggleFunction() {
//     var x = document.getElementById("topnav");
//     if (x.style.width == "0%") {
//         x.style.width = "50%";
//     } else {
//         x.style.width = "0%";
//     }
// }

function checkOrientation() {
    var x = document.getElementById("topnav");
    if (window.matchMedia("(orientation: landscape)").matches) { // Change the class name to "landscape" when in landscape orientation

        if (x.className === "nav-container responsive") {
            x.className = "nav-container"
        }


    } else {}
}

checkOrientation();

// Listen for the window resize event to detect orientation changes
window.addEventListener('resize', checkOrientation);


// services filter
// const filterContainer = document.querySelector(".services-filter"),
// servicesItems = document.querySelectorAll(".services-item");


// filterContainer.addEventListener("click", (event) =>{
// if(event.target.classList.contains("filter-item")){
//        // deactivate existing active 'filter-item'
//        filterContainer.querySelector(".active").classList.remove("active");
//        // activate new 'filter-item'
//        event.target.classList.add("active");
//        const filterValue = event.target.getAttribute("data-filter");
//        servicesItems.forEach((item) =>{
//       if(item.classList.contains(filterValue) || filterValue === 'all'){
//           item.classList.remove("hide");
//            item.classList.add("show");
//       }
//       else{
//           item.classList.remove("show");
//           item.classList.add("hide");
//       }
//        });
// }
// });

const filterContainer = document.querySelector(".services-filter");
const servicesItems = document.querySelectorAll(".services-item");

// Add 'active' class to the first filter item initially
const firstFilterItem = filterContainer.querySelector(".filter-item");
firstFilterItem.classList.add("active");

// Get the filter value of the first filter item
const firstFilterValue = firstFilterItem.getAttribute("data-filter");

// Show items corresponding to the first filter value
servicesItems.forEach(item => {
    if (item.classList.contains(firstFilterValue) || firstFilterValue === 'all') {
        item.classList.remove("hide");
        item.classList.add("show");
    } else {
        item.classList.remove("show");
        item.classList.add("hide");
    }
});

// Event listener for filter items
filterContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("filter-item")) { // deactivate existing active 'filter-item'
        filterContainer.querySelector(".active").classList.remove("active");
        // activate new 'filter-item'
        event.target.classList.add("active");
        const filterValue = event.target.getAttribute("data-filter");
        servicesItems.forEach((item) => {
            if (item.classList.contains(filterValue) || filterValue === 'all') {
                item.classList.remove("hide");
                item.classList.add("show");
            } else {
                item.classList.remove("show");
                item.classList.add("hide");
            }
        });
    }
});


// testimonials
const slider = document.querySelector('.slider');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dots = document.querySelectorAll('.dot');

let currentSlide = 0;
const slideWidth = slider.querySelector('.card').clientWidth;
let isDragging = false;
let startX = 0;

// Function to move to a specific slide
function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    slider.style.transform = `translateX(-${
        currentSlide * slideWidth
    }px)`;
    activateDot(currentSlide);
}

// Function to activate the corresponding dot
function activateDot(slideIndex) {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[slideIndex].classList.add('active');
}

// Autoplay functionality
let autoplay = true;
let intervalId = null;

function startAutoplay() {
    intervalId = setInterval(() => {
        currentSlide++;
        goToSlide(currentSlide % dots.length); // Loop back to first slide
    }, 3000); // Change the value for desired autoplay interval in milliseconds
}

function stopAutoplay() {
    clearInterval(intervalId);
    intervalId = null;
}

// Event listeners for buttons and dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
});

prevBtn.addEventListener('click', () => {
    currentSlide--;
    goToSlide(currentSlide < 0 ? dots.length - 1 : currentSlide);
    stopAutoplay(); // Stop autoplay on manual navigation
});

nextBtn.addEventListener('click', () => {
    currentSlide++;
    goToSlide(currentSlide % dots.length);
    stopAutoplay(); // Stop autoplay on manual navigation
});

// Event listeners for touch devices
slider.addEventListener('mousedown', startDrag);
slider.addEventListener('touchstart', startDrag); // For touchscreens

function startDrag(event) {
    event.preventDefault(); // Prevent default scrolling behavior
    isDragging = true;
    startX = event.clientX || event.touches[0].clientX; // Get initial touch/mouse position
}

// document.addEventListener('mouseup', endDrag);
// document.addEventListener('touchend', endDrag); // For touchscreens

function endDrag(event) {
    event.preventDefault();
    isDragging = false;
    if (isDragging) { // Check if dragging started
        const movedX = event.clientX || event.touches[0].clientX - startX;
        const threshold = slideWidth / 3; // Define threshold for swipe detection

        if (movedX > threshold) {
            currentSlide--; // Swipe right, move to previous slide
        } else if (movedX < - threshold) {
            currentSlide++; // Swipe left, move to next slide
        }goToSlide(currentSlide < 0 ? dots.length - 1 : currentSlide % dots.length);
    }
}


// Start autoplay on load
startAutoplay();

// Pause autoplay on hover
slider.addEventListener('mouseenter', stopAutoplay);
slider.addEventListener('mouseleave', startAutoplay);


// Library filter
const libraryFilter = document.querySelector(".library-filter");
const libraryItem = document.querySelectorAll(".library-item");

// Add 'active' class to the first filter item initially
const libraryFirstFilter = libraryFilter.querySelector(".filter-item");
libraryFirstFilter.classList.add("active");

// Get the filter value of the first filter item
const libraryFirstValue = libraryFirstFilter.getAttribute("data-filter");

// Show items corresponding to the first filter value
libraryItem.forEach(item => {
    if (item.classList.contains(libraryFirstValue) || libraryFirstValue === 'all') {
        item.classList.remove("hide");
        item.classList.add("show");
    } else {
        item.classList.remove("show");
        item.classList.add("hide");
    }
});

// Event listener for filter items
libraryFilter.addEventListener("click", (event) => {
    if (event.target.classList.contains("filter-item")) { // deactivate existing active 'filter-item'
        libraryFilter.querySelector(".active").classList.remove("active");
        // activate new 'filter-item'
        event.target.classList.add("active");
        const filterValue = event.target.getAttribute("data-filter");
        libraryItem.forEach((item) => {
            if (item.classList.contains(filterValue) || filterValue === 'all') {
                item.classList.remove("hide");
                item.classList.add("show");
            } else {
                item.classList.remove("show");
                item.classList.add("hide");
            }
        });
    }
});



