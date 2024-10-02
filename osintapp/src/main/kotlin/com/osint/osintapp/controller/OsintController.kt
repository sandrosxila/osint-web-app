package com.osint.osintapp.controller

import com.osint.osintapp.service.OsintService
import com.osint.osintapp.model.ScanResult
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("osint")
class OsintController(private val osintService: OsintService) {


    @PostMapping("/scan")
    fun initiateScan(@RequestParam domain: String): Map<String, Any> {
        return osintService.initiateScan(domain)
    }

    @GetMapping("/get-scans")
    fun getScans(): ResponseEntity<List<Map<String, Any>>> {
        return ResponseEntity.ok(osintService.getScans())
    }
}
