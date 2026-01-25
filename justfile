# List all available recipes
default:
    @just --list

# Build site for production
build:
    npm run build

# Run dev server for the site
dev:
    npm run dev

# Lint all source code
lint:
    npx eslint --cache --fix .
    npx markdownlint --fix .

# Format all source code
fmt:
    npx prettier --write .
