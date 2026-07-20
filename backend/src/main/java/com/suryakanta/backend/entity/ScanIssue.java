package com.suryakanta.backend.entity;

import com.suryakanta.backend.dto.IssueType;
import com.suryakanta.backend.dto.IssueSeverity;
import jakarta.persistence.*;

@Entity
@Table(name= "scan_issues")
public class ScanIssue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private IssueType type;

    @Enumerated(EnumType.STRING)
    private IssueSeverity severity;

    @Column(length= 1000)
    private String message;

    @Column(length= 2000)
    private String element;

    @Column(length = 2000)
    private String recommendation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "scan_result_id")
    private ScanResult scanResult;

    public ScanIssue(){}

    public ScanIssue(
            IssueType type,
            IssueSeverity severity,
            String message,
            String element,
            String recommendation,
            ScanResult scanResult
    ){
        this.type = type;
        this.severity = severity;
        this.message = message;
        this.element = element;
        this.recommendation = recommendation;
        this.scanResult = scanResult;
    }

    public Long getId(){
        return id;
    }

    public IssueType getType(){
        return type;
    }

    public IssueSeverity getSeverity(){
        return severity;
    }

    public String getMessage(){
        return message;
    }

    public String getElement(){
        return element;
    }

    public String getRecommendation(){
        return recommendation;
    }

    public ScanResult getScanResult(){
        return scanResult;
    }
}
