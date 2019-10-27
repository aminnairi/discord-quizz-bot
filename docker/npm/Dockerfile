FROM alpine

RUN apk add --update nodejs npm
RUN addgroup -g $GID -S user
RUN adduser -h /home/user -g "" -s /bin/sh -G user -S -D -u $UID user

USER user

WORKDIR /home/user/app

ENTRYPOINT [ "/usr/bin/npm" ]
