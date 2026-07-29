export type Stat = {
  id: string;
  value: string;
  label: string;
};

export const stats: Stat[] = [
  {
    id: "fraud-reduction",
    value: "~20%",
    label: "fraud reduction at Apna within one month",
  },
  {
    id: "bigquery-spend",
    value: "~$2,500/mo",
    label: "BigQuery warehouse spend cut at Apna",
  },
  {
    id: "reporting-saved",
    value: "~10 hrs/wk",
    label: "manual reporting saved at Kohler",
  },
  {
    id: "hackathon",
    value: "2nd place",
    label: "Claude Builder Club Hackathon (UIUC)",
  },
  {
    id: "papers",
    value: "3 papers",
    label: "published (Springer, IEEE, Elsevier)",
  },
];
