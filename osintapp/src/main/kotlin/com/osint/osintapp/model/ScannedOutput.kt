package com.osint.osintapp.model
import kotlinx.serialization.*

@Serializable
data class ScannedOutput (
    val emails: List<String>? = listOf(),
    val hosts: List<String>? = listOf(),
    val shodan: List<String>? = listOf(),
)