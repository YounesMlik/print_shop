#!/bin/bash
set -e


docker compose exec -T app "$@"