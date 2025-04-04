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
        bookingForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const bookingData = {
                name: document.getElementById("name").value,
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

            const scriptURL = "https://script.google.com/macros/s/AKfycbyMiXjJr4hYdc6SlzGQnrZPlTnKwRZ_s5KbpCLlNadlOvh96EspoA-aA0vqQsjpyxFo/exec";

            fetch(scriptURL, {
                method: "POST",
                body: JSON.stringify(bookingData),
                headers: { "Content-Type": "application/json" },
                mode: "no-cors"
            })
                .then(() => {
                    clearInterval(interval);
                    submitButton.innerText = "Redirecting to WhatsApp...";
                    setTimeout(() => {
                        sendWhatsAppMessage(bookingData);
                        bookingForm.reset();
                        submitButton.innerText = "Submit Booking";
                        submitButton.disabled = false;
                    }, 1000);
                })
                .catch((error) => {
                    clearInterval(interval);
                    alert("Error! Please try again.");
                    submitButton.innerText = "Submit Booking";
                    submitButton.disabled = false;
                    console.error("Booking error:", error);
                });
        });

        function sendWhatsAppMessage(data) {
            const message = `Hello ShRish Travels,%0A%0A*New Booking Details*%0AName: ${data.name}%0APhone: ${data.phone}%0APickup: ${data.pickup}%0ADrop-off: ${data.dropoff}%0ATravelers: ${data.travelers}`;
            const number = "918883451668";
            window.open(`https://wa.me/${number}?text=${message}`, "_blank");
        }
    }

    // ===== Contact Form =====
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
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

            fetch(scriptURL, {
                method: "POST",
                body: JSON.stringify(contactData),
                headers: { "Content-Type": "application/json" },
                mode: "no-cors"
            })
                .then(() => {
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

                    document.getElementById("whatsappYes").onclick = function () {
                        window.open("https://wa.me/918883451668", "_blank");
                    };

                    document.getElementById("whatsappNo").onclick = function () {
                        successMessage.innerHTML = `
                            <i class="fas fa-smile-beam success-icon"></i>
                            <p class="success-text">Thanks again! We'll reach out to you shortly.</p>
                        `;
                    };

                    submitButton.innerText = "Submit";
                    submitButton.disabled = false;
                })
                .catch((error) => {
                    alert("Error submitting contact form. Please try again.");
                    console.error("Contact error:", error);
                    submitButton.innerText = "Submit";
                    submitButton.disabled = false;
                });
        });
    }
});
