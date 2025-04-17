function showModal(message, callback) {
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
        if (callback) callback(); // Run redirect or close logic
    });
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded - Initializing mood statistics page");

    // Load journal entries from localStorage or fallback to empty array
    const entries = JSON.parse(localStorage.getItem("moodJournalEntries") || "[]");

    if (entries.length === 0) {
        console.warn("DOMContentLoaded - No journal entries found");
        showModal("No journal data found! Click to return home and create your first entry!", () => {
            window.location.href = "index.html";
        });
        return;
    }

    console.log("buildChartData - Parsing slider data from journal entries");

    // Extract slider values per entry to use in line chart
    const labels = entries.map(entry => entry.date);
    const depressionData = entries.map(entry => Number(entry.depressionMania));
    const anxietyData = entries.map(entry => Number(entry.anxiety));
    const irritabilityData = entries.map(entry => Number(entry.irritability));
    const energyData = entries.map(entry => Number(entry.energyLvl));

    console.log("renderChart - Drawing mood trend chart");

    // Render mood trend line chart using Chart.js
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
                            // Use formatted date directly
                            return tooltipItems[0].label;
                        }
                    }
                }
            }
        }

    });

    console.log("calculateSymptomCounts - Counting symptom frequency");

    // Tally how often each symptom appeared across entries
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

    console.log("renderSymptomSummary - Populating symptom count list");

    // Populate the symptom summary list on the page
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
