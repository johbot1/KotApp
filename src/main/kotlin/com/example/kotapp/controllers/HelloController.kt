package com.example.kotap.controllers

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.stereotype.Controller

/**
 * Controller responsible for serving the main HTML page.
 * The @Controller annotation tells Spring that this class will handle
 * web requests
 */
@Controller //Controllers handle web requests
class HelloController {
    /**
     * Handles GET requests to the root URL '/'
     * Reads and returns the contents of 'index.html' from the 'static' folder.
     *
     * @return The HTML content of the file
     */
    @GetMapping("/") // GetMapping maps the root URL, this case it's "/", to serve as the HTML file
    fun home(): String {
        return "index.html" // Reads the file contents and returns them as a string
    }
}
