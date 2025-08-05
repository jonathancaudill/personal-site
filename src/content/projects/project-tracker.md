---
title: "Project Tracker"
rank: 3
description: "Simple, elegant project status tracker built in Google Sheets with a JavaScript backend"
technologies: Spreadsheets, JavaScript
image: "/project-tracker.webp"
liveUrl: "https://docs.google.com/spreadsheets/d/14G4AzSpWBNKqqCD6XiVS3HtbTq3pjkh8ECfH0nHlG7o/edit?usp=sharing"
---

This project is based on an assignment to make a simple, automated solution for project tracking. My goal was to create something with as high a level of automation and ease as possible, while keeping _everything_ in Google Sheets. I wanted more functionality than is typically available with stacked formulas, and when I learned about Google Apps Script, it seemed like a great solution. I hadn't done much coding prior to this project (the code is a little messy!), but I learned JavaScript on the fly and figured it out. I'm pretty proud of how it turned out, considering it's all within Google Sheets.

## Key Features

*   **Project Wizard:** A simple input form for creating, populating, and updating project details, statuses and assignments.
*   **Heavy Automation:** Nearly all views in the tracker are auto-pulled from a few key sheets, the details of which can be edited via the project wizard, effectively eliminating the need for most users to mess around with massive sheets.
*   **Design:** It's barebones, but readable and pleasant to use.

## Methodology

The tracker runs on the combined power of lots of very long excel formulas that correctly pull and sort data automatically, and a JavaScript backend to enable the project tracker!