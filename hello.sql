INSERT INTO users_table (id, username, password, email, first_name, last_name, profile_pic, bio, role)
VALUES (
  uuid_generate_v4(), 
  '',
  '$2a$12$0Qz1rPZjfM4PpzzWRsbhhe3OV0q/mxL/GAknzTJ4Khv49i8e0Mhxe',
  'kelvinnjuguna@example.com',
  'Kelvin',
  'Njuguna',
  '', 
  '', 
  'admin'
);

UPDATE users_table
SET password = '$2a$12$NKvekSyzkoUiLwrNJzOOS.hM47leiZtcGuH42p3fgN5KSN5sVM.Wq'
WHERE email = 'kelvinnjuguna@example.com';

