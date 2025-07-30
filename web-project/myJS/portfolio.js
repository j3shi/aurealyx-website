document.addEventListener('DOMContentLoaded', () => {
    
    // PopHeader splitting
    const header = document.getElementById("popHeader");
    if (header) {
        const text = header.textContent.trim();
        header.innerHTML = "";

        text.split("").forEach((letter) => {
            let span = document.createElement("span");
            span.textContent = letter;
            span.classList.add("popLetter");
            header.appendChild(span);
        });
    }

    // Scroll to portfolio (moved outside forEach)
    const scrollToPortfolio = document.getElementById("scrollToPortfolio");
    if (scrollToPortfolio) {
        scrollToPortfolio.addEventListener("click", () => {
            const portfolioSection = document.getElementById("portfolio");
            if (portfolioSection) {
                portfolioSection.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        });
    }

    // Terminal typing effect
    const terminalText = document.getElementById('terminal-text');
    if (terminalText) {
        const command = 'init start-portfolio';
        const welcomeMessage = `$ start-portfolio

> Welcome to my portfolio!

$ show-user
> Name: Jesse Hirvonen
> Founder of Aurealyx
> ICT Engineering Student @ OAMK (2nd year)

$ show-about
> I enjoy working with technology and creativity.
> I build digital projects that mix coding, design, and media.
> Scroll down to see some of the things I've made.

$ list-projects
> web-design/ software-development/  other/`;
        
        let charIndex = 0;
        let isTypingCommand = true;
        
        function typeTerminal() {
            if (isTypingCommand) {
                // Type the command
                if (charIndex < command.length) {
                    terminalText.textContent += command[charIndex];
                    charIndex++;
                    setTimeout(typeTerminal, 50);
                } else {
                    // Command finished, add new line and start welcome message
                    setTimeout(() => {
                        // Add the welcome message below the command
                        const terminalBody = document.querySelector('.terminal-body');
                        const newLine = document.createElement('div');
                        newLine.className = 'terminal-output';
                        newLine.style.color = '#00ff00';
                        newLine.style.marginTop = '10px';
                        newLine.style.whiteSpace = 'pre-line';
                        terminalBody.appendChild(newLine);
                        
                        // Start typing welcome message
                        isTypingCommand = false;
                        charIndex = 0;
                        typeWelcomeMessage(newLine);
                    }, 100);
                }
            }
        }
        
        function typeWelcomeMessage(element) {
            if (charIndex < welcomeMessage.length) {
                element.textContent += welcomeMessage[charIndex];
                charIndex++;
                setTimeout(() => typeWelcomeMessage(element), 30);
            }
        }
        
        setTimeout(typeTerminal, 1000);
    }

    // Back button (moved inside DOMContentLoaded)
    const backButton = document.querySelector('button');
    if (backButton) {
        backButton.addEventListener('click', () => {
            location.href = 'index.html';
        });
    }

    // Make terminal draggable
    const terminal = document.querySelector('.terminal-window');
    const terminalHeader = document.querySelector('.terminal-header');
    
    if (terminal && terminalHeader) {
        let isDragging = false;
        let startX, startY, initialX, initialY;
        
        terminalHeader.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            
            const rect = terminal.getBoundingClientRect();
            initialX = rect.left;
            initialY = rect.top;
            
            terminal.style.transform = 'none';
            terminal.style.left = initialX + 'px';
            terminal.style.top = initialY + 'px';
            
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        });
        
        function handleMouseMove(e) {
            if (!isDragging) return;
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            terminal.style.left = (initialX + deltaX) + 'px';
            terminal.style.top = (initialY + deltaY) + 'px';
        }
        
        function handleMouseUp() {
            isDragging = false;
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }
    }
});

