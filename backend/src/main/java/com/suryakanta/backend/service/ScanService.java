package com.suryakanta.backend.service;

import com.suryakanta.backend.dto.ScanRequest;
import com.suryakanta.backend.dto.ScanResponse;
import com.suryakanta.backend.dto.ScanHistoryResponse;
import com.suryakanta.backend.entity.ScanResult;
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

        List<String> issues = accessibilityScanService.findIssues(request.getUrl());

        List<String> recommendations = generateRecommendations(issues);

        int totalIssues = issues.size();
        int score = Math.max(100 - (totalIssues * 10), 0);
        LocalDateTime scannedAt = LocalDateTime.now();

        ScanResult scanResult = new ScanResult(
                request.getUrl(),
                score,
                totalIssues,
                scannedAt
        );

        scanResultRepository.save(scanResult);

        return new ScanResponse(
                request.getUrl(),
                score,
                totalIssues,
                issues,
                recommendations,
                scannedAt
        );
    }

    private List<String> generateRecommendations(List<String> issues) {
        return issues.stream()
                .map(issue -> {
                    if (issue.toLowerCase().contains("image")) {
                       return "Add meaningful alt text to image so screen reader users can understand the visual content.";
                    }

                    if (issue.toLowerCase().contains("button")) {
                        return "Add visible text or an aria-label to buttons so assistive technologies can describe their purpose.";
                    }

                    if (issue.toLowerCase().contains("link")) {
                        return "Add readable link text or an aria-label so users understand where the link will take them.";
                    }

                    if (issue.toLowerCase().contains("title")) {
                        return "Add a clear page title so users and screen readers can identify the page purpose.";
                    }

                    if (issue.toLowerCase().contains("lang")) {
                        return "Add a lang attribute to the html tag so screen readers can use the correct pronunciation.";
                    }

                    return "Review this accessibility issue and update the HTML to follow WCAG accessibility best practices.";
                })
                .toList();
    }

    public List<ScanHistoryResponse> getAllScans(){
        return scanResultRepository.findAll()
                .stream()
                .map(scanResult -> new ScanHistoryResponse(
                        scanResult.getId(),
                        scanResult.getUrl(),
                        scanResult.getAccessibilityScore(),
                        scanResult.getTotalIssues(),
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
                        scanResult.getScannedAt()
                ))
                .toList();
    }
}
