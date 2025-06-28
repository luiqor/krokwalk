# KrokWalk 🗺️

Interactive Web Application for Personalized Self-Guided Tours

## Technology stack

### Shared 👉 ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![NPM](https://img.shields.io/badge/NPM%20workspaces-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white) ![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)


### Server 👉 ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![KnexNObjection](https://img.shields.io/badge/-Knex.js%20&%20Objection.JS-D26B38?style=for-the-badge&logo=knexdotjs&logoColor=white) 

### Client 👉 ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white) ![leaflet](https://img.shields.io/badge/leaflet.JS-faf4f0?&style=for-the-badge&logo=leaflet&logoColor=green)

## Prerequirements

- node `20.x.x`
- postgres / docker (create new postges db or use db from docker-compose)

## Installation Guide

1. copy values from .env.example to .env files for both backend and frontend
2. replace gereric values with correct one in both .env files
3. run `npm install` in root
4. run `npm run build -w shared`
5. run `npm run migrate:latest -w backend`
6. (optional) in order to seed places, run `npm run seed:run -w backend`
7. run `npm run dev -w backend`
8. run `npm run dev -w frontend`

## Troubleshooting

- Try running `npm install` directly in `apps/backend`
- Try running `npm install` directly in `apps/frontend`
- Ensure valid values in .env files
- Ensure correct connection string in backend .env

## Database schema

```mermaid
erDiagram
    ACHIEVEMENTS {
        uuid id PK
        string title
        text description
        string icon_link
        string achievement_event
        int target_count
        datetime created_at
        datetime updated_at
    }


    %% UNIQUE(user_id, place_id)
    USER_ACHIEVEMENTS {
        uuid id PK
        uuid user_id FK
        uuid achievement_id FK
        datetime created_at
        datetime updated_at
    }
    USER_ACHIEVEMENTS }o--|| USERS : "user_id"
    USER_ACHIEVEMENTS }o--|| ACHIEVEMENTS : "achievement_id"

    USERS {
        uuid id PK
        string email
        string username
        string password_hash
        string password_salt
        uuid main_achievement_id FK
        datetime created_at
        datetime updated_at
    }
    ACHIEVEMENTS |o--o{ USERS : "main_achievement_id"

    PLACES {
        uuid id PK
        string title
        text description
        string address
        string thumbnail_link
        float lan
        float lng
        datetime created_at
        datetime updated_at
    }

    TAGS {
        uuid id PK
        string slug
        string title
        datetime created_at
        datetime updated_at
    }

    TOURS {
        uuid id PK
        string slug
        string title
        text description
        datetime created_at
        datetime updated_at
    }

    %% UNIQUE(user_id, place_id)
    USER_PLACES {
        uuid id PK
        uuid place_id FK
        uuid user_id FK
        string visit_status "enum"
        datetime visited_at
        datetime created_at
        datetime updated_at
    }
    USER_PLACES }o--|| USERS : "user_id"
    USER_PLACES }o--|| PLACES : "place_id"


    PLACES_TAGS {
        uuid id PK
        uuid place_id FK
        uuid tag_id FK
        datetime created_at
        datetime updated_at
    }
    PLACES_TAGS }o--|| PLACES : "place_id"
    PLACES_TAGS }o--|| TAGS : "tag_id"

    TOURS_PLACES {
        uuid id PK
        uuid place_id FK
        uuid tour_id FK
        datetime created_at
        datetime updated_at
    }
    TOURS_PLACES }o--|| TOURS : "tour_id"
    TOURS_PLACES }o--|| PLACES : "place_id"
```
