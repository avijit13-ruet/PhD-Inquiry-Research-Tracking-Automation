# PhD Outreach & Research Tracking Automation

A robust automation system built with **Google Apps Script** and **Gmail API** to streamline high-stakes academic outreach. This tool manages personalized communication with PhD supervisors while ensuring zero redundancy through smart reply detection.

## 🌟 The Problem
Academic outreach requires high precision—sending emails at the right local time, attaching the correct manuscripts, and following up without being intrusive. Manual tracking in spreadsheets is prone to human error, such as following up with a professor who has already replied.

## 🚀 Key Features
- **Time-Zone Optimized Scheduling**: Sends emails at a predefined local time (e.g., 9:00 AM) to maximize visibility in the recipient's inbox.
- **Automated Research Integration**: Dynamically attaches a CV and Research Draft (e.g., PMMA Pyrolysis Manuscript) directly from Google Drive.
- **Smart Reply Detection**: Uses the Gmail API to scan for incoming replies. If a response is detected, the system automatically disables follow-ups and moves the contact to an **Archive** tab.
- **Dynamic Templates**: Supports placeholders like `{{Name}}` and `{{Detail}}` to personalize research-specific interests for each professor.
- **Custom Gmail Signature**: Automatically pulls and appends the user's official Gmail signature, maintaining professional branding (RUET, IEEE, etc.).

## 🛠️ Technical Stack
- **Language**: Google Apps Script (JavaScript)
- **APIs**: Gmail API, Google Drive API, Spreadsheet Service
- **Workflow**: Time-driven triggers (Hourly)

## 📂 Project Structure
- `Code.gs`: The core engine handling logic, API calls, and email dispatch.
- `Sheet1`: The command center for professor data and scheduling.
- `Templates`: A dedicated tab for initial and follow-up email drafts.
- `Archive`: Automated tab for successful connections.

## 📝 Setup
1. Enable **Gmail API** in the Apps Script Services.
2. Replace the `File IDs` in the script with your specific Drive file IDs.
3. Set a **Time-driven Trigger** to run the `automatePhDOutreach` function hourly.

---
*Developed to support research outreach in Thermal Science and Fluid Mechanics.*
