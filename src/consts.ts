import type { Project, BlogPost } from './types';

export const PROJECTS: Project[] = [
  {
    title: 'Project Cygnus',
    description:
      'A real-time data visualization dashboard built with D3.js and React, providing insights into complex datasets with an interactive and responsive interface.',
    techStack: ['React', 'TypeScript', 'D3.js', 'TailwindCSS', 'Node.js'],
    githubUrl: 'https://github.com',
    liveUrl: '#',
  },
  {
    title: 'QuantumLeap AI',
    description:
      'A machine learning model deployment platform using Flask and Docker. Allows users to upload, test, and deploy models via a simple REST API.',
    techStack: ['Python', 'Flask', 'Docker', 'PostgreSQL', 'React'],
    githubUrl: 'https://github.com',
  },
  {
    title: 'Nova Static Site Generator',
    description:
      'A lightweight and fast static site generator written in Go. Transforms Markdown files into a complete, ready-to-deploy website.',
    techStack: ['Go', 'Markdown', 'HTML/CSS'],
    githubUrl: 'https://github.com',
    liveUrl: '#',
  },
  {
    title: 'Aether Wallet',
    description:
      'A secure, decentralized cryptocurrency wallet browser extension for the Ethereum blockchain. Features include token management and Web3 integration.',
    techStack: ['JavaScript', 'Web3.js', 'React', 'ethers.js', 'Solidity'],
    githubUrl: 'https://github.com',
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'Understanding Async/Await in JavaScript',
    date: '2023-10-26',
    excerpt:
      'A deep dive into the modern way of handling asynchronous operations in JavaScript, making your code cleaner and more readable...',
    content: `
        <div>
            <p>Async/await is syntactic sugar built on top of Promises, and it cannot be used with plain callbacks or node-style callbacks. It makes asynchronous code look and behave a little more like synchronous code. This is where its power lies.</p>
            <h3 class="text-xl text-green-300 mt-4 mb-2">How it Works</h3>
            <p>The \`async\` keyword is used to declare an asynchronous function, which means it will always return a Promise. If the function returns a value, the Promise will be resolved with that value. If the function throws an exception, the Promise will be rejected.</p>
            <pre class="bg-slate-900 text-green-300 p-4 rounded-md my-4 text-sm overflow-x-auto"><code>async function getData() {
  return 'Some Data';
}

getData().then(console.log); // 'Some Data'</code></pre>
            <p>The \`await\` keyword can only be used inside an \`async\` function. It makes JavaScript wait until that promise settles and returns its result. This pauses the execution of the \`async\` function and waits for the Promise's resolution, without blocking the main thread.</p>
        </div>
    `,
  },
  {
    id: 2,
    title: 'Building a Component Library with Storybook',
    date: '2023-09-15',
    excerpt:
      'Learn how to develop reusable UI components in isolation using Storybook, improving your workflow and creating a more robust design system...',
    content: `
        <div>
            <p>Storybook is an open-source tool for building UI components and pages in isolation. It streamlines UI development, testing, and documentation.</p>
            <h3 class="text-xl text-green-300 mt-4 mb-2">Why Use Storybook?</h3>
            <ul class="list-disc list-inside space-y-2">
                <li><span class="text-green-400 font-bold">Develop in Isolation:</span> Build components without needing to run your entire application stack.</li>
                <li><span class="text-green-400 font-bold">Visual Testing:</span> Catch UI bugs early by viewing components in different states.</li>
                <li><span class="text-green-400 font-bold">Documentation:</span> Storybook serves as living documentation for your component library.</li>
            </ul>
        </div>
    `,
  },
];
