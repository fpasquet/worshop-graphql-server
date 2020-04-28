WORKSPACE ?= $(PWD)

install: ## Install the project
	@yarn

start-server: ## Build assets and launch server
	@yarn start:dev

load-fixtures: ## Load fixtures
	@yarn typeorm:fixtures

unit-tests: ## Launch unit tests
	@yarn test

.PHONY: install

.DEFAULT_GOAL := help
help:
	@grep -E '(^[a-zA-Z_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-25s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'
.PHONY: help
