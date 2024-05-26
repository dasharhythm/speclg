#!/bin/bash

# Define the source and destination directories
SOURCE_DIR="./assets"
DEST_DIR="./compressed_assets"

# Ensure the destination directory exists
if [ ! -d "$DEST_DIR" ]; then
    mkdir -p "$DEST_DIR"
fi

# Function to compress a single file
compress_file() {
    FILE=$1
    # Get the relative path of the file
    REL_PATH="${FILE#$SOURCE_DIR/}"
    # Get the directory of the relative path
    REL_DIR=$(dirname "$REL_PATH")
    # Ensure the destination directory exists
    mkdir -p "$DEST_DIR/$REL_DIR"
    # Compress the file and save it to the destination directory
    optipng -o7 "$FILE" -out "$DEST_DIR/$REL_PATH"
    echo "Compressed $FILE -> $DEST_DIR/$REL_PATH"
}

export -f compress_file
export SOURCE_DIR
export DEST_DIR

# Find all PNG files in the source directory and compress them in parallel
find "$SOURCE_DIR" -name '*.png' | xargs -n 1 -P 4 -I {} bash -c 'compress_file "$@"' _ {}
