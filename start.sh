#!/usr/bin/env bash

yarn start | tee >(ts \"%d-%m-%y %H_%M_%S\" > logfile)