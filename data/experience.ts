export type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  location?: string;
  start: string;
  end: string;
  summary?: string;
  tech: string[];
  bullets: string[];
};

export const experience: ExperienceItem[] = [
  {
    id: "kohler",
    company: "Kohler Co.",
    role: "Data Engineer Intern",
    location: "Champaign, IL",
    start: "Jun 2025",
    end: "May 2026",
    tech: [
      "Azure Data Factory",
      "Databricks",
      "SQL Server",
      "Power BI",
      "Git",
    ],
    bullets: [
      "Built an ETL pipeline with Azure Data Factory and Databricks to ingest SharePoint and on-prem SQL Server data into Parquet-based raw and curated layers, enabling clean, analytics-ready datasets for downstream use.",
      "Integrated on-prem operational databases with Azure cloud platforms, building the data flow that supports company-wide analytics and upcoming AI automation initiatives.",
      "Designed data models from on-prem SQL Server schemas and built Power BI reports on top of them, creating ER diagrams and a data dictionary to keep reporting consistent and scalable across teams.",
      "Built and maintained 6 Power BI dashboards tracking manufacturing KPIs, improving plant leadership visibility and saving around 10 hours of manual reporting each week.",
      "Analyzed Ignition form submissions across plants, spotting schema inconsistencies and recommending structural fixes to protect long-term data model integrity.",
      "Introduced Git-based version control for pipelines and reports to the team, improving governance across the org.",
    ],
  },
  {
    id: "studio",
    company: "The stu/dio at Illinois",
    role: "Project Manager",
    location: "Champaign, IL",
    start: "Dec 2024",
    end: "Jun 2025",
    tech: ["Agile", "Backlog Prioritization", "Production Planning"],
    bullets: [
      "Led cross-functional coordination for a quantum satellite-themed game, aligning sponsors, programmers, design, and art to ship the project in 2 months and around $2,000 under budget.",
      "Prioritized the development backlog by weighing core gameplay value, implementation complexity, and system dependencies, so critical features shipped first and bottlenecks cleared fast.",
      "Ran an Agile workflow tracking milestones, tasks, bugs, and dependencies, keeping the team on schedule through resource constraints and shifting timelines.",
      "Managed maintenance and optimization of a game with 20,000+ downloads, resolving bugs, improving stability, and supporting adaptation for a broader global audience.",
      "Worked closely with senior production leadership to validate planning decisions, refine execution, and keep stakeholders aligned throughout development.",
    ],
  },
  {
    id: "apna",
    company: "Apna",
    role: "Data Engineer",
    location: "Bangalore, India (Remote)",
    start: "Oct 2022",
    end: "Aug 2024",
    summary: "Marketplace Operations Trust and Safety Team",
    tech: [
      "Python",
      "SQL",
      "BigQuery",
      "REST APIs",
      "Metabase",
      "Retool",
      "Mixpanel",
    ],
    bullets: [
      "Built a user data extraction and ingestion pipeline using SQL, Python, Postman, and Government of India APIs, cutting processing time for Operations agents by ~50% and improving onboarding for ~1,200 users weekly.",
      "Integrated third-party government identity APIs and designed user verification workflows that reduced sign-up drop-offs by ~10% and improved onboarding conversion.",
      "Optimized high-cost BigQuery workloads through partition-filtering and query scope-limiting, cutting warehouse spend by ~$2,500 monthly and improving execution time by ~20%.",
      "Consolidated fragmented operational data sources into a single unified tracking system, reducing investigation overlap by ~35% and saving 20+ agent hours weekly.",
      "Built a SQL-based fraud detection workflow in Metabase and Retool that cut fraudulent recruiter activity ~20% within a month, strengthening platform security.",
      "Built Metabase and Mixpanel dashboards to track operational metrics and support fraud detection investigations across Operations and Trust and Safety.",
      "Partnered with Operations, Trust and Safety, Product, and Business stakeholders to improve workflows and drive measurable process gains.",
    ],
  },
  {
    id: "google-smollan",
    company: "Google (via Smollan)",
    role: "Strategy and Analytics Intern",
    location: "Singapore (Remote)",
    start: "Oct 2021",
    end: "Apr 2022",
    summary:
      "Client assignment via Smollan for the Global Devices and Services team during the Pixel 6 launch",
    tech: ["Python", "Selenium", "SQL", "Looker Studio", "GCP"],
    bullets: [
      "Built web scraping scripts using ChromeDriver and Selenium, plus the database and supporting infrastructure to capture and analyze daily website metrics for brand and sales insights.",
      "Collaborated with developers to build scalable scripts and infrastructure supporting market intelligence data gathering and recurring analytics workflows.",
      "Integrated Monday.com with Slack to automate team operations, improving efficiency by ~25%.",
      "Built 13 Looker Studio dashboards and biweekly reports synthesizing market trends and competitor insights for leadership decisions during the Pixel 6 launch.",
      "Analyzed market and sales data to identify key growth drivers and channel opportunities, helping improve brand presence and inform go-to-market strategy.",
      "Led and coordinated a team of 3 interns, setting up processes that improved collaboration, execution, and delivery quality; role extended from 1 to 7 months.",
    ],
  },
  {
    id: "spacenos",
    company: "SPACENOS",
    role: "Product Manager Intern",
    location: "Bangalore, India (Remote)",
    start: "May 2021",
    end: "Jul 2021",
    tech: ["Google Analytics", "Product Metrics", "Market Research"],
    bullets: [
      "Conducted product metrics analysis using Google Analytics, surfacing user behavior insights and presenting actionable recommendations to leadership.",
      "Supported multiple facets of product development, including website design, branding, pricing strategy, and digital marketing, helping strengthen product positioning and launch readiness.",
      "Partnered with Engineering, Design, and Market Research teams to track milestones, resolve bottlenecks, and support timely delivery of key product initiatives.",
      "Recommended growth opportunities backed by market research and competitor data, helping shape initiatives to improve engagement and scale the business.",
    ],
  },
  {
    id: "oneplus",
    company: "OnePlus",
    role: "Marketing Specialist Intern",
    location: "Bengaluru, India (Remote)",
    start: "Sep 2020",
    end: "Feb 2021",
    tech: [
      "Community Building",
      "Campaign Execution",
      "Cross-functional Coordination",
    ],
    bullets: [
      "Selected as a OnePlus Student Ambassador from a pool of 25,000+ applicants, then promoted to lead the Community Team.",
      "Led the OnePlus Student Ambassadors Community Team, improving communication workflows and strengthening collaboration across cross-functional teams.",
      "Supported execution of high-visibility campaigns such as United by Hope and OnePlus World, helping strengthen brand presence and community engagement.",
      "Developed marketing strategies for student community initiatives, helping expand brand reach and foster sustained community growth.",
      "Acted as the primary liaison for internal communications, aligning teams and leadership to support smooth execution of campaign priorities.",
    ],
  },
  {
    id: "haryana-police",
    company: "Haryana Police",
    role: "Cybersecurity Intern, GPCSSI'20",
    location: "Gurugram, India (Remote)",
    start: "Jun 2020",
    end: "Jul 2020",
    tech: [
      "Threat Modeling",
      "SDN",
      "NFV",
      "Blockchain",
      "Network Security",
    ],
    bullets: [
      "Researched emerging cybersecurity technologies and frameworks, including Software-Defined Networking, Network Function Virtualization, and Blockchain, as part of the Gurugram Police Cyber Security Summer Internship.",
      "Developed a research project proposing an access-control model built on SDN, NFV, Blockchain, and microsegmentation, examining how blockchain-backed credential management and segmented network architecture reduce unauthorized lateral access and strengthen authentication.",
      "Built foundational knowledge across Threat Modeling, Network Security, and Cybersecurity Innovation through mentorship, independent study, and engagement with industry specialists.",
      "Secured a place among the Top 20 teams in the final round of the Hackquest Challenge organized by GPCSSI and Hackershala.",
      "Presented a research-driven project on practical cybersecurity applications and innovation in law enforcement contexts.",
    ],
  },
];
