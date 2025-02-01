package com.example.kotapp

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class KotAppApplication

fun main(args: Array<String>) {
	runApplication<KotAppApplication>(*args)
}
