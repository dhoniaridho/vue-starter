#!/bin/bash

# path
app_path="Dockerfile"

# app
sed -i "s|{{ VITE_BASE_URL }}|$VITE_BASE_URL|g" $app_path