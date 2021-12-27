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
	"username" varchar(50) PRIMARY KEY UNIQUE,
	"balance" numeric(19,4) NOT NULL,
	"password" varchar(255) NOT NULL
);

-----------------------------------
-- Table structure for account
-----------------------------------
CREATE TABLE "account" (
	"username" varchar(50) PRIMARY KEY UNIQUE,
	"balance" numeric(19,4) NOT NULL,
	"password" varchar(255) NOT NULL,
	"phone" varchar(10) NOT NULL UNIQUE,
	"is_deleted" bool NOT NULL  -- 1: deleted
);

-----------------------------------
-- Table structure for transaction_record
-----------------------------------
CREATE TABLE "transaction_record" (
	"transaction_id" serial PRIMARY KEY,
	"amount" numeric(19,4) NOT NULL,
	"created_at" timestamp NOT NULL,
	"username" varchar(50) NOT NULL,
	"type" int NOT NULL, -- 0/1 <=> nap vao/chi ra,
	"status" varchar(10),
	
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
INSERT INTO "account" VALUES ('ID_001', 2000000, '$2b$10$UU/.rQwJRux4HLMqDue37OeY1S.BByJb7l3kI.noOeQ.PLu3v.DK6', '0900121212', FALSE);
INSERT INTO "account" VALUES ('ID_002', 2400000, '$2b$10$XXFLhavUekaG8AgYlPMA..ZuLZ3rmx/15lNC/oDiCTXLAZMXfct4m', '0900131313', FALSE);
INSERT INTO "account" VALUES ('ID_003', 2500000, '$2b$10$xHVqAckOGbDP8kuOtSt3Pu7iHO7xDSKRWWfIyhsDT2M4YuOXXcWGm', '0900141414', FALSE);
INSERT INTO "account" VALUES ('ID_004', 3100000, '$2b$10$Ct3W5S5H.9uUk2SBava.yOBYWQLRb0eg4K2gedKPfOMV3C6h96htq', '0900232323', FALSE);
INSERT INTO "account" VALUES ('ID_005', 3500000, '$2b$10$QigU8ZBUC5aKi318boewyuLabgQYdIo.k6I2FHTsgkQo8zFQJVeFK', '0900000011', FALSE);
COMMIT;

-----------------------------------
-- Table transaction_record
-- Update admin, account
-----------------------------------
BEGIN;
INSERT INTO "transaction_record" VALUES (DEFAULT, 250000, '2021-12-06 10:30:00', 'ID_001', 1, 'D');
UPDATE "account" SET "balance" = "balance" - 250000 WHERE "username" = 'ID_001';
UPDATE "admin" SET "balance" = "balance" + 250000 WHERE "username" = 'admin';

INSERT INTO "transaction_record" VALUES (DEFAULT, 400000, '2021-12-06 19:35:00', 'ID_001', 0, 'D');
UPDATE "account" SET "balance" = "balance" + 400000 WHERE "username" = 'ID_001';

INSERT INTO "transaction_record" VALUES (DEFAULT, 150000, '2021-12-07 09:05:15', 'ID_002', 1, 'D');
UPDATE "account" SET "balance" = "balance" - 150000 WHERE "username" = 'ID_002';
UPDATE "admin" SET "balance" = "balance" + 150000 WHERE "username" = 'admin';

INSERT INTO "transaction_record" VALUES (DEFAULT, 160000, '2021-12-12 11:27:15', 'ID_003', 1, 'D');
UPDATE "account" SET "balance" = "balance" - 160000 WHERE "username" = 'ID_003';
UPDATE "admin" SET "balance" = "balance" + 160000 WHERE "username" = 'admin';

INSERT INTO "transaction_record" VALUES (DEFAULT, 100000, '2021-12-13 09:20:10', 'ID_005', 0, 'D');
UPDATE "account" SET "balance" = "balance" + 100000 WHERE "username" = 'ID_005';

COMMIT;
