document.addEventListener('DOMContentLoaded', () => {

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
});


const backButton = document.querySelector('button');
if (backButton) {
    backButton.addEventListener('click', () => {
        location.href = 'index.html';
    })
}
});