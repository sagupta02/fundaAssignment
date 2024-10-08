# Funda.nl Test Automation Project

This project contains automated tests for the **funda.nl** website using **Playwright**. The test suite is designed to verify the performance, functionality, and responsiveness of the website across different scenarios.

## Installation Instructions

### 1. Prerequisites

- **Node.js**: Make sure you have **Node.js** version 18.18.0 installed on your machine. You can download it from [nodejs.org](https://nodejs.org/). The specfic version is due to ESLINT compatibility. 
  
### 2. Clone the Repository

Clone this project from GitHub to your local machine:

```bash
git clone https://github.com/yourusername/fundaassignment.git
```
### 3. Run below commands to install packages

```bash
npm install
```

### 3. Add env variable values 
The tests needs below values to be filled in `.env` file in order to run. 

```bash
LOGIN_USERNAME= ## Specify existing email address
LOGIN_PASSWORD= ## Specify existing account password
USER_AGENT_SECRET= ## Shared with me for the assignment . Please use the same .
```

## How to Run Tests

```bash
make run-test-headless
```



## Project Features:

### 1. **.github/workflows**
This folder contains configuration files for CI/CD pipelines using GitHub Actions.

### 2. Dependabot :
Dependabot for automated dependency updates.

### 3. **Helpers**
This folder contains helper utilities used across the test files.

### 4. **.env**
Used to store sensitive environment variables like cookie values or API tokens.

### 5. Test Reports and Results
Stored under `playwright-report` & `test-results`

### 6. Devices and Browsers
Runs the tests in Chrome browser and firefox and also on latest Iphone models and Samsung phones. Can be extended to more.  
  
### 7. **Prettier & ESLint Configs**
  
- **.prettierrc**: Configuration for Prettier, enforcing code formatting.
  
- **eslint.config.mjs**: Configuration for ESLint, enforcing JavaScript coding standards.

### 8. **Makefile**
Contains commands for common tasks such as installing dependencies, running tests, or cleaning up test artifacts.


