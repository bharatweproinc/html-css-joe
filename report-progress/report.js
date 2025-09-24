document.addEventListener("DOMContentLoaded", () => {
  let currentStep = 1;
  const totalSteps = 3;

  const progressBar = document.getElementById("progressBar");
  const stepCircles = document.querySelectorAll(".step-circle");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  const rightTitle = document.getElementById("rightTitle");
  const rightSubtitle = document.getElementById("rightSubtitle");
  const rightContent = document.getElementById("rightContent");

  // Step contents for right section
  const stepData = {
    1: {
      title: "Locate your property",
      subtitle: "No Property Selected Yet",
      content: `<img src="https://via.placeholder.com/600x300" class="img-fluid rounded" alt="Map">`
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
      circle.classList.remove("active");
      if (parseInt(circle.dataset.step) === currentStep) {
        circle.classList.add("active");
      }
    });

    // Update right section
    rightTitle.innerText = stepData[currentStep].title;
    rightSubtitle.innerText = stepData[currentStep].subtitle;
    rightContent.innerHTML = stepData[currentStep].content;

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
      alert("Form submitted! 🚀");
    }
  });

  // Initialize first step
  updateStep();
});
