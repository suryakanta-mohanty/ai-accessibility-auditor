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
    private int imageIssues;
    private int buttonIssues;
    private int linkIssues;
    private int pageIssues;
    private LocalDateTime scannedAt;

    public ScanResult(){
    }

    public ScanResult(
            String url,
            int accessibilityScore,
            int totalIssues,
            int imageIssues,
            int buttonIssues,
            int linkIssues,
            int pageIssues,
            LocalDateTime scannedAt
    ){
        this.url = url;
        this.accessibilityScore = accessibilityScore;
        this.totalIssues = totalIssues;
        this.imageIssues = imageIssues;
        this.buttonIssues = buttonIssues;
        this.linkIssues = linkIssues;
        this.pageIssues = pageIssues;
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

    public LocalDateTime getScannedAt(){
        return scannedAt;
    }
}
