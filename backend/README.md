# Chapter 1: Introduction

## 1.1 Project Overview

The ABN Meal App Backend is a project created as part of the interview process to showcase the developer's skills. The project has limited features and its main objective is to retrieve data from the open weather map API.

The project is built using Nestjs and TypeScript technologies. The project also makes use of one external API, which is The Meal DB API.

## 1.2 Folder Structure

The folder structure of the project is organized in a way that follows the Model-Controller-Service (MCS) design pattern.

This is the directory structure:

```
.
├── README.md
├── dist
│   ├── app.controller.d.ts
│   ├── app.controller.js
│   ├── app.controller.js.map
│   ├── app.module.d.ts
│   ├── app.module.js
│   ├── app.module.js.map
│   ├── app.service.d.ts
│   ├── app.service.js
│   ├── app.service.js.map
│   ├── main.d.ts
│   ├── main.js
│   ├── main.js.map
│   ├── meal
│   │   ├── dto
│   │   │   ├── search-meals.dto.d.ts
│   │   │   ├── search-meals.dto.js
│   │   │   └── search-meals.dto.js.map
│   │   ├── meal.controller.d.ts
│   │   ├── meal.controller.js
│   │   ├── meal.controller.js.map
│   │   ├── meal.module.d.ts
│   │   ├── meal.module.js
│   │   ├── meal.module.js.map
│   │   ├── meal.service.d.ts
│   │   ├── meal.service.js
│   │   ├── meal.service.js.map
│   │   └── themealdb
│   │       ├── themealdb-api-config.service.d.ts
│   │       ├── themealdb-api-config.service.js
│   │       ├── themealdb-api-config.service.js.map
│   │       ├── themealdb-api.service.d.ts
│   │       ├── themealdb-api.service.js
│   │       └── themealdb-api.service.js.map
│   ├── models
│   │   ├── Meal.d.ts
│   │   ├── Meal.js
│   │   └── Meal.js.map
│   ├── tsconfig.build.tsbuildinfo
│   └── util
│       ├── cors
│       │   ├── enable-cors-whitelist.d.ts
│       │   ├── enable-cors-whitelist.js
│       │   └── enable-cors-whitelist.js.map
│       └── error-handlers
│           ├── error-handler.d.ts
│           ├── error-handler.js
│           └── error-handler.js.map
├── nest-cli.json
├── package-lock.json
├── package.json
├── src
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── main.ts
│   ├── meal
│   │   ├── dto
│   │   │   └── search-meals.dto.ts
│   │   ├── meal.controller.spec.ts
│   │   ├── meal.controller.ts
│   │   ├── meal.module.ts
│   │   ├── meal.service.ts
│   │   └── themealdb
│   │       ├── themealdb-api-config.service.ts
│   │       └── themealdb-api.service.ts
│   ├── models
│   │   └── Meal.ts
│   └── util
│       ├── cors
│       │   ├── enable-cors-whitelist.spec.ts
│       │   └── enable-cors-whitelist.ts
│       └── error-handlers
│           ├── error-handler.spec.ts
│           └── error-handler.ts
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tsconfig.build.json
└── tsconfig.json
```

Here is a brief overview of the directory structure:

- src: Contains the main source code of the application.
  - app.controller.ts: The main controller for the application.
  - app.module.ts: The main module for the application.
  - app.service.ts: The main service for the application.
  - meal: The meal-related domain of the application.
    - dto: Contains the Data Transfer Objects (DTOs) used for meal-related endpoints.
    - meal.controller.ts: The controller responsible for meal-related endpoints.
    - meal.module.ts: The module responsible for meal-related services and controllers.
    - meal.service.ts: The service responsible for meal-related business logic.
    - themealdb: A subdomain of the meal domain responsible for interfacing with the external TheMealDB API.
      - themealdb-api-config.service.ts: A service responsible for configuring the API client.
      - themealdb-api.service.ts: A service responsible for querying the API and returning data.
  - models: Contains the data models used in the application.
  - util: Contains utility functions and configuration files.
  - cors: Contains middleware to enable Cross-Origin Resource Sharing (CORS).
  - error-handlers: Contains error handler classes to handle different types of errors.

The test directory contains end-to-end tests for the application, and the dist directory contains the compiled output when the TypeScript files are built.

This folder structure allows for a clear separation of concerns and makes it easy to add new features or refactor existing ones without disrupting the entire application. The modular design also allows for the different parts of the application to be developed and tested independently of one another.

Overall, the folder structure aims to promote maintainability, scalability, and simplicity while adhering to the principles of MCS.

# Chapter 2: Getting Started

## 2.1 Prerequisites

Before you start using the ABN Meal App, you need to have the following software installed on your computer:

- Node.js (version 10 or later)
- NPM (version 6 or later)
- Git

## 2.2 Installation

To install the ABN Meal App Backend, you need to follow these steps:

- Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/Tobiasltd/abn-meal-app.git
```

- Change into the project directory by running the following command:

```bash
cd backend
```

- Install the required dependencies using the following command:

```bash
npm install
```

Set up environment variables for your API key and port.

```
MEAL_API_KEY = '1'
MEAL_API_BASE_URL = 'https://www.themealdb.com/api/json/v1'
BACKEND_PORT = '5555'
FRONTEND_URL = 'http://localhost:3000'

```

## 2.3 Starting the Application

To start the application, use the following commands:

```bash
npm run build
npm run start
```

The application should now be running on the port specified in the environment variables.

# Chapter 3: API Documentation

The ABN Meal App provides a RESTful API for retrieving data from the Meal DB API. The API is built using the Nest.js framework and makes use of the TypeScript language.

## 3.1 Swagger Documentation

Swagger documentation for the API has been setup and is accessible by visiting https://localhost:5555/api. The Swagger documentation provides a detailed view of the available endpoints, the request and response parameters, and the expected HTTP status codes. It also provides a convenient way to test the API endpoints directly from the documentation.

# Chapter 4: Technical Architecture and Design Pattern

## 4.1 Technical Architecture

The ABN Meal App backend is built using the Nestjs and TypeScript technologies. Nestjs is a progressive Node.js framework for building efficient, scalable, and modular server-side applications. Nestjs leverages the power of TypeScript to provide type-safe and scalable code.

## 4.2 Design Pattern

The project follows the Model-Controller-Service (MCS) design pattern. In the MCS pattern, the models represent the data structures, the controllers handle user requests and the services handle the business logic.

The folder structure of the project is organized in a way that supports this design pattern, with each component of the MCS pattern located in their respective module folder.

# Chapter 5: Testing and Quality Assurance

## 5.1 Introduction

Quality assurance is a critical aspect of software development and the ABN Meal App project is no exception. The goal of quality assurance is to ensure that the code is free of bugs and runs as expected, which provides a stable and reliable solution to the end user.

## 5.2 Test Coverage

The project has a comprehensive test suite that covers all the main functionality of the app, including the controllers and services.

TO DO:

- E2E Tests
- Automate tests with precommit hook

## 5.3 Tools and Frameworks

The following tools and frameworks are used for testing and quality assurance in the ABN Meal App project:

- Jest: A popular JavaScript testing framework that is easy to use and provides a comprehensive feature set for automated testing.
- Supertest: A library for testing HTTP servers in Node.js that makes it easy to write tests for the app's API.
- Nestjs Testing Module: A testing module for Nestjs applications that provides the necessary tools and functionality to write automated tests.

## 5.4 Code Quality and Linting

The project follows a set of coding standards and best practices to ensure that the code is maintainable and easy to read. The code is linted using the popular ESLint library to ensure that it conforms to the project's coding standards.

TO DO:

- Automate linting with precommit hook
