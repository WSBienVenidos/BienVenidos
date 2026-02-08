#!/usr/bin/env bash
set -euo pipefail

# Load env file if present
if [ -f .env ]; then
  set -a
  # shellcheck disable=SC1091
  source .env
  set +a
fi

mvn spring-boot:run
