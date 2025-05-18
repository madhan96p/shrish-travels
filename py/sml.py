destinations = [
    "Kumbakonam", "Tirupati", "Pondicherry", "Velankanni", "Bangalore",
    "Ooty", "Rameswaram", "Madurai", "Yelagiri", "Thanjavur",
    "Tiruvannamalai", "Sabarimala", "Palani", "Chidambaram", "Srirangam",
    "Kanchipuram", "Yercaud", "Valparai", "Kolli Hills", "Kotagiri",
    "Mahabalipuram", "Kodaikanal", "Coimbatore", "Trichy", "Vellore",
    "Munnar", "Alleppey", "Kovalam", "Kanyakumari", "Nagercoil"
]

# Approximate duration mapping (generalized ranges)
durations = {
    "Pondicherry": "2–4 hours",
    "Mahabalipuram": "2–3 hours",
    "Vellore": "2–4 hours",
    "Kanchipuram": "2–4 hours",
    "Tirupati": "3–5 hours",
    "Yelagiri": "4–5 hours",
    "Tiruvannamalai": "4–6 hours",
    "Trichy": "5–6 hours",
    "Chidambaram": "5–6 hours",
    "Thanjavur": "6–7 hours",
    "Kumbakonam": "6–7 hours",
    "Madurai": "7–8 hours",
    "Srirangam": "6–7 hours",
    "Palani": "7–8 hours",
    "Velankanni": "8–9 hours",
    "Coimbatore": "8–10 hours",
    "Rameswaram": "9–10 hours",
    "Yercaud": "7–8 hours",
    "Kodaikanal": "9–10 hours",
    "Ooty": "9–11 hours",
    "Kotagiri": "9–11 hours",
    "Valparai": "9–11 hours",
    "Kolli Hills": "7–9 hours",
    "Munnar": "10–11 hours",
    "Alleppey": "10–12 hours",
    "Kovalam": "10–12 hours",
    "Kanyakumari": "11–13 hours",
    "Nagercoil": "11–13 hours",
    "Bangalore": "6–8 hours",
    "Sabarimala": "12–14 hours"
}

template = '''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Chennai to {city} Cab Booking – ShRish Travels Velachery</title>
  <meta name="description" content="Affordable one-way and round-trip cab from Chennai to {city}. Book AC cabs from ShRish Travels Velachery. 24x7 support." />
  <link rel="canonical" href="https://shrishtravels.netlify.app/py/chennai-to-{city_lower}-cab" />
  <link rel="stylesheet" href="/style.css" />
  <!-- AOS Animation Library -->
  <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
  <!-- AOS Script -->
  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
  <script>
    AOS.init({{ duration: 1000, once: true }});
  </script>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
  />  
  
  <!-- Favicons -->
  <link rel="icon" href="/assets/favicon.ico" type="image/x-icon">
  <link rel="icon" href="/assets/favicon.png" type="image/png">
  <link rel="icon" href="/assets/SH1.jpg" type="image/jpeg">

  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://shrishtravels.netlify.app/"
    }}, {{
      "@type": "ListItem",
      "position": 2,
      "name": "Chennai to {city} Cab",
      "item": "https://shrishtravels.netlify.app/py/chennai-to-{city_lower}-cab.html"
    }}]
  }}
  </script>
  <script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {{
      "@type": "Question",
      "name": "What vehicles can I choose for a Chennai to {city} trip?",
      "acceptedAnswer": {{
        "@type": "Answer",
        "text": "ShRish Travels offers AC hatchbacks, sedans, SUVs, and Tempo Travellers for travel from Chennai to {city}. All vehicles are sanitized and well-maintained."
      }}
    }},
    {{
      "@type": "Question",
      "name": "How long does it take to travel from Chennai to {city}?",
      "acceptedAnswer": {{
        "@type": "Answer",
        "text": "The duration from Chennai to {city} is approximately {duration}, depending on traffic and the chosen route."
      }}
    }},
    {{
      "@type": "Question",
      "name": "Can I book a round-trip cab to {city}?",
      "acceptedAnswer": {{
        "@type": "Answer",
        "text": "Yes, ShRish Travels offers both one-way and round-trip cabs from Chennai to {city}. Ideal for weekend or multi-day trips."
      }}
    }},
    {{
      "@type": "Question",
      "name": "Are the drivers and cabs safe?",
      "acceptedAnswer": {{
        "@type": "Answer",
        "text": "All drivers are verified and trained. Cabs are sanitized before each ride and real-time tracked for your safety."
      }}
    }},
    {{
      "@type": "Question",
      "name": "Can I stop for sightseeing on the way to {city}?",
      "acceptedAnswer": {{
        "@type": "Answer",
        "text": "Yes, you can request stopovers for sightseeing or meals while traveling to {city}. Inform us in advance or tell your driver."
      }}
    }},
    {{
      "@type": "Question",
      "name": "How do I book a cab from Chennai to {city}?",
      "acceptedAnswer": {{
        "@type": "Answer",
        "text": "You can book online via our website, call +91 88834 51668, or WhatsApp us anytime to reserve your Chennai to {city} cab."
      }}
    }},
    {{
      "@type": "Question",
      "name": "What support is available during my trip to {city}?",
      "acceptedAnswer": {{
        "@type": "Answer",
        "text": "We provide 24/7 support via call and WhatsApp. You can reach us at any point during your Chennai to {city} journey."
      }}
    }}
  ]
}}
</script>
    <!-- Open Graph Meta Tags (optional but good for sharing) -->
  <meta property="og:title" content="Chennai to {city} Cab Booking – ShRish Travels Velachery" />
  <meta property="og:description" content="Reliable, affordable AC taxi service from Chennai to {city}. Round-trip available. 24x7 booking via call or WhatsApp." />
  <meta property="og:image" content="/assets/SH1.jpg" />
  <meta property="og:url" content="https://shrishtravels.netlify.app/py/chennai-to-{city}-cab" />
  <meta property="og:type" content="website" />
</head>
<body>
  <header>
    <a href="/index.html"><img src="/assets/SH1.png" alt="ShRish Travels Logo" class="logo" data-aos="slide-right"></a>
    <div class="header-title">
      <div class="flip-header">
        <div class="flip-inner">
          <div class="flip-front">
            <h1 data-aos="slide-down">ShRish Travels</h1>
          </div>
          <div class="flip-back">
            <p class="slogan" data-aos="slide-up"><strong><em>Velachery, Chennai</em></strong></p>
          </div>
        </div>
      </div>
    </div>
    <div class="nav-container" data-aos="slide-left">
      <button id="menu-button" class="nav-button">Menu</button>
      <nav id="dropdown-menu" class="nav-dropdown">
        <ul>
          <li><a href="/index.html">Home</a></li>
          <li><a href="/services.html">Services</a></li>
          <li><a href="/booking.html#booking-page">Booking</a></li>
          <li><a href="/contact.html">Contact</a></li>
        </ul>
      </nav>
    </div>
<div id="route-wrapper" class="fixed-slider" style="display: flex; align-items: center; overflow: hidden; background: #eaeaea; padding: 10px; font-weight: bold; color: #333; font-family: sans-serif;">
      <div id="fixed-left" style="white-space: nowrap; flex-shrink: 0; margin-right: 20px;" data-aos="fade-left">
               <a href="/routes.html" class="route chennai-link" style="text-decoration: none; color: #333;">Chennai</a>
      </div>
      <div id="scrolling-right" style="white-space: nowrap; overflow: hidden; flex-grow: 1; position: relative; cursor: pointer;">
        <div id="scrolling-content" style="display: inline-block; white-space: nowrap; will-change: transform;">
          <!-- Sliding cities will go here -->
        </div>
      </div>
    </div>

  </header>
<main class="page-content">
  <h1 class="hero-title" data-aos="slide-up" style="text-align: center;">
    Chennai to {city} Cab – Premium Outstation Taxi by ShRish Travels
  </h1>

  <p data-aos="fade-in" data-aos-delay="50">
    Planning a trip from <strong>Chennai to {city}</strong>? Experience a safe, smooth and stylish ride with ShRish Travels – Chennai’s trusted cab partner. Whether it’s a family trip, business travel, or temple visit, we offer end-to-end cab solutions to match your needs.
  </p>

  <section data-aos="fade-up" class="destination-info">
    <h2>Discover {city}</h2>
    <p>{city} is a wonderful destination known for its unique attractions, culture, and hospitality. Whether you are visiting temples, exploring nature, or attending business meetings, we ensure your journey is comfortable and hassle-free.</p>
  </section>

  <section class="why-trust-us" data-aos="fade-up">
    <div class="container">
      <ul>
        <li data-aos="fade-up">
          <i class="fas fa-map-marker-alt"></i> Doorstep pickup from Velachery & across Chennai
        </li>
        <li data-aos="fade-up">
          <i class="fas fa-car-side"></i> Choice of AC Hatchbacks, Sedans, SUVs & Tempo Travellers
        </li>
        <li data-aos="fade-up">
          <i class="fas fa-tags"></i> Transparent pricing – No hidden charges
        </li>
       <li data-aos="fade-up">
          <i class="fas fa-shield-alt"></i> Verified drivers & 
          <a href="tel:+918883451668" target="_blank" title="Call" style="text-decoration: none; color: inherit;">24x7 call</a> / 
          <a href="https://wa.me/918883451668" target="_blank" title="WhatsApp Chat" style="text-decoration: none; color: inherit;">WhatsApp support</a>
        </li>

      </ul>
    </div>
  </section>

  <section data-aos="fade-up" class="comfort-section">
    <h2>Comfort and Safety on Every Trip</h2>
    <p>Our vehicles are well-maintained, sanitized, and driven by professional drivers to ensure a safe and pleasant experience. Enjoy hassle-free rides with real-time tracking and round-the-clock customer support.</p>
  </section>

  <!-- New Call-to-Action Section -->
  <section data-aos="fade-up" class="call-to-action" style="text-align:center; margin-top:2rem;">
    <p>
      From anywhere you are, we’re here to make your trip easy and memorable.  
      <strong><a href="/booking.html" style="color:#007BFF; text-decoration:none;">Book your Chennai to {city} cab now!</a></strong>
    </p>
  </section>

  <div class="contact-icons" data-aos="zoom-in" data-aos-delay="200">
    <a href="tel:+918883451668" class="icon-btn" title="Call">
      <i class="fas fa-phone-alt"></i>
    </a>
    <a href="https://wa.me/918883451668" target="_blank" class="icon-btn" title="WhatsApp Chat">
      <i class="fab fa-whatsapp"></i>
    </a>
    <a href="/booking.html" class="icon-btn" title="Book Online">
      <i class="fas fa-calendar-check"></i>
    </a>
  </div>
  </main>
  <section data-aos="fade-up" class="faq-section call-to-action">
  <h2>Frequently Asked Questions About Chennai to {city} Cab Booking</h2>
  <div class="faq-container">
    <details open data-aos="fade-left">
      <summary>What vehicles can I choose for a Chennai to {city} trip?</summary>
      <p>ShRish Travels offers a variety of AC vehicles, including hatchbacks (e.g., SWIFT), sedans (e.g., Dzire), SUVs (e.g., Innova), and Tempo Travellers for group travel. All vehicles are well-maintained and sanitized for your comfort. <a href="/booking.html">Select your vehicle and book now!</a></p>
    </details>
    <details>
      <summary>How long does it take to travel from Chennai to {city}?</summary>
      <p>The journey from Chennai to {city} takes {duration}, depending on traffic and route conditions. Our drivers ensure a smooth and timely ride. <a href="/booking.html">Book your cab today!</a> for a hassle-free trip.</p>
    </details>
    <details>
      <summary>Can I book a round-trip cab to {city}?</summary>
      <p>Yes, ShRish Travels offers both one-way and round-trip cab services from Chennai to {city}. Round trips are perfect for weekend getaways or extended visits. Contact us via <a href="tel:+918883451668">call</a> or <a href="https://wa.me/918883451668">WhatsApp</a> to plan your trip.</p>
    </details>
    <details>
      <summary>Are the drivers and cabs safe?</summary>
      <p>All our drivers are verified, experienced, and trained to prioritize your safety. Our cabs are sanitized before each trip and equipped with real-time tracking. Enjoy peace of mind with 24/7 support. <a href="/booking.html">Reserve your cab now!</a></p>
    </details>
    <details>
      <summary>Can I stop for sightseeing on the way to {city}?</summary>
      <p>Yes, you can request stops for sightseeing, meals, or other needs during your Chennai to {city} trip. Just let us know when booking or inform your driver. <a href="https://wa.me/918883451668">Message us on WhatsApp</a> to customize your itinerary.</p>
    </details>
    <details>
      <summary>How do I book a cab from Chennai to {city}?</summary>
      <p>Booking is simple with ShRish Travels! Click <a href="/booking.html">here to book online</a>, call us at <a href="tel:+918883451668">+91 88834 51668</a>, or message us on <a href="https://wa.me/918883451668">WhatsApp</a>. Our 24/7 team is here to assist. Book now for a seamless journey!</p>
    </details>
    <details>
      <summary>What support is available during my trip to {city}?</summary>
      <p>ShRish Travels provides 24/7 customer support via <a href="tel:+918883451668">call</a> or <a href="https://wa.me/918883451668">WhatsApp</a>. Whether you need to modify your booking or have questions during your trip, we’re here to help. <a href="/booking.html">Book today!</a></p>
    </details>
  </div>
</section>

  <footer class="footer">
    <div class="footer-container">
      <div class="footer-grid">
        <div class="footer-brand" data-aos="fade-up" data-aos-delay="100">
          <a href="index.html"><img src="/assets/SH1.png" alt="ShRish Travels Logo" class="logo" data-aos="slide-right"></a>
          <p>
            Providing reliable and comfortable cab services in Chennai and beyond since 2021. Your journey, our responsibility.
          </p>
          <div class="footer-socials">
            <div class="insta-hover-container">
              <a href="https://www.instagram.com/shrish_travels" target="_blank" aria-label="Instagram">
                <i class="fab fa-instagram fa-2x"></i>
              </a>
              <div class="insta-preview">
                <iframe 
                  src="https://www.instagram.com/p/DCYGoSrSaUr/embed" 
                  width="300" 
                  height="380" 
                  frameborder="0" 
                  scrolling="no" 
                  allowtransparency="true">
                </iframe>
              </div>
            </div>
            <div class="youtube-hover-container">
              <a href="https://www.youtube.com/channel/UC5xOOggNg80T7uoijMfz3jA" 
                 target="_blank" 
                 aria-label="YouTube"
                 class="youtube-icon">
                <i class="fab fa-youtube"></i>
              </a>
              <div class="youtube-preview">
                <iframe
                  width="360"
                  height="215"
                  src=""
                  title="ShRish Travels Playlist"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
            <div class="whatsapp-hover-container">
              <a href="https://wa.me/918883451668" target="_blank" aria-label="WhatsApp">
                <i class="fab fa-whatsapp fa-2x"></i>
              </a>
              <div class="whatsapp-tooltip">Chat with us on WhatsApp</div>
            </div>
          </div>
        </div>
        <div class="footer-links" data-aos="fade-up" data-aos-delay="200">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#" onclick="return false;">Home</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="services.html#vehicles">Our Vehicles</a></li>
            <li><a href="contact.html">Contact Us</a></li>
            <li><a href="booking.html#booking-page">Book Now</a></li>
            <li><a href="https://shrishtravelschennai.blogspot.com/p/best-cab-service-in-chennai-outstation.html" target="_blank">Blog</a></li>
          </ul>
        </div>
        <div class="footer-links" data-aos="fade-up" data-aos-delay="200">
          <h3>Services</h3>
          <ul style="text-align: center;">
            <li><a href="services.html#service">Airport Transfers</a></li>
            <li><a href="services.html#service">City Tours</a></li>
            <li><a href="services.html#service">Outstation Trips</a></li>
            <li><a href="services.html#service">Corporate Travel</a></li>
            <li><a href="services.html#service">Wedding Transportation</a></li>
          </ul>
        </div>
        <div class="footer-contact" data-aos="fade-up" data-aos-delay="400">
          <h3>Contact Info</h3>
          <ul style="text-align: center;">
            <li>
              <i class="fas fa-phone"></i>
              <div>
                <p style="text-align: left;">Phone</p>
                <a href="tel:+918883451668">+91 888 345 1668</a>
              </div>
            </li>
            <li>
              <i class="fas fa-envelope"></i>
              <div>
                <p style="text-align: left;">Email</p>
                <a href="mailto:shrishtravels1@gmail.com">shrishtravels1@gmail.com</a>
              </div>
            </li>
            <li>
              <i class="fas fa-map-marker-alt"></i>
              <div>
                <p style="text-align: left;">Address</p>
                <address>
                  <a href="https://maps.app.goo.gl/CEs7ZtpNXdFsPavW9">
                    Gangai Nagar, Velachery,<br />
                    Chennai, Tamil Nadu
                  </a>
                </address>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p style="text-align: center;">© <span id="copyright-year"></span> ShRish Travels. All rights reserved.</p>
    </div>
  </footer>
  <script src="/script.js"></script>
</body>
</html>
'''

# Generate HTML files for each city
for city in destinations:
    try:
        city_lower = city.lower().replace(" ", "-")
        duration = durations.get(city, "Varies based on route and traffic")
        filename = f'chennai-to-{city_lower}-cab.html'
        content = template.format(city=city, city_lower=city_lower, duration=duration)
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'✅ Created {filename}')
    except Exception as e:
        print(f'❌ Error processing {city}: {e}')

# links = []

# for i in destinations:
#     city_lower = i.lower().replace(" ", "-")
#     links.append(f"https://shrishtravels.netlify.app/py/chennai-to-{city_lower}-cab.html")
# print(links)