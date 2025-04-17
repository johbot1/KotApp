
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

function saveJournalToLocalStorage(entry) {
    const existing = JSON.parse(localStorage.getItem("moodJournalEntries") || "[]");
    existing.push(entry);
    localStorage.setItem("moodJournalEntries", JSON.stringify(existing));
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
        const date = new Date().toISOString().split("T")[0];
        const journalEntry = {
            date,
            depressionMania: document.getElementById("depressionMania").value,
            anxiety: document.getElementById("anxiety").value,
            irritability: document.getElementById("irritability").value,
            energyLvl: document.getElementById("energyLvl").value,
            notes: document.getElementById("notes").value,
            symptoms: {
                migraineProdrome: document.getElementById("migraineProdrome").checked,
                bechetsFlare: document.getElementById("bechetsFlare").checked,
                spotting: document.getElementById("spotting").checked,
                blankPills: document.getElementById("blankPills").checked,
                nightSweats: document.getElementById("nightSweats").checked,
                anomalousEvent: document.getElementById("anomalousEvent").checked,
                migraineHeadache: document.getElementById("migraineHeadache").checked,
            }
        };

        saveJournalToLocalStorage(journalEntry); // MUST be before reset
        showModal("Journal saved successfully!");
        resetForm(); // Reset after saving
    });

});

// Download Button logic
document.getElementById("downloadCsv").addEventListener("click", function () {
    const date = new Date().toISOString().split("T")[0];

    const sliders = {
        depressionMania: document.getElementById("depressionMania").value,
        anxiety: document.getElementById("anxiety").value,
        irritability: document.getElementById("irritability").value,
        energyLvl: document.getElementById("energyLvl").value,
    };

    const symptoms = [
        "migraineProdrome",
        "bechetsFlare",
        "spotting",
        "blankPills",
        "nightSweats",
        "anomalousEvent",
        "migraineHeadache"
    ];

    const symptomValues = {};
    symptoms.forEach(id => {
        const checked = document.getElementById(id).checked;
        symptomValues[id] = checked ? 1 : 0;
    });

    const notes = document.getElementById("notes").value.replace(/"/g, '""'); // Escape quotes

    // Build CSV content
    const headers = [
        "Date",
        "Depression/Mania",
        "Anxiety",
        "Irritability",
        "Energy",
        ...symptoms.map(id => id),
        "Notes"
    ];

    const values = [
        date,
        sliders.depressionMania,
        sliders.anxiety,
        sliders.irritability,
        sliders.energyLvl,
        ...symptoms.map(id => symptomValues[id]),
        `"${notes}"`
    ];

    const csvContent = `${headers.join(",")}\n${values.join(",")}`;

    // Trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.setAttribute("href", URL.createObjectURL(blob));
    link.setAttribute("download", `mood-journal-${date}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

//Download All button logic
document.getElementById("downloadAllCsv").addEventListener("click", function () {
    const entries = JSON.parse(localStorage.getItem("moodJournalEntries") || "[]");
    if (entries.length === 0) {
        alert("No journal entries found.");
        return;
    }

    const headers = [
        "Date",
        "Depression/Mania",
        "Anxiety",
        "Irritability",
        "Energy",
        "Migraine Prodrome",
        "Bechets Flare",
        "Spotting",
        "Blank Pills",
        "Night Sweats",
        "Anomalous Event",
        "Migraine Headache",
        "Notes"
    ];

    const rows = entries.map(entry => {
        return [
            entry.date,
            entry.depressionMania,
            entry.anxiety,
            entry.irritability,
            entry.energyLvl,
            entry.symptoms.migraineProdrome ? 1 : 0,
            entry.symptoms.bechetsFlare ? 1 : 0,
            entry.symptoms.spotting ? 1 : 0,
            entry.symptoms.blankPills ? 1 : 0,
            entry.symptoms.nightSweats ? 1 : 0,
            entry.symptoms.anomalousEvent ? 1 : 0,
            entry.symptoms.migraineHeadache ? 1 : 0,
            `"${entry.notes.replace(/"/g, '""')}"`
        ].join(",");
    });

    const csv = `${headers.join(",")}\n${rows.join("\n")}`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.setAttribute("href", URL.createObjectURL(blob));
    link.setAttribute("download", "mood-journal-all.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
