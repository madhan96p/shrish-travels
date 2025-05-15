window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
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
        bookingForm.addEventListener("submit", function (event) {
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

            fetch(scriptURL, {
                method: "POST",
                body: JSON.stringify(bookingData),
                headers: { "Content-Type": "application/json" },
                mode: "no-cors"
            })
            .then(() => {
                clearInterval(interval);
                
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
    AOS.init();
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
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
          const item = question.parentElement;
          item.classList.toggle('open');
        });
      });
});
