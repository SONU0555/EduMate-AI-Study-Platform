 // Get form elements
        const form = document.getElementById('loginForm');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const emailError = document.getElementById('emailError');
        const passwordError = document.getElementById('passwordError');
        const loginBtn = document.getElementById('loginBtn');
        const passwordToggle = document.getElementById('passwordToggle');
        const successMessage = document.getElementById('successMessage');
        const forgotPasswordLink = document.getElementById('forgotPasswordLink');
        const signupLink = document.getElementById('signupLink');


        // close login page button
        const closeLogin = () => {
            window.history.back();
        }

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Toggle password visibility
        passwordToggle.addEventListener('click', function() {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            this.textContent = type === 'password' ? '👁️' : '🙈';
        });

        // Real-time email validation
        emailInput.addEventListener('input', function() {
            if (this.value && !emailRegex.test(this.value)) {
                this.classList.add('error');
                emailError.classList.add('show');
            } else {
                this.classList.remove('error');
                emailError.classList.remove('show');
            }
        });

        // Real-time password validation
        passwordInput.addEventListener('input', function() {
            if (this.value && this.value.length < 6) {
                this.classList.add('error');
                passwordError.classList.add('show');
            } else {
                this.classList.remove('error');
                passwordError.classList.remove('show');
            }
        });

        // Clear error on focus
        emailInput.addEventListener('focus', function() {
            this.classList.remove('error');
            emailError.classList.remove('show');
        });

        passwordInput.addEventListener('focus', function() {
            this.classList.remove('error');
            passwordError.classList.remove('show');
        });

        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get values
            const email = emailInput.value.trim();
            const password = passwordInput.value;

            // Reset errors
            let isValid = true;

            // Validate email
            if (!email) {
                emailInput.classList.add('error');
                emailError.textContent = 'Email is required';
                emailError.classList.add('show');
                isValid = false;
            } else if (!emailRegex.test(email)) {
                emailInput.classList.add('error');
                emailError.textContent = 'Please enter a valid email address';
                emailError.classList.add('show');
                isValid = false;
            }

            // Validate password
            if (!password) {
                passwordInput.classList.add('error');
                passwordError.textContent = 'Password is required';
                passwordError.classList.add('show');
                isValid = false;
            } else if (password.length < 6) {
                passwordInput.classList.add('error');
                passwordError.textContent = 'Password must be at least 6 characters';
                passwordError.classList.add('show');
                isValid = false;
            }

            // If validation passes
            if (isValid) {
                // Add loading state
                loginBtn.classList.add('loading');
                loginBtn.disabled = true;

                // Simulate API call
                setTimeout(() => {
                    // Remove loading state
                    loginBtn.classList.remove('loading');
                    loginBtn.disabled = false;

                    // Show success message
                    successMessage.classList.add('show');

                    // Clear form
                    form.reset();

                    // Hide success message after 2 seconds
                    setTimeout(() => {
                        successMessage.classList.remove('show');
                        
                        // Alert with login data (in real app, this would be sent to server)
                        alert(`Login Successful!\n\nEmail: ${email}\nPassword: ${'•'.repeat(password.length)}\n\nIn a real application, this data would be sent to your backend server.`);
                    }, 2000);
                }, 1500);
            }
        });

        // Forgot password link
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Forgot Password clicked!\n\nThis would open a password reset form or send a reset email.');
        });

        // Sign up link
        signupLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Sign Up clicked!\n\nThis would redirect to the registration page.');
        });

        // Auto-focus email input on page load
        window.addEventListener('load', function() {
            emailInput.focus();
            });