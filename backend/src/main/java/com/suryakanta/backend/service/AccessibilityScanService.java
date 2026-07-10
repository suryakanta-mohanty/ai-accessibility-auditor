package com.suryakanta.backend.service;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class AccessibilityScanService {

    public List<String> findIssues(String url) {
        List<String> issues = new ArrayList<>();

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

        } catch (IOException exception) {
            issues.add("unable to access the website, Please check if the URL is reachable");
        }

        return issues;
    }

    private void checkPageTitle(Document document, List<String> issues) {
        if (document.title() == null || document.title().trim().isEmpty()) {
           issues.add("Page title is missing.");
        }
    }

    private void checkHtmlLang(Document document, List<String> issues) {
        Element html = document.selectFirst("html");

        if (html == null || html.attr("lang").trim().isEmpty()) {
            issues.add("HTML Lang attribute is missing.");
        }
    }

    private void checkImagesAltText(Document document, List<String> issues) {
        for (Element image : document.select("img")) {
            if(!image.hasAttr("alt")) {
                issues.add("Image is missing alt text.");
                return;
            }
        }
    }

    private void checkButtonsAccessibleText(Document document, List<String> issues) {
        for (Element button : document.select("button")) {
            boolean hasVisibleText = !button.text().trim().isEmpty();
            boolean hasAriaLabel = !button.attr("aria-label").trim().isEmpty();

            if (!hasVisibleText && !hasAriaLabel) {
                issues.add("Button without accessible text found");
                return;
            }
        }
    }

    private void checkLinksReadableText(Document document, List<String> issues) {
        for (Element link : document.select("a[href]")) {
            boolean hasVisibleText = !link.text().trim().isEmpty();
            boolean hasAriaLabel = !link.attr("aria-label").trim().isEmpty();

            if (!hasVisibleText && !hasAriaLabel) {
                issues.add("Link without readable text found");
                return;
            }
        }
    }

}
