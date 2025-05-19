document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        burger.classList.toggle('toggle');
        
        navItems.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });


const profileImg3d = document.querySelector(".profile-img-3d");

if (profileImg3d) {
    window.onmousemove = ({ clientX, clientY }) => {
        const rect = profileImg3d.getBoundingClientRect();
        const x = clientX - (rect.left + rect.width / 2);
        const y = clientY - (rect.top + rect.height / 2);
        
        profileImg3d.style.setProperty("--rotate-y", x / window.innerWidth * 45 + "deg");
        profileImg3d.style.setProperty("--rotate-x", -y / window.innerHeight * 45 + "deg");
    };

    window.onmouseleave = () => {
        profileImg3d.style.setProperty("--rotate-y", "0deg");
        profileImg3d.style.setProperty("--rotate-x", "0deg");
    };
}
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                burger.classList.remove('toggle');
                navItems.forEach(link => {
                    link.style.animation = '';
                });
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateStats = () => {
        statNumbers.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const count = +stat.innerText;
            const increment = target / 100;
            
            if (count < target) {
                stat.innerText = Math.ceil(count + increment);
                setTimeout(animateStats, 20);
            } else {
                stat.innerText = target + '+';
            }
        });
    };
    
    const skillBars = document.querySelectorAll('.skill-level');
    
    const animateSkills = () => {
        skillBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            bar.style.width = level + '%';
        });
    };
    
    const observerOptions = {
        threshold: 0.1
    };
    
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('about-stats')) {
                    animateStats();
                }
                
                if (entry.target.classList.contains('skills-container')) {
                    animateSkills();
                }
                
                if (entry.target.classList.contains('project-card')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    const statsSection = document.querySelector('.about-stats');
    const skillsSection = document.querySelector('.skills-container');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (statsSection) observer.observe(statsSection);
    if (skillsSection) observer.observe(skillsSection);
    
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            console.log('Form submitted:', { name, email, subject, message });
            
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
    
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.style.boxShadow = 'none';
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > 80) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
});