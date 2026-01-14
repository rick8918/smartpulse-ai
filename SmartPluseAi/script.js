// Main JavaScript for SmartPulse AI Website
// =========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('SmartPulse AI Website Initializing...');
    
    // ==============================
    // 1. THEME TOGGLE FUNCTIONALITY
    // ==============================
    const themeToggle = document.getElementById('themeToggle');
    
    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');
        
        // Check for saved theme preference or default to light
        const savedTheme = localStorage.getItem('smartpulse-theme');
        
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            if (themeIcon) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        } else if (savedTheme === null && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            // If no saved preference but system prefers dark mode
            document.body.classList.add('dark-theme');
            if (themeIcon) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
            localStorage.setItem('smartpulse-theme', 'dark');
        }
        
        // Theme toggle click handler
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            
            // Update icon and save preference
            if (themeIcon) {
                if (document.body.classList.contains('dark-theme')) {
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                    localStorage.setItem('smartpulse-theme', 'dark');
                } else {
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                    localStorage.setItem('smartpulse-theme', 'light');
                }
            }
            
            console.log('Theme toggled to:', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        });
    }
    
    // ===================================
    // 2. MOBILE NAVIGATION FUNCTIONALITY
    // ===================================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            
            // Change icon
            const icon = navToggle.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
            
            console.log('Mobile menu toggled:', navMenu.classList.contains('active') ? 'open' : 'closed');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                    
                    const icon = navToggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(event.target) && 
                !navToggle.contains(event.target)) {
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }
    
    // ==================================
    // 3. FLOATING ASSISTANT FUNCTIONALITY
    // ==================================
    const closeAssistantBtn = document.querySelector('.close-assistant');
    const assistantIcon = document.querySelector('.assistant-icon');
    const assistantMessage = document.querySelector('.assistant-message');
    
    if (assistantIcon && assistantMessage) {
        // Show message after 3 seconds
        setTimeout(() => {
            assistantMessage.style.opacity = '1';
            assistantMessage.style.transform = 'translateY(0)';
            console.log('Assistant message shown');
        }, 3000);
        
        // Close button functionality
        if (closeAssistantBtn) {
            closeAssistantBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                assistantMessage.style.opacity = '0';
                assistantMessage.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    assistantMessage.style.display = 'none';
                }, 500);
                console.log('Assistant message closed');
            });
        }
        
        // Toggle message when clicking assistant icon
        assistantIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (assistantMessage.style.display === 'none' || assistantMessage.style.display === '') {
                assistantMessage.style.display = 'block';
                setTimeout(() => {
                    assistantMessage.style.opacity = '1';
                    assistantMessage.style.transform = 'translateY(0)';
                }, 10);
            } else {
                assistantMessage.style.opacity = '0';
                assistantMessage.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    assistantMessage.style.display = 'none';
                }, 500);
            }
        });
        
        // Close message when clicking outside
        document.addEventListener('click', function(event) {
            if (!assistantMessage.contains(event.target) && 
                !assistantIcon.contains(event.target) && 
                assistantMessage.style.display === 'block') {
                assistantMessage.style.opacity = '0';
                assistantMessage.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    assistantMessage.style.display = 'none';
                }, 500);
            }
        });
    }
    
    // ================================
    // 4. SMOOTH SCROLL FOR ANCHOR LINKS
    // ================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (href === '#' || href === '') return;
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                    
                    const icon = navToggle ? navToggle.querySelector('i') : null;
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
                
                // Calculate scroll position
                const headerHeight = document.querySelector('.navbar') ? document.querySelector('.navbar').offsetHeight : 70;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                // Smooth scroll
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                console.log('Smooth scroll to:', href);
            }
        });
    });
    
    // =====================================
    // 5. TRANSPARENCY PANEL TOGGLE FUNCTIONALITY
    // =====================================
    const toggleDetailsBtns = document.querySelectorAll('.toggle-details');
    
    toggleDetailsBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const transparencyItem = this.closest('.transparency-item');
            const details = transparencyItem.querySelector('.transparency-details');
            
            if (details) {
                // Toggle active class
                details.classList.toggle('active');
                
                // Update button text
                if (details.classList.contains('active')) {
                    this.textContent = 'Hide Details';
                } else {
                    this.textContent = 'Show Details';
                }
                
                console.log('Transparency details toggled');
            }
        });
    });
    
    // =====================================
    // 6. LIVE DEMO SIMULATION FUNCTIONALITY
    // =====================================
    const startDemoBtn = document.getElementById('startDemo');
    const pauseDemoBtn = document.getElementById('pauseDemo');
    const resetDemoBtn = document.getElementById('resetDemo');
    const speedControl = document.getElementById('speedControl');
    
    // Demo state variables
    let demoInterval = null;
    let demoRunning = false;
    let demoTime = 0; // minutes since 9:00 AM
    let demoValues = {
        screenTime: 30,
        socialTime: 20,
        moneySpent: 0,
        productivityScore: 65,
        impulseControl: 42
    };
    
    // Only initialize demo functionality if on the demo page
    if (startDemoBtn && pauseDemoBtn && resetDemoBtn) {
        console.log('Initializing Live Demo simulation...');
        
        // Set initial state
        updateDemoDisplay();
        
        // Start Demo Button
        startDemoBtn.addEventListener('click', function() {
            if (demoRunning) return;
            
            demoRunning = true;
            startDemoBtn.disabled = true;
            pauseDemoBtn.disabled = false;
            startDemoBtn.innerHTML = '<i class="fas fa-play"></i> Running...';
            
            const speed = parseInt(speedControl.value);
            const intervalTime = 1000 / speed;
            
            console.log('Demo started with speed:', speed + 'x');
            
            demoInterval = setInterval(function() {
                demoTime += 1;
                updateDemo();
            }, intervalTime);
        });
        
        // Pause Demo Button
        pauseDemoBtn.addEventListener('click', function() {
            if (!demoRunning) return;
            
            demoRunning = false;
            clearInterval(demoInterval);
            startDemoBtn.disabled = false;
            pauseDemoBtn.disabled = true;
            startDemoBtn.innerHTML = '<i class="fas fa-play"></i> Resume';
            
            console.log('Demo paused');
        });
        
        // Reset Demo Button
        resetDemoBtn.addEventListener('click', function() {
            demoRunning = false;
            clearInterval(demoInterval);
            demoTime = 0;
            demoValues = {
                screenTime: 30,
                socialTime: 20,
                moneySpent: 0,
                productivityScore: 65,
                impulseControl: 42
            };
            
            startDemoBtn.disabled = false;
            pauseDemoBtn.disabled = true;
            startDemoBtn.innerHTML = '<i class="fas fa-play"></i> Start Simulation';
            
            resetDemo();
            console.log('Demo reset');
        });
        
        // Speed Control
        if (speedControl) {
            speedControl.addEventListener('change', function() {
                if (demoRunning) {
                    clearInterval(demoInterval);
                    const speed = parseInt(this.value);
                    const intervalTime = 1000 / speed;
                    
                    console.log('Demo speed changed to:', speed + 'x');
                    
                    demoInterval = setInterval(function() {
                        demoTime += 1;
                        updateDemo();
                    }, intervalTime);
                }
            });
        }
        
        // Update demo display function
        function updateDemo() {
            // Update time display
            const totalMinutes = 9 * 60 + demoTime; // Starting at 9:00 AM
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const displayHours = hours % 12 || 12;
            const timeString = `${displayHours}:${minutes.toString().padStart(2, '0')}`;
            
            // Update time displays
            const simTimeElement = document.getElementById('simTime');
            const currentTimeElement = document.getElementById('currentTime');
            
            if (simTimeElement) simTimeElement.textContent = `${timeString} ${ampm}`;
            if (currentTimeElement) currentTimeElement.textContent = timeString;
            
            // Update values based on time progression
            if (demoTime >= 5 && demoTime < 15) {
                // User is on food delivery app
                demoValues.screenTime += 1;
                demoValues.moneySpent = 24.99; // Potential order
                
                // Update productivity and impulse control scores
                demoValues.productivityScore = Math.max(40, 65 - Math.floor(demoTime / 2));
                demoValues.impulseControl = Math.max(30, 42 - Math.floor(demoTime / 1.5));
                
                // Add a new activity for food app browsing if not already added
                const activityStream = document.querySelector('.activity-stream');
                if (activityStream && !document.querySelector('.food-activity')) {
                    const newActivity = document.createElement('div');
                    newActivity.className = 'activity-item new-activity food-activity';
                    newActivity.innerHTML = `
                        <div class="activity-time">${timeString}</div>
                        <div class="activity-content">
                            <div class="activity-icon">
                                <i class="fas fa-utensils"></i>
                            </div>
                            <div class="activity-details">
                                <p class="activity-title">Food Delivery</p>
                                <p class="activity-desc">Browsing restaurants - considering order</p>
                            </div>
                        </div>
                    `;
                    
                    // Insert before the last activity
                    const lastActivity = activityStream.querySelector('.new-activity:not(.food-activity)');
                    if (lastActivity && lastActivity.nextSibling) {
                        activityStream.insertBefore(newActivity, lastActivity.nextSibling);
                    } else {
                        activityStream.appendChild(newActivity);
                    }
                }
            } else if (demoTime >= 15) {
                // After 15 minutes, simulate order placed
                demoValues.moneySpent = 24.99;
                
                // Update food activity to show order placed
                const foodActivity = document.querySelector('.food-activity');
                if (foodActivity) {
                    foodActivity.querySelector('.activity-title').textContent = 'Food Order Placed';
                    foodActivity.querySelector('.activity-desc').textContent = 'Order completed - $24.99';
                }
                
                // Update productivity and impulse control scores
                demoValues.productivityScore = Math.max(35, 65 - Math.floor(demoTime / 2));
                demoValues.impulseControl = Math.max(20, 42 - Math.floor(demoTime / 1.5));
            }
            
            // Update stats display
            const screenTimeElement = document.getElementById('screenTime');
            const socialTimeElement = document.getElementById('socialTime');
            const moneySpentElement = document.getElementById('moneySpent');
            
            if (screenTimeElement) screenTimeElement.textContent = `${demoValues.screenTime} min`;
            if (socialTimeElement) socialTimeElement.textContent = `${demoValues.socialTime} min`;
            if (moneySpentElement) moneySpentElement.textContent = `$${demoValues.moneySpent.toFixed(2)}`;
            
            // Update prediction bars
            const foodPredictionFill = document.querySelector('.prediction-item:nth-child(1) .prediction-fill');
            const foodPredictionText = document.querySelector('.prediction-item:nth-child(1) .prediction-value');
            const socialPredictionFill = document.querySelector('.prediction-item:nth-child(2) .prediction-fill');
            const socialPredictionText = document.querySelector('.prediction-item:nth-child(2) .prediction-value');
            
            if (demoTime >= 5 && demoTime < 10) {
                if (foodPredictionFill) foodPredictionFill.style.width = '65%';
                if (foodPredictionText) foodPredictionText.textContent = '65% likely to order food';
            } else if (demoTime >= 10 && demoTime < 15) {
                if (foodPredictionFill) foodPredictionFill.style.width = '85%';
                if (foodPredictionText) foodPredictionText.textContent = '85% likely to order food';
            } else if (demoTime >= 15) {
                if (foodPredictionFill) foodPredictionFill.style.width = '15%';
                if (foodPredictionText) foodPredictionText.textContent = '15% likely to order food';
            }
            
            if (socialPredictionFill) socialPredictionFill.style.width = '70%';
            if (socialPredictionText) socialPredictionText.textContent = 'Predicted: 2.5 hours';
            
            // Update productivity chart
            const productivityChart = document.querySelector('.metric-chart:nth-child(1) .chart-bar');
            const productivityValue = document.querySelector('.metric-chart:nth-child(1) .chart-value');
            
            if (productivityChart) {
                productivityChart.style.height = `${demoValues.productivityScore}%`;
            }
            if (productivityValue) {
                productivityValue.textContent = `${demoValues.productivityScore}%`;
            }
            
            // Update impulse control chart
            const impulseChart = document.querySelector('.metric-chart:nth-child(2) .chart-bar');
            const impulseValue = document.querySelector('.metric-chart:nth-child(2) .chart-value');
            
            if (impulseChart) {
                impulseChart.style.height = `${demoValues.impulseControl}%`;
            }
            if (impulseValue) {
                impulseValue.textContent = `${demoValues.impulseControl}%`;
            }
            
            // Show intervention after 8 minutes
            if (demoTime === 8) {
                const intervention = document.querySelector('.intervention-triggered');
                if (intervention) {
                    intervention.style.opacity = '1';
                    intervention.style.transform = 'translateY(0)';
                }
                
                // Update the streak for no impulse purchases
                const streakCount = document.querySelector('.streak-item:nth-child(2) .streak-count');
                if (streakCount) streakCount.textContent = '0 days';
            }
            
            // Stop demo after 20 minutes of simulation
            if (demoTime >= 20) {
                clearInterval(demoInterval);
                demoRunning = false;
                if (startDemoBtn) startDemoBtn.disabled = false;
                if (pauseDemoBtn) pauseDemoBtn.disabled = true;
                if (startDemoBtn) startDemoBtn.innerHTML = '<i class="fas fa-redo"></i> Restart Simulation';
                
                console.log('Demo completed');
            }
        }
        
        // Reset demo function
        function resetDemo() {
            // Reset time
            const simTimeElement = document.getElementById('simTime');
            const currentTimeElement = document.getElementById('currentTime');
            
            if (simTimeElement) simTimeElement.textContent = '09:30 AM';
            if (currentTimeElement) currentTimeElement.textContent = '09:30';
            
            // Reset stats
            const screenTimeElement = document.getElementById('screenTime');
            const socialTimeElement = document.getElementById('socialTime');
            const moneySpentElement = document.getElementById('moneySpent');
            
            if (screenTimeElement) screenTimeElement.textContent = '30 min';
            if (socialTimeElement) socialTimeElement.textContent = '20 min';
            if (moneySpentElement) moneySpentElement.textContent = '$0';
            
            // Reset prediction bars
            const foodPredictionFill = document.querySelector('.prediction-item:nth-child(1) .prediction-fill');
            const foodPredictionText = document.querySelector('.prediction-item:nth-child(1) .prediction-value');
            const socialPredictionFill = document.querySelector('.prediction-item:nth-child(2) .prediction-fill');
            const socialPredictionText = document.querySelector('.prediction-item:nth-child(2) .prediction-value');
            
            if (foodPredictionFill) foodPredictionFill.style.width = '85%';
            if (foodPredictionText) foodPredictionText.textContent = '85% likely to order food';
            if (socialPredictionFill) socialPredictionFill.style.width = '70%';
            if (socialPredictionText) socialPredictionText.textContent = 'Predicted: 2.5 hours';
            
            // Reset charts
            const productivityChart = document.querySelector('.metric-chart:nth-child(1) .chart-bar');
            const productivityValue = document.querySelector('.metric-chart:nth-child(1) .chart-value');
            const impulseChart = document.querySelector('.metric-chart:nth-child(2) .chart-bar');
            const impulseValue = document.querySelector('.metric-chart:nth-child(2) .chart-value');
            
            if (productivityChart) productivityChart.style.height = '65%';
            if (productivityValue) productivityValue.textContent = '65%';
            if (impulseChart) impulseChart.style.height = '42%';
            if (impulseValue) impulseValue.textContent = '42%';
            
            // Remove any added activities
            const foodActivity = document.querySelector('.food-activity');
            if (foodActivity) foodActivity.remove();
            
            // Reset streaks
            const streakCount = document.querySelector('.streak-item:nth-child(2) .streak-count');
            if (streakCount) streakCount.textContent = '1 day';
            
            // Hide intervention
            const intervention = document.querySelector('.intervention-triggered');
            if (intervention) {
                intervention.style.opacity = '0';
                intervention.style.transform = 'translateY(20px)';
            }
        }
        
        // Initial display update
        function updateDemoDisplay() {
            // Set initial values
            const screenTimeElement = document.getElementById('screenTime');
            const socialTimeElement = document.getElementById('socialTime');
            const moneySpentElement = document.getElementById('moneySpent');
            
            if (screenTimeElement) screenTimeElement.textContent = '30 min';
            if (socialTimeElement) socialTimeElement.textContent = '20 min';
            if (moneySpentElement) moneySpentElement.textContent = '$0';
            
            // Set prediction bars
            const foodPredictionFill = document.querySelector('.prediction-item:nth-child(1) .prediction-fill');
            const foodPredictionText = document.querySelector('.prediction-item:nth-child(1) .prediction-value');
            const socialPredictionFill = document.querySelector('.prediction-item:nth-child(2) .prediction-fill');
            const socialPredictionText = document.querySelector('.prediction-item:nth-child(2) .prediction-value');
            
            if (foodPredictionFill) foodPredictionFill.style.width = '85%';
            if (foodPredictionText) foodPredictionText.textContent = '85% likely to order food';
            if (socialPredictionFill) socialPredictionFill.style.width = '70%';
            if (socialPredictionText) socialPredictionText.textContent = 'Predicted: 2.5 hours';
            
            // Set charts
            const productivityChart = document.querySelector('.metric-chart:nth-child(1) .chart-bar');
            const productivityValue = document.querySelector('.metric-chart:nth-child(1) .chart-value');
            const impulseChart = document.querySelector('.metric-chart:nth-child(2) .chart-bar');
            const impulseValue = document.querySelector('.metric-chart:nth-child(2) .chart-value');
            
            if (productivityChart) productivityChart.style.height = '65%';
            if (productivityValue) productivityValue.textContent = '65%';
            if (impulseChart) impulseChart.style.height = '42%';
            if (impulseValue) impulseValue.textContent = '42%';
        }
    }
    
    // ====================================
    // 7. CARD HOVER EFFECTS ENHANCEMENT
    // ====================================
    const cards = document.querySelectorAll('.problem-card, .preview-card, .feature-card, .step-card, .principle-card, .use-case-card, .flow-step');
    
    cards.forEach(card => {
        // Add animation class on hover
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // ====================================
    // 8. SCROLL ANIMATIONS
    // ====================================
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.problem-card, .feature-card, .step-card, .principle-card, .flow-step, .preview-card, .use-case-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }
    
    // Initialize scroll animations after page load
    window.addEventListener('load', initScrollAnimations);
    
    // ====================================
    // 9. PAGE TRANSITION EFFECTS
    // ====================================
    // Handle internal page navigation with fade effect
    document.querySelectorAll('a').forEach(link => {
        // Only handle internal links
        if (link.href && link.href.startsWith(window.location.origin) && 
            !link.href.includes('#') && 
            link.getAttribute('href') !== '') {
            
            // Skip if it's a download link or external link
            if (link.hasAttribute('download') || link.target === '_blank') return;
            
            link.addEventListener('click', function(e) {
                // Don't interfere with JavaScript handlers
                if (this.getAttribute('onclick')) return;
                
                // Don't intercept if modifier keys are pressed
                if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
                
                // Get the href
                const href = this.getAttribute('href');
                
                // Don't intercept if it's the current page
                if (href === window.location.pathname) return;
                
                // Add fade-out effect
                document.body.style.opacity = '0.8';
                document.body.style.transition = 'opacity 0.3s ease';
                
                // Allow navigation after a brief delay
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
                
                e.preventDefault();
            });
        }
    });
    
    // ====================================
    // 10. SET ACTIVE NAVIGATION STATE
    // ====================================
    function setActiveNavLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            // Get the link's href (relative path)
            const linkPath = link.getAttribute('href');
            
            // Check if this link corresponds to current page
            if (currentPath.endsWith(linkPath) || 
                (currentPath === '/' && linkPath === 'index.html') ||
                (currentPath.endsWith('/') && linkPath === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    
    // Call on page load
    setActiveNavLink();
    
    // ====================================
    // 11. PAGE LOAD ANIMATIONS
    // ====================================
    window.addEventListener('load', function() {
        // Fade in body content
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
        
        // Add loaded class for any CSS animations
        document.body.classList.add('page-loaded');
        
        console.log('Page fully loaded');
    });
    
    // ====================================
    // 12. FORM HANDLING (for future forms)
    // ====================================
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#f72585';
                    
                    // Reset border color after 2 seconds
                    setTimeout(() => {
                        input.style.borderColor = '';
                    }, 2000);
                }
            });
            
            if (isValid) {
                // In a real app, you would submit the form here
                // For demo purposes, just show a success message
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';
                
                if (submitBtn) {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Submitted!';
                    submitBtn.disabled = true;
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }, 3000);
                }
                
                console.log('Form submitted successfully');
            } else {
                console.log('Form validation failed');
            }
        });
    });
    
    // ====================================
    // 13. ADDITIONAL UI ENHANCEMENTS
    // ====================================
    
    // Back to top button (if needed)
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 998;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.transform = 'translateY(0)';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.transform = 'translateY(20px)';
        }
    });
    
    // Back to top functionality
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add CSS for dark theme back to top button
    const style = document.createElement('style');
    style.textContent = `
        .dark-theme .back-to-top {
            background-color: var(--primary-color);
            color: white;
        }
        
        .animate-in {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // ====================================
    // 14. CONSOLE LOGO (for fun)
    // ====================================
    console.log(`
        %cSmartPulse AI%c
        ====================
        Intelligent Behavior Prediction System
        © 2023 SmartPulse AI
        ====================
    `, 
    'color: #4361ee; font-size: 24px; font-weight: bold;',
    'color: #6c757d; font-size: 14px;');
    
    console.log('All JavaScript functionality initialized successfully!');
});

// ====================================
// 15. WINDOW ERROR HANDLING
// ====================================
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.message, 'at', e.filename, 'line', e.lineno);
    
    // Don't show error alerts to users in production
    // But we can log them for debugging
    return true;
});

// ====================================
// 16. RESIZE HANDLER FOR RESPONSIVE UPDATES
// ====================================
window.addEventListener('resize', function() {
    // Close mobile menu if window is resized to desktop size
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.getElementById('navToggle');
    
    if (navMenu && navToggle && window.innerWidth > 768) {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    }
});