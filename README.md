# quizz

Quizz bot

## Requirements

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [GNU/Make](https://www.gnu.org/software/make/) (optional, should be installed on most GNU/Linux & Mac OS X)

## Installation

```console
$ git clone https://github.com/aminnairi/discord-bot-quizz.git
$ cd discord-bot-quizz
```

## Commands

`make` | `docker-compose` | Description
---|---|---
`make start` | `docker-compose run --rm npm start` | Bot startup
`make clean` | `docker-compose run --rm sh rm -rf node_modules` | Environment cleaning
