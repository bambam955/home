---
title: Getting Started with Astro
description: Learn how to get started with Astro and build fast static websites.
pubDate: 2024-01-15
readTime: 5 min read
categories:
  - dev
---

Astro is a modern static site builder that lets you build faster websites with less client-side JavaScript.

## Why Astro?

- **Fast by default**: Astro sends zero JavaScript to the browser by default
- **Flexible**: Use your favorite UI frameworks (React, Vue, Svelte, etc.) or just vanilla HTML
- **Content-focused**: Perfect for blogs, documentation sites, and content-driven websites

## Installation

```bash
npm create astro@latest
```

## Your First Component

Create a new `.astro` file in your `src/components` directory:

```astro
---
const name = 'World';
---

<h1>Hello {name}!</h1>

<style>
  h1 {
    color: purple;
  }
</style>
```

That's it! Astro will compile this to static HTML.
