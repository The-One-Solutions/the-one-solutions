var slider1 = document.getElementById('slider1'),
    sliderItems = document.getElementById('slides'),
    prev = document.getElementById('prev'),
    next = document.getElementById('next');
    // pagination = document.getElementById('pagination');

function slide(wrapper, items, prev, next) {
    var posX1 = 0,
        posX2 = 0,
        posInitial,
        posFinal,
        threshold = 100,
        slides = items.getElementsByClassName('slide'),
        slidesLength = slides.length,
        slideSize = items.getElementsByClassName('slide')[0].offsetWidth,
        firstSlide = slides[0],
        lastSlide = slides[slidesLength - 1],
        cloneFirst = firstSlide.cloneNode(true),
        cloneLast = lastSlide.cloneNode(true),
        index = 0,
        allowShift = true;

    // Clone first and last slide
    items.appendChild(cloneFirst);
    items.insertBefore(cloneLast, firstSlide);
    wrapper.classList.add('loaded');

    // Mouse events
    items.onmousedown = dragStart;

    // Touch events
    items.addEventListener('touchstart', dragStart);
    items.addEventListener('touchend', dragEnd);
    items.addEventListener('touchmove', dragAction);

    // Click events
    prev.addEventListener('click', function () {
        shiftSlide(-1)
    });
    next.addEventListener('click', function () {
        shiftSlide(1)
    });

    // Transition events
    items.addEventListener('transitionend', checkIndex);

    var autoplayInterval = setInterval(function () {
        shiftSlide(1);
    }, 5000);
    // Change the interval as needed

    // Pause autoplay on hover
    wrapper.addEventListener('mouseenter', function () {
        clearInterval(autoplayInterval);
    });

    // Resume autoplay on mouse leave
    wrapper.addEventListener('mouseleave', function () {
        autoplayInterval = setInterval(function () {
            shiftSlide(1);
        }, 5000); // Change the interval as needed
    });


    function dragStart(e) {
        e = e || window.event;
        // e.preventDefault();
        e.stopPropagation();
        posInitial = items.offsetLeft;

        if (e.type == 'touchstart') {
            posX1 = e.touches[0].clientX;
        } else {
            posX1 = e.clientX;
            document.onmouseup = dragEnd;
            document.onmousemove = dragAction;
        }
    }

    function dragAction(e) {
        e = e || window.event;

        if (e.type == 'touchmove') {
            posX2 = posX1 - e.touches[0].clientX;
            posX1 = e.touches[0].clientX;
        } else {
            posX2 = posX1 - e.clientX;
            posX1 = e.clientX;
        } items.style.left = (items.offsetLeft - posX2) + "px";
    }



    function dragEnd(e) {
        posFinal = items.offsetLeft;
        if (posFinal - posInitial < - threshold) {
            shiftSlide(1, 'drag');
        } else if (posFinal - posInitial > threshold) {
            shiftSlide(-1, 'drag');
        } else {
            items.style.left = (posInitial) + "px";
        }

        document.onmouseup = null;
        document.onmousemove = null;
    }

    function shiftSlide(dir, action) {
        items.classList.add('shifting');

        if (allowShift) {
            if (! action) {
                posInitial = items.offsetLeft;
            }

            if (dir == 1) {
                items.style.left = (posInitial - slideSize) + "px";
                index++;
            } else if (dir == -1) {
                items.style.left = (posInitial + slideSize) + "px";
                index--;
            }
        };

        allowShift = false;
    }

    function checkIndex() {
        items.classList.remove('shifting');

        if (index == -1) {
            items.style.left = -(slidesLength * slideSize) + "px";
            index = slidesLength - 1;
        }

        if (index == slidesLength) {
            items.style.left = -(1 * slideSize) + "px";
            index = 0;
        }

        allowShift = true;
    }
    
}

slide(slider1, sliderItems, prev, next);


// document.addEventListener("DOMContentLoaded", function() {
//     const carousel = document.querySelector('.carousel');
//     const container = document.querySelector('.carousel-container');
//     const items = document.querySelectorAll('.carousel-item');
//     const pagination = document.querySelector('.pagination');
    
//     let currentIndex = 0;

//     function updatePagination() {
//       pagination.innerHTML = '';
//       items.forEach((item, index) => {
//         const button = document.createElement('button');
//         button.textContent = index + 1;
//         if (index === currentIndex) {
//           button.classList.add('active');
//         }
//         button.addEventListener('click', () => {
//           goToIndex(index);
//         });
//         pagination.appendChild(button);
//       });

    

//     }

//     function goToIndex(index) {
//       currentIndex = index;
//       const offset = -currentIndex * container.offsetWidth;
//       container.style.transform = `translateX(${offset}px)`;
//       updatePagination();
//     }

//     updatePagination();

//     // Add touch swipe support
//     let startX = 0;
//     let isDragging = false;
//     let dragOffset = 0;

//     carousel.addEventListener('mousedown', (e) => {
//       isDragging = true;
//       startX = e.clientX;
//       dragOffset = 0;
//     });

//     carousel.addEventListener('mouseup', () => {
//       isDragging = false;
//       const touchThreshold = container.offsetWidth / 4;
//       if (Math.abs(dragOffset) > touchThreshold) {
//         if (dragOffset > 0 && currentIndex > 0) {
//           goToIndex(currentIndex - 1);
//         } else if (dragOffset < 0 && currentIndex < items.length - 1) {
//           goToIndex(currentIndex + 1);
//         } else {
//           goToIndex(currentIndex);
//         }
//       } else {
//         goToIndex(currentIndex);
//       }
//     });

//     carousel.addEventListener('mousemove', (e) => {
//       if (isDragging) {
//         const x = e.clientX;
//         dragOffset = x - startX;
//         const offset = -currentIndex * container.offsetWidth + dragOffset;
//         container.style.transform = `translateX(${offset}px)`;
//       }
//     });

//     carousel.addEventListener('mouseleave', () => {
//       isDragging = false;
//     });

//     // Touch events for mobile devices
//     carousel.addEventListener('touchstart', (e) => {
//       const touch = e.touches[0];
//       isDragging = true;
//       startX = touch.clientX;
//       dragOffset = 0;
//     });

//     carousel.addEventListener('touchmove', (e) => {
//       if (isDragging) {
//         const touch = e.touches[0];
//         const x = touch.clientX;
//         dragOffset = x - startX;
//         const offset = -currentIndex * container.offsetWidth + dragOffset;
//         container.style.transform = `translateX(${offset}px)`;
//       }
//     });

//     carousel.addEventListener('touchend', () => {
//       isDragging = false;
//       const touchThreshold = container.offsetWidth / 4;
//       if (Math.abs(dragOffset) > touchThreshold) {
//         if (dragOffset > 0 && currentIndex > 0) {
//           goToIndex(currentIndex - 1);
//         } else if (dragOffset < 0 && currentIndex < items.length - 1) {
//           goToIndex(currentIndex + 1);
//         } else {
//           goToIndex(currentIndex);
//         }
//       } else {
//         goToIndex(currentIndex);
//       }
//     });

//     window.addEventListener('resize', () => {
//       container.style.transition = 'none';
//       goToIndex(currentIndex);
//       setTimeout(() => {
//         container.style.transition = '';
//       }, 0);
//     });
//   });

// document.addEventListener("DOMContentLoaded", function() {
//     const carousel = document.querySelector('.carousel');
//     const container = document.querySelector('.carousel-container');
//     const items = document.querySelectorAll('.carousel-item');
//     const pagination = document.querySelector('.pagination');
    
//     let currentIndex = 0;

//     function updatePagination() {
//         pagination.innerHTML = '';
//         items.forEach((item, index) => {
//             const button = document.createElement('button');
//             button.textContent = index + 1;
//             if (index === currentIndex) {
//                 button.classList.add('active');
//             }
//             button.addEventListener('click', () => {
//                 goToIndex(index);
//             });
//             pagination.appendChild(button);
//         });
//     }

//     function goToIndex(index) {
//         currentIndex = index;
//         const offset = -currentIndex * container.offsetWidth;
//         container.style.transform = `translateX(${offset}px)`;
//         updatePagination();
//     }

//     updatePagination();

//     // Add touch swipe support
//     let startX = 0;
//     let isDragging = false;
//     let dragOffset = 0;

//     carousel.addEventListener('mousedown', (e) => {
//         isDragging = true;
//         startX = e.clientX;
//         dragOffset = 0;
//     });

//     carousel.addEventListener('mouseup', () => {
//         isDragging = false;
//         const touchThreshold = container.offsetWidth / 4;
//         if (Math.abs(dragOffset) > touchThreshold) {
//             if (dragOffset > 0 && currentIndex > 0) {
//                 goToIndex(currentIndex - 1);
//             } else if (dragOffset < 0 && currentIndex < items.length - 1) {
//                 goToIndex(currentIndex + 1);
//             } else {
//                 goToIndex(currentIndex);
//             }
//         } else {
//             goToIndex(currentIndex);
//         }
//     });

//     carousel.addEventListener('mousemove', (e) => {
//         if (isDragging) {
//             const x = e.clientX;
//             dragOffset = x - startX;
//             const offset = -currentIndex * container.offsetWidth + dragOffset;
//             container.style.transform = `translateX(${offset}px)`;
//         }
//     });

//     carousel.addEventListener('mouseleave', () => {
//         isDragging = false;
//     });

//     // Touch events for mobile devices
//     carousel.addEventListener('touchstart', (e) => {
//         const touch = e.touches[0];
//         isDragging = true;
//         startX = touch.clientX;
//         dragOffset = 0;
//     });

//     carousel.addEventListener('touchmove', (e) => {
//         if (isDragging) {
//             const touch = e.touches[0];
//             const x = touch.clientX;
//             dragOffset = x - startX;
//             const offset = -currentIndex * container.offsetWidth + dragOffset;
//             container.style.transform = `translateX(${offset}px)`;
//         }
//     });

//     carousel.addEventListener('touchend', () => {
//         isDragging = false;
//         const touchThreshold = container.offsetWidth / 4;
//         if (Math.abs(dragOffset) > touchThreshold) {
//             if (dragOffset > 0 && currentIndex > 0) {
//                 goToIndex(currentIndex - 1);
//             } else if (dragOffset < 0 && currentIndex < items.length - 1) {
//                 goToIndex(currentIndex + 1);
//             } else {
//                 goToIndex(currentIndex);
//             }
//         } else {
//             goToIndex(currentIndex);
//         }
//     });

//     window.addEventListener('resize', () => {
//         container.style.transition = 'none';
//         goToIndex(currentIndex);
//         setTimeout(() => {
//             container.style.transition = '';
//         }, 0);
//     });
// });

document.addEventListener("DOMContentLoaded", function() {
    const carousel = document.querySelector('.carousel');
    const container = document.querySelector('.carousel-container');
    const items = document.querySelectorAll('.carousel-item');
    const pagination = document.querySelector('.pagination');
    
    let currentIndex = 0;

    function updatePagination() {
      pagination.innerHTML = '';
      items.forEach((item, index) => {
        const button = document.createElement('button');
        button.textContent = index + 1;
        if (index === currentIndex) {
          button.classList.add('active');
        }
        button.addEventListener('click', () => {
          goToIndex(index);
        });
        pagination.appendChild(button);
      });
    }

    function goToIndex(index) {
      currentIndex = index;
      const offset = -currentIndex * container.offsetWidth;
      container.style.transform = `translateX(${offset}px)`;
      updatePagination();
    }

    updatePagination();

    // Add touch swipe support
    let startX = 0;
    let isDragging = false;
    let dragOffset = 0;

    carousel.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      dragOffset = 0;
    });

    carousel.addEventListener('mouseup', () => {
      isDragging = false;
      const touchThreshold = container.offsetWidth / 4;
      if (Math.abs(dragOffset) > touchThreshold) {
        if (dragOffset > 0 && currentIndex > 0) {
          goToIndex(currentIndex - 1);
        } else if (dragOffset < 0 && currentIndex < items.length - 1) {
          goToIndex(currentIndex + 1);
        } else {
          goToIndex(currentIndex);
        }
      } else {
        goToIndex(currentIndex);
      }
    });

    carousel.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const x = e.clientX;
        dragOffset = x - startX;
        const offset = -currentIndex * container.offsetWidth + dragOffset;
        container.style.transform = `translateX(${offset}px)`;
      }
    });

    carousel.addEventListener('mouseleave', () => {
      isDragging = false;
    });

    // Touch events for mobile devices
    carousel.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      isDragging = true;
      startX = touch.clientX;
      dragOffset = 0;
    });

    carousel.addEventListener('touchmove', (e) => {
      if (isDragging) {
        const touch = e.touches[0];
        const x = touch.clientX;
        dragOffset = x - startX;
        const offset = -currentIndex * container.offsetWidth + dragOffset;
        container.style.transform = `translateX(${offset}px)`;
      }
    });

    carousel.addEventListener('touchend', () => {
      isDragging = false;
      const touchThreshold = container.offsetWidth / 4;
      if (Math.abs(dragOffset) > touchThreshold) {
        if (dragOffset > 0 && currentIndex > 0) {
          goToIndex(currentIndex - 1);
        } else if (dragOffset < 0 && currentIndex < items.length - 1) {
          goToIndex(currentIndex + 1);
        } else {
          goToIndex(currentIndex);
        }
      } else {
        goToIndex(currentIndex);
      }
    });

    window.addEventListener('resize', () => {
      container.style.transition = 'none';
      goToIndex(currentIndex);
      setTimeout(() => {
        container.style.transition = '';
      }, 0);
    });
  });