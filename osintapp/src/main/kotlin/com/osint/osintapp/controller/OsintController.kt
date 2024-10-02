package com.osint.osintapp.controller

import com.osint.osintapp.dto.InitScan
import com.osint.osintapp.service.OsintService
import com.osint.osintapp.model.ScanResult
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("osint")
class OsintController(private val osintService: OsintService) {

    @PostMapping("/scan")
    fun initiateScan(@RequestBody initScan: InitScan): Map<String, Any> {
        return osintService.initiateScan(initScan.domain)
    }

    @GetMapping("/scans")
    fun getScans(): ResponseEntity<List<Map<String, Any>>> {
        return ResponseEntity.ok(osintService.getScans())
    }

    @GetMapping("/scans/{id}")
    fun getScan(@PathVariable id: Long): ResponseEntity<Map<String, Any>> {
        val data = try {
            osintService.getScan(id)
        }
        catch (e: Exception) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null)
        }

        return ResponseEntity.ok(data)
    }
}
