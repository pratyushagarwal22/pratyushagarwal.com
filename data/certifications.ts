export type CourseStatus = "Completed" | "In Progress" | "Not Started";

export type SubCourse = {
  title: string;
  status: CourseStatus;
  verifyUrl?: string;
};

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  skills: string[];
  verifyUrl: string;
  status?: string;
  expiry?: string;
  expandable?: boolean;
  targetDate?: string;
  subCourses?: SubCourse[];
};

export const certifications: Certification[] = [
  {
    id: "lcae",
    title: "LangChain Certified Agent Engineer",
    issuer: "LangChain Academy",
    date: "Present",
    skills: [
      "LangChain",
      "LangGraph",
      "Retrieval-Augmented Generation (RAG)",
      "Multi-agent Systems",
      "MCP",
    ],
    verifyUrl: "https://academy.langchain.com/pages/certifications-lcae",
    status: "In Progress",
    expandable: true,
    targetDate: "Targeting Sept 2026",
    subCourses: [
      {
        title: "Foundation: Introduction to LangChain - Python",
        status: "Completed",
        verifyUrl: "https://academy.langchain.com/certificates/2qsahnhbj6",
      },
      {
        title: "Foundation: Introduction to Deep Agents",
        status: "In Progress",
      },
      {
        title: "Foundation: Building Reliable Agents",
        status: "Not Started",
      },
      {
        title: "Foundation: Monitoring Production Agents",
        status: "Not Started",
      },
      {
        title: "Foundation: Introduction to LangSmith Deployment",
        status: "Not Started",
      },
    ],
  },
  {
    id: "power-bi",
    title: "Microsoft Power BI Desktop for Business Intelligence",
    issuer: "Udemy",
    date: "Apr 2025",
    skills: ["Microsoft Power BI", "ETL", "Data Visualization", "Data Modeling"],
    verifyUrl:
      "https://www.udemy.com/certificate/UC-6848d20c-128a-4867-9d5f-eda90e4a825c/",
  },
  {
    id: "google-pm",
    title: "Google Project Management Specialization",
    issuer: "Google",
    date: "Jul 2022",
    skills: [
      "Project Management",
      "Agile",
      "Scrum",
      "Stakeholder Management",
    ],
    verifyUrl:
      "https://www.credly.com/badges/d9b03e16-595a-498c-8d11-ad470b1834d9",
  },
  {
    id: "ceh",
    title: "Certified Ethical Hacker",
    issuer: "EC-Council",
    date: "Mar 2021",
    expiry: "Expired Mar 2024",
    skills: [
      "Penetration Testing",
      "Network Security",
      "Vulnerability Assessment",
      "Reconnaissance",
    ],
    verifyUrl:
      "https://aspen.eccouncil.org/VerifyBadge?type=certification&a=5dHmeEnKUrBnh7mt9oqBwfvv9l7AGGmu+QovpeMkQUM=",
  },
  {
    id: "gcp-networking",
    title: "Networking in Google Cloud",
    issuer: "Coursera",
    date: "Jun 2020",
    skills: [
      "Google Cloud Platform (GCP)",
      "Cloud Networking",
      "Cloud Computing",
    ],
    verifyUrl:
      "https://www.coursera.org/account/accomplishments/specialization/NQAHX82H3L5A",
  },
  {
    id: "gke",
    title: "Architecting with Google Kubernetes Engine",
    issuer: "Coursera",
    date: "Jun 2020",
    skills: [
      "Google Cloud Platform (GCP)",
      "Kubernetes",
      "Docker",
      "DevOps",
      "Cloud Computing",
    ],
    verifyUrl:
      "https://www.coursera.org/account/accomplishments/specialization/BT32K76FLVCA",
  },
  {
    id: "google-it",
    title: "Google IT Support",
    issuer: "Coursera",
    date: "Jul 2019",
    skills: [
      "IT Support",
      "Troubleshooting",
      "Networking",
      "System Administration",
    ],
    verifyUrl:
      "https://www.coursera.org/account/accomplishments/specialization/KD6SWTXS3YUY",
  },
];
