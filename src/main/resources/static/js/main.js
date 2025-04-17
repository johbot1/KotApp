// ───────────── SLIDER SETUP ─────────────

// Update slider display text in real-time
function updateSliderValue(inputId, valueId) {
    console.log("updateSliderValue - Attaching input listener to slider:", inputId);
    const slider = document.getElementById(inputId);
    const valueDisplay = document.getElementById(valueId);
    slider.addEventListener('input', function () {
        valueDisplay.textContent = this.value;
    });
}

// Add visible number ticks below sliders
function createTicks(sliderId, min, max, step) {
    console.log("createTicks - Building ticks for:", sliderId);
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

// Setup all sliders and ticks on load
function initializeSliders() {
    console.log("initializeSliders - Initializing sliders and tick labels");
    updateSliderValue('depressionMania', 'depressionManiaValue');
    updateSliderValue('anxiety', 'anxietyValue');
    updateSliderValue('irritability', 'irritabilityValue');
    updateSliderValue('energyLvl', 'energyLvlValue');

    createTicks('depressionMania', -10, 10, 5);
    createTicks('anxiety', 0, 10, 2);
    createTicks('irritability', 0, 10, 2);
    createTicks('energyLvl', 0, 5, 1);
}

// ───────────── MODAL UTILITY ─────────────

// Show a modal with a custom message
function showModal(message) {
    console.log("showModal - Displaying modal with message:", message);
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

// Hide modal if it exists
function closeModal() {
    console.log("closeModal - Removing modal from screen");
    const modal = document.getElementById("saveModal");
    if (modal) {
        modal.remove();
    }
}

// ───────────── VALIDATION ─────────────

// Check if all fields are untouched / empty
function validateJournal() {
    const sliderIds = ["depressionMania", "anxiety", "irritability", "energyLvl"];
    const slidersUnchanged = sliderIds.every(id => document.getElementById(id).value === "0");

    const checkboxes = [...document.querySelectorAll("input[type='checkbox']")];
    const checkboxesUnchecked = checkboxes.every(cb => !cb.checked);

    const notesEmpty = document.getElementById("notes").value.trim() === "";

    const messages = [];

    if (slidersUnchanged) messages.push("You haven't adjusted any mood sliders.");
    if (checkboxesUnchecked) messages.push("No symptoms or workout have been selected.");
    if (notesEmpty) messages.push("Notes section is empty.");

    return {
        valid: !(slidersUnchanged && checkboxesUnchecked && notesEmpty),
        messages
    };
}

// ───────────── CORE JOURNAL ACTIONS ─────────────

// Save the journal entry to localStorage
function saveJournalToLocalStorage(entry) {
    console.log("saveJournalToLocalStorage - Appending new journal entry");
    const existing = JSON.parse(localStorage.getItem("moodJournalEntries") || "[]");
    existing.push(entry);
    localStorage.setItem("moodJournalEntries", JSON.stringify(existing));
}

// Reset all fields back to default after submission
function resetForm() {
    console.log("resetForm - Resetting all inputs");
    document.querySelectorAll("input[type='range']").forEach(slider => slider.value = 0);
    document.getElementById("depressionManiaValue").textContent = "0";
    document.getElementById("anxietyValue").textContent = "0";
    document.getElementById("irritabilityValue").textContent = "0";
    document.getElementById("energyLvlValue").textContent = "0";

    document.querySelectorAll("input[type='checkbox']").forEach(checkbox => checkbox.checked = false);
    document.getElementById("notes").value = "";
}

// ───────────── ON PAGE LOAD ─────────────

document.addEventListener('DOMContentLoaded', function () {
    console.log("DOMContentLoaded - App initialized");
    initializeSliders();

    // Save button click handler
    document.querySelector('.save-button').addEventListener('click', function () {
        console.log("save-button - Clicked");
        const validation = validateJournal();

        // Prevent saving if all inputs are empty
        if (!validation.valid) {
            showModal(validation.messages.join("<br>"));
            return;
        }

        // Build new journal entry
        const date = new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });

        const journalEntry = {
            date,
            depressionMania: document.getElementById("depressionMania").value,
            anxiety: document.getElementById("anxiety").value,
            irritability: document.getElementById("irritability").value,
            energyLvl: document.getElementById("energyLvl").value,
            workout: document.getElementById("workout").checked,
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

        saveJournalToLocalStorage(journalEntry);
        showModal("Journal saved successfully!");
        resetForm();
    });
});

// ───────────── CSV EXPORTS ─────────────

// Export current entry only
document.getElementById("downloadCsv").addEventListener("click", function () {
    console.log("downloadCsv - Exporting current entry");

    const date = new Date().toISOString().split("T")[0];

    const sliders = {
        depressionMania: document.getElementById("depressionMania").value,
        anxiety: document.getElementById("anxiety").value,
        irritability: document.getElementById("irritability").value,
        energyLvl: document.getElementById("energyLvl").value,
    };

    const symptoms = [
        "Migraine Prodrome",
        "Bechets Flare",
        "Spotting",
        "Blank Pills",
        "Night Sweats",
        "Anomalous Event",
        "Migraine Headache"
    ];

    const symptomValues = {};
    symptoms.forEach(id => {
        const checked = document.getElementById(id).checked;
        symptomValues[id] = checked ? 1 : 0;
    });

    const notes = document.getElementById("notes").value.replace(/"/g, '""');

    const headers = [
        "Date", "Depression/Mania", "Anxiety", "Irritability", "Energy",
        ...symptoms, "Notes"
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

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.setAttribute("href", URL.createObjectURL(blob));
    link.setAttribute("download", `mood-journal-${date}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Export all entries as CSV
document.getElementById("downloadAllCsv").addEventListener("click", function () {
    console.log("downloadAllCsv - Exporting all saved entries");

    const entries = JSON.parse(localStorage.getItem("moodJournalEntries") || "[]");
    if (entries.length === 0) {
        console.warn("downloadAllCsv - No entries found");
        alert("No journal entries found.");
        return;
    }

    const headers = [
        "Date", "Depression/Mania", "Anxiety", "Irritability", "Energy",
        "Migraine Prodrome", "Bechets Flare", "Spotting", "Blank Pills",
        "Night Sweats", "Anomalous Event", "Migraine Headache", "Notes"
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
