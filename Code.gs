/**
 * PhD Outreach Automation Engine
 * Author: Avijit Mallik
 */

function automatePhDOutreach() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const main = ss.getSheetByName("Sheet1");
  const temp = ss.getSheetByName("Templates");
  const arc = ss.getSheetByName("Archive") || ss.insertSheet("Archive");
  
  const data = main.getDataRange().getValues();
  const temps = temp.getDataRange().getValues();
  const now = new Date();

  // REPLACE WITH YOUR ACTUAL GOOGLE DRIVE FILE IDs
  const cvFile = DriveApp.getFileById("YOUR_CV_FILE_ID");
  const draftFile = DriveApp.getFileById("YOUR_RESEARCH_DRAFT_ID");

  // Fetch Default Signature via Gmail API
  let sig = "";
  try {
    const sendAs = Gmail.Users.Settings.SendAs.list("me").sendAs;
    const primary = sendAs.find(account => account.isDefault) || sendAs[0];
    sig = primary.signature || "";
  } catch (e) {
    Logger.log("Signature fetch failed: " + e.message);
  }

  // Iterate backwards to safely handle row deletion/moving
  for (let i = data.length - 1; i >= 1; i--) {
    let [name, email, detail, , , status, last, toggle, sched] = data[i];
    let lastDt = last ? new Date(last) : null;
    let schedDt = sched ? new Date(sched) : null;

    // 1. SMART STOP: Archive if a reply is detected
    if (GmailApp.search('from:' + email).length > 0 && (status || "").includes("Sent")) {
      main.getRange(i + 1, 1, 1, 9).moveTo(arc.getRange(arc.getLastRow() + 1, 1));
      main.deleteRow(i + 1);
      continue;
    }

    // 2. INITIAL OUTREACH
    if (status === "Ready" && schedDt && now >= schedDt) {
      sendEmail(email, temps[1][0], temps[1][1], name, detail, sig, cvFile, draftFile);
      main.getRange(i + 1, 6, 1, 2).setValues([["Initial Sent", now]]);
    } 
    
    // 3. AUTOMATED FOLLOW-UP (14-Day Cycle)
    else if (status === "Initial Sent" && toggle === "ON" && lastDt) {
      if (Math.floor((now - lastDt)/864e5) >= 14) {
        sendEmail(email, temps[2][0], temps[2][1], name, detail, sig, cvFile, draftFile);
        main.getRange(i + 1, 6, 1, 2).setValues([["Followed Up", now]]);
      }
    }
  }
}

/**
 * Helper: Sends HTML email with PDF attachments
 */
function sendEmail(to, sub, txt, name, det, sig, f1, f2) {
  let body = txt.replace("{{Name}}", name).replace("{{Detail}}", det);
  GmailApp.sendEmail(to, sub, body, {
    htmlBody: body.replace(/\n/g, '<br>') + "<br><br>" + sig,
    attachments: [f1.getAs(MimeType.PDF), f2.getAs(MimeType.PDF)]
  });
}
