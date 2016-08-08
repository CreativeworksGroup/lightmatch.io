#!/bin/bash

echo "Builing for production..."
meteor build ~/Documents/Works/Meteor/output/ --architecture os.linux.x86_64 --server-only

