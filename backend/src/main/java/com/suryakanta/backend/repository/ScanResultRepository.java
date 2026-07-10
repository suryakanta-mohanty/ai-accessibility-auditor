package com.suryakanta.backend.repository;

import com.suryakanta.backend.entity.ScanResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScanResultRepository extends JpaRepository<ScanResult, Long> {

    List<ScanResult> findTop3ByOrderByScannedAtDesc();

}
