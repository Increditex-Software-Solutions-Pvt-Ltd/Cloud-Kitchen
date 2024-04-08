document.querySelectorAll('.play-icon').forEach(function (playIcon) {
    playIcon.addEventListener('click', function () {
        var videoBox = this.closest('.videobox');
        var videoIframe = videoBox.querySelector('.video-iframe');

        videoIframe.style.display = 'block';
    });
});


window.onload = function() {
    const leftDoor = document.getElementById('leftDoor');
    const rightDoor = document.getElementById('rightDoor');
    const transHeading = document.querySelector('.animation-fade');

    // Prevent scrolling
    window.addEventListener('scroll', disableScroll);

    leftDoor.style.transform = 'translateX(-100%)';
    rightDoor.style.transform = 'translateX(100%)';

    leftDoor.style.transition = 'transform 4s ease';
    rightDoor.style.transition = 'transform 4s ease';

    setTimeout(function() {
        leftDoor.style.transition = 'none'; 
        rightDoor.style.transition = 'none';
        leftDoor.style.display = 'none';
        rightDoor.style.display = 'none';

        // Enable scrolling
        window.removeEventListener('scroll', disableScroll);

        // Apply the fade-in animation to the text
        transHeading.style.animation = 'fadeIn 0.5s ease forwards';
    }, 1200);
};

function disableScroll() {
    window.scrollTo(0, 0);
}




function handleScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY >= 300) {
        navbar.classList.add('sticky-top-300');
    } else {
        navbar.classList.remove('sticky-top-300');
    }
}


window.addEventListener('scroll', handleScroll);

handleScroll();

document.addEventListener("DOMContentLoaded", function () {
    var modalHeader = document.querySelector(".modal-header-left");
    var modalBody = document.querySelector(".modal-body-left");
    var sitemapHeader = document.querySelector(".sitemapheader");

    // Function to remove animation properties
    var removeAnimation = function (element) {
        element.style.animation = 'none';
        element.offsetHeight; // Trigger reflow
    };

    // Function to reset initial state
    var resetInitialState = function () {
        sitemapHeader.style.opacity = 0;
        sitemapHeader.style.transform = 'translateY(50px)';
    };

    // Trigger the first animations
    modalHeader.style.animation = "none"; // Reset slide animation
    modalBody.style.animation = "none"; // Reset slide animation
    removeAnimation(sitemapHeader);

    modalHeader.style.animation = "slide 1s ease-out forwards";
    modalBody.style.animation = "slide 1s ease-out forwards";

    // After the first animation completes, reset and trigger the fadeIn animation for the specific span
    modalHeader.addEventListener("animationend", function () {
        // Reset initial state before applying fadeIn animation
        resetInitialState();
        removeAnimation(sitemapHeader);
        sitemapHeader.style.animation = "fadeUp 1s ease-out forwards";
    });

    // Additional code to reset the modal state when closing
    var closeModalButton = document.querySelector("[data-bs-dismiss='modal']");
    closeModalButton.addEventListener("click", function () {
        removeAnimation(modalHeader);
        removeAnimation(modalBody);
        resetInitialState();
    });
});


function handleFormInput() {
    var form = $("#enquiryForm");
    var submitButton = $("#submitButton");

    form.on("input", function () {
        submitButton.prop('disabled', !form[0].checkValidity());
    });

    form.on('submit', function (event) {
        event.preventDefault();
        console.log('Form submitted');

        // Serialize the form data
        var formData = form.serialize();
        console.log('Serialized form data:', formData);

        $.ajax({
            url: '/admin/addenquiry',
            type: 'POST',
            data: formData,
            success: function (data) {
                console.log('Response data:', data);

               
                if (data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Enquiry sent!',
                        text: 'Your Enquiry is submitted successfully.',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'There was an error submitting the form.',
                    });
                }
            },
            error: function (xhr, status, error) {
                console.error('Error submitting form:', error);

                // Log the response text for more information
                console.log('Response text:', xhr.responseText);

                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'There was an error submitting the form. Check console for details.',
                });
            },
            complete: function () {
                form[0].reset();
                submitButton.prop('disabled', true);
            }
        });
    });
}

$(document).ready(handleFormInput);


