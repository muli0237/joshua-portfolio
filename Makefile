.PHONY: help docker-build docker-run docker-stop docker-logs docker-compose-up docker-compose-down k8s-deploy k8s-status k8s-logs k8s-delete setup lint build dev

# Colors
BLUE := \033[0;34m
GREEN := \033[0;32m
YELLOW := \033[1;33m
NC := \033[0m # No Color

help:
	@echo "$(BLUE)Joshua Portfolio - DevOps Commands$(NC)"
	@echo ""
	@echo "$(YELLOW)Docker Commands:$(NC)"
	@echo "  make docker-build          Build Docker image"
	@echo "  make docker-run            Run Docker container"
	@echo "  make docker-stop           Stop Docker container"
	@echo "  make docker-logs           View Docker logs"
	@echo "  make docker-compose-up     Start Docker Compose services"
	@echo "  make docker-compose-down   Stop Docker Compose services"
	@echo ""
	@echo "$(YELLOW)Kubernetes Commands:$(NC)"
	@echo "  make k8s-deploy            Deploy to Kubernetes"
	@echo "  make k8s-status            Check Kubernetes status"
	@echo "  make k8s-logs              View Kubernetes logs"
	@echo "  make k8s-delete            Delete Kubernetes resources"
	@echo ""
	@echo "$(YELLOW)Development Commands:$(NC)"
	@echo "  make setup                 Setup DevOps environment"
	@echo "  make lint                  Run linter"
	@echo "  make build                 Build application"
	@echo "  make dev                   Start development server"
	@echo ""

# Docker Commands
docker-build:
	@echo "$(BLUE)Building Docker image...$(NC)"
	docker build -t joshua-portfolio:latest .
	@echo "$(GREEN)✓ Build complete$(NC)"

docker-run:
	@echo "$(BLUE)Running Docker container...$(NC)"
	docker run -p 3000:3000 joshua-portfolio:latest

docker-stop:
	@echo "$(BLUE)Stopping Docker container...$(NC)"
	docker stop joshua-portfolio-app || true
	docker rm joshua-portfolio-app || true
	@echo "$(GREEN)✓ Container stopped$(NC)"

docker-logs:
	@echo "$(BLUE)Docker logs:$(NC)"
	docker logs -f joshua-portfolio-app

docker-compose-up:
	@echo "$(BLUE)Starting Docker Compose services...$(NC)"
	docker-compose up -d
	@echo "$(GREEN)✓ Services started$(NC)"
	@echo "App: http://localhost:3000"

docker-compose-down:
	@echo "$(BLUE)Stopping Docker Compose services...$(NC)"
	docker-compose down
	@echo "$(GREEN)✓ Services stopped$(NC)"

# Kubernetes Commands
k8s-deploy:
	@echo "$(BLUE)Deploying to Kubernetes...$(NC)"
	./scripts/k8s-deploy.sh joshua-portfolio apply
	@echo "$(GREEN)✓ Deployment complete$(NC)"

k8s-status:
	@echo "$(BLUE)Kubernetes status:$(NC)"
	./scripts/k8s-deploy.sh joshua-portfolio status

k8s-logs:
	@echo "$(BLUE)Kubernetes logs:$(NC)"
	kubectl logs -n joshua-portfolio -l app=joshua-portfolio -f

k8s-delete:
	@echo "$(BLUE)Deleting Kubernetes resources...$(NC)"
	./scripts/k8s-deploy.sh joshua-portfolio delete
	@echo "$(GREEN)✓ Resources deleted$(NC)"

# Development Commands
setup:
	@echo "$(BLUE)Setting up DevOps environment...$(NC)"
	./scripts/setup-devops.sh

lint:
	@echo "$(BLUE)Running linter...$(NC)"
	npm run lint

build:
	@echo "$(BLUE)Building application...$(NC)"
	npm run build
	@echo "$(GREEN)✓ Build complete$(NC)"

dev:
	@echo "$(BLUE)Starting development server...$(NC)"
	npm run dev

# Utility Commands
.PHONY: clean
clean:
	@echo "$(BLUE)Cleaning up...$(NC)"
	rm -rf .next
	rm -rf node_modules
	rm -rf dist
	@echo "$(GREEN)✓ Cleanup complete$(NC)"

.PHONY: install
install:
	@echo "$(BLUE)Installing dependencies...$(NC)"
	npm install
	@echo "$(GREEN)✓ Dependencies installed$(NC)"

.PHONY: all
all: install build docker-build
	@echo "$(GREEN)✓ All tasks complete$(NC)"

