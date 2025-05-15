CREATE TABLE `Artists` (
  `ArtistID` int NOT NULL,
  `Name` varchar(64) NOT NULL,
  `API_ID` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Bio` text,
  `Artwork` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `FavoriteArtists` (
  `UserID` int NOT NULL,
  `ArtistID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `FavoriteSongs` (
  `UserID` int NOT NULL,
  `SongID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `LikedPlaylists` (
  `UserID` int DEFAULT NULL,
  `PlaylistID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Playlists` (
  `PlaylistID` int NOT NULL,
  `UserID` int DEFAULT NULL,
  `PlaylistName` varchar(255) DEFAULT NULL,
  `Likes` int DEFAULT NULL,
  `CreationDate` date DEFAULT NULL,
  `Public` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `PlaylistSongs` (
  `PlaylistID` int NOT NULL,
  `SongID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Songs` (
  `SongID` int NOT NULL,
  `Title` varchar(255) DEFAULT NULL,
  `Artist` varchar(255) DEFAULT NULL,
  `Album` varchar(255) DEFAULT NULL,
  `DurationInSeconds` int DEFAULT NULL,
  `YoutubeID` varchar(32) NOT NULL,
  `Genre` varchar(64) NOT NULL,
  `ReleaseDate` date NOT NULL,
  `Artwork` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Users` (
  `UserID` int NOT NULL,
  `Username` varchar(64) DEFAULT NULL,
  `Password_hash` varchar(72) CHARACTER SET utf8mb4 COLLATE=utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
