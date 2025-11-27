// Form validation for booking form
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    const errorMessages = {
        fullName: 'Please enter your full name',
        email: 'Please enter a valid email address',
        phone: 'Please enter a valid phone number',
        appointmentDate: 'Please select a date',
        appointmentTime: 'Please select a time',
        serviceType: 'Please select a service',
        consent: 'You must agree to the terms and conditions'
    };

    // Real-time validation
    bookingForm.addEventListener('input', function(e) {
        const field = e.target;
        clearError(field);
        
        if (field.value.trim() !== '') {
            validateField(field);
        }
    });

    // Form submission
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Simulate form submission
            alert('Thank you for your booking! You will receive a confirmation email shortly. Remember: You get 25% discount on your visit!');
            bookingForm.reset();
        }
    });

    function validateForm() {
        let isValid = true;
        const fields = bookingForm.querySelectorAll('input[required], select[required]');
        
        fields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    function validateField(field) {
        const fieldName = field.name;
        const value = field.value.trim();
        
        switch (fieldName) {
            case 'fullName':
                if (value.length < 2) {
                    showError(field, 'Name must be at least 2 characters long');
                    return false;
                }
                break;
                
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    showError(field, 'Please enter a valid email address');
                    return false;
                }
                break;
                
            case 'phone':
                const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
                if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                    showError(field, 'Please enter a valid phone number');
                    return false;
                }
                break;
                
            case 'appointmentDate':
                const selectedDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                if (value === '' || selectedDate < today) {
                    showError(field, 'Please select a future date');
                    return false;
                }
                break;
                
            case 'appointmentTime':
            case 'serviceType':
                if (value === '') {
                    showError(field, errorMessages[fieldName]);
                    return false;
                }
                break;
                
            case 'consent':
                if (!field.checked) {
                    showError(field, errorMessages.consent);
                    return false;
                }
                break;
        }
        
        return true;
    }

    function showError(field, message) {
        const errorElement = document.getElementById(field.name + 'Error') || 
                            field.parentNode.querySelector('.error-message');
        field.style.borderColor = '#dc3545';
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    function clearError(field) {
        const errorElement = document.getElementById(field.name + 'Error') || 
                            field.parentNode.querySelector('.error-message');
        field.style.borderColor = '#e9ecef';
        if (errorElement) {
            errorElement.textContent = '';
        }
    }

    // Set minimum date to today for appointment date
    const dateInput = document.getElementById('appointmentDate');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;

    
});