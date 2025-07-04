document.addEventListener('DOMContentLoaded', () => {
    createAuroraWave();
    setInterval(createAuroraWave, 3000);

    const header= document.getElementById("popHeader");
    const text = header.textContent.trim();
    header.innerHTML = "";

    text.split("").forEach((letter) => {
        let span = document.createElement("span");
        span.textContent = letter;
        span.classList.add("popLetter");
        header.appendChild(span);

        
});

document.getElementById("scrollToServices").addEventListener("click", () => {
const servicesSection = document.getElementById("services");
    if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }
});

document.getElementById("scrollToAbout").addEventListener("click", () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }
});

document.getElementById("scrollToContact").addEventListener("click", () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }
});

document.querySelector('.form').addEventListener('submit', async function(e) {
   e.preventDefault(); // Prevent the default form submission

   const form = e.target;
   const data = new FormData(form);

   //Send the form data to Formspree via AJAX (fetch)
   const response = await fetch(form.action, {
    method: 'POST',
    body: data,
    headers: {
        'Accept': 'application/json'
    }
   });

   if (response.ok) {
    alert('Thank you for your message! We will get back to you soon.');
   } else {
    alert('There was a problem submitting your message. Please try again later.');
   }
});

function createAuroraWave() {
    const auroraContainer = document.createElement("div");
    auroraContainer.classList.add("aurora");

    for (let i = 0; i < 3; i++) {
        let auroraWave = document.createElement("span");

        auroraWave.style.left = `${Math.random() * 100}vw`;
        auroraWave.style.top = `${Math.random() * 50}vh`;

        const colors = [
            "linear-gradient(120deg, rgba(0, 255, 150, 0.6), rgba(0, 120, 255, 0.4), transparent)",
            "linear-gradient(120deg, rgba(255, 0, 150, 0.6), rgba(253, 253, 95, 0.67), transparent)",
            "linear-gradient(120deg, rgba(255, 120, 0, 0.6), rgba(204, 0, 255, 0.81), transparent)",
            "linear-gradient(120deg, rgba(50, 205, 86, 0.6), rgba(69, 184, 255, 0.76), transparent)"
        ];
        auroraWave.style.background = colors[Math.floor(Math.random() * colors.length)];

        auroraContainer.appendChild(auroraWave);
    }

    document.body.appendChild(auroraContainer);

    setTimeout(() => {
        auroraContainer.remove();
    }, 30000);
}
});

gsap.registerEffect({
    name: "fade",
    effect: (targets, config) => {
      return gsap.from(targets, {
        duration: config.duration,
        opacity: 0
      });
    },
    defaults: {duration: 10},
    extendTimeline: true
  });

gsap.effects.fade(".header", {duration: 8});
gsap.effects.fade(".headline", {duration: 3});
gsap.effects.fade(".subheadline", {duration: 3});
gsap.effects.fade(".button", {duration: 3});
gsap.effects.fade(".footer", {duration: 8});
