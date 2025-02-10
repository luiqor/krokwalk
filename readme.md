# KrokWalk

## database schema

```mermaid
erDiagram
    PLACES {
        uuid id PK
        string title
        text description
        string address
        string thumbnail_link
        float lan
        float lng
        float elevation "~"
        datetime created_at
        datetime updated_at
    }

    PLACES_TAGS }o--|| PLACES : "place_id"
    PLACES_TAGS }o--|| TAGS : "tag_id"
    PLACES_TAGS {
        uuid id PK
        uuid place_id FK
        uuid tag_id FK
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

    TOURS_PLACES }o--|| PLACES : "place_id"
    TOURS_PLACES }o--|| TOURS : "tour_id"
    TOURS_PLACES {
        uuid id PK
        uuid place_id FK
        uuid tour_id FK
        datetime created_at
        datetime updated_at
    }
```
