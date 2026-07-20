package com.suryakanta.backend.controller;

import com.suryakanta.backend.dto.ScanRequest;
import com.suryakanta.backend.dto.ScanResponse;
import com.suryakanta.backend.dto.ScanHistoryResponse;
import com.suryakanta.backend.dto.SavedScanReportResponse;
import com.suryakanta.backend.service.ScanService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/scan")
public class ScanController {

    private final ScanService scanService;

    public ScanController(ScanService scanService) {
        this.scanService = scanService;
    }

    @PostMapping
    public ScanResponse scanWebsite(@Valid @RequestBody ScanRequest request) {
        return scanService.scanWebsite(request);
    }

    @GetMapping("/history")
    public List<ScanHistoryResponse> getScanHistory() {
        return scanService.getAllScans();
    }

    @GetMapping("/history/recent")
    public List<ScanHistoryResponse> getRecentScanHistory() {
        return scanService.getRecentScans();
    }

    @GetMapping("/{id}")
    public SavedScanReportResponse getScanReportById(@PathVariable Long id){
        return scanService.getScanReportById(id);
    }

}
