import type SoftwareProject from './types';

export const dev_projects: SoftwareProject[] = [
  {
    title: 'Treasure Trove',
    description: 'A full-stack mock online marketplace platform for honing e-commerce skills.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    primaryLink: 'https://group-13-treasure-trove-d3bbee55637a.herokuapp.com/',
    links: [
      { label: 'GitHub', url: 'https://github.com/bambam955/treasure-trove' },
      { label: 'Live Demo', url: 'https://group-13-treasure-trove-d3bbee55637a.herokuapp.com/' },
    ],
    featured: true,
  },
  {
    title: 'Xv6 OS',
    description: 'My fork of the MIT xv6 teaching operating system with added features.',
    tags: ['C', 'QEMU', 'Operating Systems'],
    primaryLink: 'https://github.com/bambam955/my-xv6-OS',
    links: [{ label: 'GitHub', url: 'https://github.com/bambam955/my-xv6-OS' }],
  },
  {
    title: 'Personal Website',
    description: 'The very website you are browsing right now!',
    tags: ['Astro', 'TypeScript', 'Tailwind CSS'],
    primaryLink: 'https://bemoore.life',
    links: [
      { label: 'GitHub', url: 'https://github.com/bambam955/bemoore-life' },
      { label: 'Live Demo', url: 'https://bemoore.life' },
    ],
    featured: true,
  },
  {
    title: 'MRS SDK Qt',
    description:
      'Tools, libraries, and documentation for developing applications for MRS devices using Qt.',
    tags: ['C++', 'Qt', 'CMake', 'SDK'],
    primaryLink: 'https://github.com/mrs-electronics-inc/mrs-sdk-qt',
    links: [{ label: 'GitHub', url: 'https://github.com/mrs-electronics-inc/mrs-sdk-qt' }],
    featured: true,
  },
];
