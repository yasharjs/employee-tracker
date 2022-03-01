# Employee Tracker

![license](https://img.shields.io/badge/License-The_unlicense-blue)

# Description

 a command-line application that manages a company's employee database, using Node.js, Inquirer, and MySQL.

# Table of Contents
- [Description](#Description)
- [Installation](#Installation)
- [Usage](#Usage)
- [Credits and Questions](#Credits)
- [License](#License)

# Installation
[Instructional Video!](https://drive.google.com/file/d/1Soa38eBTIRu68_kKxbOplY2WUoKagH3V/view)

To use this application you must have Node.js and SQL installed on your system. Visit [node installation](https://nodejs.org/en/download/) and [SQL installation](https://dev.mysql.com/downloads/mysql/) to download and install.

After installing the required softwares, clone the repository. In the terminal, navigate to the application's directory, then run the following command once:
```
npm install
```

# Usage

In the terminal, once you have navigated to the application's directory and installed the node package manager, go to the index.js file and update the SQL database password. Go to your MySQL shell and populate the database by running the following commands:
```
source db/db.sql;
source db/schema.sql;
source db/seeds.sql;
quit;
```

Then run the following command to start the application:
```
node index.js
```
The application will execute in your terminal. Simply answer the prompts in the terminal and add, delete or update data.

# Questions 

Contact information is provided below:
* Author: Yashar Sarabi
* Github: [Yasharjs](https://github.com/yasharjs)
* Email: yasharjs@gmail.com

# License
This project is licensed under the [The Unlicensed](https://choosealicense.com/licenses/unlicense/)


