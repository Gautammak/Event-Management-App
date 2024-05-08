# Event Management App

This project is an event management application built using Node.js, Express, Sequelize, PostgreSQL, and Apollo GraphQL. It allows users to register, authenticate using JWT (JSON Web Tokens), create events, invite others to events, update events, retrieve events by ID, and list all events.

## Features

- **User Registration**: Users can register with the application.
- **JWT Authentication**: Implemented JWT-based authentication for registered users.
- **Create Events**: Authenticated users can create events.
- **Invite Others**: Users can invite others to events.
- **Update Events**: Users can update events they've created.
- **Retrieve Events by ID**: Users can retrieve events by their unique ID.
- **List All Events**: Display a list of all events.

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js: [Download and Install Node.js](https://nodejs.org/)
- PostgreSQL: [Download and Install PostgreSQL](https://www.postgresql.org/download/)
- Sequelize CLI: Install globally using `npm install -g sequelize-cli`

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your_username/event-management-app.git
cd event-management-app
npm install
Create a .env file in the root directory of the project and add the following variables:
DATABASE_URL=postgres://username:password@localhost:5432/databasename
JWT_SECRET=your_secret_key
PORT=3000
sequelize db:migrate
npm start

Technologies Used
    Node.js: A JavaScript runtime built on Chrome's V8 JavaScript engine.
    Express: A minimal and flexible Node.js web application framework.
    Sequelize: A promise-based Node.js ORM for PostgreSQL, MySQL, SQLite, and MSSQL.
    PostgreSQL: A powerful, open-source object-relational database system.
    Apollo GraphQL: A comprehensive GraphQL solution with excellent client and server support.
