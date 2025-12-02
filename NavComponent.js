  // Toggle mobile menu
        function toggleMobileMenu() {
            const hamburger = document.querySelector('.hamburger');
            const mobileMenu = document.getElementById('mobileMenu');
            
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        }

        // Close mobile menu
        function closeMobileMenu() {
            const hamburger = document.querySelector('.hamburger');
            const mobileMenu = document.getElementById('mobileMenu');
            
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        }

        // Handle login button
        function handleLogin() {
            alert('Login button clicked!\n\nThis will open the login page.');
            closeMobileMenu();
        }

        // Handle signup button
        function handleSignup() {
            alert('Sign Up button clicked!\n\nThis will open the registration page.');
            closeMobileMenu();
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const mobileMenu = document.getElementById('mobileMenu');
            const hamburger = document.querySelector('.hamburger');
            
            if (mobileMenu.classList.contains('active') && 
                !mobileMenu.contains(event.target) && 
                !hamburger.contains(event.target)) {
                closeMobileMenu();
            }
        });