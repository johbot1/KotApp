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
    // Collect symptoms
    const selectedSymptoms = Array.from(document.querySelectorAll('input[name="symptom"]:checked'))
        .map(checkbox => checkbox.value);

    if (document.getElementById('workout').checked) {
        selectedSymptoms.push('workout');
    }

    // Collects the slider values
    const sliderData = {
        depressionMania: document.getElementById('depressionMania').value,
        anxiety: document.getElementById('anxiety').value,
        irritability: document.getElementById('irritability').value,
        energyLvl: document.getElementById('energyLvl').value
    };

    // Collects the notes
    const notes = document.getElementById('notes').value.trim();

    // Basic validation
    const hasAnyData =
        selectedSymptoms.length > 0 ||
        Object.values(sliderData).some(val => parseInt(val) !== 0) ||
        notes.length > 0;

    const saveMessage = document.getElementById('saveMessage');

// Validation block (replaces alert for empty)
    if (!hasAnyData) {
        saveMessage.textContent = "Please enter at least one mood, symptom, or note.";
        saveMessage.style.color = "red";
        saveMessage.classList.add("show");
        return;
    }

// Message displays after successfully saving
    saveMessage.textContent = "Journal entry saved!";
    saveMessage.style.color = "green";
    saveMessage.classList.add("show");

// Hides after a few seconds
    setTimeout(() => {
        saveMessage.classList.remove("show");
    }, 4000);


    // Builds the Journal Entry Object
    const journalEntry = {
        date: new Date().toISOString(),
        symptoms: selectedSymptoms,
        sliders: sliderData,
        notes: notes
    };

    console.log("Saved Journal Entry:", journalEntry);
});


