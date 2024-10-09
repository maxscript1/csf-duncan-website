function smoothScroll(target, duration) {
    var targetElement = document.querySelector(target);
    var targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset; // Adjusted to include current scroll position
    var startPosition = window.pageYOffset;
    var distance = targetPosition - startPosition;
    var startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // Unified easing function
    function ease(t, b, c, d) {
        t /= d;
        t--;
        return c * (t * t * t + 1) + b;
    }

    requestAnimationFrame(animation);
}

// Function to adjust header opacity based on scroll position
function handleHeaderOpacity() {
    const header = document.querySelector('.header');
    const scrollY = window.scrollY; 
    const headerHeight = header.offsetHeight; 

    // Calculate opacity to create a fade to black effect
    let opacity = Math.max(0, 1 - (scrollY / headerHeight));

    // Set the opacity of the header background (image)
    header.style.opacity = opacity; 

    // Correct way to access the overlay if it exists
    const overlay = header.querySelector('.overlay'); // Assuming an actual overlay element
    if (overlay) {
        overlay.style.opacity = 1 - opacity; // Adjust the overlay opacity
    }
}

// Adjust opacity on scroll
window.addEventListener("scroll", function() {
    handleHeaderOpacity();
    toggleScrollToTopButton(); // Added here to keep it in one scroll event listener
});

// Show/hide scroll to top button based on scroll position
function toggleScrollToTopButton() {
    var scrollToTopBtn = document.querySelector('.scroll-to-top');
    scrollToTopBtn.style.display = (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) ? 'block' : 'none';
}

// Smooth scroll to target section when a nav link is clicked
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        smoothScroll(this.getAttribute('href'), 1000);
    });
});

// Smooth scroll to about section when the arrow is clicked
document.querySelector('.scroll-down-arrow').addEventListener('click', function(event) {
    event.preventDefault();
    smoothScroll('.about-section', 1000);
});

// Function to handle scroll events for all sections
function handleScroll() {
    handleScrollForSection("about");
    handleScrollForSection("scholarships");
    handleScrollForSection("calendar");
    handleScrollForSection("events");
    handleScrollForSection("teachers");
}

// Initial check when the page loads
handleScroll();

// Function to handle scroll event for a specific section
function handleScrollForSection(sectionId) {
    var section = document.getElementById(sectionId);
    var bounding = section.getBoundingClientRect();
    var isInView = bounding.top >= 0 && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight);

    if (isInView) {
        section.classList.add("in-view");
    } else {
        section.classList.remove("in-view");
    }
    
    // Check if the section is partially in view
    var isPartiallyInView = bounding.top < window.innerHeight && bounding.bottom > 0;

    // If the section is partially in view, trigger animation
    if (isPartiallyInView) {
        section.classList.add("in-view");
    } else {
        section.classList.remove("in-view");
    }
}

// Smooth scrolling function for scroll-to-top button
function smoothScrollToTop(duration) {
    var startPosition = window.pageYOffset;
    var distance = -startPosition;
    var startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // Unified easing function
    function ease(t, b, c, d) {
        t /= d;
        t--;
        return c * (t * t * t + 1) + b;
    }

    requestAnimationFrame(animation);
}

// Scroll to top function
function scrollToTop() {
    smoothScrollToTop(1000);
}

// Lightbox functionality
document.addEventListener('DOMContentLoaded', function() {
    var lightbox = document.getElementById('lightbox');
    var lightboxContent = document.querySelector('.lightbox-content');
    var closeBtn = document.querySelector('.close');

    // Event listener for clicking on event photos
    document.querySelectorAll('.event-photos img').forEach(function(img) {
        img.addEventListener('click', function() {
            var imgSrc = this.getAttribute('src');
            lightboxContent.setAttribute('src', imgSrc);
            lightbox.style.display = 'flex';
            setTimeout(function() {
                lightboxContent.style.transform = 'scale(1)';
            }, 50);
        });
    });
    

    // Event listener for closing the lightbox
    closeBtn.addEventListener('click', function() {
        lightboxContent.style.transform = 'scale(0)';
        setTimeout(function() {
            lightbox.style.display = 'none';
        }, 300);
    });

    // Close lightbox when clicking outside the modal
    window.addEventListener('click', function(event) {
        if (event.target === lightbox) {
            lightboxContent.style.transform = 'scale(0)';
            setTimeout(function() {
                lightbox.style.display = 'none';
            }, 300);
        }
    });
});
