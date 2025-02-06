#!/bin/bash
set -e
echo "this will be printed"
false
echo "this will not be prited"

set -u
echo "This will be printed"
echo $UNDEFINED_VARIABLE
echo "This will not be printed"
