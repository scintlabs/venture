.PHONY: install install-backend install-frontend \
    dev dev-backend dev-frontend \
    lint lint-backend lint-frontend \
    test test-backend test-frontend

install: install-backend install-frontend
	@echo "Dependencies installed"

install-backend:
	@if ! command -v uv >/dev/null; then \
		pip install uv; \
	fi && \
	cd backend && \
	if [ ! -d ".venv" ]; then \
		uv venv .venv; \
	fi && \
	. .venv/bin/activate && \
	uv pip install -e .

install-frontend:
	@if ! command -v bun >/dev/null; then \
		curl -fsSL https://bun.sh/install | bash; \
		export PATH="$$HOME/.bun/bin:$$PATH"; \
	fi && \
	cd frontend && \
	bun i

dev: dev-backend dev-frontend
	@echo "All services started."

dev-backend:
	@echo "Starting backend..."
	cd backend && \
		. .venv/bin/activate && \
		uv run app/main.py

dev-frontend:
	@echo "Starting frontend..."
	cd frontend && bun dev

lint: lint-backend lint-frontend

lint-backend:
	cd backend && \
	if [ ! -d ".venv" ]; then \
		uv venv .venv; \
	fi && \
	. .venv/bin/activate && \
	uv pip install -e . && \
	ruff check . && \
	ruff format .

lint-frontend:
	cd frontend && \
	bun i && \
	bun run lint

test: test-backend test-frontend

test-backend:
	cd backend && \
	. .venv/bin/activate && \
	uv pip install -e . && \
	pytest -q || true

test-frontend:
	cd frontend && \
	bun i && \
	bun run test
