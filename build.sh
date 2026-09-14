#!/usr/bin/env bash

pip install -r requirements.txt

npm --prefix frontend install
npm --prefix frontend run build

python manage.py collectstatic --noinput

python manage.py migrate