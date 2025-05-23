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

## 2. Data Handling and CSV Output ✅

* **2.1 Frontend Data Modeling:** ✅
    * Define a consistent JSON structure for mood journal entries: ✅
      * Includes date, slider values, symptom checkboxes, and notes ✅
      * Stored in localStorage under moodJournalEntries ✅
* **2.2 CSV Export (Client-Side):** ✅
    * Implement CSV export for: ✅
      * A single journal entry (Download CSV) ✅
      * All saved entries (Download All Entries) ✅
    * Format exported CSVs for compatibility with tools like Excel (row headers, clean quoting) ✅
* **2.3 Data Persistence:** ✅
    * Save all entries to localStorage as a growing JSON array ✅
    * Ensure new submissions are appended without overwriting ✅
    * Provide fallback for long-term backup (via manual CSV download) ✅

## 3. Local Testing and Refinement ✅

* **3.1 Unit and Integration Testing:** ✅
    * Write unit tests for data parsing, CSV generation, and data aggregation. ✅
    * Test the API endpoints. ✅
    * Test the javascript graphing functionality. ✅
* **3.2 Local Execution and Iteration:** ✅
    * Test the application locally by running the Ktor server. ✅
    * Refine the user interface and data visualization based on local testing. ✅ 
    * Verify CSV file integrity after multiple entries. ✅
* **3.3 Error Handling and Local File Management** ✅
    * Add better error handling for file reading and writing. ✅
    * Ensure that the application can handle downloading CSV files. ✅

## 4. Feedback 

* Label the number lines on the sliders ✅
* Modal for the Save confirmation ✅
* Save as ~~JSON files~~ or CSV file ✅
* Clear out notes once saved/ Reset the sliders and everything ✅
* Secondary page to LOOK at the saved data ✅
* Dates/ Notes be in "" in CSV ✅
* Fix "DownloadCSV" Button [REMOVED] ✅
