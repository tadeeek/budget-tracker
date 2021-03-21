INSERT INTO "PUBLIC"."EXPENSE"
VALUES
    (1, 'Telephone', TIMESTAMP
'2020-04-13 20:00:00', 'Wwwaa', 2, NULL),
(2, 'Bike', TIMESTAMP '2020-04-13 20:00:00', 'Lublin', 3, NULL),
(3, 'Intercooler Audi A4 B6', NULL, 'Lublin', 3, NULL),
(4, 'Hybrid Turbo for 1.8T', NULL, 'Hel', 3, NULL),
(5, 'Wheels for bike', TIMESTAMP '2020-01-11 12:00:00', 'Lublin', 3, NULL),
(6, 'Dzien dobry test Jsona', NULL, 'Gdansk', 4, NULL),
(7, 'Anothertest', TIMESTAMP '2021-02-28 23:43:42', 'Wroclove', 3, NULL),
(8, 'Modal test', TIMESTAMP '2021-03-03 22:51:33', 'Funland', 4, NULL);

INSERT INTO "PUBLIC"."CATEGORY"
VALUES
    (1, 'Groceries'),
    (2, 'Hobby'),
    (3, 'Fun'),
    (4, 'Transport'),
    (5, 'Travel');