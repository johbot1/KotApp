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
