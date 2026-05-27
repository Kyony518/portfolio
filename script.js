document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MENU BURGER (Mobile) ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // --- 2. DARK MODE (Avec sauvegarde) ---
    const themeBtn = document.getElementById('theme-btn');
    const body = document.body;
    
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        themeBtn.textContent = '☀️';
    }

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeBtn.textContent = '☀️';
        } else {
            localStorage.setItem('theme', 'light');
            themeBtn.textContent = '🌙';
        }
    });

    // --- 3. ANIMATION MACHINE À ÉCRIRE (Hero Section) ---
    const textToType = "Tek1 @ Epitech Lille | Développeur & Passionné de Cybersécurité";
    const typewriterElement = document.getElementById('typewriter-text');
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < textToType.length) {
            typewriterElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        }
    }
    setTimeout(typeWriter, 500);

    // --- 4. ENVOI DU FORMULAIRE (Via FormSubmit avec Regex) ---
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Regex de validation d'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            alert("L'adresse email saisie n'est pas valide. Veuillez vérifier le format (ex: nom@domaine.com).");
            return;
        }

        if (name !== "" && email !== "" && message !== "") {
            
            formMessage.textContent = "Envoi en cours...";
            formMessage.className = "message-success";
            formMessage.style.color = "var(--primary-color)";

            fetch("https://formsubmit.co/ajax/kyo.rosse@epitech.eu", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    Nom: name,
                    Email: email,
                    Message: message
                })
            })
            .then(response => response.json())
            .then(data => {
                // Affiche le succès sans utiliser l'alerte intrusive
                formMessage.textContent = "Message envoyé avec succès !";
                formMessage.className = "message-success";
                formMessage.style.color = "#10b981"; // Vert
                contactForm.reset();
                
                // Fait disparaître le message après 5 secondes
                setTimeout(() => {
                    formMessage.className = "hidden";
                }, 5000);
            })
            .catch(error => {
                console.error("Erreur d'envoi:", error);
                formMessage.textContent = "Erreur lors de l'envoi. Assure-toi d'être sur la version en ligne du site.";
                formMessage.className = "message-success"; 
                formMessage.style.color = "#ef4444"; // Rouge pour l'erreur
            });
        }
    });
});
