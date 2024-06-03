# Photobook

[![Maintainability](https://api.codeclimate.com/v1/badges/c7ceebd1ca92bb937b36/maintainability)](https://codeclimate.com/github/sendistephen/photobook/maintainability)

Welcome to Photobook, a dynamic web application inspired by the Unsplash platform. This project serves as a robust portal for exploring and managing a rich collection of photographs. Users can browse the latest photo uploads, delve into specific user profiles, and search for photos, topics, or collections based on their queries.

## Features

- Photo Explorer:
  Discover new and trending photos from the Unsplash platform updated regularly.
- Search Functionality:
  Search for photos, topics, or collections based on keywords or tags.
- User Profiles:
  Explore and manage your own user profiles, including photos, collections, and settings.

## Future Features and Roadmap

- GET /collections/:id/related - Get related collections for a given collection ID.
- POST /collections - Create a new collection.
- PUT /collections/:id - Update an existing collection belonging to the logged-in user. This requires the write_collections scope.
- DELETE /collections/:id - Delete an existing collection belonging to the logged-in user.
- POST /collections/:collection_id/add -Add a photo to one of the logged-in user’s collections. Requires the write_collections scope.
- DELETE /collections/:collection_id/remove - Remove a photo from one of the logged-in user’s collections.
- Improvements and Bug Fixes:

-[✕] Prevent background scrolling when the modal is open.

-[✓] Close the modal when clicking outside the modal content.

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- A clone of this repository.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sendistephen/photobook.git
   ```

2. Navigate to the project directory:

   ```bash
   cd photobook
   ```

3. Install the dependencies:

   ```bash
   yarn install
   ```

4. Start the development server:

   ```bash
   yarn dev
   ```

5. Open your web browser and navigate to `http://localhost:3000`.
