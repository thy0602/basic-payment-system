--CREATE DATABASE payment_system ENCODING 'UTF8';

-- ======================================
-- 			Drop table if exists
-- ======================================
DROP TABLE IF EXISTS "admin" CASCADE;
DROP TABLE IF EXISTS "account" CASCADE;
DROP TABLE IF EXISTS "transaction_record" CASCADE;


-- ======================================
-- 				Create table
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
	"phone" varchar(10) NOT NULL
);

-----------------------------------
-- Table structure for transaction_record
-----------------------------------
CREATE TABLE "transaction_record" (
	"transaction_id" serial PRIMARY KEY,
	"amount" numeric(19,4) NOT NULL,
	"createdAt" timestamp NOT NULL,
	"username" varchar(50) NOT NULL,
	"type" int NOT NULL, -- 0/1 <=> nap vao/chi ra
	
	FOREIGN KEY (username) REFERENCES account(username)
);


-- ======================================
-- 				Insert data
-- ======================================
-----------------------------------
-- Table admin
-- password: 123
-- pwdHashedLen: 64
-- sha256
-----------------------------------
BEGIN;
INSERT INTO "admin" ("username", "balance", "password")
VALUES ('admin', 1000000, 'bc287ed886f637ca1750110fd33a710b1b89189b024a0ecd4f247b5351fcaaf217db6aeaa61');
COMMIT;

-----------------------------------
-- Table account
-- password: 123
-- pwdHashedLen: 64
-- sha256
-----------------------------------
BEGIN;
INSERT INTO "account" ("username", "balance", "password", "phone") 
VALUES ('thin', 2000000, '63b32eb8a8c7576da799de83b6faefca5e3faef851a752f2789f0420d768d46817db6afe291', '0121234343');
INSERT INTO "account" ("username", "balance", "password", "phone") 
VALUES ('thy', 2400000, 'cb290d9ad56dd9d49b4718e97be42389e735099a2c7f15baa88e7ffbc210a06217db6b0835d', '0112358111');
INSERT INTO "account" ("username", "balance", "password", "phone") 
VALUES ('nhan', 2500000, '833fc3d51cc90502f6e954f7801f9d441e1a0ec1b0c48a993aa5611b4fb3c25117db6b5563b', '0901234567');
INSERT INTO "account" ("username", "balance", "password", "phone") 
VALUES ('duy', 3100000, 'c349891dd5629a5a42facb063ce1ec68cfcd49baeeececd8d0ca3d6277d2d45a17db6b12f0b', '0913572468');
INSERT INTO "account" ("username", "balance", "password", "phone") 
VALUES ('trung', 3500000, '3645f4fc7b113cdad6c53837e63996e1c0a59f4f2a777ad4d50c40472646a6a417db6b59916', '0924681357');
INSERT INTO "account" ("username", "balance", "password", "phone") 
VALUES ('viet', 4900000, '91b851c7b058aa013c7c8584028bd8c636610e715eb984a6e3bf5deff6d1c14017db6b5c578', '0900000001');
INSERT INTO "account" ("username", "balance", "password", "phone") 
VALUES ('nam', 4500000, 'b8a659e3b678aa9b14e769bb7437975c5db37b5db0820b18a267d583d4054fb117db6b5f9ef', '0901111111');
COMMIT;

-----------------------------------
-- Table transaction_record
-- Update admin, account
-----------------------------------
BEGIN;
INSERT INTO "transaction_record" VALUES (DEFAULT, 250000, '2021-12-06 10:30:00', 'thy', 1);
UPDATE "account" SET "balance" = "balance" - 250000 WHERE "username" = 'thy';
UPDATE "admin" SET "balance" = "balance" + 250000 WHERE "username" = 'admin1';

INSERT INTO "transaction_record" VALUES (DEFAULT, 400000, '2021-12-06 19:35:00', 'thy', 0);
UPDATE "account" SET "balance" = "balance" + 400000 WHERE "username" = 'thy';

INSERT INTO "transaction_record" VALUES (DEFAULT, 150000, '2021-12-07 09:05:15', 'duy', 1);
UPDATE "account" SET "balance" = "balance" - 150000 WHERE "username" = 'duy';
UPDATE "admin" SET "balance" = "balance" + 150000 WHERE "username" = 'admin1';

INSERT INTO "transaction_record" VALUES (DEFAULT, 260000, '2021-12-07 11:25:12', 'nhan', 1);
UPDATE "account" SET "balance" = "balance" - 260000 WHERE "username" = 'nhan';
UPDATE "admin" SET "balance" = "balance" + 260000 WHERE "username" = 'admin1';

INSERT INTO "transaction_record" VALUES (DEFAULT, 350000, '2021-12-08 06:17:30', 'thin', 1);
UPDATE "account" SET "balance" = "balance" - 350000 WHERE "username" = 'thin';
UPDATE "admin" SET "balance" = "balance" + 350000 WHERE "username" = 'admin1';

INSERT INTO "transaction_record" VALUES (DEFAULT, 100000, '2021-12-08 20:00:21', 'nhan', 1);
UPDATE "account" SET "balance" = "balance" - 100000 WHERE "username" = 'nhan';
UPDATE "admin" SET "balance" = "balance" + 100000 WHERE "username" = 'admin1';

INSERT INTO "transaction_record" VALUES (DEFAULT, 300000, '2021-12-09 12:12:21', 'trung', 1);
UPDATE "account" SET "balance" = "balance" - 300000 WHERE "username" = 'trung';
UPDATE "admin" SET "balance" = "balance" + 300000 WHERE "username" = 'admin1';

INSERT INTO "transaction_record" VALUES (DEFAULT, 200000, '2021-12-10 08:40:12', 'thin', 0);
UPDATE "account" SET "balance" = "balance" + 200000 WHERE "username" = 'thin';

INSERT INTO "transaction_record" VALUES (DEFAULT, 150000, '2021-12-10 11:25:12', 'thy', 1);
UPDATE "account" SET "balance" = "balance" - 150000 WHERE "username" = 'thy';
UPDATE "admin" SET "balance" = "balance" + 150000 WHERE "username" = 'admin1';

INSERT INTO "transaction_record" VALUES (DEFAULT, 150000, '2021-12-10 14:20:50', 'duy', 0);
UPDATE "account" SET "balance" = "balance" + 150000 WHERE "username" = 'duy';

INSERT INTO "transaction_record" VALUES (DEFAULT, 200000, '2021-12-11 09:45:42', 'trung', 0);
UPDATE "account" SET "balance" = "balance" + 200000 WHERE "username" = 'trung';

INSERT INTO "transaction_record" VALUES (DEFAULT, 240000, '2021-12-12 08:45:12', 'duy', 1);
UPDATE "account" SET "balance" = "balance" - 240000 WHERE "username" = 'duy';
UPDATE "admin" SET "balance" = "balance" + 240000 WHERE "username" = 'admin1';

INSERT INTO "transaction_record" VALUES (DEFAULT, 350000, '2021-12-12 06:17:30', 'thin', 1);
UPDATE "account" SET "balance" = "balance" - 350000 WHERE "username" = 'thin';
UPDATE "admin" SET "balance" = "balance" + 350000 WHERE "username" = 'admin1';

INSERT INTO "transaction_record" VALUES (DEFAULT, 160000, '2021-12-12 11:27:15', 'nhan', 1);
UPDATE "account" SET "balance" = "balance" - 160000 WHERE "username" = 'nhan';
UPDATE "admin" SET "balance" = "balance" + 160000 WHERE "username" = 'admin1';

INSERT INTO "transaction_record" VALUES (DEFAULT, 100000, '2021-12-13 09:20:10', 'thin', 0);
UPDATE "account" SET "balance" = "balance" + 100000 WHERE "username" = 'thin';

COMMIT;
