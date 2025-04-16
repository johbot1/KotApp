
// Update slider value displays
function updateSliderValue(inputId, valueId) {
    const slider = document.getElementById(inputId);
    const valueDisplay = document.getElementById(valueId);
    slider.addEventListener('input', function () {
        valueDisplay.textContent = this.value;
    });
}

// Create numbered ticks under each slider
function createTicks(sliderId, min, max, step) {
    const slider = document.getElementById(sliderId);
    const tickContainer = slider.nextElementSibling;
    tickContainer.innerHTML = "";

    for (let i = min; i <= max; i += step) {
        const label = document.createElement("div");
        label.className = "slider-label";
        label.textContent = i;
        tickContainer.appendChild(label);
    }
}


// Initialize sliders
function initializeSliders() {
    updateSliderValue('depressionMania', 'depressionManiaValue');
    updateSliderValue('anxiety', 'anxietyValue');
    updateSliderValue('irritability', 'irritabilityValue');
    updateSliderValue('energyLvl', 'energyLvlValue');

    createTicks('depressionMania', -10, 10, 5);
    createTicks('anxiety', 0, 10, 2);
    createTicks('irritability', 0, 10, 2);
    createTicks('energyLvl', 0, 5, 1);
}

// Display modal
function showModal(message) {
    const modal = document.createElement("div");
    modal.id = "saveModal";
    modal.style.position = "fixed";
    modal.style.top = "50%";
    modal.style.left = "50%";
    modal.style.transform = "translate(-50%, -50%)";
    modal.style.backgroundColor = "#e0fbfc";
    modal.style.border = "2px solid #333";
    modal.style.padding = "20px";
    modal.style.zIndex = "1000";
    modal.style.textAlign = "center";
    modal.style.borderRadius = "8px";
    modal.innerHTML = `<p>${message}</p><button onclick="closeModal()">OK</button>`;
    document.body.appendChild(modal);
}

function closeModal() {
    const modal = document.getElementById("saveModal");
    if (modal) {
        modal.remove();
    }
}

// Reset form after save
function resetForm() {
    document.querySelectorAll("input[type='range']").forEach(slider => slider.value = 0);
    document.getElementById("depressionMania").value = 0;
    document.getElementById("depressionManiaValue").textContent = "0";
    document.getElementById("anxietyValue").textContent = "0";
    document.getElementById("irritabilityValue").textContent = "0";
    document.getElementById("energyLvlValue").textContent = "0";

    document.querySelectorAll("input[type='checkbox']").forEach(checkbox => checkbox.checked = false);
    document.getElementById("notes").value = "";
}

// Save button logic
document.addEventListener('DOMContentLoaded', function () {
    initializeSliders();

    document.querySelector('.save-button').addEventListener('click', function () {
        // Simulate save (you would send data to backend here)
        showModal("Journal saved successfully!");

        // Reset the form
        resetForm();
    });
});
