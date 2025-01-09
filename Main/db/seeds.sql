INSERT INTO department (department)
VALUES 
  ('Delta Force'),
  ('The High Table'),
  ('Villa Riders'),
  ('Heartbreak Ridge'),
  ('Avengers');

INSERT INTO role (title, salary, department_id)
VALUES 
  ('Street Fighter', 50000, 1),
  ('Mercenary', 60000, 2),
  ('Machine Gunner', 70000, 3),
  ('Dirty Harry', 80000, 4),
  ('Avenger', 90000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
  ('Chuck', 'Norris', 1, 1),
  ('John', 'Wick', 2, 2),
  ('Charles', 'Bronson', 3, 3),
  ('Clint', 'Eastwood', 4, 4),
  ('Steve', 'Rogers', 5, 5);
