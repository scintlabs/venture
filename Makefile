.PHONY: install dev dev-backend dev-frontend lint test

install:
	if [ "$(SERVICE)" = "backend" ]; then \
		cd backend && \
		uv venv .venv && \
		. .venv/bin/activate && \
		uv pip install --editable . ; \
	elif [ "$(SERVICE)" = "frontend" ]; then \
		cd frontend && \
		bun i ; \
	else \
		$(MAKE) install SERVICE=backend ; \
		$(MAKE) install SERVICE=frontend ; \
	fi

dev: dev-backend dev-frontend
	@echo "All services started."

dev-backend:
	@echo "Starting backend..."
	cd backend && \
		. .venv/bin/activate && \
		uv run app/main.py

dev-frontend:
	@echo "Starting frontend..."
	cd frontend && \
		bun dev

lint:
	if [ "$(SERVICE)" = "backend" ]; then \
		cd backend && \
		. .venv/bin/activate && \
		uv pip install --editable . && \
		uv ruff check . && \
		uv ruff format . ; \
	elif [ "$(SERVICE)" = "frontend" ]; then \
		cd frontend && \
		bun i && \
		bun run lint ; \
	else \
		$(MAKE) lint SERVICE=backend ; \
		$(MAKE) lint SERVICE=frontend ; \
	fi

test:
	if [ "$(SERVICE)" = "backend" ]; then \
		cd backend && \
		. .venv/bin/activate && \
		uv pip install --editable . && \
		uv pytest -q ; \
	elif [ "$(SERVICE)" = "frontend" ]; then \
		cd frontend && \
		bun i && \
		bun run test ; \
	else \
		$(MAKE) test SERVICE=backend ; \
		$(MAKE) test SERVICE=frontend ; \
	fi
