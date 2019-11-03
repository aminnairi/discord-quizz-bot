.PHONY: env start clean test lint build mrproper snyk

env:
	docker-compose run --rm sh cp .env.example .env

node_modules:
	docker-compose run --rm npm install

start: node_modules
	docker-compose run --rm npm start

clean:
	docker-compose run --rm sh rm -rf node_modules

snyk:
	docker-compose run --rm npm run snyk

lint:
	docker-compose run --rm npm run lint

test:
	docker-compose run --rm npm test

build:
	docker-compose run --rm npm run build

mrproper: clean
	docker-compose run --rm sh rm -rf .env node_modules
	docker-compose down --rmi all --remove-orphans --volumes

