-- Run this once in SQL Server Management Studio (SSMS) or Azure Data Studio

CREATE DATABASE ChatMe;
GO

USE ChatMe;
GO

CREATE TABLE Messages (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Content NVARCHAR(1000) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE()
);
GO
