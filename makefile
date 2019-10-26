.PHONY: env start clean test build mrproper

env:
	docker-compose run --rm sh cp .env.example .env

node_modules:
	docker-compose run --rm npm install

start: node_modules
	docker-compose run --rm npm start

clean:
	docker-compose run --rm sh rm -rf node_modules

test:
	docker-compose run --rm npm test

build:
	docker-compose run --rm npm run build

mrproper: clean
	docker-compose run --rm sh rm -rf .env node_modules
	docker-compose down --rmi all --remove-orphans --volumes

