package com.suryakanta.backend.service;

import com.suryakanta.backend.dto.ScanRequest;
import com.suryakanta.backend.dto.ScanResponse;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ScanService {

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

        return new ScanResponse(
                request.getUrl(),
                82,
                issues.size(),
                issues,
                recommendations,
                LocalDateTime.now()
        );
    }
}
