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
    end: "+=2500",
    toggleClass: {
        targets: "body", 
        className: "dark" 
    },
   // markers: true
});