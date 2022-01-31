#!/bin/bash

cd /server/

python manage.py collectstatic --noinput
python manage.py migrate 

sleep 3

python manage.py initadmin

exec "$@"