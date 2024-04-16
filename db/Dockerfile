FROM postgres:16.2-alpine3.19

COPY ./init.sql /docker-entrypoint-initdb.d/init.sql

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DB=postgres
