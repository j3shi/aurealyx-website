const backButton = document.getElementById('backbtn');
if (backButton) {
    backButton.addEventListener('click', () => {
        location.href = 'index.html';
    });
}