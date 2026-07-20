package com.suryakanta.backend.dto;

import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class SavedScanReportResponse {

    private Long id;
    private String url;
    private int accessibilityScore;
    private int totalIssues;

    private int imageIssues;
    private int buttonIssues;
    private int linkIssues;
    private int pageIssues;
    private int formIssues;
    private int headingIssues;
    private int iframeIssues;

    private List<AccessibilityIssue> issues;
    private LocalDateTime scannedAt;

    public SavedScanReportResponse(
            Long id,
            String url,
            int accessibilityScore,
            int totalIssues,
            int imageIssues,
            int buttonIssues,
            int linkIssues,
            int pageIssues,
            int formIssues,
            int headingIssues,
            int iframeIssues,
            List<AccessibilityIssue> issues,
            LocalDateTime scannedAt
    ) {
        this.id = id;
        this.url = url;
        this.accessibilityScore = accessibilityScore;
        this.totalIssues = totalIssues;
        this.imageIssues = imageIssues;
        this.buttonIssues = buttonIssues;
        this.linkIssues = linkIssues;
        this.pageIssues = pageIssues;
        this.formIssues = formIssues;
        this.headingIssues = headingIssues;
        this.iframeIssues = iframeIssues;
        this.issues = issues;
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

    public int getFormIssues(){
        return formIssues;
    }

    public int getHeadingIssues(){
        return headingIssues;
    }

    public int getIframeIssues(){
        return iframeIssues;
    }

    public List<AccessibilityIssue> getIssues(){
        return issues;
    }

    public LocalDateTime getScannedAt(){
        return scannedAt;
    }

}
