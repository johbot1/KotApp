// ───────────── MODAL FOR EMPTY DATA ─────────────

// Reusable modal to show messages and trigger callbacks (like redirects)
function showModal(message, callback) {
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
    modal.innerHTML = `<p>${message}</p><button id="modalOk">Return Home</button>`;
    document.body.appendChild(modal);

    document.getElementById("modalOk").addEventListener("click", () => {
        modal.remove();
        if (callback) callback(); // Redirect or custom logic
    });
}

// ───────────── PAGE LOGIC ─────────────

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded - Initializing mood statistics page");

    // Load journal entries from localStorage
    const entries = JSON.parse(localStorage.getItem("moodJournalEntries") || "[]");

    // If no data, inform user and redirect back home
    if (entries.length === 0) {
        console.warn("DOMContentLoaded - No journal entries found");
        showModal("No journal data found! Click to return home and create your first entry!", () => {
            window.location.href = "index.html";
        });
        return;
    }

    // Extract mood values from entries
    console.log("buildChartData - Parsing slider data from journal entries");
    const labels = entries.map(entry => entry.date);
    const depressionData = entries.map(entry => Number(entry.depressionMania));
    const anxietyData = entries.map(entry => Number(entry.anxiety));
    const irritabilityData = entries.map(entry => Number(entry.irritability));
    const energyData = entries.map(entry => Number(entry.energyLvl));

    // Render mood trend line chart using Chart.js
    console.log("renderChart - Drawing mood trend chart");
    const ctx = document.getElementById("moodChart").getContext("2d");
    new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Depression/Mania",
                    data: depressionData,
                    borderColor: "purple",
                    fill: false
                },
                {
                    label: "Anxiety",
                    data: anxietyData,
                    borderColor: "red",
                    fill: false
                },
                {
                    label: "Irritability",
                    data: irritabilityData,
                    borderColor: "orange",
                    fill: false
                },
                {
                    label: "Energy",
                    data: energyData,
                    borderColor: "green",
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    ticks: {
                        autoSkip: true,
                        maxRotation: 45,
                        minRotation: 30
                    }
                },
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        title: function (tooltipItems) {
                            return tooltipItems[0].label; // Use friendly formatted date
                        }
                    }
                }
            }
        }
    });

    // Tally how many times each symptom/workout was checked
    console.log("calculateSymptomCounts - Counting symptom frequency");
    const symptomCounts = {};
    const symptomKeys = [...Object.keys(entries[0].symptoms), "workout"];
    symptomKeys.forEach(key => symptomCounts[key] = 0);

    entries.forEach(entry => {
        symptomKeys.forEach(key => {
            if (key === "workout") {
                if (entry.workout) symptomCounts[key]++;
            } else {
                if (entry.symptoms[key]) symptomCounts[key]++;
            }
        });
    });

    // Display the symptom summary under the chart
    console.log("renderSymptomSummary - Populating symptom count list");
    const symptomLabels = {
        migraineProdrome: "Migraine Prodrome",
        bechetsFlare: "Bechets Flare",
        spotting: "Spotting / Bleeding",
        blankPills: "Blank Pills",
        nightSweats: "Night Sweats / Nightmares",
        anomalousEvent: "Anomalous Event",
        migraineHeadache: "Migraine Headache",
        workout: "Workouts"
    };

    const list = document.getElementById("symptomStats");
    symptomKeys.forEach(key => {
        const li = document.createElement("li");
        const label = symptomLabels[key] || key;
        li.textContent = `${label}: ${symptomCounts[key]} times`;
        list.appendChild(li);
    });

    console.log("DOMContentLoaded - Finished rendering statistics page");
});
