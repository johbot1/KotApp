document.addEventListener("DOMContentLoaded", () => {
    const entries = JSON.parse(localStorage.getItem("moodJournalEntries") || "[]");
    if (entries.length === 0) {
        alert("No journal data to display.");
        return;
    }

    const labels = entries.map(entry => entry.date);
    const depressionData = entries.map(entry => Number(entry.depressionMania));
    const anxietyData = entries.map(entry => Number(entry.anxiety));
    const irritabilityData = entries.map(entry => Number(entry.irritability));
    const energyData = entries.map(entry => Number(entry.energyLvl));

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

    // Symptom frequency summary
    const symptomCounts = {};
    const symptomKeys = Object.keys(entries[0].symptoms);
    symptomKeys.forEach(key => symptomCounts[key] = 0);

    entries.forEach(entry => {
        symptomKeys.forEach(key => {
            if (entry.symptoms[key]) symptomCounts[key]++;
        });
    });

    const list = document.getElementById("symptomStats");
    symptomKeys.forEach(key => {
        const li = document.createElement("li");
        li.textContent = `${key}: ${symptomCounts[key]} times`;
        list.appendChild(li);
    });
});
