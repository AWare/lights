#!/usr/bin/env bash

yarn start | tee >(ts > logfile)