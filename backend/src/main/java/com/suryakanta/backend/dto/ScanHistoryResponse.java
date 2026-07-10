package com.suryakanta.backend.dto;

import java.time.LocalDateTime;

public class ScanHistoryResponse {

    private Long id;
    private String url;
    private int accessibilityScore;
    private int totalIssues;
    private LocalDateTime scannedAt;

    public ScanHistoryResponse(
            Long id,
            String url,
            int accessibilityScore,
            int totalIssues,
            LocalDateTime scannedAt
    ){
        this.id = id;
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
