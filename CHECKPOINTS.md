# Kotlin Web App Development Checkpoints: Local Mood Journal

## 1. Project Setup and Basic Structure

* **1.1 Project Initialization:**
    * Initialize a new Kotlin project using Gradle or Maven.
    * Choose a web framework (e.g., Ktor with kotlinx-html for simple UI).
    * Set up the project structure with appropriate directories (e.g., `src/main/kotlin`, `src/test/kotlin`, `resources/static`).
* **1.2 Basic HTML Structure and Form:**
    * Create a basic HTML page with the mood journal form:
        * Four sliders (one -10 to 10, two 0 to 10, one 0 to 5).
        * Five checkboxes with symptom labels.
        * A text area for notes.
        * A "Save" button.
    * Set up basic routing in Ktor to serve the HTML page.
* **1.3 Basic Input Handling:**
    * Implement Ktor routes to handle form submissions.
    * Parse the form data from the request.
    * Add logging for form data.

## 2. Data Handling and CSV Output

* **2.1 Data Model Definition:**
    * Create a Kotlin data class to represent the mood journal entry.
    * Include fields for slider values, checkbox states, and notes.
* **2.2 CSV Generation:**
    * Implement a function to convert the mood journal data class to a CSV row.
    * Implement functionality to save the csv data to a local file.
    * Handle file creation and appending.
* **2.3 Data Persistence:**
    * Implement a service that handles saving the form data to a CSV file.
    * Ensure each submission is appended to the CSV.

## 3. Data Retrieval and Graphing

* **3.1 CSV Data Parsing:**
    * Implement a function to read and parse the CSV file into a list of mood journal data objects.
    * Handle potential errors during file reading and parsing.
* **3.2 Data Aggregation:**
    * Aggregate the data for the line graph (e.g., average mood over time).
    * Provide functionality to filter the data.
* **3.3 Graphing Library Integration:**
    * Choose a JavaScript graphing library (e.g., Chart.js, Plotly.js).
    * Include the library in the HTML page.
    * Create a Ktor endpoint to provide the aggregated data as JSON.
    * Use Javascript to fetch JSON data, and render the graph.
* **3.4 Displaying the Graph:**
    * Create a canvas element in the HTML page to display the graph.
    * Use JavaScript to render the line graph using the parsed data.

## 4. Local Testing and Refinement

* **4.1 Unit and Integration Testing:**
    * Write unit tests for data parsing, CSV generation, and data aggregation.
    * Test the API endpoints.
    * Test the javascript graphing functionality.
* **4.2 Local Execution and Iteration:**
    * Test the application locally by running the Ktor server.
    * Refine the user interface and data visualization based on local testing.
    * Verify CSV file integrity after multiple entries.
* **4.3 Error Handling and Local File Management**
    * Add better error handling for file reading and writing.
    * Ensure that the application can handle missing CSV files.

## 5. Feedback

* (Empty until project is turned in)