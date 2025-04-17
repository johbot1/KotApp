document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded - Initializing mood statistics page");

    // Load journal entries from localStorage or fallback to empty array
    const entries = JSON.parse(localStorage.getItem("moodJournalEntries") || "[]");

    if (entries.length === 0) {
        console.warn("DOMContentLoaded - No journal entries found");
        alert("No journal data to display.");
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
                y: { beginAtZero: true }
            }
        }
    });

    console.log("calculateSymptomCounts - Counting symptom frequency");

    // Tally how often each symptom appeared across entries
    const symptomCounts = {};
    const symptomKeys = Object.keys(entries[0].symptoms);
    symptomKeys.forEach(key => symptomCounts[key] = 0);

    entries.forEach(entry => {
        symptomKeys.forEach(key => {
            if (entry.symptoms[key]) symptomCounts[key]++;
        });
    });

    console.log("renderSymptomSummary - Populating symptom count list");

    // Populate the symptom summary list on the page
    const symptomLabels = {
        migraineProdrome: "Migraine Prodrome",
        bechetsFlare: "Bechets Flare",
        spotting: "Spotting",
        blankPills: "Blank Pills",
        nightSweats: "Night Sweats / Nightmares",
        anomalousEvent: "Anomalous Event",
        migraineHeadache: "Migraine Headache"
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
