#!/bin/bash

# Kubernetes Deploy Script
# Usage: ./scripts/k8s-deploy.sh [namespace] [action]

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
NAMESPACE="${1:-joshua-portfolio}"
ACTION="${2:-apply}"
K8S_DIR="k8s"

echo -e "${BLUE}☸️  Kubernetes Deploy Script${NC}"
echo "Namespace: $NAMESPACE"
echo "Action: $ACTION"
echo ""

# Check kubectl
if ! command -v kubectl &> /dev/null; then
  echo -e "${RED}✗ kubectl not found${NC}"
  exit 1
fi

# Check cluster connection
echo -e "${YELLOW}Checking cluster connection...${NC}"
if kubectl cluster-info &> /dev/null; then
  echo -e "${GREEN}✓ Connected to cluster${NC}"
else
  echo -e "${RED}✗ Cannot connect to cluster${NC}"
  exit 1
fi

# Validate manifests
echo ""
echo -e "${YELLOW}Validating manifests...${NC}"
kubectl apply -f "${K8S_DIR}/" --dry-run=client -o yaml > /dev/null

if [ $? -eq 0 ]; then
  echo -e "${GREEN}✓ Manifests valid${NC}"
else
  echo -e "${RED}✗ Manifest validation failed${NC}"
  exit 1
fi

# Apply manifests
if [ "$ACTION" = "apply" ]; then
  echo ""
  echo -e "${YELLOW}Applying manifests...${NC}"
  
  kubectl apply -f "${K8S_DIR}/namespace.yaml"
  kubectl apply -f "${K8S_DIR}/rbac.yaml"
  kubectl apply -f "${K8S_DIR}/configmap.yaml"
  kubectl apply -f "${K8S_DIR}/deployment.yaml"
  kubectl apply -f "${K8S_DIR}/service.yaml"
  kubectl apply -f "${K8S_DIR}/hpa.yaml"
  kubectl apply -f "${K8S_DIR}/pdb.yaml"
  kubectl apply -f "${K8S_DIR}/networkpolicy.yaml"
  kubectl apply -f "${K8S_DIR}/ingress.yaml"
  
  echo -e "${GREEN}✓ Manifests applied${NC}"
  
  # Wait for rollout
  echo ""
  echo -e "${YELLOW}Waiting for rollout...${NC}"
  kubectl rollout status deployment/joshua-portfolio-app \
    -n "${NAMESPACE}" \
    --timeout=5m
  
  echo -e "${GREEN}✓ Rollout complete${NC}"

elif [ "$ACTION" = "delete" ]; then
  echo ""
  echo -e "${YELLOW}Deleting resources...${NC}"
  kubectl delete -f "${K8S_DIR}/" --ignore-not-found=true
  echo -e "${GREEN}✓ Resources deleted${NC}"

elif [ "$ACTION" = "status" ]; then
  echo ""
  echo -e "${YELLOW}Deployment Status:${NC}"
  kubectl get deployment -n "${NAMESPACE}"
  
  echo ""
  echo -e "${YELLOW}Pods:${NC}"
  kubectl get pods -n "${NAMESPACE}"
  
  echo ""
  echo -e "${YELLOW}Services:${NC}"
  kubectl get svc -n "${NAMESPACE}"
  
  echo ""
  echo -e "${YELLOW}Ingress:${NC}"
  kubectl get ingress -n "${NAMESPACE}"

else
  echo -e "${RED}✗ Unknown action: $ACTION${NC}"
  echo "Available actions: apply, delete, status"
  exit 1
fi

echo ""
echo -e "${GREEN}✓ Done!${NC}"

