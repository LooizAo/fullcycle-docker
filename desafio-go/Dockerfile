# syntax=docker/dockerfile:1

FROM golang:1.16-alpine AS builder

WORKDIR /app

COPY main.go ./

RUN go build main.go

FROM scratch 

COPY --from=builder /app .

CMD [ "./main" ]