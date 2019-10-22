# Contributing

## Requirements

- [Docker][Docker]
- [Docker Compose][Docker Compose]
- [GNU/Make][GNU/Make] (optional, should be installed on most GNU/Linux & Mac OS X)

## Installation

```console
$ git clone https://github.com/aminnairi/discord-bot-quizz.git
$ cd discord-bot-quizz
```

## Commands

*Notes: [GNU/Make][GNU/Make] requires [Docker][Docker] & [Docker Compose][Docker Compose]*

### Environment setup

#### Docker Compose

```console
$ docker-compose run --rm sh cp .env.example .env
```

#### GNU/Make

```console
$ make env
```

### Node.js dependencies installation

#### [Docker Compose][Docker Compose]

```console
$ docker-compose run --rm npm install
```

#### [GNU/Make][GNU/Make]

Automatic installation if the `node_modules` folder does not exist.

### Bot startup

#### [Docker Compose][Docker Compose]

```console
$ docker-compose run --rm npm start
```

#### [GNU/Make][GNU/Make]

```console
$ make start
```

### Environment cleaning

#### [Docker Compose][Docker Compose]

```console
$ docker-compose run --rm sh rm -rf node_modules .env
```

#### [GNU/Make][GNU/Make]

```console
$ make clean
```

[Docker]: https://www.docker.com/
[Docker Compose]: https://docs.docker.com/compose/
[GNU/Make]: https://www.gnu.org/software/make/
