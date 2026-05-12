---
title: Tailwind CSS Tips
description: Practical tips and tricks for mastering Tailwind CSS.
pubDate: 2024-01-25
readTime: 6 min read
categories:
  - dev
---

Tailwind CSS is a utility-first CSS framework that helps you build modern designs without leaving your HTML.

## Use Arbitrary Values

Tailwind 3+ supports arbitrary values with square brackets:

```html
<div class="w-[300px] bg-[#1a1a1a] text-[14px]">Custom styling</div>
```

## Create Reusable Component Classes

Use `@apply` to create reusable component classes:

```css
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors;
  }
}
```

## Responsive Design

Tailwind makes responsive design simple with prefixes:

```html
<div class="w-full md:w-1/2 lg:w-1/3">Responsive width</div>
```

## Dark Mode

Enable dark mode in your config and use `dark:` prefix:

```html
<div class="bg-white dark:bg-gray-900 text-black dark:text-white">Dark mode ready</div>
```

## Pro Tips

- Use the Tailwind IntelliSense VS Code extension
- Check the [Tailwind CSS documentation](https://tailwindcss.com) for the full utility reference
- Experiment with the [Tailwind Play](https://play.tailwindcss.com) playground
