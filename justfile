# List all available recipes
default:
    @just --list

# Run dev server for the site
dev:
    npm run dev

# Lint all source code
lint:
    npm run lint:fix

# Format all source code
fmt:
    npm run format
