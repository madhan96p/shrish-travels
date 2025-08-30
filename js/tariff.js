// =================================================================
// Premium JS for Shrish Travels Tariff Page
// Version 3.0 - Unified Modal, Refined UX, Robust Logic
// =================================================================

// --- 1. Data Store & Global State ---
const vehicleData = {
    'local-sedan': { type: 'local', name: '4+1 Sedan', subtitle: 'Etios, Dzire, etc.', baseFare: 1300, kmRate: 14, hrRate: 260, baseKm: 50, baseHr: 5 },
    'local-innova': { type: 'local', name: '7+1 Innova', subtitle: 'Spacious & Comfortable', baseFare: 1900, kmRate: 19, hrRate: 300, baseKm: 50, baseHr: 5 },
    'local-crysta': { type: 'local', name: '7+1 Innova Crysta', subtitle: 'Premium Experience', baseFare: 2200, kmRate: 22, hrRate: 440, baseKm: 50, baseHr: 5 },
    'outstation-sedan': { type: 'outstation', name: '4+1 Sedan', subtitle: 'Min. 250 KMs/Day', kmRate: 14, bata: 700, minKm: 250 },
    'outstation-innova': { type: 'outstation', name: '7+1 Innova', subtitle: 'Min. 250 KMs/Day', kmRate: 19, bata: 800, minKm: 250 },
    'outstation-crysta': { type: 'outstation', name: '7+1 Crysta', subtitle: 'Min. 250 KMs/Day', kmRate: 22, bata: 800, minKm: 250 },
    'outstation-tempo': { type: 'outstation', name: '12+1 Tempo', subtitle: 'Min. 300 KMs/Day', kmRate: 24, bata: 1000, minKm: 300 }
};

let currentVehicle = null;
let currentEstimate = null;

// --- 2. Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements inside the listener to ensure they exist
    const estimatorModal = document.getElementById('estimatorModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalFooter = document.getElementById('modalFooter');

    // Initialize all functionalities
    initializeTabs();
    initializeAnimations();
    initializeMobileMenu();
    initializeBookingButtons();
    initializeEstimatorButtons(); // This function call was missing
    initializeHeroInteractions();
});


// --- 4. Core UI Functions ---

function initializeTabs() {
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;
            document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            button.classList.add('active');
            document.getElementById(`${targetTab}-tab`).classList.add('active');
            animateCards();
        });
    });
}

function initializeAnimations() {
    setTimeout(animateCards, 100);
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.package-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

function animateCards() {
    document.querySelectorAll('.tab-content.active .package-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.querySelector('.nav');
    const overlay = document.querySelector('.sidebar-overlay');
    const body = document.body;

    if (!mobileMenuBtn || !nav || !overlay) return;

    const toggleMenu = () => {
        const isActive = nav.classList.contains('active');

        // Toggle classes on all relevant elements
        nav.classList.toggle('active');
        overlay.classList.toggle('active');
        mobileMenuBtn.classList.toggle('open');
        body.classList.toggle('no-scroll', !isActive);
        
        // Toggle icon
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    };

    mobileMenuBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu); // Close menu when overlay is clicked
}

function initializeBookingButtons() {
    document.querySelectorAll('.btn-book').forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.package-card');
            const vehicleId = card.dataset.vehicle;
            addLoadingState(e.target);
            window.location.href = `booking.html?vehicle=${vehicleId}`;
        });
    });
}

function initializeEstimatorButtons() {
    document.querySelectorAll('.btn-estimate').forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.package-card');
            if (card) {
                const vehicleId = card.dataset.vehicle;
                if (vehicleId) {
                    openModal(vehicleId);
                }
            }
        });
    });
}

// --- 4a. NEW Interactive Hero Section & Reviews Modal ---

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // ES6 swap
    }
    return array;
}

function initializeHeroInteractions() {
    const viewReviewsBtn = document.getElementById('viewReviewsBtn');
    const reviewsModal = document.getElementById('reviewsModal');
    const closeReviewsModalBtn = document.getElementById('closeReviewsModal');
    const reviewsBody = document.getElementById('reviewsBody');

    // **IMPORTANT:** Replace these with your actual Google Review URLs if you have them.
    // This is mock data for demonstration.
    const googleReviewLinks = [
        "https://maps.app.goo.gl/3AoeJ1nMZWehng7z5", 
        "https://maps.app.goo.gl/ophME4tvVb7o2GVx5",
        "https://maps.app.goo.gl/TKUAvb1ExBf69HPq6",
        "https://maps.app.goo.gl/GcN1PGyXeVwvkP1W8",
        "https://maps.app.goo.gl/gaHfe5ySzroyZxuW8",
        "https://maps.app.goo.gl/pZXLeYtWdBm2tHU56",
        "https://maps.app.goo.gl/JFpxspcWDJ2TJVvdA",
        "https://maps.app.goo.gl/4aaW5HNoGQ8Q78fw6",
        "https://maps.app.goo.gl/Q9Jod4Ca9NTk4vMfA",
        "https://maps.app.goo.gl/GtYf3Ufg2rziYuwM9",
        "https://maps.app.goo.gl/HDKY8xdxbRobQmtJ7",
        "https://maps.app.goo.gl/8ASHRSSpTxUJUQUP6",
        "https://maps.app.goo.gl/7ngV6YkjTEhn3Afu7",
        "https://maps.app.goo.gl/ywkajBkqX2NXaEhs5",
        "https://maps.app.goo.gl/wwA4Z9Gb3yoyJLX67",
        "https://maps.app.goo.gl/wDBzbjXy4LC4nh2V6"
    ]
        ;

    const reviewData = [
        { name: 'Shaamraj Carneson', rating: 5, text: "Came from malaysia for a vacation with family. The driver we got Mr. Jagan was very humble guy. He was so punctual and also he guided us in many way. The travelling wasn't feel bored since we have a good conversation along the journey. A special thanks to him and really recommend this travels for bookings. The vehicle they have are well maintained. If we have a chance to visit chennai again, for sure will be booking here.", linkIndex: 0 },
        { name: 'Karthick Vel', rating: 5, text: "recently booked a trip with Shrish Travels, and I couldn’t be more satisfied with the experience. From the beginning, their communication was prompt and professional. The vehicle provided was clean, comfortable, and well-maintained. The driver was punctual, courteous, and very knowledgeable about the routes.", linkIndex: 1 },
        { name: 'Abinaya C', rating: 5, text: "Outstanding service! Shrish Travels made our journey smooth and stress-free. The vehicle was clean, the driver was punctual and courteous. Highly recommended for anyone looking for reliable and affordable travel services.", linkIndex: 2 },
        { name: 'Ananya N', rating: 5, text: "Ananya nagaraj here, We booked this travel service to reach Cheyyur from Velachery. Mr. Ajith Kumar was extremely friendly and made the journey very comfortable, with no rushing. He was pleasant, calm, and patient, staying with us until our work was completed without any hesitation. He then dropped us safely back home. Thanks and kudos to Mr. Ajith Kumar, the travel manager, and the entire travel team for being so kind and passenger-friendly.", linkIndex: 3 },
        { name: 'Raneem Raneem', rating: 5, text: "Had an amazing experience with ShRish Travels. The driver was punctual, polite, and the car was very clean. Will definitely book again!", linkIndex: 4 },
        { name: 'Aji SFD', rating: 5, text: "Booking was easy, driver knew the best routes, and we reached early. Appreciate the professionalism.", linkIndex: 5 },
        { name: 'Nalini Prakash', rating: 5, text: "Safe Journey And I'm feeling like my own Vehicle.👍 The driver is also in a good conversation.", linkIndex: 6 },
        { name: 'Aakash R', rating: 5, text: "The communication was clear, the vehicle arrived on time, and the driver was well-mannered. Excellent service, especially for family trips.", linkIndex: 7 },
        { name: 'Nathan Muruganathan', rating: 5, text: "Excellent service.....very patient and understanding....anyone need travels at India kindly recommend shRish Travels..", linkIndex: 8 },
        { name: 'Suresh B.', rating: 5, text: 'Booking process was smooth. Car was okay. Driver was a bit late but made up for it. Average experience.', linkIndex: 9 },
        { name: 'srikanth k', rating: 5, text: 'Had safe and pleasant travels', linkIndex: 11 },
        { name: 'VIJAY J', rating: 4, text: "Good driver and safe journey with affordable for everyone", linkIndex: 10 },
        { name: 'Ghayathiri Carneson', rating: 5, text: "Excellent service.feel comfortable and recommended for family trips.", linkIndex: 12 },
    ];

    function generateStarRating(rating) {
        let stars = '';
        for (let i = 0; i < 5; i++) {
            stars += `<i class="fas fa-star" style="color: ${i < rating ? '#FFC107' : '#e0e0e0'};"></i>`;
        }
        return stars;
    }

    function openReviewsModal() {
        // Shuffle reviews before displaying
        const shuffledReviews = shuffleArray([...reviewData]); // Create a shallow copy to shuffle

        reviewsBody.innerHTML = ''; // Clear previous reviews
        shuffledReviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.className = 'review-card';
            reviewElement.innerHTML = `
                <div class="review-header">
                    <span class="review-author">${review.name}</span>
                    <span class="review-rating">${generateStarRating(review.rating)}</span>
                </div>
                <p class="review-text">"${review.text}"</p>
                <div class="review-card-footer">
                    <a href="${googleReviewLinks[review.linkIndex] || 'https://g.page/r/CaYoGVSEfXMNEAE/review'}" target="_blank" class="review-link-btn">
                        <i class="fab fa-google"></i> View on Google
                    </a>
                </div>
            `;
            reviewsBody.appendChild(reviewElement);
        });
        reviewsModal.classList.add('active');
    }

    function closeReviewsModal() {
        reviewsModal.classList.remove('active');
    }

    if (viewReviewsBtn) {
        viewReviewsBtn.addEventListener('click', openReviewsModal);
    }
    if (closeReviewsModalBtn) {
        closeReviewsModalBtn.addEventListener('click', closeReviewsModal);
    }

    reviewsModal.addEventListener('click', (e) => {
        if (e.target === reviewsModal) {
            closeReviewsModal();
        }
    });
}
// --- 5. Unified Modal Logic ---

function openModal(vehicleId) {
    currentVehicle = vehicleData[vehicleId];
    if (!currentVehicle) return;

    modalTitle.textContent = `Estimate for ${currentVehicle.name}`;
    renderEstimatorView();
    estimatorModal.classList.add('active');
}

function closeModal() {
    estimatorModal.classList.remove('active');
    currentVehicle = null;
    currentEstimate = null;
}

function renderEstimatorView() {
    modalBody.innerHTML = ''; // Clear previous content
    modalFooter.innerHTML = '';

    const form = document.createElement('div');
    form.className = 'estimator-form';

    if (currentVehicle.type === 'local') {
        form.innerHTML = `
            <div class="form-group">
                <label class="form-label">Extra Kilometers</label>
                <input type="number" class="form-input" id="extraKm" min="0" max="500" placeholder="Beyond ${currentVehicle.baseKm} KMs" oninput="validateInput(this, 0, 500); calculateEstimate();">
            </div>
            <div class="form-group">
                <label class="form-label">Extra Hours</label>
                <input type="number" class="form-input" id="extraHr" min="0" max="12" placeholder="Beyond ${currentVehicle.baseHr} Hrs" oninput="validateInput(this, 0, 12); calculateEstimate();">
            </div>
        `;
    } else {
        form.innerHTML = `
            <div class="form-group">
                <label class="form-label">Number of Days</label>
                <input type="number" class="form-input" id="totalDays" min="1" max="30" placeholder="e.g., 2" oninput="validateInput(this, 1, 30); calculateEstimate();">
            </div>
            <div class="form-group">
                <label class="form-label">Total Kilometers (Approx.)</label>
                <input type="number" class="form-input" id="totalKm" min="0" max="5000" placeholder="e.g., 600" oninput="validateInput(this, 0, 5000); calculateEstimate();">
            </div>
        `;
    }
    modalBody.appendChild(form);

    const resultDiv = document.createElement('div');
    resultDiv.className = 'estimate-result';
    resultDiv.innerHTML = `
        <div class="result-label">Estimated Total</div>
        <div id="estimatedTotal" class="result-value">₹0</div>
        <div id="estimateBreakdown" class="result-breakdown"></div>
    `;
    modalBody.appendChild(resultDiv);

    modalFooter.innerHTML = `
        <button class="btn-secondary" onclick="closeModal()">Close</button>
        <button id="generateQuoteBtn" class="btn-primary" onclick="renderQuotationView()" disabled>
            <i class="fas fa-file-invoice"></i> Generate Quotation
        </button>
    `;

    // Initial calculation
    setTimeout(calculateEstimate, 50);
}

function renderQuotationView() {
    if (!currentEstimate) return;

    modalTitle.textContent = 'Travel Quotation';
    modalBody.innerHTML = '';
    modalFooter.innerHTML = '';

    const quotationCard = document.createElement('div');
    quotationCard.id = 'quotationCard';
    quotationCard.className = 'quotation-card';
    quotationCard.innerHTML = generatePrintableQuotationHTML(currentEstimate, true);

    modalBody.appendChild(quotationCard);

    modalFooter.innerHTML = `
        <button class="btn-secondary" onclick="renderEstimatorView()">
            <i class="fas fa-chevron-left"></i> Back to Estimate
        </button>
        <button class="btn-primary" onclick="shareQuotation()">
            <i class="fab fa-whatsapp"></i> Share
        </button>
        <button class="btn-primary" onclick="downloadQuotation()">
            <i class="fas fa-download"></i> Download
        </button>
    `;
}


// --- 6. Calculation & Estimate Logic ---

function calculateEstimate() {
    if (!currentVehicle) return;

    let total = 0;
    let breakdown = '';
    const generateQuoteBtn = document.getElementById('generateQuoteBtn');

    if (currentVehicle.type === 'local') {
        const extraKm = parseInt(document.getElementById('extraKm').value) || 0;
        const extraHr = parseInt(document.getElementById('extraHr').value) || 0;

        const baseCost = currentVehicle.baseFare;
        const extraKmCost = extraKm * currentVehicle.kmRate;
        const extraHrCost = extraHr * currentVehicle.hrRate;
        total = baseCost + extraKmCost + extraHrCost;

        breakdown = `Base (₹${baseCost}) + KMs (₹${extraKmCost}) + Hours (₹${extraHrCost})`;

        currentEstimate = {
            vehicleType: currentVehicle.name, packageType: 'Local Package',
            basePackage: `${currentVehicle.baseHr} Hours & ${currentVehicle.baseKm} KMs`,
            baseCost: baseCost, extraKm: extraKm, extraKmCost: extraKmCost,
            extraHr: extraHr, extraHrCost: extraHrCost, total: total
        };
        generateQuoteBtn.disabled = false;

    } else {
        const totalDays = parseInt(document.getElementById('totalDays').value) || 0;
        const totalKm = parseInt(document.getElementById('totalKm').value) || 0;

        if (totalDays === 0) {
            document.getElementById('estimatedTotal').textContent = '₹0';
            document.getElementById('estimateBreakdown').innerHTML = 'Please enter number of days.';
            generateQuoteBtn.disabled = true;
            return;
        }

        const minKmRequired = totalDays * currentVehicle.minKm;
        const chargedKm = Math.max(totalKm, minKmRequired);
        const kmCost = chargedKm * currentVehicle.kmRate;
        const bataCost = totalDays * currentVehicle.bata;
        total = kmCost + bataCost;

        breakdown = `KMs (₹${kmCost.toLocaleString()}) + Driver BATA (₹${bataCost.toLocaleString()})`;

        currentEstimate = {
            vehicleType: currentVehicle.name, packageType: 'Outstation Package',
            totalDays: totalDays, totalKm: totalKm, chargedKm: chargedKm,
            kmCost: kmCost, bataCost: bataCost, total: total
        };
        generateQuoteBtn.disabled = false;
    }

    animateValue(document.getElementById('estimatedTotal'), 0, total, 400);
    document.getElementById('estimateBreakdown').innerHTML = breakdown;
}


// --- 7. Sharing & Downloading ---

function shareQuotation() {
    if (!currentEstimate) return alert("Please calculate an estimate first!");

    let message = `🚗 *Shrish Travels - Travel Quotation*\n\n`;
    message += `📅 Date: ${new Date().toLocaleDateString('en-IN')}\n`;
    message += `🚙 Vehicle: ${currentEstimate.vehicleType}\n\n`;

    if (currentEstimate.packageType === 'Local Package') {
        message += `📦 Base: ${currentEstimate.basePackage} - ₹${currentEstimate.baseCost.toLocaleString()}\n`;
        if (currentEstimate.extraKm > 0) message += `• Extra KMs (${currentEstimate.extraKm}): ₹${currentEstimate.extraKmCost.toLocaleString()}\n`;
        if (currentEstimate.extraHr > 0) message += `• Extra Hours (${currentEstimate.extraHr}): ₹${currentEstimate.extraHrCost.toLocaleString()}\n`;
    } else {
        message += `• Duration: ${currentEstimate.totalDays} days\n`;
        message += `• KM Charges (${currentEstimate.chargedKm} km): ₹${currentEstimate.kmCost.toLocaleString()}\n`;
        message += `• Driver BATA: ₹${currentEstimate.bataCost.toLocaleString()}\n`;
    }

    message += `\n🎯 *Total Estimate: ₹${currentEstimate.total.toLocaleString()}*\n\n`;
    message += `_Price excludes toll, parking, and permits._\n\n`;
    message += `📞 Book Now: +91 888 345 1668`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

function downloadQuotation() {
    if (!currentEstimate) return alert("Please calculate an estimate first!");

    const printContent = generatePrintableQuotationHTML(currentEstimate, false);
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    setTimeout(() => {
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    }, 250);
}

function generatePrintableQuotationHTML(estimate, isForModal) {
    const currentDate = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

    let detailsHTML = '';
    if (estimate.packageType === 'Local Package') {
        detailsHTML = `
            <div class="detail-row"><span class="detail-label">Base Package (${estimate.basePackage})</span><span class="detail-value">₹${estimate.baseCost.toLocaleString()}</span></div>
            ${estimate.extraKm > 0 ? `<div class="detail-row"><span class="detail-label">Extra KMs (${estimate.extraKm})</span><span class="detail-value">₹${estimate.extraKmCost.toLocaleString()}</span></div>` : ''}
            ${estimate.extraHr > 0 ? `<div class="detail-row"><span class="detail-label">Extra Hours (${estimate.extraHr})</span><span class="detail-value">₹${estimate.extraHrCost.toLocaleString()}</span></div>` : ''}
        `;
    } else {
        const vehicle = Object.values(vehicleData).find(v => v.name === estimate.vehicleType);
        detailsHTML = `
            <div class="detail-row"><span class="detail-label">KM Charges (${estimate.chargedKm} km × ₹${vehicle.kmRate})</span><span class="detail-value">₹${estimate.kmCost.toLocaleString()}</span></div>
            <div class="detail-row"><span class="detail-label">Driver BATA (${estimate.totalDays} days × ₹${vehicle.bata})</span><span class="detail-value">₹${estimate.bataCost.toLocaleString()}</span></div>
        `;
    }

    const printStyles = `
        <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
        <style>body{font-family:'Inter',sans-serif;margin:0;padding:0;color:#1e293b;background:#fff;-webkit-print-color-adjust:exact}.quotation-container{max-width:800px;margin:20px auto;background:#fff;padding:40px;border-radius:12px;border-top:8px solid #4f46e5}.quotation-header{text-align:center;margin-bottom:30px;padding-bottom:20px;border-bottom:2px solid #e2e8f0}.quotation-logo{width:80px;height:80px;border-radius:50%;margin:0 auto 15px;border:3px solid #4f46e5}.quotation-title{font-size:28px;font-weight:800;margin-bottom:8px;color:#3730a3}.quotation-subtitle{color:#64748b;font-size:16px}.quotation-details{margin-bottom:30px}.detail-row{display:flex;justify-content:space-between;padding:14px 0;border-bottom:1px solid #f1f5f9;align-items:center}.detail-label{font-weight:500;color:#475569}.detail-value{font-weight:600;color:#1e293b}.total-row{font-size:20px;font-weight:700;color:#4f46e5;border-top:2px solid #e2e8f0;margin-top:20px;padding-top:20px}.quotation-footer{text-align:center;margin-top:30px;padding-top:20px;border-top:1px solid #e2e8f0;color:#64748b;font-size:14px}.quotation-footer a{color:#4f46e5;text-decoration:none;font-weight:600}.disclaimer{font-style:italic;color:#e11d48;margin-top:20px}</style>
    `;

    return `
        ${isForModal ? '' : `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Shrish Travels - Quotation</title>${printStyles}</head><body>`}
        <div class="quotation-container">
            <div class="quotation-header">
                <img src="assets/sh1.jpg" alt="Shrish Travels" class="quotation-logo">
                <h3 class="quotation-title">Travel Quotation</h3>
                <p class="quotation-subtitle">Your Journey, Our Responsibility</p>
            </div>
            <div class="quotation-details">
                <div class="detail-row"><span class="detail-label">Quotation Date</span><span class="detail-value">${currentDate}</span></div>
                <div class="detail-row"><span class="detail-label">Vehicle Type</span><span class="detail-value">${estimate.vehicleType}</span></div>
                <div class="detail-row"><span class="detail-label">Package Type</span><span class="detail-value">${estimate.packageType}</span></div>
                ${detailsHTML}
                <div class="detail-row total-row"><span class="detail-label">Total Estimated Amount</span><span class="detail-value">₹${estimate.total.toLocaleString()}</span></div>
            </div>
            <div class="quotation-footer">
                <p class="disclaimer"><small>*Price excludes toll, parking, and other permits. Prices subject to change.</small></p>
                <p><strong>Contact:</strong> <a href="tel:+918883451668">+91 888 345 1668</a> | <a href="mailto:shrishtravels1@gmail.com">shrishtravels1@gmail.com</a></p>
            </div>
        </div>
        ${isForModal ? '' : '</body></html>'}
    `;
}


// --- 8. Helper Utilities ---

function animateValue(element, start, end, duration) {
    const startTime = performance.now();
    const easeOutCubic = progress => 1 - Math.pow(1 - progress, 3);
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentValue = Math.floor(start + (end - start) * easeOutCubic(progress));
        element.textContent = `₹${currentValue.toLocaleString()}`;
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

function validateInput(input, min, max) {
    let value = parseInt(input.value);
    if (isNaN(value)) value = min;
    else if (value < min) value = min;
    else if (value > max) value = max;
    input.value = value;
    return value;
}

function addLoadingState(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    button.disabled = true;
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
    }, 1500);
}

window.addEventListener('error', e => console.error('Application error:', e.error));
