export interface ProjectData {
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo: string;
  featured?: boolean;
}

export const projects: ProjectData[] = [
  {
    title: 'E-Commerce Platform',
    description:
      'A full-stack e-commerce solution with user authentication, payment processing, and inventory management.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    github: 'https://github.com',
    demo: 'https://example.com',
    featured: true,
  },
  {
    title: 'Task Management App',
    description:
      'A collaborative task management application with real-time updates and team features.',
    tags: ['Vue.js', 'Express', 'PostgreSQL', 'Socket.io'],
    github: 'https://github.com',
    demo: 'https://example.com',
    featured: true,
  },
  {
    title: 'Weather Dashboard',
    description:
      'A responsive weather dashboard with location-based forecasts and interactive charts.',
    tags: ['JavaScript', 'API Integration', 'Chart.js'],
    github: 'https://github.com',
    demo: 'https://example.com',
    featured: true,
  },
  {
    title: 'Blog Platform',
    description: 'A modern blogging platform with markdown support, tags, and comment system.',
    tags: ['Astro', 'React', 'Tailwind CSS'],
    github: 'https://github.com',
    demo: 'https://example.com',
    featured: false,
  },
  {
    title: 'Portfolio Website',
    description:
      'A responsive portfolio website showcasing projects and skills with smooth animations.',
    tags: ['HTML', 'CSS', 'JavaScript', 'GSAP'],
    github: 'https://github.com',
    demo: 'https://example.com',
    featured: false,
  },
  {
    title: 'API Documentation',
    description:
      'Interactive API documentation with live testing capabilities and comprehensive guides.',
    tags: ['React', 'Swagger', 'OpenAPI'],
    github: 'https://github.com',
    demo: 'https://example.com',
    featured: false,
  },
];
