document.addEventListener('DOMContentLoaded', () => {

    const textingElement = document.getElementById("texting");
    if (textingElement) {
        const text = textingElement.textContent.trim();
        const sentences = text.split(/[.]+/).filter(sentence => sentence.trim().length > 0);
        textingElement.innerHTML = "";
        
        let sentenceIndex = 0;
        let letterIndex = 0;
        
        function typeNextLetter() {
            if (sentenceIndex < sentences.length) {
                const currentSentence = sentences[sentenceIndex].trim();
                
                if (letterIndex < currentSentence.length) {
                    textingElement.innerHTML += currentSentence[letterIndex];
                    letterIndex++;
                    setTimeout(typeNextLetter, 50); 
                } else {
                    // Add punctuation and line break after sentence
                    textingElement.innerHTML += ".<br>";
                    sentenceIndex++;
                    letterIndex = 0;
                    setTimeout(typeNextLetter, 200); // 500ms pause between sentences
                }
            }
        }
        
        typeNextLetter();
    }
    
    const header= document.getElementById("popHeader");
    const text = header.textContent.trim();
    header.innerHTML = "";

    text.split("").forEach((letter) => {
        let span = document.createElement("span");
        span.textContent = letter;
        span.classList.add("popLetter");
        header.appendChild(span);

        document.getElementById("scrollToPortfolio").addEventListener("click", () => {
    const portfolioSection = document.getElementById("portfolio");
    if (portfolioSection) {
        portfolioSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    });

    const carousel = document.getElementById('carousel');
if (carousel) {
    const slides = Array.from(carousel.querySelectorAll('div'));
    let currentIndex = 0;

    function updateCarousel() {
        slides.forEach((slide, index) => {
            slide.classList.remove('center', 'left', 'right');
            
            if (index === currentIndex) {
                slide.classList.add('center');
            } else if (index === (currentIndex - 1 + slides.length) % slides.length) {
                slide.classList.add('left');
            } else if (index === (currentIndex + 1) % slides.length) {
                slide.classList.add('right');
            }
        });
    }

    // Initialize carousel
    updateCarousel();

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    }

    // Auto-advance every 3 seconds
    setInterval(nextSlide, 3000);
}
});


const backButton = document.querySelector('button');
if (backButton) {
    backButton.addEventListener('click', () => {
        location.href = 'index.html';
    })
}
});

