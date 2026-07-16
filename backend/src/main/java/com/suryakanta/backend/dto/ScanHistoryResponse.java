package com.suryakanta.backend.dto;

import java.time.LocalDateTime;

public class ScanHistoryResponse {

    private Long id;
    private String url;
    private int accessibilityScore;
    private int totalIssues;
    private int imageIssues;
    private int buttonIssues;
    private int linkIssues;
    private int pageIssues;
    private int formIssues;
    private LocalDateTime scannedAt;

    public ScanHistoryResponse(
            Long id,
            String url,
            int accessibilityScore,
            int totalIssues,
            int imageIssues,
            int buttonIssues,
            int linkIssues,
            int pageIssues,
            int formIssues,
            LocalDateTime scannedAt
    ){
        this.id = id;
        this.url = url;
        this.accessibilityScore = accessibilityScore;
        this.totalIssues = totalIssues;
        this.imageIssues = imageIssues;
        this.buttonIssues = buttonIssues;
        this.linkIssues = linkIssues;
        this.pageIssues = pageIssues;
        this.formIssues = formIssues;
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

    public int getImageIssues(){
        return imageIssues;
    }

    public int getButtonIssues(){
        return buttonIssues;
    }

    public int getLinkIssues(){
        return linkIssues;
    }

    public int getPageIssues(){
        return pageIssues;
    }

    public int getFormIssues() {
        return formIssues;
    }

    public LocalDateTime getScannedAt(){
        return scannedAt;
    }
}
