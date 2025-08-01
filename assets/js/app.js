document.documentElement.style.cursor = 'none';

// gsap to cursor
gsap.set(".cursor", { xPercent: -50, yPercent: -50 });

let xToCursor = gsap.quickTo(".cursor", "x", { duration: 0.4, ease: "power3" }),
  yToCursor = gsap.quickTo(".cursor", "y", { duration: 0.4, ease: "power3" });

window.addEventListener("mousemove", (e) => {
  xToCursor(e.clientX);
  yToCursor(e.clientY);
});

//
const altura = document.querySelector('.lp-container').offsetHeight;
document.querySelectorAll('.sidebar-right, .sidebar-left').forEach(elemento => {
  elemento.style.height = `${altura}px`;
});

// change colors
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
  trigger: ".headline",
  start: "top center",
  end: "+=5000",
  toggleClass: {
    targets: "body",
    className: "dark"
  },
  // markers: true
});

// movement and loading
let counterObject = {
  value: 1
};
const counterElement = document.getElementById('counter');

gsap.to(counterObject, {
  value: 99,
  duration: 3,
  ease: "power1.out",
  onUpdate: function () {
    counterElement.textContent = Math.floor(counterObject.value);
  }
});

function sleep(seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}
const loading = document.querySelector(".loading");

window.addEventListener('load', function () {
  sleep(3, 5).then(() => {
    loading.classList.add('hidden');
    setTimeout(() => {
      loading.style.display = 'none';
    }, 500);
  });
});

// smooth scroll
function smoothScrollGSAP(target, duration = 1.2, ease = "power2.inOut") {
  gsap.registerPlugin(ScrollToPlugin);

  gsap.to(window, {
    duration: duration,
    scrollTo: target,
    ease: ease
  });
}

// js drag scroll
const scrollContainer = document.getElementById('scroll-container');

if (scrollContainer) {
  let isDown = false;
  let startX;
  let scrollLeft;

  scrollContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    scrollContainer.classList.add('active');
    startX = e.pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft;
  });

  scrollContainer.addEventListener('mouseleave', () => {
    isDown = false;
    scrollContainer.classList.remove('active');
  });

  scrollContainer.addEventListener('mouseup', () => {
    isDown = false;
    scrollContainer.classList.remove('active');
  });

  scrollContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainer.scrollLeft = scrollLeft - walk;
  });
}

document.addEventListener('DOMContentLoaded', () => {


  // Disable right-click and drag on images
  const images = document.querySelectorAll('img');

  images.forEach(image => {
    image.style.userSelect = 'none';
    image.style.webkitUserSelect = 'none';
    image.style.mozUserSelect = 'none';
    image.style.msUserSelect = 'none';

    image.style.webkitUserDrag = 'none';

    image.addEventListener('contextmenu', (event) => {
      event.preventDefault();
    });

    image.addEventListener('dragstart', (event) => {
      event.preventDefault();
    });
  });
});


//  toogle buttons
const toggleButtons = document.querySelectorAll('.toggle-button');
const contentSections = document.querySelectorAll('.content-section');
toggleButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetId = button.dataset.target;
    toggleButtons.forEach(btn => {
      btn.classList.remove('active-btn');
    });
    button.classList.add('active-btn');
    contentSections.forEach(section => {
      section.classList.remove('active');
    });

    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.classList.add('active');
    }
  });
});