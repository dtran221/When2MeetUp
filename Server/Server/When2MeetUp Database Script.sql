USE master
GO

IF DB_ID('When2MeetUp') IS NOT NULL
BEGIN
	ALTER DATABASE When2MeetUp SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
	DROP DATABASE When2MeetUp;
END

CREATE DATABASE When2MeetUp
GO

USE When2MeetUp
GO

--create tables
CREATE TABLE Event_Info (
	Id int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	Name varchar(500) NOT NULL,
	Start_Time varchar(25) NOT NULL,
	End_Time varchar(25) NOT NULL,
	Time_Zone varchar(50) NOT NULL,
	Comment varchar(8000) NOT NULL,
	Date_Day varchar(100) NOT NULL,
)

CREATE TABLE Event_Dates (
	id int IDENTITY (1,1) NOT NULL PRIMARY KEY,
	Event_Id int NOT NULL,
	Selected_Dates int Not NULL
)

ALTER TABLE Event_Dates
ADD FOREIGN KEY (Event_Id) REFERENCES Event_Info(Id)

CREATE TABLE Event_Users (
	Id int IDENTITY (1,1) NOT NULL PRIMARY KEY,
	Name varchar(500) NOT NULL,
	Salt varchar(500),
	Password_Hash varchar(500)
)

CREATE TABLE Event_To_User (
	Event_Id int NOT NULL,
	User_Id int NOT NULL,
	CONSTRAINT PK_Person PRIMARY KEY (Event_Id,User_Id)
)

CREATE TABLE Event_Availability (
	Id int IDENTITY (1,1) NOT NULL PRIMARY KEY,
	User_Id int NOT NULL,
	Start_Date int NOT NULL,
	End_Date int NOT NULL
)

GO