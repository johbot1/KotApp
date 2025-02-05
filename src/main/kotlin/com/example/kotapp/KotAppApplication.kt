package com.example.kotapp

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

/**
 * Main entry point for the Spring Boot application
 * The @SpringBootApplication annotation enables auto-config,
 * component scanning, and other Spring Boot Features.
 */
@SpringBootApplication
class KotAppApplication

/**
 * The main funciton starts the Spring Boot application.
 * runApplicaiton<>(*args) is a kotlin friendly way to start the app.
 */
fun main(args: Array<String>) {
	runApplication<KotAppApplication>(*args)
}
