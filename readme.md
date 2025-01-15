# KrokWalk

## database schema

```mermaid
erDiagram
    PLACES {
        int id PK
        string title
        string description
        string address
        string preview_link
        float latitude
        float longitude
        float elevation
        datetime created_at
        datetime updated_at
    }
```
