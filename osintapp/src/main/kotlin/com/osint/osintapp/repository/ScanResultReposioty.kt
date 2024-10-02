package com.osint.osintapp.repository

import com.osint.osintapp.model.ScanResult
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ScanResultRepository : JpaRepository<ScanResult, Long>
