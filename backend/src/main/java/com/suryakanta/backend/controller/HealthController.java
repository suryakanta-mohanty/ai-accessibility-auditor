package com.suryakanta.backend.controller;

import com.suryakanta.backend.dto.HealthResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/api/health")
    public HealthResponse healthCheck() {
        return new HealthResponse(
                "UP",
                "Backend running 🚀"
        );
    }
}