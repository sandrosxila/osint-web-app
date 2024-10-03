package com.osint.osintapp.service

import com.osint.osintapp.model.ScanResult
import com.osint.osintapp.model.ScannedOutput
import com.osint.osintapp.repository.ScanResultRepository
import org.springframework.stereotype.Service
import java.io.File
import java.time.LocalDateTime
import kotlinx.serialization.json.Json
import org.springframework.beans.factory.annotation.Autowired


@Service
class OsintService {
    @Autowired
    lateinit var scanResultRepository: ScanResultRepository

    // Method to initiate theHarvester scan
    fun initiateScan(domain: String): Map<String, Any> {
        // Record the start time
        val startTime = LocalDateTime.now()

        // Specify the output file path
        val outputFilePath = "./output/result.json" // Change this to your desired path

        // Command to run theHarvester
        val command = listOf(
            "./venv/bin/python3",
            "./theHarvester.py",
            "-d", domain,
            "-b", "bing,baidu,duckduckgo",
            "-f", outputFilePath
        )

        val output = StringBuilder()

        try {
            val process = ProcessBuilder(command)
                .directory(File("/app/theHarvester")) // Set the working directory
                .redirectErrorStream(true) // Redirect error stream to output
                .start()

            val exitCode = process.waitFor()
            println("Process exited with code: $exitCode")


            val jsonString = readFile("./theHarvester/output/result.json")

            output.append(jsonString)

            // Check exit code
            if (exitCode != 0) {
                throw RuntimeException("theHarvester failed with exit code: $exitCode")
            }
        } catch (e: Exception) {
            e.printStackTrace()
            output.append("Error: ${e.message}")
        }

        // Record the end time
        val endTime = LocalDateTime.now()

        // Return a ScanResult object
        val res = ScanResult(domain = domain, startTime = startTime, endTime = endTime, output = output.toString())

        scanResultRepository.save(res)

        return mapOf(
            "domain" to res.domain,
            "startTime" to res.startTime.toString(),
            "endTime" to res.endTime.toString(),
            "output" to getOutput(res.output),
        )
    }

    fun readFile(filePath: String): String {
        return try {
            File(filePath).readText() // Attempt to read the file
        } catch (e: Exception) {
            "Error reading file: ${e.message}" // Return error message
        }
    }

    fun getOutput(output: String): Any {
        return try {
            Json.decodeFromString(ScannedOutput.serializer(), output) // Try to deserialize the output to OutputData
        } catch (e: Exception) {
            println("Error decoding JSON: ${e.message}") // Log the error message
            output // Return the raw output as fallback
        }
    }

    fun getScans(limit: Int? = null): List<Map<String, Any>> {
        if (limit != null) {
            return scanResultRepository.findAllByOrderByStartTimeDescWithLimit(limit)
                .map { scan ->
                    mapOf(
                        "domain" to scan.domain,
                        "startTime" to scan.startTime.toString(),
                        "endTime" to scan.endTime.toString(),
                        "output" to getOutput(scan.output),
                    )
                }
        }

        return scanResultRepository.findAllByOrderByStartTimeDesc()
            .map { scan ->
                mapOf(
                    "domain" to scan.domain,
                    "startTime" to scan.startTime.toString(),
                    "endTime" to scan.endTime.toString(),
                    "output" to getOutput(scan.output),
                )
            }
    }

    fun getScan(id: Long): Map<String, Any> {
        val scan = scanResultRepository.findById(id).orElseThrow();

        return mapOf(
            "domain" to scan.domain,
            "startTime" to scan.startTime.toString(),
            "endTime" to scan.endTime.toString(),
            "output" to getOutput(scan.output),
        )
    }
}
