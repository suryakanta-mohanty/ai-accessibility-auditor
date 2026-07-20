package com.suryakanta.backend.service;

import com.suryakanta.backend.dto.AccessibilityIssue;
import com.suryakanta.backend.dto.ScanRequest;
import com.suryakanta.backend.dto.ScanResponse;
import com.suryakanta.backend.dto.ScanHistoryResponse;
import com.suryakanta.backend.dto.IssueType;
import com.suryakanta.backend.dto.SavedScanReportResponse;
import com.suryakanta.backend.entity.ScanResult;
import com.suryakanta.backend.entity.ScanIssue;
import com.suryakanta.backend.repository.ScanResultRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ScanService {

    private final ScanResultRepository scanResultRepository;
    private final AccessibilityScanService accessibilityScanService;

    public ScanService(
            ScanResultRepository scanResultRepository,
            AccessibilityScanService accessibilityScanService
    ){
        this.scanResultRepository = scanResultRepository;
        this.accessibilityScanService = accessibilityScanService;
    }

    public ScanResponse scanWebsite(ScanRequest request){

        List<AccessibilityIssue> issues = accessibilityScanService.findIssues(request.getUrl());

        int totalIssues = issues.size();
        boolean websiteAccessFailed = issues.stream()
                .anyMatch(issue -> issue.getMessage().equals("Unable to access the website"));

        int imageIssues = countIssuesByType(issues, IssueType.IMAGE);
        int buttonIssues = countIssuesByType(issues, IssueType.BUTTON);
        int linkIssues = countIssuesByType(issues, IssueType.LINK);
        int pageIssues = countIssuesByType(issues, IssueType.PAGE);
        int formIssues = countIssuesByType(issues, IssueType.FORM);
        int headingIssues = countIssuesByType(issues, IssueType.HEADING);
        int iframeIssues = countIssuesByType(issues, IssueType.IFRAME);

        int penalty = calculatePenalty(issues);

        int score = websiteAccessFailed
                ? 0
                : Math.max(100 - penalty, 0);
        LocalDateTime scannedAt = LocalDateTime.now();

        ScanResult scanResult = new ScanResult(
                request.getUrl(),
                score,
                totalIssues,
                imageIssues,
                buttonIssues,
                linkIssues,
                pageIssues,
                formIssues,
                headingIssues,
                iframeIssues,
                scannedAt
        );

        for(AccessibilityIssue issue : issues){
            ScanIssue scanIssue = new ScanIssue(
                    issue.getType(),
                    issue.getSeverity(),
                    issue.getMessage(),
                    issue.getElement(),
                    issue.getRecommendation(),
                    scanResult
            );

            scanResult.addIssue(scanIssue);
        }

        scanResultRepository.save(scanResult);

        return new ScanResponse(
                request.getUrl(),
                score,
                totalIssues,
                issues,
                scannedAt
        );
    }

    public List<ScanHistoryResponse> getAllScans(){
        return scanResultRepository.findAll()
                .stream()
                .map(scanResult -> new ScanHistoryResponse(
                        scanResult.getId(),
                        scanResult.getUrl(),
                        scanResult.getAccessibilityScore(),
                        scanResult.getTotalIssues(),
                        scanResult.getImageIssues(),
                        scanResult.getButtonIssues(),
                        scanResult.getLinkIssues(),
                        scanResult.getPageIssues(),
                        scanResult.getFormIssues(),
                        scanResult.getHeadingIssues(),
                        scanResult.getIframeIssues(),
                        scanResult.getScannedAt()
                ))
                .toList();
    }

    public List<ScanHistoryResponse> getRecentScans() {
        return scanResultRepository.findTop3ByOrderByScannedAtDesc()
                .stream()
                .map(scanResult -> new ScanHistoryResponse(
                        scanResult.getId(),
                        scanResult.getUrl(),
                        scanResult.getAccessibilityScore(),
                        scanResult.getTotalIssues(),
                        scanResult.getImageIssues(),
                        scanResult.getButtonIssues(),
                        scanResult.getLinkIssues(),
                        scanResult.getPageIssues(),
                        scanResult.getFormIssues(),
                        scanResult.getHeadingIssues(),
                        scanResult.getIframeIssues(),
                        scanResult.getScannedAt()
                ))
                .toList();
    }

    private int countIssuesByType(List<AccessibilityIssue> issues, IssueType issueType){
        return (int) issues.stream()
                .filter(issue -> issue.getType() == issueType)
                .count();
    }

    private int calculatePenalty(List<AccessibilityIssue> issues){
        return issues.stream()
                .mapToInt(issue -> switch(issue.getSeverity()){
                    case HIGH -> 15;
                    case MEDIUM -> 10;
                    case LOW -> 5;
                })
                .sum();
    }

    public SavedScanReportResponse getScanReportById(Long id) {
        ScanResult scanResult = scanResultRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Scan report not found"));

        List<AccessibilityIssue> issues = scanResult.getIssues()
                .stream()
                .map(issue -> new AccessibilityIssue(
                        issue.getType(),
                        issue.getSeverity(),
                        issue.getMessage(),
                        issue.getElement(),
                        issue.getRecommendation()
                ))
                .toList();

        return new SavedScanReportResponse(
                scanResult.getId(),
                scanResult.getUrl(),
                scanResult.getAccessibilityScore(),
                scanResult.getTotalIssues(),
                scanResult.getImageIssues(),
                scanResult.getButtonIssues(),
                scanResult.getLinkIssues(),
                scanResult.getPageIssues(),
                scanResult.getFormIssues(),
                scanResult.getHeadingIssues(),
                scanResult.getIframeIssues(),
                issues,
                scanResult.getScannedAt()
        );
    }
}
