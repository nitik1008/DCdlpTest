/**
 * Custom JavaScript for Simulated DLP Detection
 *
 * IMPORTANT: This script is for DEMONSTRATION PURPOSES ONLY.
 * It does NOT interact with actual DLP systems and should NOT be used
 * for real-world security testing without proper authorization and understanding.
 * It's a client-side script and can be easily bypassed.
 *
 * This script attempts to find common patterns of sensitive data
 * within the text content of a web page and log them to the console.
 */

(function() {
    'use strict';

    // --- Configuration ---
    const SENSITIVE_PATTERNS = [
        {
            name: "Credit Card Number (Visa/Mastercard-like)",
            regex: /\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})\b/g, // Simplified regex
            description: "Looks for 13 or 16 digit numbers starting with 4 or 16 digit numbers starting with 51-55."
        },
        {
            name: "Email Address",
            regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
            description: "Standard email address format."
        },
        {
            name: "Indian Aadhaar Number (simplified)",
            regex: /\b\d{4}\s\d{4}\s\d{4}\b/g, // Looks for XXXX XXXX XXXX pattern
            description: "Aadhaar numbers are 12 digits, often formatted with spaces."
        },
        {
            name: "Phone Number (Indian-like)",
            regex: /\b(?:\+91[\-\s]?)?[6-9]\d{9}\b/g, // Starts with +91 or 6-9 followed by 9 digits
            description: "10-digit Indian mobile numbers, optionally with +91."
        },
        {
            name: "Confidential Keyword",
            regex: /\b(secret_project_alpha|customer_data_dump|internal_roadmap_2025)\b/gi,
            description: "Specific keywords that might indicate sensitive internal information."
        }
        // Add more patterns as needed
    ];

    const EXCLUDE_TAGS = ['script', 'style', 'noscript', 'meta', 'head', 'link']; // Tags to ignore content from

    // --- Core Logic ---

    function getAllTextContent() {
        let fullText = '';
        const body = document.body;
        if (body) {
            // Traverse the DOM to get visible text, excluding specific tags
            const walk = document.createTreeWalker(body, NodeFilter.SHOW_TEXT, null, false);
            let node;
            while ((node = walk.nextNode())) {
                // Check if parent element is in the exclusion list
                let parentElement = node.parentElement;
                let exclude = false;
                while (parentElement && parentElement !== document.body) {
                    if (EXCLUDE_TAGS.includes(parentElement.tagName.toLowerCase())) {
                        exclude = true;
                        break;
                    }
                    parentElement = parentElement.parentElement;
                }
                if (!exclude && node.textContent.trim().length > 0) {
                    fullText += node.textContent + '\n';
                }
            }
        }
        return fullText;
    }

    function runDLPScan() {
        console.log("--- Starting Simulated DLP Scan ---");
        const pageText = getAllTextContent();
        let detectedCount = 0;

        SENSITIVE_PATTERNS.forEach(pattern => {
            const matches = [...pageText.matchAll(pattern.regex)]; // Use matchAll to get all occurrences
            if (matches.length > 0) {
                console.warn(`[DLP Alert] Detected ${matches.length} instance(s) of "${pattern.name}"`);
                console.groupCollapsed(`Details for "${pattern.name}"`);
                matches.forEach((match, index) => {
                    console.log(`  Match ${index + 1}: "${match[0]}" (at index: ${match.index})`);
                    // Optionally, show context around the match
                    const contextStart = Math.max(0, match.index - 50);
                    const contextEnd = Math.min(pageText.length, match.index + match[0].length + 50);
                    const context = pageText.substring(contextStart, contextEnd).replace(/\n/g, ' ');
                    console.log(`  Context: "...${context}..."`);
                });
                console.groupEnd();
                detectedCount++;
            }
        });

        if (detectedCount === 0) {
            console.log("No sensitive patterns detected on this page.");
        }
        console.log("--- Simulated DLP Scan Complete ---");
    }

    // --- Execution ---
    // You can call runDLPScan() directly, or on a delay/event.
    // For demonstration, let's run it when the DOM is ready.
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runDLPScan);
    } else {
        runDLPScan();
    }

    // Expose the function globally for manual testing in browser console
    window.runDLPScan = runDLPScan;

})();