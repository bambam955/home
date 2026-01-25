import type SoftwareProject from './types';

export const dev_projects: SoftwareProject[] = [
  {
    title: 'Treasure Trove',
    description: 'A full-stack mock online marketplace platform for honing e-commerce skills.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    github: 'https://github.com/bambam955/treasure-trove',
    demo: 'https://group-13-treasure-trove-d3bbee55637a.herokuapp.com/',
    featured: true,
  },
  {
    title: 'Xv6 OS',
    description: 'My fork of the MIT xv6 teaching operating system with added features.',
    tags: ['C', 'QEMU', 'Operating Systems'],
    github: 'https://github.com/bambam955/my-xv6-OS',
  },
  {
    title: 'Personal Website',
    description: 'The very website you are browsing right now!',
    tags: ['Astro', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/bambam955/bemoore-life',
    demo: 'https://bemoore.life',
    featured: true,
  },
  {
    title: 'MRS SDK Qt',
    description:
      'Tools, libraries, and documentation for developing applications for MRS devices using Qt.',
    tags: ['C++', 'Qt', 'CMake', 'SDK'],
    github: 'https://github.com/mrs-electronics-inc/mrs-sdk-qt',
    featured: true,
  },
];
