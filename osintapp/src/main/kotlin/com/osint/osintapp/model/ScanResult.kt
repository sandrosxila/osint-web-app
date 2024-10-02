package com.osint.osintapp.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.time.LocalDateTime

@Entity
@Table(name = "scan_results")
data class ScanResult(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    @Column(name = "domain_name")
    val domain: String,
    val startTime: LocalDateTime,
    val endTime: LocalDateTime,
    @Column(name = "output_data", columnDefinition = "text")
    val output: String,
)