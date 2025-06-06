.PHONY: install dev dev-backend dev-frontend lint test

install:
	if [ "$(SERVICE)" = "backend" ]; then \
	        if ! command -v uv > /dev/null; then \
	                pip install uv ; \
	        fi && \
	        cd backend && \
	        if [ ! -d ".venv" ]; then \
	                uv venv .venv ; \
	        fi && \
	        . .venv/bin/activate && \
	        uv pip install -e . ; \
	elif [ "$(SERVICE)" = "frontend" ]; then \
	        cd frontend && \
	        if ! command -v bun > /dev/null; then \
	                curl -fsSL https://bun.sh/install | bash ; \
	                export PATH="$$HOME/.bun/bin:$$PATH" ; \
	        fi && \
	        bun i ; \
		cd frontend && \
		if ! command -v bun > /dev/null; then \
		    curl -fsSL https://bun.sh/install | bash ; \
        fi && \
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
		if [ ! -d ".venv" ]; then \
			uv venv .venv ; \
		fi && \
		. .venv/bin/activate && \
                uv pip install -e . && \
                ruff check . && \
                ruff format . ; \
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
                uv pip install -e . && \
                pytest -q || true ; \
	elif [ "$(SERVICE)" = "frontend" ]; then \
		cd frontend && \
		bun i && \
		bun run test ; \
	else \
		$(MAKE) test SERVICE=backend ; \
		$(MAKE) test SERVICE=frontend ; \
	fi
