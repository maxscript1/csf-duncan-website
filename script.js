// Smooth scrolling function
function smoothScroll(target, duration) {
    var targetElement = document.querySelector(target);
    var targetPosition = targetElement.getBoundingClientRect().top;
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

    // Easing function
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

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

// Listen for scroll events
window.addEventListener("scroll", function() {
    toggleScrollToTopButton();
    handleScroll();
});

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
        // If the section is not partially in view, remove animation class
        section.classList.remove("in-view");
    }
}

// Scroll to top function
function scrollToTop() {
    smoothScroll('body', 1000);
}