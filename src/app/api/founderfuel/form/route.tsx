import { NextResponse } from "next/server";
import { google } from "googleapis";

interface FormData {
  fullName: string;
  startupName: string;
  startupWebsite: string;
  stage: string;
  generatingRevenue: string;
  monthlyRevenue: string;
  conversationTopics: string[];
  hateAboutGroups: string;
  yearsBuilding: string;
  openToMatching: string;
  city: string;
  heardAbout: string;
  preferredMode: string;
  otherTopic: string;
  contactDetail: string;
}

export async function POST(request: Request) {
  try {
    const formData: FormData = await request.json();

    // Validate required fields
    if (
      !formData.fullName?.trim() ||
      !formData.startupName?.trim() ||
      !formData.startupWebsite?.trim()
    ) {
      return NextResponse.json({ message: "All required fields must be filled." }, { status: 400 });
    }

    // Get date and time
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    const options: Intl.DateTimeFormatOptions = {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    const indiaTime = new Intl.DateTimeFormat("en-US", options).format(new Date());

    // Check if Google Sheets environment variables are set
    const hasGoogleConfig =
      process.env.SPREAD_SHEET_EMAIL && process.env.GOOGLE_KEY && process.env.SPREAD_SHEET_ID;

    if (hasGoogleConfig) {
      try {
        // Authenticate with Google Sheets API
        const auth = new google.auth.GoogleAuth({
          credentials: {
            client_email: process.env.SPREAD_SHEET_EMAIL,
            private_key: process.env.GOOGLE_KEY?.replace(/\\n/g, "\n"),
          },
          scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({ version: "v4", auth });

        // Prepare the data to append (Date, Time, then form fields)
        const values = [
          [
            formattedDate,
            indiaTime,
            formData.fullName,
            formData.startupName,
            formData.startupWebsite,
            formData.stage,
            formData.generatingRevenue,
            formData.monthlyRevenue,
            formData.conversationTopics.join("; "),
            formData.hateAboutGroups,
            formData.yearsBuilding,
            formData.openToMatching,
            formData.city,
            formData.heardAbout,
            formData.preferredMode,
            formData.otherTopic || "",
            formData.contactDetail,
          ],
        ];

        // Append to Google Sheet (columns A–Q: Date, Time + 15 form fields)
        const spreadsheetId = process.env.SPREAD_SHEET_ID;
        const range = "Sheet1!A:Q";

        await sheets.spreadsheets.values.append({
          spreadsheetId,
          range,
          valueInputOption: "RAW",
          requestBody: { values },
        });

        console.log("Data successfully appended to Google Sheets");
      } catch (sheetsError: any) {
        console.error("Google Sheets integration error:", sheetsError);
        console.log("Form data logged instead:", formData);
      }
    } else {
      console.log(
        "Google Sheets environment variables not configured. Logging form data:",
        formData
      );
    }

    return NextResponse.json(
      {
        message: "Form submitted successfully!",
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error submitting form:", error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}
