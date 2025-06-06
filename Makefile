dev-backend:
    cd backend && uv run src

dev-frontend:
    cd frontend && bun run dev

lint:
    cd backend && flake8 .
    cd frontend && bun run lint
