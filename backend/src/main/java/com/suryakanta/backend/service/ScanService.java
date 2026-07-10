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

    public ScanService(ScanResultRepository scanResultRepository){
        this.scanResultRepository = scanResultRepository;
    }

    public ScanResponse scanWebsite(ScanRequest request){
        List<String> issues = List.of(
                "Missing alt text on images",
                "Low color contrast detected",
                "Button without accessible label"
        );

        List<String> recommendations = List.of(
                "Add descriptive alt attributes to all meaningful images",
                "Improve text and background color contrast to meet WCAG standards",
                "Add aria-label or visible text to icon-only buttons"
        );

        int score = 82;
        int totalIssues = issues.size();
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
