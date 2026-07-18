package com.suryakanta.backend.dto;

public class AccessibilityIssue {
    private IssueType type;
    private IssueSeverity severity;
    private String message;
    private String element;
    private String recommendation;

    public AccessibilityIssue(
            IssueType type,
            IssueSeverity severity,
            String message,
            String element,
            String recommendation
    ) {
        this.type = type;
        this.severity = severity;
        this.message = message;
        this.element = element;
        this.recommendation = recommendation;
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
}
