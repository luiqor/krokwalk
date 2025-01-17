# KrokWalk

## database schema

```mermaid
erDiagram
    PLACES {
        int id PK
        string title "NN"
        string description "NN"
        string address "NN"
        string thumbnail_link "NN"
        float lan "NN"
        float lng "NN"
        float elevation
        datetime created_at "NN"
        datetime updated_at "NN"
    }
```
