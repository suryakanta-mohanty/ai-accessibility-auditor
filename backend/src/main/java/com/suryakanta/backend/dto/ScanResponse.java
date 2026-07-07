package com.suryakanta.backend.dto;

import java.time.LocalDateTime;
import java.util.List;

public class ScanResponse {

    private String url;
    private int accessibilityScore;
    private int totalIssues;
    private List<String> issues;
    private List<String> recommendations;
    private LocalDateTime scannedAt;

    public ScanResponse(
            String url,
            int accessibilityScore,
            int totalIssues,
            List<String> issues,
            List<String> recommendations,
            LocalDateTime scannedAt
    ) {
        this.url = url;
        this.accessibilityScore = accessibilityScore;
        this.totalIssues = totalIssues;
        this.issues = issues;
        this.recommendations = recommendations;
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

    public List<String> getIssues(){
        return issues;
    }

    public List<String> getRecommendations(){
        return recommendations;
    }

    public LocalDateTime getScannedAt(){
        return scannedAt;
    }
}
