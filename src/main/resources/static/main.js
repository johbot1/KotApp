// Update slider value displays
function updateSliderValue(inputId, valueId) {
    document.getElementById(inputId).addEventListener('input', function() {
        document.getElementById(valueId).textContent = this.value;
    });
}

updateSliderValue('depressionMania', 'depressionManiaValue');
updateSliderValue('anxiety', 'anxietyValue');
updateSliderValue('irritability', 'irritabilityValue');
updateSliderValue('energyLvl', 'energyLvlValue');

// Function to create ticks for each slider
function createSliderTicks(sliderId, tickCount) {
    const slider = document.getElementById(sliderId);
    const ticksContainer = slider.nextElementSibling; // Get the slider-ticks div

    for (let i = 0; i < tickCount; i++) {
        const tick = document.createElement('div');
        tick.className = 'slider-tick';
        ticksContainer.appendChild(tick);
    }
}

createSliderTicks('depressionMania', 21);
createSliderTicks('anxiety', 11);
createSliderTicks('irritability', 11);
createSliderTicks('energyLvl', 6);

// Set today's date in the nav bar
const todayDate = new Date();
const formattedDate = todayDate.toLocaleDateString(undefined, {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
});
document.querySelector('.today-date').textContent = `Today: ${formattedDate}`;

//  Save button saving the journal
document.querySelector('.save-button').addEventListener('click', () => {
    // Get selected symptoms
    const selectedSymptoms = Array.from(document.querySelectorAll('input[name="symptom"]:checked'))
        .map(checkbox => checkbox.value);

    // Add "workout" if checked
    if (document.getElementById('workout').checked) {
        selectedSymptoms.push('workout');
    }

    // Get slider values
    const sliderData = {
        depressionMania: document.getElementById('depressionMania').value,
        anxiety: document.getElementById('anxiety').value,
        irritability: document.getElementById('irritability').value,
        energyLvl: document.getElementById('energyLvl').value
    };

    // Grab notes too
    const notes = document.getElementById('notes').value;

    // Build the final journal entry
    const journalEntry = {
        date: new Date().toISOString(),
        symptoms: selectedSymptoms,
        sliders: sliderData,
        notes: notes
    };

    console.log("Saved Journal Entry:", journalEntry);
});

