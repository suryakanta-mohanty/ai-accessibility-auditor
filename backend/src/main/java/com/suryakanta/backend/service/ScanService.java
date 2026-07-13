package com.suryakanta.backend.service;

import com.suryakanta.backend.dto.AccessibilityIssue;
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

        List<AccessibilityIssue> issues = accessibilityScanService.findIssues(request.getUrl());

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
