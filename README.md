# recipe-organizer

Bohužel je tento projekt silně nedodělán, kvůli technickým potížím(disk s projektem nefunkční) a následnému nedostatku času. Tudíž je toto verze 2.0 a těžce nedodělaná.

Projekt byl vytvořen pomocí HTML, CSS, JS, Node.js

# How to run:
This connection string needs to be changed for your local db server, its located in server.js.
## const connectionString = "Data Source=(localdb)\\Local;Initial Catalog=recipe-organizer-db2;Encrypt=False;";
Script pro vytvoření databáze se nachází na konci dokumentu. Kvůli již zmíněnému nedostatku času se však použila jen Entita Recipes.

## Je potřeba spustit lokálně databázi(script na konci dokumentu)
## server.js je potřeba spustit pomocí "node server.js"
## Poté jde spustit samotná stránka index.html


MSSQL script:
USE [master]
GO
/****** Object:  Database [recipe-organizer-db]    Script Date: 23.06.2023 7:57:28 ******/
CREATE DATABASE [recipe-organizer-db]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'recipe-organizer-db_Data', FILENAME = N'C:\Users\matou\AppData\Local\Microsoft\Microsoft SQL Server Local DB\Instances\Local\recipe-organizer-db.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'recipe-organizer-db_Log', FILENAME = N'C:\Users\matou\AppData\Local\Microsoft\Microsoft SQL Server Local DB\Instances\Local\recipe-organizer-db.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [recipe-organizer-db] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [recipe-organizer-db].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [recipe-organizer-db] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [recipe-organizer-db] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [recipe-organizer-db] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [recipe-organizer-db] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [recipe-organizer-db] SET ARITHABORT OFF 
GO
ALTER DATABASE [recipe-organizer-db] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [recipe-organizer-db] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [recipe-organizer-db] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [recipe-organizer-db] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [recipe-organizer-db] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [recipe-organizer-db] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [recipe-organizer-db] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [recipe-organizer-db] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [recipe-organizer-db] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [recipe-organizer-db] SET  DISABLE_BROKER 
GO
ALTER DATABASE [recipe-organizer-db] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [recipe-organizer-db] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [recipe-organizer-db] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [recipe-organizer-db] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [recipe-organizer-db] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [recipe-organizer-db] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [recipe-organizer-db] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [recipe-organizer-db] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [recipe-organizer-db] SET  MULTI_USER 
GO
ALTER DATABASE [recipe-organizer-db] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [recipe-organizer-db] SET DB_CHAINING OFF 
GO
ALTER DATABASE [recipe-organizer-db] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [recipe-organizer-db] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [recipe-organizer-db] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [recipe-organizer-db] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [recipe-organizer-db] SET QUERY_STORE = OFF
GO
USE [recipe-organizer-db]
GO
/****** Object:  Table [dbo].[Recipes]    Script Date: 23.06.2023 7:57:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Recipes](
	[RecipeID] [int] NOT NULL,
	[UserID] [int] NOT NULL,
	[Title] [nvarchar](100) NOT NULL,
	[Ingredients] [nvarchar](max) NOT NULL,
	[Instructions] [nvarchar](max) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[RecipeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 23.06.2023 7:57:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserID] [int] NOT NULL,
	[Username] [nvarchar](20) NOT NULL,
	[Password] [nvarchar](20) NOT NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Recipes]  WITH CHECK ADD FOREIGN KEY([UserID])
REFERENCES [dbo].[Users] ([UserID])
GO
USE [master]
GO
ALTER DATABASE [recipe-organizer-db] SET  READ_WRITE 
GO
