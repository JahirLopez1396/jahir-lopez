document.addEventListener('DOMContentLoaded', function() {
    const toggleThemeBtn = document.getElementById('toggle-theme');
    const downloadPdfBtn = document.getElementById('download-pdf');
    const htmlElement = document.documentElement;
    
    // Theme toggle functionality
    toggleThemeBtn.addEventListener('click', function() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update button icon and text
        const icon = this.querySelector('i');
        const text = this.lastChild;
        
        if (newTheme === 'dark') {
            icon.className = 'fas fa-sun';
            text.textContent = ' Light Mode';
        } else {
            icon.className = 'fas fa-moon';
            text.textContent = ' Dark Mode';
        }
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    
    // Update initial button state
    if (savedTheme === 'dark') {
        toggleThemeBtn.querySelector('i').className = 'fas fa-sun';
        toggleThemeBtn.lastChild.textContent = ' Light Mode';
    }
    
    // Download PDF functionality
    downloadPdfBtn.addEventListener('click', function() {
        if (window.print) {
            window.print();
        } else {
            // Fallback for browsers that don't support print
            alert('Use your browser\'s print function to save as PDF (Ctrl+P or Cmd+P)');
        }
    });
    
    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections for animation
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Add hover effect to skill categories
    document.querySelectorAll('.skill-category').forEach(skill => {
        skill.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });
        
        skill.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Copy contact information on click
    document.querySelectorAll('.contact-item').forEach(item => {
        item.addEventListener('click', function() {
            const text = this.querySelector('span').textContent;
            if (text && !this.querySelector('a')) {
                navigator.clipboard.writeText(text).then(() => {
                    // Show feedback
                    const originalBg = this.style.backgroundColor;
                    this.style.backgroundColor = 'var(--primary-color)';
                    this.style.color = 'white';
                    
                    setTimeout(() => {
                        this.style.backgroundColor = originalBg;
                        this.style.color = 'var(--text-light)';
                    }, 200);
                });
            }
        });
        
        // Add cursor pointer for clickable items
        if (!item.querySelector('a')) {
            item.style.cursor = 'pointer';
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + D for dark mode toggle
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            toggleThemeBtn.click();
        }
        
        // Ctrl/Cmd + P for print/download
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
            e.preventDefault();
            downloadPdfBtn.click();
        }
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // Track section visibility for analytics (if needed)
    const sectionTracker = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionName = entry.target.querySelector('.section-title')?.textContent || 'Unknown';
                console.log('Viewing section:', sectionName);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.section').forEach(section => {
        sectionTracker.observe(section);
    });
});