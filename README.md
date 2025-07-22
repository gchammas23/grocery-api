# Grocery List API

A simple RESTful service that allows managing grocery items, built using nodejs, expressjs, Typescript, Postgresql & Knex

## Requirements
- **Node.js**
- **npm**
- **PostgreSQL** running either remotely or locally
- **Matplotlib** used for plotting analytics results in the jupyter notebook
- **psycopg2** used to connect the notebook to the postgresql DB and query it

## Configuration

1. Start by copying the .env.example file with your own credentials and details:
```cp .env.example .env```

2. After filling the env file, the npm packages must be installed ``` npm run install ```

3. Run the initialization migration schema using ``` npm run migrate ```

4. After ensuring that the database credentials are correctly filled in the .env file and that the database server is up, you can run the application using ``` npm run start ```

5. If everything has been successfully set up, you should see the following message on the terminal ``` Server listening on port 3000 ``` or whatever port is set

## Additional

You can find a copy of the postman collection that I set up while testing out the APIs I created in this repository
The jupyter notebook for the python analytics part can also be found in this repository (file name is analytics.ipynb)
