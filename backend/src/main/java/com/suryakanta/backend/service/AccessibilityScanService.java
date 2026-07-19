package com.suryakanta.backend.service;

import com.suryakanta.backend.dto.AccessibilityIssue;
import com.suryakanta.backend.dto.IssueType;
import com.suryakanta.backend.dto.IssueSeverity;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

@Service
public class AccessibilityScanService {

    public List<AccessibilityIssue> findIssues(String url) {
        List<AccessibilityIssue> issues = new ArrayList<>();

        try{
            Document document = Jsoup.connect(url)
                    .userAgent("Mozilla/5.0")
                    .timeout(10000)
                    .get();

            checkPageTitle(document, issues);
            checkHtmlLang(document, issues);
            checkImagesAltText(document, issues);
            checkButtonsAccessibleText(document, issues);
            checkLinksReadableText(document, issues);
            checkInputAccessibleLabels(document, issues);
            checkHeadingStructure(document, issues);
            checkIframeTitles(document, issues);
            checkMetaDescription(document, issues);
            checkPageLandmarks(document, issues);
            checkDuplicateIds(document, issues);

        } catch (IOException exception) {
            issues.add(new AccessibilityIssue(
                    IssueType.PAGE,
                    IssueSeverity.HIGH,
                    "Unable to access the website",
                    url,
                    "Check if the URL is reachable, publicly accessible, and not blocking automated requests."
            ));
        }

        return issues;
    }

    private void checkPageTitle(Document document, List<AccessibilityIssue> issues) {
        if (document.title() == null || document.title().trim().isEmpty()) {
           issues.add(new AccessibilityIssue(
                   IssueType.PAGE,
                   IssueSeverity.MEDIUM,
                   "Page title was not found in initial HTML",
                   "<title>",
                   "Add a clear <title> tag in the server-rendered HTML, or use a JavaScript-rendered scanner for dynamic pages."
           ));
        }
    }

    private void checkMetaDescription(Document document, List<AccessibilityIssue> issues){
        Element metaDescription = document.selectFirst("meta[name=description]");

        if(
                metaDescription == null
                || metaDescription.attr("content").trim().isEmpty()
        ) {
            issues.add(new AccessibilityIssue(
                    IssueType.PAGE,
                    IssueSeverity.LOW,
                    "Meta description was not found in initial HTML",
                    "<meta name=\"description\">",
                    "Add a meta description in the server-rendered HTML, or use a JavaScript-rendered scanner for dynamic pages."
            ));
        }
    }

    private void checkHtmlLang(Document document, List<AccessibilityIssue> issues) {
        Element html = document.selectFirst("html");

        if (html == null || html.attr("lang").trim().isEmpty()) {
            issues.add(new AccessibilityIssue(
                    IssueType.PAGE,
                    IssueSeverity.MEDIUM,
                    "HTML lang attribute is missing",
                    "<html>",
                    "Add a lang attribute to the html tag so screen readers can use the correct pronunciation."
            ));
        }
    }

    private void checkImagesAltText(Document document, List<AccessibilityIssue> issues) {
        for (Element image : document.select("img")) {
            String alt = image.attr("alt").trim();

            if (!image.hasAttr("alt") || alt.isEmpty()) {
                String imageSource = image.attr("src");

                if(imageSource.isBlank()) {
                    imageSource = "Image source is not available";
                }

                issues.add(new AccessibilityIssue(
                        IssueType.IMAGE,
                        IssueSeverity.MEDIUM,
                        "Image is missing alt text",
                        imageSource,
                        "Add meaningful alt text to images so screen reader users can understand the visual content."
                ));
            }
        }
    }

    private void checkButtonsAccessibleText(Document document, List<AccessibilityIssue> issues) {
        for (Element button : document.select("button")) {
            boolean hasVisibleText = !button.text().trim().isEmpty();
            boolean hasAriaLabel = !button.attr("aria-label").trim().isEmpty();

            if (!hasVisibleText && !hasAriaLabel) {
                String buttonHtml = button.outerHtml();

                if(buttonHtml.length() > 100) {
                    buttonHtml = buttonHtml.substring(0, 100) + "...";
                }

                issues.add(new AccessibilityIssue(
                        IssueType.BUTTON,
                        IssueSeverity.HIGH,
                        "Button without accessible text found",
                        buttonHtml,
                        "Add visible text or an aria-label to buttons so assistive technologies can describe their purpose."
                ));
            }
        }
    }

    private void checkLinksReadableText(Document document, List<AccessibilityIssue> issues) {
        for (Element link : document.select("a[href]")) {
            boolean hasVisibleText = !link.text().trim().isEmpty();
            boolean hasAriaLabel = !link.attr("aria-label").trim().isEmpty();

            if (!hasVisibleText && !hasAriaLabel) {
                String href = link.attr("href");

                if(href.isBlank()) {
                    href = "Link href is not available";
                }

                issues.add(new AccessibilityIssue(
                        IssueType.LINK,
                        IssueSeverity.HIGH,
                        "Link without readable text found",
                        href,
                        "Add readable link text or an aria-label so users understand where the link will take them."
                ));
            }
        }
    }

    private void checkInputAccessibleLabels(Document document, List<AccessibilityIssue> issues) {
        for (Element input : document.select("input, textarea, select")) {
            String inputType = input.attr("type").trim();

            if(
                    inputType.equalsIgnoreCase("hidden")
                    || inputType.equalsIgnoreCase("submit")
                    || inputType.equalsIgnoreCase("button")
                    || inputType.equalsIgnoreCase("reset")
            ) {
                continue;
            }

            boolean hasAriaLabel = !input.attr("aria-label").trim().isEmpty();
            boolean hasAriaLabelledBy = !input.attr("aria-labelledby").trim().isEmpty();
            boolean hasTitle = !input.attr("title").trim().isEmpty();

            String id = input.attr("id").trim();
            boolean hasLabelForId = !id.isEmpty()
                    && document.selectFirst("label[for=" + id + "]") != null;

            boolean hasParentLabel = input.parents().stream()
                    .anyMatch(parent -> parent.tagName().equalsIgnoreCase("label"));

            if(
                    !hasAriaLabel
                    && !hasAriaLabelledBy
                    && !hasTitle
                    && !hasLabelForId
                    && !hasParentLabel
            ) {
                String inputHtml = input.outerHtml();

                if(inputHtml.length() > 100){
                    inputHtml = inputHtml.substring(0, 100) + "...";
                }

                issues.add(new AccessibilityIssue(
                        IssueType.FORM,
                        IssueSeverity.HIGH,
                        "Input field is missing an accessible label",
                        inputHtml,
                        "Add a visible label, aria-label, aria-labelledby, or title so screen reader users understand the input purpose."
                ));
            }
        }
    }

    private void checkHeadingStructure(Document document, List<AccessibilityIssue> issues){
        List<Element> headings = document.select("h1, h2, h3, h4, h5, h6");

        long h1Count = headings.stream()
                .filter(heading -> heading.tagName().equalsIgnoreCase("h1"))
                .count();

        if(h1Count == 0){
            issues.add(new AccessibilityIssue(
                    IssueType.HEADING,
                    IssueSeverity.MEDIUM,
                    "Page is missing an h1 heading",
                    "<h1>",
                    "Add a clear h1 heading that describes the main purpose of the page."
            ));
        }

        if(h1Count > 1){
            issues.add(new AccessibilityIssue(
                    IssueType.HEADING,
                    IssueSeverity.MEDIUM,
                    "Page has multiple h1 headings",
                    "h1 count: " + h1Count,
                    "Use a single h1 for the main page title and use h2-h6 for sub-sections."
            ));
        }

        int previousLevel = 0;
        for(Element heading : headings){
            int currentLevel = Integer.parseInt(heading.tagName().substring(1));

            if(previousLevel != 0 && currentLevel > previousLevel + 1){
                String headingText = heading.text().trim();

                if(headingText.isBlank()){
                    headingText = heading.outerHtml();
                }

                if(headingText.length() > 100){
                    headingText = headingText.substring(0, 100) + "...";
                }

                issues.add(new AccessibilityIssue(
                        IssueType.HEADING,
                        IssueSeverity.LOW,
                        "Heading level is skipped",
                        heading.tagName() + ": " + headingText,
                        "Do not skip heading levels. Use headings in order, such as h1 followed by h2, then h3"
                ));
            }

            previousLevel = currentLevel;
        }
    }

    private void checkIframeTitles(Document document, List<AccessibilityIssue> issues){
        for(Element iframe: document.select("iframe")){
            boolean hasTitleAttribute = iframe.hasAttr("title");
            String title = iframe.attr("title");

            if(!hasTitleAttribute || title.isEmpty()){
                String iframeSource = iframe.attr("src");

                if(iframeSource.isBlank()){
                    iframeSource = "Iframe source is not available";
                }

                issues.add(new AccessibilityIssue(
                        IssueType.IFRAME,
                        IssueSeverity.MEDIUM,
                        "Iframe is missing a descriptive title",
                        iframeSource,
                        "Add a meaningful title attribute to the iframe so screen reader users understand its purpose."
                ));
            }
        }
    }

    private void checkPageLandmarks(Document document, List<AccessibilityIssue> issues){
        int mainCount = document.select("main, [role=main]").size();

        if(mainCount == 0){
            issues.add(new AccessibilityIssue(
                    IssueType.PAGE,
                    IssueSeverity.MEDIUM,
                    "Main landmark is missing",
                    "<main>",
                    "Add a main landmark using the <main> tag or role=\"main\" so screen reader users can quickly find the main content."
            ));
        }

        if(mainCount > 1){
            issues.add(new AccessibilityIssue(
                    IssueType.PAGE,
                    IssueSeverity.MEDIUM,
                    "Multiple main landmarks found",
                    "main count" + mainCount,
                    "Use only one main landmark per page to clearly identify the primary content area."
            ));

        }
    }

    private void checkDuplicateIds(Document document, List<AccessibilityIssue> issues){
        Map<String, Integer> idCounts = new HashMap<>();

        for (Element element : document.select("[id]")){
            String id = element.attr("id").trim();

            if(!id.isEmpty()){
                idCounts.put(id, idCounts.getOrDefault(id, 0) + 1);
            }
        }

        for(Map.Entry<String, Integer> entry : idCounts.entrySet()){
            String id = entry.getKey();
            int count = entry.getValue();

            if(count > 1){
                issues.add(new AccessibilityIssue(
                        IssueType.PAGE,
                        IssueSeverity.MEDIUM,
                        "Duplicate id attribute found",
                        "id=\"" + id + "\" appears " + count + " times",
                        "Use unique id values so labels, ARIA references, anchor links, and JavaScript behavior work correctly."
                ));
            }
        }
    }

}
