package com.suryakanta.backend.dto;

public class AccessibilityIssue {
    private IssueType type;
    private String message;
    private String element;
    private String recommendation;

    public AccessibilityIssue(
            IssueType type,
            String message,
            String element,
            String recommendation
    ) {
        this.type = type;
        this.message = message;
        this.element = element;
        this.recommendation = recommendation;
    }

    public IssueType getType(){
        return type;
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
