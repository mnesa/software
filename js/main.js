// scroll and animation on full Screen
const boxes = document.querySelectorAll('.aniBox');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('show'); // স্ক্রিনে এলিমেন্ট দেখার সাথে অ্যানিমেশন
      observer.unobserve(entry.target);   // একবার দেখানোর পর আর ট্রিগার হবে না
    }
  });
}, {
  threshold: 0.1 // ১০% এলিমেন্ট দেখলেই অ্যানিমেশন শুরু
});

boxes.forEach(box => observer.observe(box));

// =================================
// humbarger menu

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// ===================================
// Get the current year for the copyright - footer

    document.addEventListener('DOMContentLoaded', function () {
      const el = document.getElementById('year');
      if (el) el.textContent = new Date().getFullYear();
    });

// ======================================
// document.querySelector('#home').scrollIntoView({behavior: "smooth"});
 

// ========================================
// counting section

let valueDisplays = document.querySelectorAll('.num');
let totalDuration = 3000; // total animation time in ms

// Counter function
function startCounter(valueDisplay) {
  let startValue = 0;
  let endValue = parseInt(valueDisplay.getAttribute('data-value'));
  let increment = endValue / (totalDuration / 20);     //increment (প্রতি step কত বৃদ্ধি হবে)

  let counter = setInterval(() => {
    startValue += increment;

    if (startValue >= endValue) {
      startValue = endValue;
      clearInterval(counter);
    }

    valueDisplay.textContent = Math.floor(startValue);
  }, 20);
}

// IntersectionObserver
let observerCount = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      startCounter(entry.target);  // start counting
      obs.unobserve(entry.target); // একবার count হলে আবার repeat হবে না
    }
  });
}, { threshold: 0.5 }); // ৫০% element দেখা গেলেই trigger হবে

// observe সব .num element
valueDisplays.forEach(num => {
  observerCount.observe(num);
});

// =======================================
// form validation

document.getElementById('signupForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const success = document.getElementById('success');
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  nameError.textContent = '';
  emailError.textContent = '';
  messageError.textContent = '';

  function showError(element, message) {
    element.textContent = message;
    setTimeout(() => { element.textContent = ''; }, 3000);
  }

  let isValid = true;

  if (name.length < 3) {
    showError(nameError, "Name must be at least 3 characters.");
    isValid = false;
  }
    

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email.match(emailPattern)) {
    showError(emailError, "Invalid email format.");
    isValid = false;
  }
  
  if (message === '') {
    showError(messageError, "Message is required.");
    isValid = false;
  }
  

  if (isValid) {
    success.textContent = "Message sent successfully.";
    document.getElementById('signupForm').reset();

    setTimeout(() => {
      success.textContent = '';
    }, 3000);
  }

});


// =========================================
// testimonial . slide 

 const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.slide'));
    const prevBtn = document.querySelector('.btn2.prev');
    const nextBtn = document.querySelector('.btn2.next');

    let index = 1;                
    let size = 0;               
    let isSliding = false;       
    const AUTO_MS = 3000;
    let autoplayId = null;

    
    function recalcSizeAndPosition() {
      size = slides[0].clientWidth || track.getBoundingClientRect().width;
      track.style.transition = 'none';
      track.style.transform = `translateX(${-size * index}px)`;
      
      requestAnimationFrame(()=> {
        requestAnimationFrame(()=> {
          track.style.transition = 'transform .6s ease-in-out';
        });
      });
    }

    
    function moveToSlide() {
      if (isSliding) return;
      isSliding = true;
      track.style.transition = 'transform .6s ease-in-out';
      track.style.transform = `translateX(${-size * index}px)`;
    }

    
    function autoPlayStep() {
      if (isSliding) return; // transition চললে skip করো
      index++;
      moveToSlide();
    }

    function startAutoplay(){
      stopAutoplay();
      autoplayId = setInterval(autoPlayStep, AUTO_MS);
    }
    function stopAutoplay(){
      if (autoplayId) { clearInterval(autoplayId); autoplayId = null; }
    }
    function resetAutoplay(){
      startAutoplay();
    }

    
    nextBtn.addEventListener('click', () => {
      if (isSliding) return;
      index++;
      moveToSlide();
      resetAutoplay();
    });
    prevBtn.addEventListener('click', () => {
      if (isSliding) return;
      index--;
      moveToSlide();
      resetAutoplay();
    });

    
    track.addEventListener('transitionend', () => {
      
      if (index === slides.length - 1) {
        track.style.transition = 'none';
        index = 1;
        track.style.transform = `translateX(${-size * index}px)`;
      }
      
      if (index === 0) {
        track.style.transition = 'none';
        index = slides.length - 2;
        track.style.transform = `translateX(${-size * index}px)`;
      }

      
      setTimeout(()=> { isSliding = false; }, 20);
    });

    // window load-এ size 
    window.addEventListener('load', () => {
      recalcSizeAndPosition();
      startAutoplay();
    });

    // resize-এ size 
    let resizeTimer = null;
    window.addEventListener('resize', () => {
      // throttle resize recalculation
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(()=> {
        recalcSizeAndPosition();
      }, 100);
    });

    
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAutoplay();
      } else {
        resetAutoplay();
      }
    });

    
    document.addEventListener('DOMContentLoaded', () => {
      recalcSizeAndPosition();
    });
// =====================================
    
