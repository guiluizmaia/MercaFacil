#!/bin/bash

yarn typeorm -c postgres migration:run
yarn typeorm -c mysql migration:run
yarn dev