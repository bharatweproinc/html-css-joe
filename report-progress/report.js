document.addEventListener("DOMContentLoaded", () => {
  let currentStep = 0;
  const totalSteps = 3;

  const progressBar = document.getElementById("progressBar");
  const stepCircles = document.querySelectorAll(".energy-step-circle");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  const rightTitle = document.getElementById("rightTitle");
  const rightSubtitle = document.getElementById("rightSubtitle");
  const rightContent = document.getElementById("rightContent");

  // Step contents for right section
  const stepData = {
    0: {
      title: "Locate your property",
      subtitle: ``,
      content: `<p class="text-custom-yellow">Select Location*</p><div id="map" style="height:300px; border-radius:8px;"></div>`
    },
    1: {
      title: "Energy identification",
      subtitle: "Based on your answers, you'll need about 210 solar panels to maximize your energy investment.",
      content: `
        <div class="mb-4">
                        <label class="form-label text-identification-label">Who provides your electricity?</label>
                        <select class="form-select custom-select-identification">
                            <option>PG&E (Pacific Gas & Electric)</option>
                            <option>Southern California Edison</option>
                            <option>San Diego Gas & Electric</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <!-- Slider -->
                    <div class="mb-4 slider-container">
                      <label class="form-label text-identification-label">
                        How much is your estimated monthly electric bill?
                        <br><small class="text-identification-hint">(Just guess for now, we’ll get the actual amount later.)</small>
                      </label>

                      <input type="range" min="0" max="50000" step="5000" value="15000" class="custom-slider">

                      <div class="slider-scale">
                        <span>0</span>
                        <span>5k</span>
                        <span>10k</span>
                        <span>15k</span>
                        <span>20k</span>
                        <span>25k</span>
                        <span>30k</span>
                        <span>35k</span>
                        <span>40k</span>
                        <span>45k</span>
                        <span>50k</span>
                      </div>
                    </div>


                    <!-- Pro tip -->
                    <p class="pro-tip">
                        <strong>Pro tip:</strong> Solar is not just for your roof. Solar carports generate added electricity, 
                        shade for your visitors, and show customers you’re eco friendly.
                    </p>`
    },
    2: {
      title: "An onsite energy system at",
      subtitle: "with 210 solar panels will generate about $96,000 in annual income and improve your property value by $1,900,000 using a 5% cap rate.",
      content: `
        <p class="text-light">We’ll send your free Property Energy Report to:</p>
        <div class="row g-3 mb-3">
            <div class="col-md-4">
            <input type="text" class="form-control custom-input" placeholder="Your Name">
            </div>
            <div class="col-md-4">
            <input type="email" class="form-control custom-input" placeholder="Email">
            </div>
            <div class="col-md-4">
            <input type="text" class="form-control custom-input" placeholder="Phone">
            </div>
        </div>

        <!-- Recaptcha -->
        <div class="mb-3">
            <div class="g-recaptcha" data-sitekey="6Lclf9MrAAAAAPf7DlZENDXbxwK4fwCMRSIYoTU9"></div>
        </div>`
    },
    3: {
      title: `<h5 id="rightTitle" class="fw-bold text-center pt-0 text-custom-yellow"></h5> `,
      subtitle: `
        <h1 class="mt-4" style=color:#fdf4d8>Thank You!</h1>
        <p class="energy-hero-subtitle">Your solar quote request has been submitted successfully.</p>
        <p class="custom-size mt-3">Our team will review your information and contact you within 24 hours with your personalized solar quote and energy savings analysis.</p>`,
      content: `
        <div class="next-steps">
          <h2>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.33422 11.6667C3.17653 11.6673 3.02191 11.623 2.88835 11.5392C2.75479 11.4554 2.64775 11.3354 2.57968 11.1931C2.51161 11.0509 2.4853 10.8922 2.5038 10.7356C2.52231 10.579 2.58487 10.4309 2.68422 10.3084L10.9342 1.80839C10.9961 1.73696 11.0804 1.68868 11.1734 1.6715C11.2663 1.65431 11.3623 1.66923 11.4457 1.71381C11.529 1.75838 11.5947 1.82997 11.632 1.91681C11.6693 2.00365 11.676 2.10059 11.6509 2.19172L10.0509 7.20839C10.0037 7.33466 9.98786 7.47049 10.0047 7.60423C10.0216 7.73797 10.0706 7.86562 10.1476 7.97624C10.2247 8.08686 10.3274 8.17715 10.447 8.23935C10.5665 8.30156 10.6994 8.33383 10.8342 8.33339H16.6676C16.8253 8.33285 16.9799 8.37707 17.1134 8.46091C17.247 8.54474 17.354 8.66476 17.4221 8.80701C17.4902 8.94926 17.5165 9.1079 17.498 9.26451C17.4795 9.42111 17.4169 9.56926 17.3176 9.69172L9.06756 18.1917C9.00567 18.2632 8.92134 18.3114 8.8284 18.3286C8.73547 18.3458 8.63945 18.3309 8.55611 18.2863C8.47278 18.2417 8.40707 18.1701 8.36978 18.0833C8.33248 17.9965 8.32582 17.8995 8.35089 17.8084L9.95089 12.7917C9.99807 12.6655 10.0139 12.5296 9.99706 12.3959C9.98021 12.2621 9.93117 12.1345 9.85415 12.0239C9.77712 11.9132 9.67441 11.823 9.55483 11.7608C9.43524 11.6985 9.30235 11.6663 9.16756 11.6667H3.33422Z" stroke="#FFCC33" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

            What happens next?
          </h2>
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-text">Our solar experts will analyze your property and energy needs</div>
          </div>
          <div class="step">
            <div class="step-number">2</div>
            <div class="step-text">We’ll create a custom solar design and savings projection</div>
          </div>
          <div class="step">
            <div class="step-number">3</div>
            <div class="step-text">You’ll receive your detailed quote with financing options</div>
          </div>
        </div>`
    }
  };

  function updateStep() {
    // Update progress bar
    progressBar.style.width = `${(currentStep / totalSteps) * 100}%`;

    // Update active step circles
    stepCircles.forEach((circle,i) => {
      const stepWrapper = circle.closest(".energy-progress-step"); // parent div
      const stepInnerContent = parseInt(circle.textContent.trim());
      const stepNum = isNaN(stepInnerContent) ? "icon" : stepInnerContent;
      console.log(":::", stepNum, currentStep);
      circle.classList.add("energy-step-circle-active");
      if (i + 1 === currentStep+1) {
        stepWrapper.classList.add("active");
        circle.classList.remove("circle-completed")
        circle.innerHTML = i+1
      } else if(i < currentStep ) {
        circle.classList.add("circle-completed")
        circle.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.5341 6.66666C14.8385 8.16086 14.6215 9.71428 13.9193 11.0679C13.2171 12.4214 12.072 13.4934 10.6751 14.1049C9.27816 14.7164 7.71382 14.8305 6.24293 14.4282C4.77205 14.026 3.48353 13.1316 2.59225 11.8943C1.70097 10.657 1.26081 9.15148 1.34518 7.62892C1.42954 6.10635 2.03332 4.65872 3.05583 3.52744C4.07835 2.39616 5.45779 1.64961 6.96411 1.4123C8.47043 1.17498 10.0126 1.46123 11.3334 2.22333" stroke="#0F131A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M6 7.33341L8 9.33341L14.6667 2.66675" stroke="#0F131A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        `
      } else {
        circle.classList.remove("energy-step-circle-active");
        stepWrapper.classList.remove("active");
        if(i + 1 > currentStep){
          circle.classList.remove("circle-completed")
          circle.innerHTML = i+1
        }
      }
    });


    // Update right section
    console.log("CurrentStep", currentStep);
    
    if(currentStep === 3){
      rightTitle.innerHTML = `<div style="background-color: #dcfce7; border-radius: 50%; width: 100px; height: 100px; display: flex; justify-content: center; align-items: center;">
              <div style="background-color: #d1f3e1; border-radius: 50%; width: 100px; height: 100px; display: flex; align-items: center; justify-content: center;">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M43.6012 20C44.5146 24.4826 43.8637 29.1428 41.7569 33.2036C39.6502 37.2643 36.215 40.4801 32.0243 42.3146C27.8335 44.1491 23.1405 44.4915 18.7278 43.2847C14.3152 42.0779 10.4496 39.3948 7.77577 35.6828C5.10194 31.9709 3.78147 27.4545 4.03455 22.8868C4.28763 18.319 6.09898 13.9762 9.16652 10.5823C12.2341 7.18848 16.3724 4.94884 20.8914 4.23689C25.4103 3.52493 30.0368 4.3837 33.9992 6.66998" stroke="#16A34A" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M18 22L24 28L44 8" stroke="#16A34A" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>`;
    }
    else{
      rightTitle.innerHTML = stepData[currentStep].title;
    }
    rightSubtitle.innerHTML = stepData[currentStep].subtitle;
    rightContent.innerHTML = stepData[currentStep].content;

    if (currentStep === 0) {
        initMap();
        document.getElementById('status').classList.remove("d-none")
    } else if(currentStep === 2) {
      document.getElementById('status').classList.remove("d-none")
    } else {
      document.getElementById('status').classList.add("d-none")
    }

    // Button states
    prevBtn.disabled = currentStep === 0;
    nextBtn.innerHTML =
      currentStep === totalSteps
        ? `Finish <i class="bi bi-check2"></i>`
        : `Next <i class="bi bi-arrow-right"></i>`;
  }

  // Button events
  prevBtn.addEventListener("click", () => {
    if (currentStep > 0) {
      currentStep--;
      updateStep();
    }
      document.getElementById("return-to-homepage").classList.remove("d-flex")
      document.getElementById("nextBtn").classList.remove("d-none")
      document.getElementById("return-to-homepage").classList.add("d-none")
  });

  nextBtn.addEventListener("click", () => {
    if (currentStep < totalSteps) {
      currentStep++;
      if(currentStep === 3) {
        document.getElementById("nextBtn").classList.add("d-none")
        document.getElementById("return-to-homepage").classList.remove("d-none")
        document.getElementById("return-to-homepage").classList.add("d-flex")
      } else {
        
      }
      updateStep();
    } else {
    }
  });

  updateStep();
});


function initMap() {
  const map = L.map('map');

  // Add tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);

  let marker;

  // Try to locate the user
  map.locate({ setView: true, maxZoom: 16 });

  // When location is found
  map.on('locationfound', function (e) {
    const { lat, lng } = e.latlng;

    // Add marker at user's location
    marker = L.marker([lat, lng]).addTo(map);
    document.getElementById('status').textContent = `No Property Selected Yet`; 
    // Fetch address
    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
      .then(response => response.json())
      .then(data => {
        const address = data.display_name || "Address not found";
        document.getElementById('status').textContent = `📍 ${address}`;
      })
      .catch(err => {
        console.error(err);
        document.getElementById('status').textContent = `Error fetching address`;
      });
  });

  // If location not found or denied
  map.on('locationerror', function () {
    document.getElementById('status').textContent = "⚠️ Location access denied. Please click the map.";
    map.setView([37.7749, -122.4194], 16); // fallback (San Francisco)
  });

  // Allow manual map click as backup
  map.on('click', function (e) {
    const { lat, lng } = e.latlng;

    if (!marker) {
      marker = L.marker([lat, lng]).addTo(map);
    } else {
      marker.setLatLng([lat, lng]);
    }

    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
      .then(response => response.json())
      .then(data => {
        const address = data.display_name || "Address not found";
        document.getElementById('status').textContent = `📍 ${address}`;
      })
      .catch(() => {
        document.getElementById('status').textContent = `Error fetching address`;
      });
  });
}
