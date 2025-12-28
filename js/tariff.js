// --- 1. Data Store & Global State ---
const vehicleData = {
    'local-sedan': {
        type: 'local',
        name: '4+1 Sedan',
        subtitle: 'Comfortable & Compact',
        baseFare: 1300,
        kmRate: 14,
        hrRate: 260,
        baseKm: 50,
        baseHr: 5
    },
    'local-innova': {
        type: 'local',
        name: '7+1 Innova',
        subtitle: 'Spacious & Comfortable',
        baseFare: 1900,
        kmRate: 19,
        hrRate: 300,
        baseKm: 50,
        baseHr: 5
    },
    'local-crysta': {
        type: 'local',
        name: '7+1 Innova Crysta',
        subtitle: 'Premium Experience',
        baseFare: 2200,
        kmRate: 22,
        hrRate: 440,
        baseKm: 50,
        baseHr: 5
    },
    'local-tempo': {
        type: 'local',
        name: '12+1 Tempo',
        subtitle: 'For Larger Groups',
        baseFare: 3000,
        kmRate: 24,
        hrRate: 550,
        baseKm: 50,
        baseHr: 5
    },
    'local-tempo-18': {
        type: 'local',
        name: '18+1 Tempo',
        subtitle: 'For Larger Groups',
        baseFare: 3500,
        kmRate: 30,
        hrRate: 700,
        baseKm: 50,
        baseHr: 5
    },
    'local-sml-32': {
        type: 'local',
        name: '32+1 Mini Bus',
        subtitle: 'For Larger Groups',
        baseFare: 6000,
        kmRate: 52,
        hrRate: 1200,
        baseKm: 50,
        baseHr: 5
    },
    'outstation-sedan': {
        type: 'outstation',
        name: '4+1 Sedan',
        subtitle: 'Min. 250 KMs/Day',
        kmRate: 14,
        bata: 700,
        minKm: 250
    },
    'outstation-innova': {
        type: 'outstation',
        name: '7+1 Innova',
        subtitle: 'Min. 250 KMs/Day',
        kmRate: 19,
        bata: 800,
        minKm: 250
    },
    'outstation-crysta': {
        type: 'outstation',
        name: '7+1 Crysta',
        subtitle: 'Min. 250 KMs/Day',
        kmRate: 22,
        bata: 800,
        minKm: 250
    },
    'outstation-tempo': {
        type: 'outstation',
        name: '12+1 Tempo',
        subtitle: 'Min. 300 KMs/Day',
        kmRate: 24,
        bata: 1000,
        minKm: 300
    }
};

let currentVehicle = null;
let currentEstimate = null;
let modalTitle, estimatorModal, modalBody, modalFooter;

// --- 2. Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    modalTitle = document.getElementById('modalTitle');
    estimatorModal = document.getElementById('estimatorModal');
    modalBody = document.getElementById('modalBody');
    modalFooter = document.getElementById('modalFooter');

    initializeTabs();
    initializeAnimations();
    initializeCircularMenu();
    initializeBookingButtons();
    initializeEstimatorButtons();
    initializeHeroInteractions();
});

// --- 3. Core UI Functions ---
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

function initializeCircularMenu() {
    const menu = document.querySelector('.circular-menu');
    if (!menu) return;
    const button = menu.querySelector('.menu-button');
    button.addEventListener('click', () => menu.classList.toggle('open'));
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
        button.addEventListener('click', function () {
            const card = this.closest('.package-card');
            if (card) {
                const vehicleId = card.dataset.vehicle;
                if (vehicleId) openModal(vehicleId);
            }
        });
    });
}

// --- 4. Interactive Hero Section & Reviews Modal ---
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function initializeHeroInteractions() {
    const viewReviewsBtn = document.getElementById('viewReviewsBtn');
    const reviewsModal = document.getElementById('reviewsModal');
    const closeReviewsModalBtn = document.getElementById('closeReviewsModal');
    const reviewsBody = document.getElementById('reviewsBody');

    const googleReviewLinks = ["https://maps.app.goo.gl/3AoeJ1nMZWehng7z5", "https://maps.app.goo.gl/ophME4tvVb7o2GVx5", "https://maps.app.goo.gl/TKUAvb1ExBf69HPq6", "https://maps.app.goo.gl/GcN1PGyXeVwvkP1W8", "https://maps.app.goo.gl/gaHfe5ySzroyZxuW8", "https://maps.app.goo.gl/pZXLeYtWdBm2tHU56", "https://maps.app.goo.gl/JFpxspcWDJ2TJVvdA", "https://maps.app.goo.gl/4aaW5HNoGQ8Q78fw6", "https://maps.app.goo.gl/Q9Jod4Ca9NTk4vMfA", "https://maps.app.goo.gl/GtYf3Ufg2rziYuwM9", "https://maps.app.goo.gl/HDKY8xdxbRobQmtJ7", "https://maps.app.goo.gl/8ASHRSSpTxUJUQUP6", "https://maps.app.goo.gl/7ngV6YkjTEhn3Afu7", "https://maps.app.goo.gl/ywkajBkqX2NXaEhs5", "https://maps.app.goo.gl/wwA4Z9Gb3yoyJLX67", "https://maps.app.goo.gl/wDBzbjXy4LC4nh2V6"];

    const reviewData = [{ name: 'Shaamraj Carneson', rating: 5, text: "Came from malaysia for a vacation with family. The driver we got Mr. Jagan was very humble guy. He was so punctual and also he guided us in many way. The travelling wasn't feel bored since we have a good conversation along the journey. A special thanks to him and really recommend this travels for bookings. The vehicle they have are well maintained. If we have a chance to visit chennai again, for sure will be booking here.", linkIndex: 0 }, { name: 'Karthick Vel', rating: 5, text: "recently booked a trip with Shrish Travels, and I couldn’t be more satisfied with the experience. From the beginning, their communication was prompt and professional. The vehicle provided was clean, comfortable, and well-maintained. The driver was punctual, courteous, and very knowledgeable about the routes.", linkIndex: 1 }, { name: 'Abinaya C', rating: 5, text: "Outstanding service! Shrish Travels made our journey smooth and stress-free. The vehicle was clean, the driver was punctual and courteous. Highly recommended for anyone looking for reliable and affordable travel services.", linkIndex: 2 }, { name: 'Ananya N', rating: 5, text: "Ananya nagaraj here, We booked this travel service to reach Cheyyur from Velachery. Mr. Ajith Kumar was extremely friendly and made the journey very comfortable, with no rushing. He was pleasant, calm, and patient, staying with us until our work was completed without any hesitation. He then dropped us safely back home. Thanks and kudos to Mr. Ajith Kumar, the travel manager, and the entire travel team for being so kind and passenger-friendly.", linkIndex: 3 }, { name: 'Raneem Raneem', rating: 5, text: "Had an amazing experience with ShRish Travels. The driver was punctual, polite, and the car was very clean. Will definitely book again!", linkIndex: 4 }, { name: 'Aji SFD', rating: 5, text: "Booking was easy, driver knew the best routes, and we reached early. Appreciate the professionalism.", linkIndex: 5 }, { name: 'Nalini Prakash', rating: 5, text: "Safe Journey And I'm feeling like my own Vehicle.👍 The driver is also in a good conversation.", linkIndex: 6 }, { name: 'Aakash R', rating: 5, text: "The communication was clear, the vehicle arrived on time, and the driver was well-mannered. Excellent service, especially for family trips.", linkIndex: 7 }, { name: 'Nathan Muruganathan', rating: 5, text: "Excellent service.....very patient and understanding....anyone need travels at India kindly recommend shRish Travels..", linkIndex: 8 }, { name: 'Suresh B.', rating: 5, text: 'Booking process was smooth. Car was okay. Driver was a bit late but made up for it. Average experience.', linkIndex: 9 }, { name: 'srikanth k', rating: 5, text: 'Had safe and pleasant travels', linkIndex: 11 }, { name: 'VIJAY J', rating: 4, text: "Good driver and safe journey with affordable for everyone", linkIndex: 10 }, { name: 'Ghayathiri Carneson', rating: 5, text: "Excellent service.feel comfortable and recommended for family trips.", linkIndex: 12 },];

    function generateStarRating(rating) {
        let stars = '';
        for (let i = 0; i < 5; i++) {
            stars += `<i class="fas fa-star" style="color: ${i < rating ? '#FFC107' : '#e0e0e0'};"></i>`;
        }
        return stars;
    }

    function openReviewsModal() {
        const shuffledReviews = shuffleArray([...reviewData]);
        reviewsBody.innerHTML = '';
        shuffledReviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.className = 'review-card';
            reviewElement.innerHTML = ` <div class="review-header"> <span class="review-author">${review.name}</span> <span class="review-rating">${generateStarRating(review.rating)}</span> </div> <p class="review-text">"${review.text}"</p> <div class="review-card-footer"> <a href="${googleReviewLinks[review.linkIndex] || 'https://g.page/r/CaYoGVSEfXMNEAE/review'}" target="_blank" class="review-link-btn"> <i class="fab fa-google"></i> View on Google </a> </div> `;
            reviewsBody.appendChild(reviewElement);
        });
        reviewsModal.classList.add('active');
        document.body.classList.add('no-scroll');
    }

    function closeReviewsModal() {
        reviewsModal.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }

    if (viewReviewsBtn) viewReviewsBtn.addEventListener('click', openReviewsModal);
    if (closeReviewsModalBtn) closeReviewsModalBtn.addEventListener('click', closeReviewsModal);
    reviewsModal.addEventListener('click', (e) => {
        if (e.target === reviewsModal) closeReviewsModal();
    });
}

// --- 5. Unified Modal Logic ---
function openModal(vehicleId) {
    document.querySelector('.circular-menu')?.style.display = 'none';
    currentVehicle = vehicleData[vehicleId];
    if (!currentVehicle) return;

    modalTitle.textContent = `Estimate for ${currentVehicle.name}`;
    renderEstimatorView();
    estimatorModal.classList.add('active');
    document.body.classList.add('no-scroll');
}

function closeModal() {
    document.querySelector('.circular-menu')?.style.display = 'block';
    estimatorModal.classList.remove('active');
    document.body.classList.remove('no-scroll');
    currentVehicle = null;
    currentEstimate = null;
}

function renderEstimatorView() {
    modalBody.innerHTML = '';
    modalFooter.innerHTML = '';

    const form = document.createElement('div');
    form.className = 'estimator-form';

    if (currentVehicle.type === 'local') {
        const baseHr = currentVehicle.baseHr;
        const baseKm = currentVehicle.baseKm;
        form.innerHTML = `
            <div class="form-group">
                <label class="form-label" for="localPackageSelect">Select Local Package</label>
                <div class="custom-select-container" id="customSelect">
                    <div class="select-selected"></div>
                    <div class="select-items select-hide">
                        <div data-value="1">${baseHr} Hrs & ${baseKm} KMs</div>
                        <div data-value="2">${baseHr * 2} Hrs & ${baseKm * 2} KMs</div>
                        <div data-value="3">${baseHr * 3} Hrs & ${baseKm * 3} KMs</div>
                    </div>
                </div>
                <input type="hidden" id="localPackageSelect" value="1">
                <span id="recommendationHelper" class="form-label-helper">
                    For trips longer than ${baseHr * 3} hours, an <strong>Outstation Package</strong> may be more cost-effective.
                </span>
            </div>
            <div class="form-group">
                <label class="form-label">Extra Kilometers</label>
                <input type="text" inputmode="numeric" class="form-input" id="extraKm" oninput="validateInput(this, 0, 500); calculateEstimate();">
            </div>
            <div class="form-group">
                <label class="form-label">Extra Hours</label>
                <input type="text" inputmode="numeric" class="form-input" id="extraHr" oninput="validateInput(this, 0, 24); calculateEstimate();">
            </div>
        `;
    } else { // Outstation
        form.innerHTML = `
            <div class="form-group">
                <label class="form-label" for="totalDays">
                    Number of Days
                    <span class="form-label-helper">1 Day BATA covers 12 hours duty. Extended hours may incur extra charges.</span>
                </label>
                <input type="text" inputmode="numeric" class="form-input" id="totalDays" oninput="validateInput(this, 1, 30); calculateEstimate();">
            </div>
            <div class="form-group">
                <label class="form-label" for="totalKm">Total Kilometers (Approx.)</label>
                <input type="text" inputmode="numeric" class="form-input" id="totalKm" oninput="validateInput(this, 0, 5000); calculateEstimate();">
            </div>
        `;
    }
    modalBody.appendChild(form);

    const resultDiv = document.createElement('div');
    resultDiv.className = 'estimate-result';
    resultDiv.innerHTML = `
        <div class="result-label">Estimated Total</div>
        <div id="estimatedTotal" class="result-value">₹0</div>
        <div id="estimateBreakdown" class="result-breakdown">Enter details to see cost.</div>
    `;
    modalBody.appendChild(resultDiv);

    modalFooter.innerHTML = `
<div class="estimator-actions">
    <button class="btn btn-secondary" onclick="closeModal()">
        <i class="fas fa-times"></i> Close
    </button>
    <a href="tel:+918883451668" class="btn btn-enquiry">
        <i class="fas fa-phone"></i> Call to Confirm
    </a>
    <button id="generateQuoteBtn" class="btn btn-primary" onclick="renderQuotationView()" disabled>
        <i class="fas fa-file-invoice"></i> Generate Quotation
    </button>
</div>
`;

    calculateEstimate();
    if (currentVehicle.type === 'local') {
        initializeCustomDropdown();
    }
}

function renderQuotationView() {
    if (!currentEstimate) return;
    modalTitle.textContent = 'Travel Quotation';
    modalBody.innerHTML = '';
    const quotationCard = document.createElement('div');
    quotationCard.id = 'quotationCard';
    quotationCard.className = 'quotation-card';
    quotationCard.innerHTML = generatePrintableQuotationHTML(currentEstimate, true);
    modalBody.appendChild(quotationCard);

    modalFooter.innerHTML = `
<div class="quotation-actions">
    <button class="btn btn-secondary" onclick="renderEstimatorView()">
        <i class="fas fa-chevron-left"></i> Back
    </button>
    <div class="right-buttons">
        <a href="tel:+918883451668" class="btn btn-enquiry">
            <i class="fas fa-phone-alt"></i> Call to Book
        </a>
        <button class="btn btn-primary" onclick="shareQuotation()">
            <i class="fab fa-whatsapp"></i> Share
        </button>
        <button class="btn btn-primary" onclick="downloadQuotation()">
            <i class="fas fa-download"></i> Download
        </button>
    </div>
</div>
`;
}

// --- 6. Calculation & Estimate Logic ---
function calculateEstimate() {
    if (!currentVehicle) return;

    let total = 0;
    let breakdown = '';
    let isCalculated = false;
    const generateQuoteBtn = document.getElementById('generateQuoteBtn');

    if (currentVehicle.type === 'local') {
        const selectedPackageQty = parseInt(document.getElementById('localPackageSelect').value) || 1;
        const extraKm = parseInt(document.getElementById('extraKm')?.value) || 0;
        const extraHr = parseInt(document.getElementById('extraHr')?.value) || 0;

        const baseHr = currentVehicle.baseHr;
        const totalEstimatedHours = (selectedPackageQty * baseHr) + extraHr;

        let finalPackageQty = selectedPackageQty;
        const upgradeThreshold1 = baseHr + 2;
        const upgradeThreshold2 = (baseHr * 2) + 2;

        if (totalEstimatedHours > upgradeThreshold2) {
            finalPackageQty = 3;
        } else if (totalEstimatedHours > upgradeThreshold1) {
            finalPackageQty = 2;
        }

        if (finalPackageQty !== selectedPackageQty) {
            const selectedDisplay = document.querySelector('.select-selected');
            const upgradedOption = document.querySelector(`.select-items div[data-value="${finalPackageQty}"]`);
            if (selectedDisplay && upgradedOption) {
                selectedDisplay.textContent = upgradedOption.textContent;
                document.getElementById('localPackageSelect').value = finalPackageQty;

                // --- Trigger the animation ---
                const customSelectContainer = document.getElementById('customSelect');
                if (customSelectContainer) {
                    customSelectContainer.classList.add('highlight-recommendation');
                    setTimeout(() => {
                        customSelectContainer.classList.remove('highlight-recommendation');
                    }, 1200); // Animation is 1.2s long, remove class after
                }
            }
        }

        const totalIncludedHrs = finalPackageQty * currentVehicle.baseHr;
        const totalIncludedKms = finalPackageQty * currentVehicle.baseKm;
        const totalBaseCost = finalPackageQty * currentVehicle.baseFare;
        const finalExtraHr = Math.max(0, totalEstimatedHours - totalIncludedHrs);

        const extraKmCost = extraKm * currentVehicle.kmRate;
        const extraHrCost = finalExtraHr * currentVehicle.hrRate;

        total = totalBaseCost + extraKmCost + extraHrCost;

        let upgradeMessage = '';
        if (finalPackageQty > selectedPackageQty) {
            upgradeMessage = `Upgraded to ${totalIncludedHrs}hr package! `;
        }
        breakdown = `${upgradeMessage}Base (₹${totalBaseCost.toLocaleString()}) + KMs (₹${extraKmCost.toLocaleString()}) + Hours (₹${extraHrCost.toLocaleString()})`;

        const extraKmInput = document.getElementById('extraKm');
        const extraHrInput = document.getElementById('extraHr');
        if (extraKmInput) extraKmInput.placeholder = `Beyond ${totalIncludedKms} KMs`;
        if (extraHrInput) extraHrInput.placeholder = `Beyond ${totalIncludedHrs} Hrs`;

        currentEstimate = {
            vehicleType: currentVehicle.name, packageType: 'Local Package',
            packageQty: finalPackageQty, basePackage: `${totalIncludedHrs} Hours & ${totalIncludedKms} KMs`,
            baseCost: totalBaseCost, singleBaseFare: currentVehicle.baseFare,
            extraKm: extraKm, extraKmCost: extraKmCost, kmRate: currentVehicle.kmRate,
            extraHr: finalExtraHr, extraHrCost: extraHrCost, hrRate: currentVehicle.hrRate,
            total: total
        };
        isCalculated = true;
    } else { // Outstation
        const totalDays = parseInt(document.getElementById('totalDays')?.value) || 0;
        const totalKmInput = document.getElementById('totalKm');

        if (totalKmInput) {
            if (totalDays > 0) {
                const minKmRequired = totalDays * currentVehicle.minKm;
                totalKmInput.placeholder = `e.g., ${minKmRequired} KMs for ${totalDays} day(s)`;
            } else {
                totalKmInput.placeholder = `Min. ${currentVehicle.minKm} KMs per day`;
            }
        }

        const totalKm = parseInt(totalKmInput.value) || 0;

        if (totalDays > 0) {
            const minKmRequired = totalDays * currentVehicle.minKm;
            const chargedKm = Math.max(totalKm, minKmRequired);
            const kmCost = chargedKm * currentVehicle.kmRate;
            const bataCost = totalDays * currentVehicle.bata;
            total = kmCost + bataCost;

            const dayText = totalDays > 1 ? 'Days' : 'Day';
            breakdown = `(${chargedKm.toLocaleString()} KMs × ₹${currentVehicle.kmRate}) + (${totalDays} ${dayText} BATA × ₹${currentVehicle.bata})`;
            currentEstimate = {
                vehicleType: currentVehicle.name, packageType: 'Outstation Package',
                totalDays: totalDays, totalKm: totalKm, chargedKm: chargedKm,
                kmCost: kmCost, bataCost: bataCost, total: total, kmRate: currentVehicle.kmRate,
                bata: currentVehicle.bata
            };
            isCalculated = true;
        } else {
            breakdown = 'Please enter number of days.';
            isCalculated = false;
        }
    }

    animateValue(document.getElementById('estimatedTotal'), currentEstimate?.total || 0, total, 400);
    document.getElementById('estimateBreakdown').innerHTML = breakdown;
    if (generateQuoteBtn) generateQuoteBtn.disabled = !isCalculated;
}

// --- 7. Sharing & Downloading ---
function shareQuotation() {
    if (!currentEstimate) return;
    let message = `✨ *Quotation from Shrish Travels* ✨\n━━━━━━━━━━━━━━━━\n\n*Vehicle:* ${currentEstimate.vehicleType}\n*Date:* ${new Date().toLocaleDateString('en-IN')}\n\n*ESTIMATE DETAILS*\n`;
    if (currentEstimate.packageType === 'Local Package') {
        message += `🔹 Base (${currentEstimate.basePackage}): ₹${currentEstimate.baseCost.toLocaleString()}\n`;
        if (currentEstimate.extraKm > 0) message += `🔹 Extra KMs (${currentEstimate.extraKm} km): ₹${currentEstimate.extraKmCost.toLocaleString()}\n`;
        if (currentEstimate.extraHr > 0) message += `🔹 Extra Hours (${currentEstimate.extraHr} hr): ₹${currentEstimate.extraHrCost.toLocaleString()}\n`;
    } else {
        message += `🔹 Duration: ${currentEstimate.totalDays} Days\n`;
        message += `🔹 KM Charges (${currentEstimate.chargedKm} km × ₹${currentEstimate.kmRate}/km): ₹${currentEstimate.kmCost.toLocaleString()}\n`;
        message += `🔹 Driver BATA (${currentEstimate.totalDays} days × ₹${currentEstimate.bata}/day): ₹${currentEstimate.bataCost.toLocaleString()}\n`;
    }
    message += `\n*TOTAL ESTIMATE*\n` + "```" + `₹${currentEstimate.total.toLocaleString()}` + "```\n\n━━━━━━━━━━━━━━━━\n";
    message += `📲 *To Book:*\nReply to this chat or call us at:\n*+91 888 345 1668*\n\n_Note: Price excludes toll, parking, and permits._`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
}

function downloadQuotation() {
    if (!currentEstimate) return;
    const printContent = generatePrintableQuotationHTML(currentEstimate, false);
    const oldFrame = document.getElementById('printFrame');
    if (oldFrame) oldFrame.remove();
    const printFrame = document.createElement('iframe');
    printFrame.id = 'printFrame';
    printFrame.style.position = 'fixed';
    printFrame.style.top = '-9999px';
    document.body.appendChild(printFrame);
    printFrame.contentWindow.document.open();
    printFrame.contentWindow.document.write(printContent);
    printFrame.contentWindow.document.close();
    printFrame.contentWindow.focus();
    printFrame.contentWindow.print();
}

function generatePrintableQuotationHTML(estimate, isForModal) {
    const currentDate = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
    let detailsHTML = '';
    if (estimate.packageType === 'Local Package') {
        detailsHTML = `<tr><td>Base Package (${estimate.basePackage})</td><td>₹${estimate.singleBaseFare.toLocaleString()}</td><td>${estimate.packageQty}</td><td style="text-align: right;">₹${estimate.baseCost.toLocaleString()}</td></tr>`;
        if (estimate.extraKm > 0) detailsHTML += `<tr><td>Extra Kilometers</td><td>₹${estimate.kmRate} / km</td><td>${estimate.extraKm} km</td><td style="text-align: right;">₹${estimate.extraKmCost.toLocaleString()}</td></tr>`;
        if (estimate.extraHr > 0) detailsHTML += `<tr><td>Extra Hours</td><td>₹${estimate.hrRate} / hr</td><td>${estimate.extraHr} hr</td><td style="text-align: right;">₹${estimate.extraHrCost.toLocaleString()}</td></tr>`;
    } else {
        detailsHTML = `<tr><td>Kilometer Charges</td><td>₹${estimate.kmRate} / km</td><td>${estimate.chargedKm} km</td><td style="text-align: right;">₹${estimate.kmCost.toLocaleString()}</td></tr><tr><td>Driver BATA</td><td>₹${estimate.bata} / day</td><td>${estimate.totalDays} day(s)</td><td style="text-align: right;">₹${estimate.bataCost.toLocaleString()}</td></tr>`;
    }
    const printStyles = `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"><style>body{font-family:'Inter',sans-serif;margin:0;padding:0;background-color:#f8fafc;color:#0f172a;-webkit-print-color-adjust:exact}.quotation-container{max-width:800px;margin:2rem auto;background:#fff;border-radius:.75rem;box-shadow:0 10px 15px -3px rgba(0,0,0,.1)}.quotation-header{background-color:#1e293b;color:#f8fafc;padding:2rem;border-radius:.75rem .75rem 0 0;display:flex;align-items:center;justify-content:space-between}.quotation-logo{width:70px;height:70px;border-radius:50%;border:2px solid #3b82f6}.header-text h3{font-size:1.75rem;margin:0;color:#fff}.header-text p{margin:.25rem 0 0;color:#94a3b8}.quotation-info{padding:2rem;display:flex;justify-content:space-between;background-color:#f1f5f9}.info-block h4{color:#475569;font-size:.875rem;margin-bottom:.5rem;text-transform:uppercase}.info-block p{margin:.25rem 0;font-weight:500}.quotation-body{padding:2rem}table{width:100%;border-collapse:collapse}thead{background-color:#f1f5f9}th,td{text-align:left;padding:.75rem 1rem}th{font-weight:600;color:#334155}tbody tr:nth-child(even){background-color:#f8fafc}.totals{float:right;width:40%;margin-top:2rem}.totals-row{display:flex;justify-content:space-between;padding:.75rem 1rem}.totals-row.grand-total{font-size:1.25rem;font-weight:700;background-color:#1e293b;color:#fff;border-radius:.5rem}.quotation-footer{padding:2rem;border-top:1px solid #e2e8f0;color:#64748b;font-size:.875rem}.disclaimer{font-style:italic;color:#ef4444;margin-top:1rem}</style>`;
    return `${isForModal ? '' : `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Shrish Travels - Quotation</title>${printStyles}<meta name="robots" content="noindex">
</head><body>`}<div class="quotation-container"><div class="quotation-header"><img src="assets/sh1.jpg" alt="Shrish Travels" class="quotation-logo"><div class="header-text"><h3>Travel Quotation</h3><p>Shrish Travels</p></div></div><div class="quotation-info"><div class="info-block"><h4>Quotation For</h4><p>Valued Customer</p></div><div class="info-block" style="text-align: right;"><h4>Details</h4><p>Date: ${currentDate}</p><p>Vehicle: ${estimate.vehicleType}</p></div></div><div class="quotation-body"><table><thead><tr><th>Description</th><th>Rate</th><th>Quantity</th><th style="text-align: right;">Amount</th></tr></thead><tbody>${detailsHTML}</tbody></table><div class="totals"><div class="totals-row grand-total"><span>Estimated Total</span><span>₹${estimate.total.toLocaleString()}</span></div></div><div style="clear: both;"></div></div><div class="quotation-footer"><p><strong>Contact Us:</strong> +91 888 345 1668 | shrishtravels1@gmail.com</p><p class="disclaimer">*Price excludes toll, parking, and other permits. This is an estimate and subject to change.</p></div></div>${isForModal ? '' : '</body></html>'}`;
}

// --- 8. Helper Utilities ---
function animateValue(element, start, end, duration) {
    if (!element) return;
    let currentStart = parseInt(element.textContent.replace(/[₹,]/g, '')) || 0;
    const startTime = performance.now();
    const easeOutCubic = p => 1 - Math.pow(1 - p, 3);
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentValue = Math.floor(currentStart + (end - currentStart) * easeOutCubic(progress));
        element.textContent = `₹${currentValue.toLocaleString()}`;
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

function validateInput(input, min, max) {
    let value = input.value.replace(/[^0-9]/g, '');
    let numericValue = parseInt(value, 10);
    if (isNaN(numericValue)) {
        input.value = '';
        return;
    }
    if (numericValue > max) {
        numericValue = max;
        input.style.borderColor = 'red';
        setTimeout(() => { input.style.borderColor = ''; }, 500);
    }
    input.value = numericValue;
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

function initializeCustomDropdown() {
    const customSelect = document.getElementById('customSelect');
    if (!customSelect) return;
    const selectedDisplay = customSelect.querySelector('.select-selected');
    const optionsContainer = customSelect.querySelector('.select-items');
    const options = optionsContainer.querySelectorAll('div');
    const hiddenInput = document.getElementById('localPackageSelect');

    selectedDisplay.textContent = options[0].textContent;

    selectedDisplay.addEventListener('click', (e) => {
        e.stopPropagation();
        optionsContainer.classList.toggle('select-hide');
        selectedDisplay.classList.toggle('select-arrow-active');
    });

    options.forEach(option => {
        option.addEventListener('click', function () {
            selectedDisplay.textContent = this.textContent;
            hiddenInput.value = this.dataset.value;
            optionsContainer.classList.add('select-hide');
            selectedDisplay.classList.remove('select-arrow-active');
            calculateEstimate();
        });
    });

    document.addEventListener('click', () => {
        if (!optionsContainer.classList.contains('select-hide')) {
            optionsContainer.classList.add('select-hide');
            selectedDisplay.classList.remove('select-arrow-active');
        }
    });
}