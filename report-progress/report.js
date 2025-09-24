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
                    <div class="mb-4">
                        <label class="form-label text-identification-label">
                            How much is your estimated monthly electric bill?
                            <br><small class="text-identification-hint">(Just guess for now, we’ll get the actual amount later.)</small>
                        </label>

                        <!-- Custom slider -->
                        <input type="range" min="0" max="50000" step="5000" value="15000" class="form-range custom-slider">
                        <div class="d-flex justify-content-between text-identification-scale">
                            <span>$0</span>
                            <span>$5,000</span>
                            <span>$10,000</span>
                            <span>$15,000</span>
                            <span>$20,000</span>
                            <span>$25,000</span>
                            <span>$30,000</span>
                            <span>$35,000</span>
                            <span>$40,000</span>
                            <span>$45,000</span>
                            <span>$50,000</span>
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
            <div class="bg-dark d-inline-block p-2 rounded">
            <input type="checkbox" id="recaptcha">
            <label for="recaptcha" class="text-light">I'm not a robot</label>
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
      if (stepNum === currentStep+1) {
        circle.classList.add("energy-step-circle-active");
        stepWrapper.classList.add("active");
        stepCircles[currentStep-1].classList.add("circle-completed")
        stepCircles[currentStep-1].innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.5341 6.66666C14.8385 8.16086 14.6215 9.71428 13.9193 11.0679C13.2171 12.4214 12.072 13.4934 10.6751 14.1049C9.27816 14.7164 7.71382 14.8305 6.24293 14.4282C4.77205 14.026 3.48353 13.1316 2.59225 11.8943C1.70097 10.657 1.26081 9.15148 1.34518 7.62892C1.42954 6.10635 2.03332 4.65872 3.05583 3.52744C4.07835 2.39616 5.45779 1.64961 6.96411 1.4123C8.47043 1.17498 10.0126 1.46123 11.3334 2.22333" stroke="#0F131A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M6 7.33341L8 9.33341L14.6667 2.66675" stroke="#0F131A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        `
      }else {
        circle.classList.remove("energy-step-circle-active");
        stepWrapper.classList.remove("active");
        if(i+1 > currentStep){
          circle.classList.remove("circle-completed")
          circle.innerHTML = i+1
        }
      }
    });


    // Update right section
    console.log("CurrentStep", currentStep);
    
    rightTitle.innerText = stepData[currentStep].title;
    rightSubtitle.innerHTML = stepData[currentStep].subtitle;
    rightContent.innerHTML = stepData[currentStep].content;

    if (currentStep === 0) {
        initMap();
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
  });

  nextBtn.addEventListener("click", () => {
    if (currentStep < totalSteps) {
      currentStep++;
      updateStep();
    } else {
      alert("Form submitted!");
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
