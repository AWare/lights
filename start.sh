#!/usr/bin/env bash

yarn start 2>&1 | tee > (ts > logfile)