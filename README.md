# NC-News_Bend_Block_review

https://nc-news-ianpeek.herokuapp.com

This project comprises the backend for a news api which serves up articles, comments, topics and users.

The corresponding Front end for this repo is hosted at:  https://nc-news-ianpeek.herokuapp.com
with the accompanying Front end code, here: https://github.com/IanJPeek/NCNewsflash2

### Prerequisites
To run this project, the following must be installed globally:

| Dependency | Version |
| ---------- | ------- |
| PostgreSQL | 12.1    |
| Node.JS    | 12.9.1  |
| NPM        | 6.10.3  |

The below must also be installed as developer dependencies:


| Dependency    | Version |
| ------------- | ------- |
| Express       | 4.17.1  |
| Knex          | 0.20.2  |
| Node Postgres | 7.12.1  |
| Chai          | 4.2.0   |
| Chai-Sorted   | 0.2.0   |
| Mocha         | 6.2.2   |
| Supertest     | 4.0.2   |


### Installation
To set up the development environment, follow these steps:

Step 1: Clone the repository with the command:

$ git clone https://github.com/IanJPeek/NC-News_Bend_Block_review.git

Step 2: Open the repository with a code editor (eg VS Code or your own editor of preference)

Step 3: Navigate into the cloned repository, then install dependencies via the terminal with the command:

npm install

Step 4: Create a knexfile.js file in the main directory, then insert the following lines of code:

```const ENV = process.env.NODE_ENV || "development";

const baseConfig = {
client: "pg",
migrations: {
directory: "./db/migrations"
},
seeds: {
directory: "./db/seeds"
}
};

const customConfig = {
production: {
connection: `${DB_URL}?ssl=true`,
},
development: {
connection: {
database: "nc_news"
// username: only applicable if Linux User,
// password: only applicable if Linux User
}
},
test: {
connection: {
database: "nc_news_test"
// username: only applicable if Linux User,
// password: only applicable if Linux User
}
}
};

module.exports = { ...customConfig[ENV], ...baseConfig };
```

NB: postGreSQL will require a username and password if you are running a linux system. If you are running on Mac OSX, you can remove the username and password keys from both development and test.

Step 5: Run the commands below in terminal to set up "test" and "development" databases:

```
$ npm run setup-dbs
$ npm run seed
```

To see your databases you can run the command:


```
\$ psql
\c nc_news_test
```

or

```
\$ psql -f queries.sql > output.txt
```

The above command with create a .txt file, displaying the tables and the data inserted.

Running the tests: To test endpoints locally and ensure everything is correctly configured use the command: $ npm t

Endpoints: The table below outlines the purpose of each test category, for additional details please review the app.spec.js file.



| Endpoint                           | Request | Tests                                                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| /api                               | GET     | serves up a json representation of all the available endpoints of the api.                                                                                                                                                                                                                              |
| /api/topics                        | GET     | Serves an array of all topics.                                                                                                                                                                                                                                                                       |
| /api/users                         | GET     | Serves an array of all users.                                                                                                                                                                                                                                                                               |
| /api/users/:username               | GET     | Serves the details of a requested user. Returns an error if the requested user does not exist.                                                                                                                                                                                                                              |
| /api/articles                      | GET     | Serves an array of all articles. Also ensures that the queries (author, topic, sort-by, order) function as intended, returning errors for any invalid values.                                                                                             |
| /api/articles/:article_id          | GET     | Serves an individual article object. Returns an error if the requested article ID does not exist or a non-integer is entered.                                                                                                                                                                                                            |
| /api/articles/:article_id          | PATCH   | Changes the number of the 'votes' property of an individual article object (and returns the updated article). Returns an error if additional keys are provided or a non-integer is entered as the value of the required "inc_votes" body.                                                                                            |
| /api/articles/:article_id/comments | GET     | Serves an array of all comments on an individual article. Returns an error if the requested article ID does not exist or a non-integer is entered. Also ensures that valid queries (sort-by, order) function as intended, returning errors if invalid values are provided.|
| /api/articles/:article_id/comments | POST    | Posts a new comment to a specified individual article, returning the new comment. Returns an error if invalid/ non-existent article IDs are entered. Also returns an error if incorrect data is provided in the body of the request.                                                                 |
| /api/comments | GET     | Serves an array of all comments. |
| /api/comments/:comment_id          | PATCH   | Changes the number of the 'votes' property of an individual comment object (and returns the updated comment). Returns an error if additional keys are provided, or non-integers are given for the required "inc_votes" body.                                                                                           |
| /api/comments/:comment_id          | DELETE  | Deletes a specified comment according to the supplied ID. Returns an error if the specified comment does not exist or non-integer IDs are entered.                                                                                                                                                                                                             |

