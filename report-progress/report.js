document.addEventListener("DOMContentLoaded", () => {
  let currentStep = 1;
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
    1: {
      title: "Locate your property",
      subtitle: `<p id="status"></p>`,
      content: `<p class="text-custom-yellow">Select Location*</p><div id="map" style="height:300px; border-radius:8px;"></div>`
    },
    2: {
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
    3: {
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
    stepCircles.forEach(circle => {
      const stepWrapper = circle.closest(".energy-progress-step"); // parent div
      const stepNum = parseInt(circle.textContent.trim());
      console.log(stepNum, currentStep);
      if (stepNum === currentStep) {
        circle.classList.add("energy-step-circle-active");
        stepWrapper.classList.add("active");
      } else {
        circle.classList.remove("energy-step-circle-active");
        stepWrapper.classList.remove("active");
      }
    });


    // Update right section
    rightTitle.innerText = stepData[currentStep].title;
    rightSubtitle.innerHTML = stepData[currentStep].subtitle;
    rightContent.innerHTML = stepData[currentStep].content;

    if (currentStep === 1) {
        initMap();
    }

    // Button states
    prevBtn.disabled = currentStep === 1;
    nextBtn.innerHTML =
      currentStep === totalSteps
        ? `Finish <i class="bi bi-check2"></i>`
        : `Next <i class="bi bi-arrow-right"></i>`;
  }

  // Button events
  prevBtn.addEventListener("click", () => {
    if (currentStep > 1) {
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
