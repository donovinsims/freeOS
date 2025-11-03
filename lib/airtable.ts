import Airtable from "airtable";
import { App, AppSubmission, Category } from "./types";
import { generateSlug } from "./utils";

// Initialize Airtable
const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID || "");

const TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || "Apps";

// Map Airtable field names to our App type
interface AirtableAppRecord {
  id: string;
  fields: {
    "App Name": string;
    Slug?: string;
    Icon?: Array<{ url: string }>;
    "Short Description": string;
    "Full Description": string;
    Category?: Category;
    Platform?: string[];
    "Primary URL": string;
    "URL Type"?: string;
    Tags?: string[];
    "Installation Notes"?: string;
    "Last Verified"?: string;
    "Verified By"?: string;
    "Quality Score"?: number;
    Featured?: boolean;
    Status?: string;
  };
  createdTime?: string;
}

function mapAirtableToApp(record: AirtableAppRecord): App {
  return {
    id: record.id,
    name: record.fields["App Name"],
    slug: record.fields.Slug || generateSlug(record.fields["App Name"]),
    icon: record.fields.Icon?.[0]?.url,
    shortDescription: record.fields["Short Description"],
    fullDescription: record.fields["Full Description"],
    category: record.fields.Category || "utilities",
    platforms: (record.fields.Platform || []) as App["platforms"],
    primaryURL: record.fields["Primary URL"],
    urlType: (record.fields["URL Type"] || "Website") as App["urlType"],
    tags: record.fields.Tags || [],
    installationNotes: record.fields["Installation Notes"],
    lastVerified: record.fields["Last Verified"],
    verifiedBy: record.fields["Verified By"],
    qualityScore: record.fields["Quality Score"],
    featured: record.fields.Featured || false,
    status: (record.fields.Status || "Published") as App["status"],
    createdAt: record.createdTime,
  };
}

export async function getAllApps(): Promise<App[]> {
  try {
    const records = await base(TABLE_NAME)
      .select({
        filterByFormula: '{Status} = "Published"',
      })
      .all();

    return records.map(mapAirtableToApp);
  } catch (error) {
    console.error("Error fetching apps:", error);
    return [];
  }
}

export async function getAppBySlug(slug: string): Promise<App | null> {
  try {
    const records = await base(TABLE_NAME)
      .select({
        filterByFormula: `{Slug} = "${slug}"`,
        maxRecords: 1,
      })
      .all();

    if (records.length === 0) return null;
    return mapAirtableToApp(records[0] as AirtableAppRecord);
  } catch (error) {
    console.error("Error fetching app by slug:", error);
    return null;
  }
}

export async function getAppsByCategory(category: Category): Promise<App[]> {
  try {
    const records = await base(TABLE_NAME)
      .select({
        filterByFormula: `AND({Category} = "${category}", {Status} = "Published")`,
      })
      .all();

    return records.map(mapAirtableToApp);
  } catch (error) {
    console.error("Error fetching apps by category:", error);
    return [];
  }
}

export async function getFeaturedApps(): Promise<App[]> {
  try {
    const records = await base(TABLE_NAME)
      .select({
        filterByFormula: `AND({Featured} = TRUE(), {Status} = "Published")`,
        maxRecords: 5,
      })
      .all();

    return records.map(mapAirtableToApp);
  } catch (error) {
    console.error("Error fetching featured apps:", error);
    return [];
  }
}

export async function createAppSubmission(submission: AppSubmission): Promise<boolean> {
  try {
    await base(TABLE_NAME).create([
      {
        fields: {
          "App Name": submission.appName,
          "Primary URL": submission.url,
          "Short Description": submission.shortDescription,
          "Full Description": submission.whyGreat,
          "Platform": submission.platform || [],
          Status: "Pending Review",
          "Submitter Email": submission.email,
          "Submitter Name": submission.submitterName || "",
        },
      },
    ]);

    return true;
  } catch (error) {
    console.error("Error creating app submission:", error);
    return false;
  }
}

export async function searchApps(query: string): Promise<App[]> {
  try {
    const allApps = await getAllApps();
    const lowerQuery = query.toLowerCase();

    return allApps.filter((app) => {
      const matchesName = app.name.toLowerCase().includes(lowerQuery);
      const matchesDescription = 
        app.shortDescription.toLowerCase().includes(lowerQuery) ||
        app.fullDescription.toLowerCase().includes(lowerQuery);
      const matchesTags = app.tags?.some((tag) => 
        tag.toLowerCase().includes(lowerQuery)
      );

      return matchesName || matchesDescription || matchesTags;
    });
  } catch (error) {
    console.error("Error searching apps:", error);
    return [];
  }
}

