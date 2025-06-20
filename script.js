window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-MBGR8GE2HH');

function toggleVehicles() {
    const moreVehicles = document.getElementById('moreVehicleList');
    const btn = document.querySelectorAll('.view-more')[0];
    moreVehicles.classList.toggle('hidden');
    btn.textContent = moreVehicles.classList.contains('hidden')
        ? 'View More Vehicles'
        : 'View Less Vehicles';
}

function toggleServices() {
    const moreServices = document.getElementById('moreServiceList');
    const btn = document.querySelectorAll('.view-more')[1];
    moreServices.classList.toggle('hidden');
    btn.textContent = moreServices.classList.contains('hidden')
        ? 'View More Services'
        : 'View Less Services';
}

document.addEventListener("DOMContentLoaded", function () {
    // ===== Menu Toggle =====
    const menuButton = document.getElementById("menu-button");
    const dropdownMenu = document.getElementById("dropdown-menu");

    if (menuButton && dropdownMenu) {
        menuButton.addEventListener("click", function (event) {
            dropdownMenu.classList.toggle("active");
            event.stopPropagation();
        });

        document.addEventListener("click", function (event) {
            if (!menuButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.classList.remove("active");
            }
        });
    }

    // ===== Booking Form =====
    const bookingForm = document.getElementById("bookingForm");
    if (bookingForm) {
        bookingForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const bookingData = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                phone: document.getElementById("phone").value,
                pickup: document.getElementById("pickup").value,
                dropoff: document.getElementById("dropoff").value,
                travelers: document.getElementById("travelers").value,
            };

            const submitButton = bookingForm.querySelector("button[type='submit']");
            submitButton.disabled = true;
            submitButton.innerText = "Processing... Please wait (5s)";

            let countdown = 5;
            const interval = setInterval(() => {
                countdown--;
                submitButton.innerText = `Processing... Please wait (${countdown}s)`;
            }, 1000);

            const scriptURL = "https://script.google.com/macros/s/AKfycbzn_4oOBJafTUBPgvwmrhtjxJN3mcDz809YLUTBHjCmdDKYYG-lGRDMgLuM_WJ9ebhm/exec";

            try {
                const response = await fetch(scriptURL, {
                    method: "POST",
                    body: JSON.stringify(bookingData),
                    headers: { "Content-Type": "application/json" },
                    mode: "no-cors" // Note: with no-cors, response body and status are not directly accessible.
                });
                clearInterval(interval);
                // ✅ Google Analytics Event for Booking
                gtag('event', 'booking_submission', {
                    event_category: 'Booking',
                    event_label: 'Booking Form Submitted',
                    value: 1
                });

                // ✅ Google Ads Conversion Tracking
                gtag('event', 'conversion', {
                    'send_to': 'AW-16969327986/abc123xyz' // 🔁 replace with your actual ID
                });

                // Show success message and ask for WhatsApp confirmation
                const successMessage = document.createElement("div");
                successMessage.classList.add("booking-success-message");
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle success-icon"></i>
                    <p class="success-text">Your booking application has been submitted.</p>
                    <p class="success-subtext">Would you like to confirm your booking via WhatsApp?</p>
                    <div class="success-buttons">
                        <button id="confirmYes" class="action-button">Yes</button>
                        <button id="confirmNo" class="action-button">No</button>
                    </div>
                `;
                bookingForm.parentElement.appendChild(successMessage);
                submitButton.style.display = "none";

                // Handle WhatsApp confirmation
                document.getElementById("confirmYes").onclick = function () {
                    sendWhatsAppMessage(bookingData);
                    bookingForm.reset();
                    successMessage.remove();
                    submitButton.style.display = "block";
                    submitButton.disabled = false;
                    submitButton.innerText = "Submit Booking";
                };

                document.getElementById("confirmNo").onclick = function () {
                    successMessage.innerHTML = `
                        <i class="fas fa-smile-beam success-icon"></i>
                        <p class="success-text">Thank you! We will contact you shortly.</p>
                    `;
                    bookingForm.reset();
                    submitButton.style.display = "block";
                    submitButton.disabled = false;
                    submitButton.innerText = "Submit Booking";
                };
            } catch (error) {
                clearInterval(interval);
                alert("Error! Please try again.");
                submitButton.innerText = "Submit Booking";
                submitButton.disabled = false;
                console.error("Booking error:", error);
            }
        });

        function sendWhatsAppMessage(data) {
            const message = `Hello ShRish Travels,%0A%0A*New Booking Details*%0AName: ${data.name}%0APhone: ${data.phone}%0APickup: ${data.pickup}%0ADrop-off: ${data.dropoff}%0ATravelers: ${data.travelers}`;
            const number = "918883451668";
            window.open(`https://wa.me/${number}?text=${message}`, "_blank");
        }
    }
    AOS.init();
    // ===== Driver Application Form =====
    const driverForm = document.querySelector(".driver-application-form");
    if (driverForm) {
        driverForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const driverData = {
                fullName: document.getElementById("full-name").value,
                phoneNumber: document.getElementById("phone-number").value,
                cityArea: document.getElementById("city-area").value,
                experience: document.getElementById("driving-experience").value,
                ownsVehicle: document.getElementById("own-vehicle").value
            };

            const submitButton = driverForm.querySelector("button[type='submit']");
            submitButton.disabled = true;
            submitButton.innerText = "Submitting... Please wait (5s)";

            let countdown = 5;
            const interval = setInterval(() => {
                countdown--;
                submitButton.innerText = `Submitting... Please wait (${countdown}s)`;
            }, 1000);

            const scriptURL = "https://script.google.com/macros/s/AKfycbybd2RurJw0Laqk1hk5MSppyZwZGeNddfAQeMnbY7PXMAVpINtqEF4Q08Pxj1EzsU0Q4w/exec";

            try {
                const response = await fetch(scriptURL, {
                    method: "POST",
                    body: JSON.stringify(driverData),
                    headers: { "Content-Type": "application/json" },
                    mode: "no-cors"
                });

                clearInterval(interval);

                // ✅ Google Analytics Event Tracking
                gtag('event', 'driver_application', {
                    event_category: 'Hiring',
                    event_label: 'Driver Form Submitted',
                    value: 1
                });
                // Success message
                const successBox = document.createElement("div");
                successBox.classList.add("driver-success-message");
                successBox.innerHTML = `
                    <i class="fas fa-check-circle success-icon"></i>
                    <p class="success-text">Application submitted successfully.</p>
                    <p class="success-subtext">Would you like to confirm via WhatsApp?</p>
                    <div class="success-buttons">
                    <button id="driverYes" class="action-button">Yes</button>
                    <button id="driverNo" class="action-button">No</button>
                    </div>
                `;
                driverForm.parentElement.appendChild(successBox);
                submitButton.style.display = "none";

                document.getElementById("driverYes").onclick = function () {
                    sendWhatsAppMessage(driverData);
                    driverForm.reset();
                    successBox.remove();
                    submitButton.disabled = false;
                    submitButton.innerText = "Submit Application";
                    submitButton.style.display = "block";
                };

                document.getElementById("driverNo").onclick = function () {
                    successBox.innerHTML = `
            <i class="fas fa-thumbs-up success-icon"></i>
            <p class="success-text">Thank you! We'll get in touch soon.</p>
            `;
                    driverForm.reset();
                    submitButton.disabled = false;
                    submitButton.innerText = "Submit Application";
                    submitButton.style.display = "block";
                };
            } catch (error) {
                clearInterval(interval);
                alert("Error! Please try again.");
                console.error("Driver form error:", error);
                submitButton.innerText = "Submit Application";
                submitButton.disabled = false;
            }
        });

        function sendWhatsAppMessage(data) {
            const msg = `Hello ShRish Travels,%0A%0A*New Driver Application*%0AName: ${data.fullName}%0APhone: ${data.phoneNumber}%0AArea: ${data.cityArea}%0AExperience: ${data.experience}%0AOwn Vehicle: ${data.ownsVehicle}`;
            const number = "918883451668";
            window.open(`https://wa.me/${number}?text=${msg}`, "_blank");
        }
    }

    AOS.init();

    // ===== Contact Form =====
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const contactData = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                phone: document.getElementById("phone").value,
                message: document.getElementById("message").value
            };

            const submitButton = contactForm.querySelector("button[type='submit']");
            submitButton.disabled = true;
            submitButton.innerText = "Submitting...";

            const scriptURL = "https://script.google.com/macros/s/AKfycbywid3X23kc-9VyHcfYxNK1fkLl0AWYm7c4sarsn7DAdTeA4eGUZp8nOlyxsgckfkMu/exec";

            try {
                const response = await fetch(scriptURL, {
                    method: "POST",
                    body: JSON.stringify(contactData),
                    headers: { "Content-Type": "application/json" },
                    mode: "no-cors" // Note: with no-cors, response body and status are not directly accessible.
                });

                contactForm.style.display = "none";
                const successMessage = document.getElementById("successMessage");
                successMessage.classList.remove("hidden");
                successMessage.innerHTML = `
                        <i class="fas fa-check-circle success-icon"></i>
                        <p class="success-text">Thank you! Your message has been sent successfully.</p>
                        <p class="success-subtext">Would you like to chat with us on WhatsApp?</p>
                        <div class="success-buttons">
                            <button id="whatsappYes" class="action-button">Yes</button>
                            <button id="whatsappNo" class="action-button">No</button>
                        </div>
                    `;
                gtag('event', 'form_submission', {
                    event_category: 'Contact',
                    event_label: 'Contact Form Submitted',
                    value: 1
                });

                document.getElementById("whatsappYes").onclick = function () {
                    const name = contactData.name;
                    const phone = contactData.phone;
                    const message = contactData.message;

                    const encodedMessage = encodeURIComponent(
                        `Hello ShRish Travels 👋,\n` +
                        `I’ve just submitted a message through your contact form and would like to follow up regarding support or feedback.\n\n` +
                        `Name: ${name}\n` +
                        `Phone: ${phone}\n` +
                        `Message: ${message}\n\n` +
                        `Looking forward to your response. Thank you!`
                    );

                    window.open(`https://wa.me/918883451668?text=${encodedMessage}`, "_blank");
                };

                document.getElementById("whatsappNo").onclick = function () {
                    successMessage.innerHTML = `
                            <i class="fas fa-smile-beam success-icon"></i>
                            <p class="success-text">Thanks again! We'll reach out to you shortly.</p>
                        `;
                };

                submitButton.innerText = "Submit";
                submitButton.disabled = false;
            } catch (error) {
                alert("Error submitting contact form. Please try again.");
                console.error("Contact error:", error);
                submitButton.innerText = "Submit";
                submitButton.disabled = false;
            }
        });
    }
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            item.classList.toggle('open');
        });
    });
    document.getElementById("copyright-year").textContent = new Date().getFullYear();
    const youtubeIcon = document.querySelector('.youtube-icon');
    const youtubeIframe = document.querySelector('.youtube-preview iframe');

    youtubeIcon.addEventListener('mouseenter', () => {
        youtubeIframe.src = "https://www.youtube.com/embed/videoseries?list=PLoZgDfi6FBaFTZGN_K7HysKfpU81VwuiH&autoplay=1&mute=1";
    });

    youtubeIcon.addEventListener('mouseleave', () => {
        youtubeIframe.src = ""; // Stop video
    });

    // Popular routes from Chennai ordered by popularity
    const popularRoutes = [
        "Pondicherry", "Bangalore", "Tirupati", "Kumbakonam",
        "Velankanni", "Ooty", "Madurai", "Rameswaram", "Yelagiri",
        "Thanjavur", "Tiruvannamalai", "Sabarimala", "Palani",
        "Chidambaram", "Srirangam", "Kanchipuram", "Yercaud",
        "Valparai", "Kolli Hills", "Kotagiri", "Mahabalipuram",
        "Kodaikanal", "Coimbatore", "Trichy", "Vellore",
        "Munnar", "Alleppey", "Kovalam", "Kanyakumari", "Nagercoil"
    ];

    function cityToSlug(city) {
        return city.toLowerCase().replace(/\s+/g, '-');
    }

    const scrollingContent = document.getElementById('scrolling-content');
    const scrollingRight = document.getElementById('scrolling-right');

    function createScrollingLinks() {
        for (let i = 0; i < 2; i++) {
            popularRoutes.forEach(city => {
                const a = document.createElement('a');
                a.className = 'route';
                a.textContent = city;
                a.href = `https://shrishtravels.netlify.app/routes/chennai-to-${cityToSlug(city)}-cab`;
                a.style.marginRight = '20px';
                a.style.color = '#333';
                a.style.textDecoration = 'none';


                scrollingContent.appendChild(a);
            });
        }
    }

    createScrollingLinks();

    let scrollX = 0;
    const speed = 1;
    let animationFrameId;
    let paused = false;

    function animate() {
        if (!paused) {
            scrollX -= speed;
            if (Math.abs(scrollX) >= scrollingContent.scrollWidth / 2) {
                scrollX = 0;
            }
            scrollingContent.style.transform = `translateX(${scrollX}px)`;
        }
        animationFrameId = requestAnimationFrame(animate);
    }

    scrollingRight.addEventListener('mouseenter', () => {
        paused = true;
    });

    scrollingRight.addEventListener('mouseleave', () => {
        paused = false;
    });

    animate();


    // Tariff Page Under Development Pop-up Logic

    // Wait for DOM to load
    window.addEventListener('DOMContentLoaded', function () {
        // Show popup after 1 seconds
        setTimeout(() => {
            document.getElementById('floating-tariff-warning').style.display = 'block';
        }, 1000);

        // Close popup and show blinking icon
        document.querySelector('.floating-warning-close').addEventListener('click', function () {
            document.getElementById('floating-tariff-warning').style.display = 'none';
            document.getElementById('floating-warning-icon').style.display = 'block';
        });

        // Clicking icon reopens the popup
        document.getElementById('floating-warning-icon').addEventListener('click', function () {
            document.getElementById('floating-tariff-warning').style.display = 'block';
            document.getElementById('floating-warning-icon').style.display = 'none';
        });
    });

    const hiringIcon = document.getElementById("hiring-float-icon");
    let hideAfterClick = false;

    function showHiringIcon() {
        if (hideAfterClick) return;

        hiringIcon.classList.add("visible");

        // 👇 Increase visible time here (e.g. 6000ms = 6 seconds)
        setTimeout(() => {
            hiringIcon.classList.remove("visible");

            // 👇 Optional: Hidden delay (e.g. 2 seconds before next appearance)
            setTimeout(showHiringIcon, 2000);
        }, 6000);
    }

    // Initial launch delay (1 second)
    setTimeout(showHiringIcon, 1000);

    hiringIcon.addEventListener("click", () => {
        hideAfterClick = true;
        hiringIcon.style.display = "none";
    });
    window.addEventListener("scroll", () => {
        const icon = document.getElementById("hiring-float-icon");
        const section = document.elementFromPoint(icon.offsetLeft, icon.offsetTop);
        const bgColor = window.getComputedStyle(section).backgroundColor;

        // Rough check — you can expand this
        const isLight = bgColor.includes("255") || bgColor.includes("rgb(255");

        icon.style.filter = isLight ? "invert(1)" : "invert(0)";
    });

    // Cookie Consent Logic
    document.addEventListener("DOMContentLoaded", function () {
        const banner = document.getElementById("cookie-consent-banner");
        const accepted = localStorage.getItem("cookieConsent");

        if (!accepted) {
            banner.style.display = "block";
        } else if (accepted === "accepted") {
            loadAnalytics(); // Load GA if already accepted
        }

        document.getElementById("accept-cookies").onclick = () => {
            localStorage.setItem("cookieConsent", "accepted");
            banner.style.display = "none";
            loadAnalytics(); // Load GA after accepting
        };

        document.getElementById("reject-cookies").onclick = () => {
            localStorage.setItem("cookieConsent", "rejected");
            banner.style.display = "none";
        };

        function loadAnalytics() {
            const script = document.createElement("script");
            script.src = "https://www.googletagmanager.com/gtag/js?id=G-MBGR8GE2HH"; // ✅ Use your real GA ID
            script.async = true;
            document.head.appendChild(script);

            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-MBGR8GE2HH');
        }
    });
    // Service Worker Registration

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(reg => {
                    console.log("Service Worker registered successfully");
                    // No alert, works silently
                })
                .catch(err => {
                    console.error("Service Worker registration failed:", err);
                });
        });
    }


});
