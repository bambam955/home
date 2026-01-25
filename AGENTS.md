# Agent Guidelines

This is Bennett Moore's personal website, built with Astro and Tailwind CSS v4.

## Tech Stack

- **Framework**: Astro 5.x
- **Styling**: Tailwind CSS 4.x (via Vite plugin)
- **Typography**: `@tailwindcss/typography` for prose content
- **Sitemap**: `@astrojs/sitemap`
- **Linting**: ESLint + Prettier + markdownlint
- **Task Runner**: [just](https://github.com/casey/just) (see `justfile`)

## Project Structure

```
src/
├── components/       # Reusable Astro components
│   ├── buttons/      # Button variants (GradientButton, TextButton)
│   ├── dev/          # Development section components (ProjectCard, SkillsWeb)
│   └── icons/        # SVG icon components
├── content/
│   └── blog/         # Markdown blog posts (Astro Content Collections)
├── data/
│   └── dev/          # TypeScript data files (projects, types)
├── layouts/          # Page layouts (Layout.astro)
├── pages/            # File-based routing
│   ├── index.astro   # Home page
│   ├── dev.astro     # Software development portfolio
│   ├── faith.astro   # Faith section
│   ├── music.astro   # Music section
│   ├── blog.astro    # Blog listing
│   └── blog/[id].astro  # Individual blog posts
├── styles/           # Global CSS
│   ├── theme.css     # Color palette and design tokens
│   ├── global.css    # Base styles
│   ├── gradients.css # Gradient text utilities
│   ├── buttons.css   # Button styles
│   └── prose.css     # Typography for blog content
public/               # Static assets
```

## Design System

### Colors (defined in `src/styles/theme.css`)

- **Primary gradient**: Peach tones (`--color-peach-*`)
- **Accents**: Pink highlights (`--color-pink-*`)
- **Backgrounds**: Dark grays (`--color-gray-dark`, `--color-gray-medium`)
- **Text**: Light gray (`--color-gray-text`), dimmed (`--color-gray-dim`)

### Typography

- Body: Nunito
- Headings: Nunito Sans
- Use `text-gradient-primary` class for gradient text on headings

### Components

- Use `GradientButton` for CTAs (supports `primary`, `outlined`, `muted` variants)
- Use `TextButton` for inline links
- Cards use `bg-gray-dark rounded-lg p-6 shadow-soft` pattern

## Common Tasks

```bash
just dev     # Start development server
just build   # Build for production
just lint    # ESLint + markdownlint with auto-fix
just fmt     # Format with Prettier
```

## Adding Projects

Edit `src/data/dev/projects.ts` to add new projects. Use the `DevProject` type from `src/data/dev/types.ts`.
