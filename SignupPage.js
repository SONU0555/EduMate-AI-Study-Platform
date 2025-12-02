 // Get form elements
        const form = document.getElementById('signupForm');
        const firstNameInput = document.getElementById('firstName');
        const lastNameInput = document.getElementById('lastName');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirmPassword');
        const termsCheckbox = document.getElementById('terms');
        const signupBtn = document.getElementById('signupBtn');
        const passwordToggle = document.getElementById('passwordToggle');
        const confirmPasswordToggle = document.getElementById('confirmPasswordToggle');
        const successMessage = document.getElementById('successMessage');
        const loginLink = document.getElementById('loginLink');

        // Error elements
        const firstNameError = document.getElementById('firstNameError');
        const lastNameError = document.getElementById('lastNameError');
        const emailError = document.getElementById('emailError');
        const passwordError = document.getElementById('passwordError');
        const confirmPasswordError = document.getElementById('confirmPasswordError');

        // Password strength elements
        const passwordStrength = document.getElementById('passwordStrength');
        const passwordStrengthBar = document.getElementById('passwordStrengthBar');
        const passwordHint = document.getElementById('passwordHint');

        // close sign-up page button
         const closeSignup = () => {
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

        confirmPasswordToggle.addEventListener('click', function() {
            const type = confirmPasswordInput.type === 'password' ? 'text' : 'password';
            confirmPasswordInput.type = type;
            this.textContent = type === 'password' ? '👁️' : '🙈';
        });

        // Password strength checker
        function checkPasswordStrength(password) {
            let strength = 0;
            
            if (password.length >= 8) strength++;
            if (password.length >= 12) strength++;
            if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
            if (/\d/.test(password)) strength++;
            if (/[^a-zA-Z\d]/.test(password)) strength++;

            return strength;
        }

        // Real-time password strength
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            
            if (password.length > 0) {
                passwordStrength.classList.add('show');
                passwordHint.classList.add('show');
                
                const strength = checkPasswordStrength(password);
                
                passwordStrengthBar.className = 'password-strength-bar';
                
                if (strength <= 2) {
                    passwordStrengthBar.classList.add('weak');
                    passwordHint.textContent = 'Weak password - Add more characters and symbols';
                    passwordHint.style.color = '#ef4444';
                } else if (strength <= 4) {
                    passwordStrengthBar.classList.add('medium');
                    passwordHint.textContent = 'Medium strength - Consider adding special characters';
                    passwordHint.style.color = '#f59e0b';
                } else {
                    passwordStrengthBar.classList.add('strong');
                    passwordHint.textContent = 'Strong password!';
                    passwordHint.style.color = '#10b981';
                }
            } else {
                passwordStrength.classList.remove('show');
                passwordHint.classList.remove('show');
            }
        });

        // Real-time validation for first name
        firstNameInput.addEventListener('input', function() {
            if (this.value.trim().length > 0) {
                this.classList.remove('error');
                this.classList.add('success');
                firstNameError.classList.remove('show');
            }
        });

        // Real-time validation for last name
        lastNameInput.addEventListener('input', function() {
            if (this.value.trim().length > 0) {
                this.classList.remove('error');
                this.classList.add('success');
                lastNameError.classList.remove('show');
            }
        });

        // Real-time email validation
        emailInput.addEventListener('input', function() {
            if (this.value && emailRegex.test(this.value)) {
                this.classList.remove('error');
                this.classList.add('success');
                emailError.classList.remove('show');
            } else if (this.value) {
                this.classList.add('error');
                this.classList.remove('success');
                emailError.classList.add('show');
            }
        });

        // Real-time confirm password validation
        confirmPasswordInput.addEventListener('input', function() {
            if (this.value && this.value === passwordInput.value) {
                this.classList.remove('error');
                this.classList.add('success');
                confirmPasswordError.classList.remove('show');
            } else if (this.value) {
                this.classList.add('error');
                this.classList.remove('success');
                confirmPasswordError.classList.add('show');
            }
        });

        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get values
            const firstName = firstNameInput.value.trim();
            const lastName = lastNameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            const termsAccepted = termsCheckbox.checked;

            // Reset errors
            let isValid = true;

            // Validate first name
            if (!firstName) {
                firstNameInput.classList.add('error');
                firstNameError.classList.add('show');
                isValid = false;
            }

            // Validate last name
            if (!lastName) {
                lastNameInput.classList.add('error');
                lastNameError.classList.add('show');
                isValid = false;
            }

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
            } else if (password.length < 8) {
                passwordInput.classList.add('error');
                passwordError.textContent = 'Password must be at least 8 characters';
                passwordError.classList.add('show');
                isValid = false;
            }

            // Validate confirm password
            if (!confirmPassword) {
                confirmPasswordInput.classList.add('error');
                confirmPasswordError.textContent = 'Please confirm your password';
                confirmPasswordError.classList.add('show');
                isValid = false;
            } else if (password !== confirmPassword) {
                confirmPasswordInput.classList.add('error');
                confirmPasswordError.textContent = 'Passwords do not match';
                confirmPasswordError.classList.add('show');
                isValid = false;
            }

            // Validate terms
            if (!termsAccepted) {
                alert('Please accept the Terms of Service and Privacy Policy');
                isValid = false;
            }

            // If validation passes
            if (isValid) {
                // Add loading state
                signupBtn.classList.add('loading');
                signupBtn.disabled = true;

                // Simulate API call
                setTimeout(() => {
                    // Remove loading state
                    signupBtn.classList.remove('loading');
                    signupBtn.disabled = false;

                    // Show success message
                    successMessage.classList.add('show');

                    // Clear form
                    form.reset();
                    passwordStrength.classList.remove('show');
                    passwordHint.classList.remove('show');

                    // Remove success classes
                    document.querySelectorAll('.success').forEach(el => {
                        el.classList.remove('success');
                    });

                    // Hide success message after 2 seconds
                    setTimeout(() => {
                        successMessage.classList.remove('show');
                        
                        // Alert with signup data
                        alert(`Account Created Successfully!\n\nName: ${firstName} ${lastName}\nEmail: ${email}\nPassword Strength: ${checkPasswordStrength(password) > 4 ? 'Strong' : checkPasswordStrength(password) > 2 ? 'Medium' : 'Weak'}\n\nIn a real application, this data would be sent to your backend server.`);
                    }, 2000);
                }, 1500);
            }
        });

        // Login link
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Login clicked!\n\nThis would redirect to the login page.');
        });

        // Auto-focus first name input on page load
        window.addEventListener('load', function() {
            firstNameInput.focus();
        });