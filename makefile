.PHONY: start clean

node_modules:
	docker-compose run --rm npm install

start: node_modules
	docker-compose run --rm npm start

clean:
	docker-compose run --rm sh rm -rf node_modules
