#!/usr/bin/env bash
set -euo pipefail

# Local dev: use H2 + dev profile
export JWT_SECRET="${JWT_SECRET:-73a84bc8-3027-40da-adf1-f767800a7116}"
export SPRING_PROFILES_ACTIVE=dev

mvn spring-boot:run
