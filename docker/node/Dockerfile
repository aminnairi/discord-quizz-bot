FROM alpine

RUN apk add --update nodejs
RUN addgroup -g 1000 -S user
RUN adduser -h /home/user -g "" -s /bin/sh -G user -S -D -u 1000 user

USER user

WORKDIR /home/user/app

ENTRYPOINT [ "/usr/bin/node" ]
