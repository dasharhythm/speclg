#!/bin/bash

# Define the source and destination directories
SOURCE_DIR="./assets"
DEST_DIR="./compressed_assets"

# Ensure the destination directory exists
if [ ! -d "$DEST_DIR" ]; then
    mkdir -p "$DEST_DIR"
fi

# Find all PNG files in the source directory and compress them
find "$SOURCE_DIR" -name '*.png' | while read FILE; do
    # Get the base filename
    BASENAME=$(basename "$FILE")
    # Compress the file and save it to the destination directory
    optipng -o7 "$FILE" -out "$DEST_DIR/$BASENAME"
    echo "Compressed $FILE -> $DEST_DIR/$BASENAME"
done
