CREATE TABLE to_do_list (
id SERIAL PRIMARY KEY,
task VARCHAR(200) NOT NULL,
completed VARCHAR(3) NOT NULL
);
INSERT INTO "to_do_list" ("task", "completed")
VALUES ('Prime Weekend Challenge', 'No'),
('Prime LinkedIn Part1', 'No'),
('Power Steeing Fluid for Camry', 'No');