export interface ProjectLink {
  label: string;
  url: string;
}

export default interface SoftwareProject {
  title: string;
  description: string;
  tags: string[];
  primaryLink: string;
  links: ProjectLink[];
  featured?: boolean;
}
