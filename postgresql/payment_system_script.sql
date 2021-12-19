-- ======================================
-- database name: payment_system
-- ======================================
--CREATE DATABASE payment_system ENCODING 'UTF8';

-- ======================================
-- 			Drop table if exists
-- ======================================
DROP TABLE IF EXISTS "transaction_record" CASCADE;
DROP TABLE IF EXISTS "admin" CASCADE;
DROP TABLE IF EXISTS "account" CASCADE;


-- ======================================
-- 			Create table
-- ======================================
-----------------------------------
-- Table structure for admin
-----------------------------------
CREATE TABLE "admin" (
	"username" varchar(50) PRIMARY KEY,
	"balance" numeric(19,4) NOT NULL,
	"password" varchar(255) NOT NULL
);

-----------------------------------
-- Table structure for account
-----------------------------------
CREATE TABLE "account" (
	"username" varchar(50) PRIMARY KEY,
	"balance" numeric(19,4) NOT NULL,
	"password" varchar(255) NOT NULL,
	"phone" varchar(10) NOT NULL UNIQUE
);

-----------------------------------
-- Table structure for transaction_record
-----------------------------------
CREATE TABLE "transaction_record" (
	"transaction_id" serial PRIMARY KEY,
	"amount" numeric(19,4) NOT NULL,
	"created_at" timestamp NOT NULL,
	"username" varchar(50) NOT NULL,
	"type" int NOT NULL, -- 0/1 <=> nap vao/chi ra
	
	FOREIGN KEY (username) REFERENCES account(username)
);


-- ======================================
-- 			Insert data
-- ======================================
-----------------------------------
-- Table admin
-- password: 123
-- bcrypt, saltRound=10
-----------------------------------
BEGIN;
INSERT INTO "admin" ("username", "balance", "password")
VALUES ('admin', 1000000, '$2b$10$VDqC/tAM2BZ/GIX2CuDtPOTptGgEZjZ9YI.IL2igb0qOK0VyWNHUS');
COMMIT;

-----------------------------------
-- Table account
-- password: 123
-- bcrypt, saltRound=10
-----------------------------------
BEGIN;
INSERT INTO "account" ("username", "balance", "password", "phone") 
VALUES ('thin', 2000000, '$2b$10$UU/.rQwJRux4HLMqDue37OeY1S.BByJb7l3kI.noOeQ.PLu3v.DK6', '0900121212');
INSERT INTO "account" ("username", "balance", "password", "phone") 
VALUES ('thy', 2400000, '$2b$10$XXFLhavUekaG8AgYlPMA..ZuLZ3rmx/15lNC/oDiCTXLAZMXfct4m', '0900131313');
INSERT INTO "account" ("username", "balance", "password", "phone") 
VALUES ('nhan', 2500000, '$2b$10$xHVqAckOGbDP8kuOtSt3Pu7iHO7xDSKRWWfIyhsDT2M4YuOXXcWGm', '0900141414');
INSERT INTO "account" ("username", "balance", "password", "phone") 
VALUES ('duy', 3100000, '$2b$10$Ct3W5S5H.9uUk2SBava.yOBYWQLRb0eg4K2gedKPfOMV3C6h96htq', '0900232323');
INSERT INTO "account" ("username", "balance", "password", "phone") 
VALUES ('trung', 3500000, '$2b$10$QigU8ZBUC5aKi318boewyuLabgQYdIo.k6I2FHTsgkQo8zFQJVeFK', '0900000011');
INSERT INTO "account" ("username", "balance", "password", "phone") 
VALUES ('viet', 4900000, '$2b$10$tIqC8/3hR/gX/Lflb5W8I.1BEkowAa6aYtL7cQpSjJk3yM4MSMBE2', '0900000022');
INSERT INTO "account" ("username", "balance", "password", "phone") 
VALUES ('nam', 4500000, '$2b$10$BlNygHawXHfvkl2cAOk8d.IKdpBSL34kpMC7YjF8h9zqYnNFtg.Bq', '0900000033');
COMMIT;

-----------------------------------
-- Table transaction_record
-- Update admin, account
-----------------------------------
BEGIN;
INSERT INTO "transaction_record" VALUES (DEFAULT, 250000, '2021-12-06 10:30:00', 'thy', 1);
UPDATE "account" SET "balance" = "balance" - 250000 WHERE "username" = 'thy';
UPDATE "admin" SET "balance" = "balance" + 250000 WHERE "username" = 'admin';

INSERT INTO "transaction_record" VALUES (DEFAULT, 400000, '2021-12-06 19:35:00', 'thy', 0);
UPDATE "account" SET "balance" = "balance" + 400000 WHERE "username" = 'thy';

INSERT INTO "transaction_record" VALUES (DEFAULT, 150000, '2021-12-07 09:05:15', 'duy', 1);
UPDATE "account" SET "balance" = "balance" - 150000 WHERE "username" = 'duy';
UPDATE "admin" SET "balance" = "balance" + 150000 WHERE "username" = 'admin';

INSERT INTO "transaction_record" VALUES (DEFAULT, 260000, '2021-12-07 11:25:12', 'nhan', 1);
UPDATE "account" SET "balance" = "balance" - 260000 WHERE "username" = 'nhan';
UPDATE "admin" SET "balance" = "balance" + 260000 WHERE "username" = 'admin';

INSERT INTO "transaction_record" VALUES (DEFAULT, 350000, '2021-12-08 06:17:30', 'thin', 1);
UPDATE "account" SET "balance" = "balance" - 350000 WHERE "username" = 'thin';
UPDATE "admin" SET "balance" = "balance" + 350000 WHERE "username" = 'admin';

INSERT INTO "transaction_record" VALUES (DEFAULT, 100000, '2021-12-08 20:00:21', 'nhan', 1);
UPDATE "account" SET "balance" = "balance" - 100000 WHERE "username" = 'nhan';
UPDATE "admin" SET "balance" = "balance" + 100000 WHERE "username" = 'admin';

INSERT INTO "transaction_record" VALUES (DEFAULT, 300000, '2021-12-09 12:12:21', 'trung', 1);
UPDATE "account" SET "balance" = "balance" - 300000 WHERE "username" = 'trung';
UPDATE "admin" SET "balance" = "balance" + 300000 WHERE "username" = 'admin';

INSERT INTO "transaction_record" VALUES (DEFAULT, 200000, '2021-12-10 08:40:12', 'thin', 0);
UPDATE "account" SET "balance" = "balance" + 200000 WHERE "username" = 'thin';

INSERT INTO "transaction_record" VALUES (DEFAULT, 150000, '2021-12-10 11:25:12', 'thy', 1);
UPDATE "account" SET "balance" = "balance" - 150000 WHERE "username" = 'thy';
UPDATE "admin" SET "balance" = "balance" + 150000 WHERE "username" = 'admin';

INSERT INTO "transaction_record" VALUES (DEFAULT, 150000, '2021-12-10 14:20:50', 'duy', 0);
UPDATE "account" SET "balance" = "balance" + 150000 WHERE "username" = 'duy';

INSERT INTO "transaction_record" VALUES (DEFAULT, 200000, '2021-12-11 09:45:42', 'trung', 0);
UPDATE "account" SET "balance" = "balance" + 200000 WHERE "username" = 'trung';

INSERT INTO "transaction_record" VALUES (DEFAULT, 240000, '2021-12-12 08:45:12', 'duy', 1);
UPDATE "account" SET "balance" = "balance" - 240000 WHERE "username" = 'duy';
UPDATE "admin" SET "balance" = "balance" + 240000 WHERE "username" = 'admin';

INSERT INTO "transaction_record" VALUES (DEFAULT, 350000, '2021-12-12 06:17:30', 'thin', 1);
UPDATE "account" SET "balance" = "balance" - 350000 WHERE "username" = 'thin';
UPDATE "admin" SET "balance" = "balance" + 350000 WHERE "username" = 'admin';

INSERT INTO "transaction_record" VALUES (DEFAULT, 160000, '2021-12-12 11:27:15', 'nhan', 1);
UPDATE "account" SET "balance" = "balance" - 160000 WHERE "username" = 'nhan';
UPDATE "admin" SET "balance" = "balance" + 160000 WHERE "username" = 'admin';

INSERT INTO "transaction_record" VALUES (DEFAULT, 100000, '2021-12-13 09:20:10', 'thin', 0);
UPDATE "account" SET "balance" = "balance" + 100000 WHERE "username" = 'thin';

COMMIT;
