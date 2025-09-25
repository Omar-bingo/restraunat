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

//////////////////////////////////////////////////

// Wait for the entire HTML document to be loaded and parsed
document.addEventListener('DOMContentLoaded', function () {

    // Select the form and the input fields we need to validate
    const bookingForm = document.querySelector('.booking-form');
    if (!bookingForm) return; // Stop if the form doesn't exist on the page

    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');
    const guestsInput = document.getElementById('guests');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');

    // Real-time validation for the Phone Number field (allows only numbers)
    phoneInput.addEventListener('input', function (event) {
        event.target.value = event.target.value.replace(/[^0-9]/g, '');
    });

    // Add a 'submit' event listener to the form
    bookingForm.addEventListener('submit', function (event) {

        // 1. Prevent the default form submission behavior
        event.preventDefault();

        // --- Validation Logic ---

        // Check for empty required fields
        if (nameInput.value === "" || phoneInput.value === "" || dateInput.value === "" || timeInput.value === "" || guestsInput.value === "") {
            alert("Please fill out all required fields.");
            return;
        }

        // ===================================================================
        // === UPDATED: Final validation for the Phone Number on submission ===
        // This Regex checks for a valid Egyptian mobile number format.
        // It must be 11 digits and start with 010, 011, 012, or 015.
        // ===================================================================
        const phonePattern = /^(010|011|012|015)\d{8}$/;
        if (!phonePattern.test(phoneInput.value)) {
            alert("Please enter a valid Egyptian phone number starting with 010, 011, 012, or 015.");
            return;
        }

        // Validate the date (cannot be in the past)
        const selectedDate = new Date(dateInput.value + 'T00:00:00');
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            alert("You cannot book a table in the past. Please select a valid date.");
            return;
        }

        // Validate the number of guests
        const numberOfGuests = parseInt(guestsInput.value, 10);
        if (numberOfGuests <= 0) {
            alert("Number of guests must be at least 1.");
            return;
        }

        // Validate Booking Time based on Opening Hours
        const dayOfWeek = selectedDate.getDay();
        const selectedTime = timeInput.value;

        let isValidTime = false;
        let errorMessage = "We are closed at the selected time. Please check our opening hours.";

        if (dayOfWeek === 5) { // Friday
            if (selectedTime >= "14:00") {
                isValidTime = true;
            }
            errorMessage = "On Fridays, we open from 2:00 PM until 1:00 AM.";

        } else if (dayOfWeek === 6) { // Saturday
            if (selectedTime < "01:00" || selectedTime >= "12:00") {
                isValidTime = true;
            }
            errorMessage = "On Saturdays, we are open from 12:00 PM until midnight (and until 1:00 AM for Friday's session).";

        } else { // Sunday to Thursday
            if (selectedTime >= "12:00") {
                isValidTime = true;
            }
            errorMessage = "Our opening hours are from 12:00 PM to 12:00 AM.";
        }

        if (!isValidTime) {
            alert(errorMessage);
            return;
        }

        // If all validation passes, show a success message
        alert("Thank you! Your reservation has been submitted successfully.");

        bookingForm.reset();
    });
});