package com.osint.osintapp.repository

import com.osint.osintapp.model.ScanResult
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface ScanResultRepository : JpaRepository<ScanResult, Long> {
    fun findAllByOrderByStartTimeDesc(): List<ScanResult>

    @Query("SELECT s FROM ScanResult s ORDER BY s.startTime DESC LIMIT :limit")
    fun findAllByOrderByStartTimeDescWithLimit(@Param("limit") limit: Int): List<ScanResult>
}
