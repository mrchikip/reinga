CREATE DATABASE tangata;

USE tangata;


-- USERS TABLE
CREATE TABLE users (
  id INT NOT NULL,
  fullname VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

ALTER TABLE users
  ADD PRIMARY KEY (id);


-- EMPLOYEES TABLE
CREATE TABLE employees (
  id INT NOT NULL,
  fistname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  centrocosto VARCHAR(255) NOT NULL,
  proceso VARCHAR(255) NOT NULL,
  lider VARCHAR(255) NOT NULL,
  startingPoint VARCHAR(255) NOT NULL
);

ALTER TABLE employees
  ADD PRIMARY KEY (id);


  -- ROUTES TABLE
  CREATE TABLE routes (
    id INT NOT NULL,
    routename VARCHAR(255) NOT NULL
  );

    ALTER TABLE routes
        ADD PRIMARY KEY (id);

    
    -- schedules TABLE
    CREATE TABLE schedules (
      id INT NOT NULL,
      nameSchedule VARCHAR(255) NOT NULL,
    );

      ALTER TABLE schedules
          ADD PRIMARY KEY (id);
    
--week TABLE
CREATE TABLE week (
  id INT NOT NULL,
  day VARCHAR(255) NOT NULL
);

    ALTER TABLE week
        ADD PRIMARY KEY (id);


-- registry TABLE
CREATE TABLE registry (
  id INT NOT NULL,
  date DATE NOT NULL,
  employee_id INT NOT NULL,
  route_id INT NOT NULL,
  schedule_id INT NOT NULL,
  startingPoint VARCHAR(255) NOT NULL
);

    ALTER TABLE registry
        ADD PRIMARY KEY (id);  

