# Kotlin Web App Development Checkpoints: Local Mood Journal

## 1. Project Setup and Basic Structure ✅

* **1.1 Project Initialization:** ✅
    * Initialize a new Kotlin project using Gradle  ✅
    * Choose a web framework (Chose SpringBoot). ✅
    * Set up the project structure with appropriate directories (e.g., `src/main/kotlin`, `src/test/kotlin`, `resources/static`). ✅
* **1.2 Basic HTML Structure and Form:** ✅
    * Create a basic HTML page with the mood journal form: ✅
        * Four sliders (one -10 to 10, two 0 to 10, one 0 to 5). ✅
        * Five checkboxes with symptom labels. ✅
        * A text area for notes. ✅ 
        * A "Save" button. ✅
    * Set up basic routing in Ktor to serve the HTML page. ✅
* **1.3 Basic Input Handling:** ✅
    * Implement ~~Ktor~~ SpringBoot routes to handle form submissions. ✅
    * Parse the form data from the request. ✅
    * Add logging for form data. ✅

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

* Label the number lines on the sliders ✅
* Modal for the Save confirmation ✅
* Save as JSON files or CSV file
* Clear out notes once saved/ Reset the sliders and everything ✅
* Secondary page to LOOK at the saved data
