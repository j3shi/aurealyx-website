const backButton = document.querySelector('button');
if (backButton) {
    backButton.addEventListener('click', () => {
        location.href = 'index.html';
    })
}