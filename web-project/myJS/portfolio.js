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
> Jesse Hirvonen [Founder of Aurealyx]

$ show-about
> I enjoy working with technology and creativity.
> I build digital projects that mix coding, design, and media.

$ show-education
📘 Education Timeline:
├── 2023    : Matriculation Examination, Jyväskylän Normaalikoulu
├── 2023 - 2024: Army Service, Finnish Defence Forces (Military Vehicle Driver (C) & Mechanic)
└── 2024 - Present : ICT Engineering @ Oulu University of Applied Sciences

$ show-skills
💻 Coding & Tools:
├── Languages: 
│   ├─ 🟦 C / C++ 
│   ├─ ☕ Java 
│   └─ 🌐 HTML / CSS / JS 
├── Tools & Platforms:
│   ├─ 🐧 Linux / Ubuntu 
│   ├─ 🐙 GitHub / Git 
│   ├─ 🗃️ MySQL Workbench 
│   └─ ☁️ Cloud Platforms
└── Creative:
    ├─ 🎬 Video Editing
    └─ 📷 Photography & Visual Design`;
        
        let charIndex = 0;
        let isTypingCommand = true;
        
        function typeTerminal() {
            if (isTypingCommand) {
                // Type the command
                if (charIndex < command.length) {
                    terminalText.textContent += command[charIndex];
                    charIndex++;
                    setTimeout(typeTerminal, 30);
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
            } else {
                // Show the second terminal after typing finishes
                document.getElementById('terminal-window-small').style.display = 'block';
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

    const smallTerminal = document.getElementById('terminal-window-small');
    const smallTerminalHeader = smallTerminal ? smallTerminal.querySelector('.terminal-header') : null;

    if (smallTerminal && smallTerminalHeader) {
        let isDragging = false, offsetX = 0, offsetY = 0;

        smallTerminalHeader.addEventListener('mousedown', function(e) {
            isDragging = true;
            offsetX = e.clientX - smallTerminal.offsetLeft;
            offsetY = e.clientY - smallTerminal.offsetTop;
            document.body.style.userSelect = 'none';
        });

        document.addEventListener('mousemove', function(e) {
            if (isDragging) {
                smallTerminal.style.left = (e.clientX - offsetX) + 'px';
                smallTerminal.style.top = (e.clientY - offsetY) + 'px';
            }
        });

        document.addEventListener('mouseup', function() {
            isDragging = false;
            document.body.style.userSelect = '';
        });
    }

    // Show both terminals immediately
    if (smallTerminal) {
        smallTerminal.style.display = 'block';
    }

    const projects = [
      {
        id: 1,
        title: "Cottage Rental Website",
        info: "Skyfall is an elegant and immersive website designed to showcase a cozy cottage getaway. Inspired by the serene beauty of Finnish Lapland and the cinematic charm of Skyfall, the site combines stunning imagery with a warm, inviting design. Visitors can explore high-quality photos of the cottage and its surroundings, discover local attractions, and easily check availability. The booking process is intuitive and straightforward, ensuring a smooth user experience from browsing to reservation. Skyfall supports both Finnish and English, making it accessible to a wide range of guests.",
        languages: ["HTML", "CSS", "JavaScript"],
        icons: [
          { src: "images/html-5.png", alt: "HTML" },
          { src: "images/css-3.png", alt: "CSS" },
          { src: "images/js.png", alt: "JavaScript" }
        ],
        images: [
          "images/skyfall_hero.png",
          "images/skyfall_2.png",
          "images/skyfall_video.mp4" // You can handle video separately if needed
        ],
        link: "https://skyfall1.fi"
      },
      {
        id: 2,
        title: "KST Events",
        info: "KST Events is a sleek, informative website dedicated to showcasing the company’s professional event security services. Built with a clean and modern design, the site highlights KST Events’ expertise in ensuring safety and order at concerts, festivals, corporate gatherings, and private functions. Visitors can learn about available security solutions, explore past projects, and easily request a quote or contact the team. With responsive design for seamless mobile and desktop use, KST Events delivers a trustworthy, accessible, and professional online presence that reflects the company’s commitment to reliable event safety.",
        languages: ["HTML", "CSS", "JavaScript"],
        icons: [
          { src: "images/html-5.png", alt: "HTML" },
          { src: "images/css-3.png", alt: "CSS" },
          { src: "images/js.png", alt: "JavaScript" }
        ],
        images: [
          "images/kstevents-hero.png",
          "images/kstevents-info.png",
          "images/kstevents-rekry.png",
          "images/kstevents-yhteystiedot.png"
        ],
        link: "https://kstevents.fi"
      },
      {
        id: 3,
        title: "Bank Automat Project",
        info: "A full-stack banking application simulating a modern ATM. The backend includes routers and models with complete CRUD operations for secure data handling. The Qt-based frontend features a login system with PIN authentication, credit/debit account selection, a virtual keyboard, inactivity timeout, cash withdrawal options, real-time credit limit updates, and transaction history display. Designed with a polished UI for a seamless and secure user experience.",
        languages: ["QT", "SQL", "JavaScript"],
        icons: [
          { src: "images/qt.png", alt: "QT" },
          { src: "images/sql-server.png", alt: "SQL" },
          { src: "images/js.png", alt: "JavaScript" }
        ],
        images: [
            "images/bankautomat-project.png",
            "images/bankautomat-saldo.png",
        ]
      }
      // Add more project objects here
    ];

    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', function() {
        const projectId = parseInt(card.getAttribute('data-project'));
        const project = projects.find(p => p.id === projectId);
        if (!project) return;

        document.getElementById('modal-title').textContent = project.title;
        document.getElementById('modal-info').textContent = project.info;
        document.getElementById('modal-languages').innerHTML =
          project.icons.map(icon =>
            `<img src="${icon.src}" alt="${icon.alt}" style="height:32px;vertical-align:middle;margin-right:8px;">`
          ).join('');

        // New line for the project link
        document.getElementById('modal-link').innerHTML = project.link
          ? `<a href="${project.link}" target="_blank" class="visit-site-btn">Visit</a>`
          : "";

        currentProjectImages = project.images;
        currentImageIndex = 0;
        showCarouselImage(currentImageIndex);

        document.getElementById('project-modal').style.display = 'flex';
      });
    });

    // Close when clicking the close button
    document.querySelector('.close-btn').onclick = function() {
      document.getElementById('project-modal').style.display = 'none';
    };

    // Close when clicking outside modal-content
    document.getElementById('project-modal').onclick = function(e) {
      if (e.target === this) {
        this.style.display = 'none';
      }
    };

    let currentImageIndex = 0;
    let currentProjectImages = [];

    function showCarouselImage(index) {
      const img = currentProjectImages[index];
      let html = "";
      if (img.endsWith('.mp4')) {
        html = `<video src="${img}" controls style="width:100%;border-radius:8px;"></video>`;
      } else {
        html = `<img src="${img}" alt="Project image" style="width:100%;border-radius:8px;">`;
      }
      document.getElementById('modal-carousel').innerHTML = `
        <button id="carousel-prev" class="carousel-btn">&#8592;</button>
        <div style="position:relative;">${html}</div>
        <button id="carousel-next" class="carousel-btn">&#8594;</button>
      `;
      document.getElementById('carousel-prev').onclick = () => {
        currentImageIndex = (currentImageIndex - 1 + currentProjectImages.length) % currentProjectImages.length;
        showCarouselImage(currentImageIndex);
      };
      document.getElementById('carousel-next').onclick = () => {
        currentImageIndex = (currentImageIndex + 1) % currentProjectImages.length;
        showCarouselImage(currentImageIndex);
      };
    }
});

