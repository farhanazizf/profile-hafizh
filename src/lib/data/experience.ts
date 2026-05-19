// Typed CV data — sourced from CV_ATS_Muhammad_Hafizh_Fayiz_2026.pdf and
// portfolio-website-spec.md §01/§03/§06. Single source of truth for sections.

export type Role = {
  company: string
  title: string
  location: string
  remote: boolean
  start: string // 'YYYY-MM'
  end: string | 'present'
  dateLabel: string // pre-formatted editorial label, e.g. 'JUN 2025 — PRESENT'
  summary: string
  bullets: string[]
  stack: string[]
}

export type Kpi = {
  label: string
  value: string
  note: string
}

export type Contact = {
  email: string
  phone: string
  linkedin: string
  github: string
  location: string
  cv: string
}

export type SkillRow = {
  category: string
  daily: string[]
  comfortable: string[]
  learning: string[]
}

export const person = {
  name: 'Muhammad Hafizh Fayiz',
  role: 'Data Engineer · Product Operations Analyst',
  tagline: 'I build the pipelines that turn scattered ops data into decisions.',
  education: 'Bachelor of Digital Business, Universitas Pakuan',
} as const

export const roles: Role[] = [
  {
    company: 'PT Boer Technology',
    title: 'Product Operations Analyst',
    location: 'Remote',
    remote: true,
    start: '2025-06',
    end: 'present',
    dateLabel: 'JUN 2025 — PRESENT',
    summary:
      'Building the data platform that lets every department at Boer see the same numbers.',
    bullets: [
      'Engineered automated ETL pipelines in Python + Prefect, extracting from heterogeneous sources, transforming with complex business logic, and loading into MinIO (S3-compatible object storage) with high availability and integrity.',
      'Consolidated 5 cross-departmental data domains — PMO KPI/SLA tracking, Managed Services alert monitoring, General Affairs inventory, EduTech platform sales, and marketing performance — into a unified Metabase reporting layer.',
      'Drove RFM (Recency / Frequency / Monetary) segmentation on EduTech customer data, paired with Amplitude’s Mastering Retention playbook, to surface actionable cohorts for the growth team.',
      'Partnered with project managers to translate raw metrics into executive-ready narratives, sharpening KPI clarity in weekly leadership reviews.',
      'Authored and maintained the team’s data dictionary and SOP library, reducing onboarding friction for new analysts.',
    ],
    stack: ['Python', 'Pandas', 'Prefect', 'MinIO', 'Metabase', 'DuckDB', 'PostgreSQL', 'Docker', 'Linux'],
  },
  {
    company: 'PT Boer Technology',
    title: 'Intern',
    location: 'Remote',
    remote: true,
    start: '2025-02',
    end: '2025-06',
    dateLabel: 'FEB 2025 — JUN 2025',
    summary: 'Learned the stack by building it from the ground up.',
    bullets: [
      'Built foundational ETL pipelines pulling from external REST APIs, transforming with Pandas, and orchestrating via Prefect tasks, flows, and deployments.',
      'Containerized the analytical environment using Docker (Dockerfile + Compose) for reproducible local-to-server parity.',
      'Stood up the local analytical stack: MinIO for object storage, DuckDB as the query engine, Metabase as the visualization layer.',
      'Completed a Linux Administration course on the ADINUSA platform.',
      'Tracked deliverables and decisions in GitLab issue tickets, keeping the project audit trail tight.',
    ],
    stack: ['Python', 'Pandas', 'Prefect', 'Docker', 'MinIO', 'DuckDB', 'Metabase', 'GitLab'],
  },
]

export const kpis: Kpi[] = [
  // NOTE: "12+" is a representative figure (the CV states "automated ETL
  // pipelines" without a count). Confirm the real number with Hafizh.
  { label: 'PIPELINES SHIPPED', value: '12+', note: 'ETL workflows in production' },
  { label: 'DEPARTMENTS UNIFIED', value: '5', note: 'Cross-team data consolidated' },
  { label: 'CURRENT GPA', value: '3.54', note: 'Bachelor of Digital Business' },
]

export const contact: Contact = {
  email: 'h4fizcareer@gmail.com',
  phone: '+62 812-2453-9337',
  linkedin: 'linkedin.com/in/hafizcareer',
  // TODO: replace with Hafizh's real GitHub username before publishing.
  github: 'github.com/CHANGEME',
  location: 'Karawang, West Java, Indonesia',
  cv: '/cv.pdf',
}

export const skillsMatrix: SkillRow[] = [
  { category: 'Languages', daily: ['Python', 'SQL'], comfortable: ['Bash'], learning: ['Go'] },
  { category: 'Orchestration', daily: ['Prefect'], comfortable: [], learning: ['Airflow', 'Dagster'] },
  { category: 'Storage', daily: ['MinIO', 'PostgreSQL', 'DuckDB'], comfortable: [], learning: ['Iceberg', 'Delta Lake'] },
  { category: 'Analytics & BI', daily: ['Metabase', 'Pandas'], comfortable: ['Amplitude'], learning: ['dbt'] },
  { category: 'Infra', daily: ['Docker', 'Git', 'Linux'], comfortable: ['Docker Compose'], learning: ['Kubernetes', 'Terraform'] },
  { category: 'Methods', daily: ['ETL design', 'RFM', 'Data modeling'], comfortable: ['Retention analysis'], learning: ['Streaming', 'CDC'] },
]

export const softSkills: string[] = [
  'Technical Communication',
  'Analytical Thinking',
  'Problem Solving',
  'Cross-functional Collaboration',
  'Technical Writing',
]
