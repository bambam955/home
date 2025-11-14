export type Project = {
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
};

export type BlogPost = {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  content: string;
};
