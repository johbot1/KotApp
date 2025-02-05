package com.example.kotap.controllers

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.ResponseBody
import java.nio.file.Files
import java.nio.file.Paths

/**
 * Controller responsible for serving the main HTML page.
 * The @Controller annotation tells Spring that this class will handle
 * web requests
 */
@Controller //Controllers handle web requests
@RequestMapping("/")// Maps this controller to handler requests at the root URL which is '/'
class HelloController {
    /**
     * Handles GET requests to the root URL '/'
     * Reads and returns the contents of 'index.html' from the 'static' folder.
     *
     * @return The HTML content of the file
     */
    @GetMapping // GetMapping maps the root URL, this case it's "/", to serve as the HTML file
    @ResponseBody  //Returns the raw HTML content instead of a view
    fun serveHtml(): String {
        val path = Paths.get("src/main/resources/static/index.html")//Path to the HTML file
        return Files.readString(path) // Reads the file contents and returns them as a string
    }
}
