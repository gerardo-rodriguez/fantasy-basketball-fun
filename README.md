# Fantasy Basketball Fun

This is an app to explore the Yahoo Fantasy Sports API

## Goals

What are the goals? What do I want to do?

- Be able to compare my team on a per week basis. (My week 1 vs my week 2)
- Be able to compare my team, on a per week basis, against other teams. (My week 2 vs Team C week 2)

## API 

| Route                        | HTTP Verb | Description |
| ---------------------------- | --------- | --- |
| `/api/leagues`               | `GET`     | Will retrieve all leagues. |
| `/api/leagues/:id`           | `GET`     | Will retrieve a specific league. |
| `/api/leagues/:id/weeks`     | `GET`     | Will retrieve all weeks for a specific league. |
| `/api/leagues/:id/weeks/:id` | `GET`     | Will retrieve a specific week for a specific league. |

## Setup

To run app:

  	npm start
