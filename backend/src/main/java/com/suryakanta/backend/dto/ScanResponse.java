package com.suryakanta.backend.dto;

import java.time.LocalDateTime;
import java.util.List;

public class ScanResponse {
    private String url;
    private int accessibilityScore;
    private int totalIssues;
    private List<AccessibilityIssue> issues;
    private LocalDateTime scannedAt;

    public ScanResponse(
            String url,
            int accessibilityScore,
            int totalIssues,
            List<AccessibilityIssue> issues,
            LocalDateTime scannedAt
    ){
        this.url = url;
        this.accessibilityScore = accessibilityScore;
        this.totalIssues = totalIssues;
        this.issues = issues;
        this.scannedAt = scannedAt;
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

    public List<AccessibilityIssue> getIssues(){
        return issues;
    }

    public LocalDateTime getScannedAt(){
        return scannedAt;
    }
}