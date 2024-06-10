FROM postgres:16-alpine

COPY ./setup.sql /home/setup.sql
COPY ./seed.sql /home/seed.sql
COPY ./trigger-init.sql /home/trigger-init.sql
COPY ./initdb.sh /docker-entrypoint-initdb.d/init-db.sh