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
      content: `<div id="map" style="height:300px; border-radius:8px;"></div>`
    },
    2: {
      title: "Energy identification",
      subtitle: "Provide your estimated energy usage.",
      content: `
        <div class="form-group mb-3">
          <label for="usage" class="form-label">Estimated Monthly Usage (kWh)</label>
          <input type="number" id="usage" class="form-control" placeholder="Enter usage">
        </div>`
    },
    3: {
      title: "Complete",
      subtitle: "Review and submit your request.",
      content: `
        <p class="mb-3">Please confirm your details before submitting:</p>
        <ul>
          <li>Location: Selected</li>
          <li>Energy Usage: Entered</li>
        </ul>
        <button class="btn btn-success w-100">Submit Request</button>`
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
