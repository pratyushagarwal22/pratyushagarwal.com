export type Skill = {
  id: string;
  label: string;
  group?: "language" | "framework" | "infra" | "data" | "ai";
};

export const skills: Skill[] = [
  { id: "python", label: "Python", group: "language" },
  { id: "typescript", label: "TypeScript", group: "language" },
  { id: "javascript", label: "JavaScript", group: "language" },
  { id: "sql", label: "SQL", group: "language" },
  { id: "java", label: "Java", group: "language" },
  { id: "nextjs", label: "Next.js", group: "framework" },
  { id: "react", label: "React", group: "framework" },
  { id: "nestjs", label: "NestJS", group: "framework" },
  { id: "fastapi", label: "FastAPI", group: "framework" },
  { id: "nodejs", label: "Node.js", group: "framework" },
  { id: "aws", label: "AWS", group: "infra" },
  { id: "azure", label: "Azure", group: "infra" },
  { id: "docker", label: "Docker", group: "infra" },
  { id: "kubernetes", label: "Kubernetes", group: "infra" },
  { id: "vercel", label: "Vercel", group: "infra" },
  { id: "postgresql", label: "PostgreSQL", group: "data" },
  { id: "bigquery", label: "BigQuery", group: "data" },
  { id: "databricks", label: "Databricks", group: "data" },
  { id: "pyspark", label: "PySpark", group: "data" },
  { id: "redis", label: "Redis", group: "data" },
  { id: "claude-api", label: "Claude API", group: "ai" },
  { id: "aws-bedrock", label: "AWS Bedrock", group: "ai" },
  { id: "mcp", label: "MCP", group: "ai" },
  { id: "rag", label: "RAG", group: "ai" },
  { id: "llm-agents", label: "LLM Agents", group: "ai" },
];
