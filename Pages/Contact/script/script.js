$(function () {
    $(window).on('scroll', function () {
        var heroHeight = $('.hero').height();
        var scrollPosition = $(window).scrollTop();
        var navbarHeight = $('#mainNav').outerHeight();

        if (scrollPosition > heroHeight - navbarHeight) {
            $('#mainNav').addClass('navbar-scrolled');
        } 
        else {
            $('#mainNav').removeClass('navbar-scrolled');
        }
    });
});

/////////////////////////////////////////////////////

// Wait for the entire HTML document to be loaded
document.addEventListener('DOMContentLoaded', function() {

    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default page reload

            // --- Basic Validation ---
            if (nameInput.value.trim() === "" || emailInput.value.trim() === "" || subjectInput.value.trim() === "" || messageInput.value.trim() === "") {
                alert("Please fill out all fields.");
                return;
            }

            // Simple email validation
            if (!validateEmail(emailInput.value)) {
                alert("Please enter a valid email address.");
                return;
            }

            // If validation passes
            alert("Thank you for your message! We will get back to you soon.");
            
            // In a real application, you would send the form data to a server here.
            
            contactForm.reset();
        });
    }

    // --- Helper function for email validation ---
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});