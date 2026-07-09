package com.suryakanta.backend.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "scan_results")
public class ScanResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String url;
    private int accessibilityScore;
    private int totalIssues;
    private LocalDateTime scannedAt;

    public ScanResult(){
    }

    public ScanResult(String url, int accessibilityScore, int totalIssues, LocalDateTime scannedAt){
        this.url = url;
        this.accessibilityScore = accessibilityScore;
        this.totalIssues = totalIssues;
        this.scannedAt = scannedAt;
    }

    public Long getId(){
        return id;
    }

    public String getUrl(){
        return url;
    }

    public int getAccessibilityScore(){
        return accessibilityScore;
    }

    public int getTotalIssues(){
        return totalIssues;
    }

    public LocalDateTime getScannedAt(){
        return scannedAt;
    }
}
