-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: d6vscs19jtah8iwb.cbetxkdyhwsb.us-east-1.rds.amazonaws.com
-- Generation Time: May 05, 2024 at 02:04 PM
-- Server version: 8.0.35
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nx9skm9wgye6fpo1`
--

-- --------------------------------------------------------

--
-- Table structure for table `Artists`
--

CREATE TABLE `Artists` (
  `ArtistID` int NOT NULL,
  `Name` varchar(64) NOT NULL,
  `API_ID` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Bio` text,
  `Artwork` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Artists`
--

INSERT INTO `Artists` (`ArtistID`, `Name`, `API_ID`, `Bio`, `Artwork`) VALUES
(3, 'Cage The Elephant', 'UCU3rXoHt2bCYbpV3s_sJlgw', 'Deeply inspired by punk music, brothers Matt and Brad Shultz began playing music in high-school with fellow students Jared Champion and Daniel Tichenor and rounded out the band by adding Nick Bockrath and Matthan Minster. Shortly after forming the band, they made the bold move to London to begin their career. Their self-titled debut album gained them international attention, catapulting them up the Billboard Alternative and Rock charts and achieving Platinum certification. Cage the Elephant has released four additional studio albums – 2011’s Thank You, Happy Birthday, the Gold-certified Melophobia and the GRAMMY®-winning albums Tell Me I’m Pretty and Social Cues. Cage The Elephant released their fifth studio album, Social Cues, on RCA Records.', 'https://lh3.googleusercontent.com/O2yQ5CuQ_Fh7Gb0NvS3CApL3txVSWS51qhKCt4THM_T2m3K_4J5ULZQiozWe50CV1U0iPsC_UBpBhd4=w120-h120-p-l90-rj'),
(4, 'Fred Again', 'UCvA7ExlBsBUb5XQEYzJC1ww', 'hi guys', 'https://lh3.googleusercontent.com/hnZ8FFJFAsixHhRIBRgWaen2D7X4j8_3_D1zMiFxxZtuUtxmTXSzMVAV0w6ZXIEiUnTi2BGnhHy85w=w120-h120-p-l90-rj'),
(5, 'Of Monsters And Men', 'UCpjxqiRSP5nQ4tp1fT2bjHg', 'Of Monsters and Men first had the world talking in 2011 with their inescapable and infectious quadruple-platinum smash “Little Talks.” An engaging mix of indie, folk, and alternative, the Icelandic quintet’s critically acclaimed full-length debut My Head Is An Animal [Republic Records] climbed to the top of the Billboard Top 200 chart and has sold over 2 million albums worldwide.\n\nSince then the group have delivered revered performances at festivals such as Lollapalooza, Bonnaroo, Coachella, Newport Folk Festival, Osheaga, Glastonbury, Reading and Leeds, Pukkelpop, and Splendour in the Grass as well as at countless sold out headline shows around the world.\n\nThey have charmed TV audiences with appearances on The Tonight Show with Jay Leno (twice), Late Night with Jimmy Fallon, The Graham Norton Show, and Saturday Night Live. In the midst of it all, they lent the single “Dirty Paws” to a trailer for The Secret Life of Walter Mitty and the iPhone 5 introduction video, while “Silhouettes” was featured on The Hunger Games: Catching Fire soundtrack.\n\nIn 2013, the group headed back home to Iceland to begin building the framework for their highly anticipated sophomore album. Splitting studio sessions between Iceland and Los Angeles throughout 2014/early 2015, Of Monsters and Men tapped Rich Costey [Muse, Foster The People, Interpol] to co-produce. The album, titled Beneath the Skin, was released on June 9th and debuted at #3 on the Billboard Album chart, and the band returned to the road in support.', 'https://lh3.googleusercontent.com/eyo9iz6-4A_Ti4a5PxzFrS9XDtbOmfrPhiE2LI0PFS5jZ3-h9rn9puL12uQST-5e6cAZ7Xg2HLvYAUY=w120-h120-p-l90-rj'),
(6, 'Nirvana', 'UCrPe3hLA51968GwxHSZ1llw', 'Nirvana was an American rock band that was formed by singer/guitarist Kurt Cobain and bassist Krist Novoselic in Aberdeen, Washington. Nirvana went through a succession of drummers, the longest-lasting being Dave Grohl, who joined the band in 1990.\n\nWith the lead single \"Smells Like Teen Spirit\" from the group\'s second album Nevermind (1991), Nirvana entered into the mainstream, bringing along with it a subgenre of alternative rock called grunge. Other Seattle grunge bands such as Alice in Chains, Pearl Jam, and Soundgarden also gained popularity, and, as a result, alternative rock became a dominant genre on radio and music television in the United States during the early-to-middle 1990s. As Nirvana\'s frontman, Kurt Cobain found himself referred to in the media as the \"spokesman of a generation\", with Nirvana the \"flagship band\" of \"Generation X\". Cobain was uncomfortable with the attention and placed his focus on the band\'s music, challenging the band\'s audience with its third studio album In Utero (1993).\n\nNirvana\'s brief run ended with Cobain\'s death in April 1994, but the band\'s popularity continued in the years that followed. More than eight years later, \"You Know You\'re Right\", an unfinished demo from the band\'s final recording session, topped radio playlists around the world. Since their debut, the band has sold over fifty million albums worldwide. Nirvana are often credited with being one of the most popular and important rock bands of recent years.', 'https://lh3.googleusercontent.com/yoFwkvvbmM3u7q0VM_HpjCnsaViQx3gWuycm5OsdmRqWBHL4LyIpNQ5kemdcoW7zrGETTutR_5c_xk8=w120-h120-p-l90-rj'),
(7, 'System Of A Down', 'UCDJftX2zx_UT_QSnBGIF96w', 'System of a Down is an Armenian-American heavy metal band formed in Glendale, California, in 1994. Since 1997, the band has consisted of founding members Serj Tankian; Daron Malakian; Shavo Odadjian; along with John Dolmayan, who replaced original drummer Andy Khachaturian.\nThe band achieved commercial success with the release of five studio albums, three of which debuted at number one on the US Billboard 200. System of a Down has been nominated for four Grammy Awards, and their song \"B.Y.O.B.\" won a Grammy Award for Best Hard Rock Performance in 2006. The band went on hiatus in 2006 and reunited in 2010. Other than two new songs in 2020, System of a Down has not released any new material since the Mezmerize and Hypnotize albums in 2005. The band has sold over 12 million records worldwide, while two of their singles, \"Aerials\" and \"Hypnotize\", reached number one on Billboard\'s Alternative Songs chart.\nAll members of System of a Down are of Armenian descent, either born to Armenian immigrants or immigrants themselves.\n\nFrom Wikipedia (https://en.wikipedia.org/wiki/System_of_a_Down) under Creative Commons Attribution CC-BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0/legalcode)', 'https://lh3.googleusercontent.com/XdaDiOJBLVO_C2TLh2XqhTdqVwrYtkhTs3wEeBtgAo3CM0CsbSpp5J9HSYgZfdepHWvQpsxENY9sXQ=w120-h120-p-l90-rj'),
(8, 'XXXTENTACION', 'UCnAcxgRZ065f_eXK1o85c1w', 'Jahseh Dwayne Ricardo Onfroy, known professionally as XXXTentacion, was an American rapper and singer-songwriter. Though a controversial figure due to his widely publicized legal troubles, XXXTentacion gained a cult following among his young fanbase during his short career with his depression- and alienation-themed music. Critics and fans often credit him for his musical versatility, with his music exploring emo, trap, trap metal, nu metal, indie rock, lo-fi, hip hop, R&B, and punk rock. He is considered to be a leading figure in the establishment of the emo rap and SoundCloud rap genres, which garnered mainstream attention during the mid-to-late 2010s.\nBorn in Plantation, Florida, XXXTentacion spent most of his childhood in Lauderhill. He began writing music after being released from a juvenile detention center and soon started his music career on SoundCloud in 2013, employing styles and techniques that were unconventional in rap music such as distortion and heavy guitar-backed instrumentals, drawing inspiration from third-wave emo and grunge.\n\nFrom Wikipedia (https://en.wikipedia.org/wiki/XXXTentacion) under Creative Commons Attribution CC-BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0/legalcode)', 'https://lh3.googleusercontent.com/No3I8pA9ows2dy6NElEr9mCXLzYxgjVvsQr7h69C03palsH1u8Q8iw-sAAUxav599Wmi64up8lbDGbI=w120-h120-p-l90-rj'),
(9, 'Craig Xen', 'UCatuWa_mFKd9QfN3xMppCfg', 'Craig J. Gordwin, known professionally as Craig Xen, is an American former rapper. He is best known for his collaborations with XXXTentacion and hip hop collective Members Only. He retired from the music industry in 2020.\n\nFrom Wikipedia (https://en.wikipedia.org/wiki/Craig_Xen) under Creative Commons Attribution CC-BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0/legalcode)', 'https://lh3.googleusercontent.com/rMa-D6eiEOjQ4JunLrc6KqadJdOil3QRzwHGS2ETVohgDQ-xmW2nLCBVo3s5aQymz_SJQ8swKSDrk4oJNg=w120-h120-l90-rj'),
(10, 'Killstation', 'UCx-J1VoYMhtROsz7FqAbVIw', '', 'https://lh3.googleusercontent.com/Pz8YlCktg65W5NpYNvfhH6TH4fpm3IO2bHhOCCQkvz-Vu-Dth9UHYxUDjki3W3ks_wZ5oYsRoRg3hlo=w120-h120-p-l90-rj'),
(11, 'Lil Peep', 'UCxcyWcW0kZFGRyetDHr3UuA', 'Gustav Elijah Åhr, known professionally as Lil Peep, was an American rapper and singer-songwriter. He was a member of the emo rap collective GothBoiClique. Helping pioneer an emo revival-style of rap and rock music, Lil Peep has been credited as a leading figure of the mid–late 2010s emo rap scene and came to be an inspiration to outcasts and youth subcultures.\nBorn in Allentown, Pennsylvania, to an American mother and a Swedish father and raised on Long Island, Åhr started releasing music on SoundCloud in 2013 under the name \"Trap Goose\", later changing his artist name to Lil Peep because his mother had called him \"Peep\" since he was a baby. He soon became popular on the platform with the release of his 2015 single \"Star Shopping\", and his popularity grew further with his release of mixtapes Lil Peep; Part One and Live Forever later that year. In 2016, Lil Peep released his widely acclaimed mixtapes Crybaby and Hellboy, along with many other projects including California Girls and Vertigo.\nLil Peep\'s first live performance was February 12, 2016, in Tucson as member of Schemaposse. Later that year, he toured briefly with Fat Nick, Mikey The Magician, and Smokepurpp.\n\nFrom Wikipedia (https://en.wikipedia.org/wiki/Lil_Peep) under Creative Commons Attribution CC-BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0/legalcode)', 'https://lh3.googleusercontent.com/TbvXoTXJz8a2xfkJxZsI0riSyrUSibnVHBFxhHTeJefWY-2-60x0VhUPkO89uF3CGOPLalsTTM-OlEeI=w120-h120-p-l90-rj'),
(12, 'Flyboy Tarantino', 'UCoSBGYDb_m4eZG9daR7k-bw', '', 'https://www.gstatic.com/youtube/media/ytm/images/artist_avatar@1200.png?sqp=CPLw1tgF-oaymwEGCHgQeFgB&rs=ALLJMcLkubZGQLMxFqq4NT1oPdrY8SoH9A'),
(13, 'Brennan Savage', 'UCcPGiF0Lv6Qzt5werHIOADA', 'DARKROOM', 'https://lh3.googleusercontent.com/98scdFS2r3pH5zdEYB4xtQfJ0YotF2H4obVdUITB-rvKXP8a_n6VbvlW5q4OHXz_raW325hEixn1bxxM=w120-h120-l90-rj'),
(14, 'Deftones', 'UCXQtyZ6gWbOYR5B8Sc2sr3g', 'Formed in Sacramento, CA, in 1988, the multiplatinum GRAMMY® Award-winning Deftones are an influential alternative presence with 10 million records sold worldwide as of 2020. The quintet’s career spans three platinum albums—Adrenaline [1995], Around The Fur [1997], and White Pony [2000]—as well as a 2001 GRAMMY® Award, a gold album Deftones [2003], and countless critical plaudits. Following the success of Diamond Eyes [2010] and Koi No Yokan [2012], Gore landed at #2 on the Billboard Top 200 in 2016, moving over 71K units first week and marking their highest chart position in 13 years. Not to mention, they curated, launched, presented, and headlined their own festival, Dia De Los Deftones, in 2018. Selling out both installments to date, the eclectic lineups hosted everyone from Future and CHVRCHES to Gojira and Megan Thee Stallion. In 2020, Deftones continue their trailblazing arc as an alternative leader with their ninth full-length album, Ohms, and a thrilling full-album remix of White Pony.', 'https://lh3.googleusercontent.com/r6bplXdmWLoSgIz2NqqoVMmPGrV2HEura0uXDqsrzEJXAkPzs8GK84_P_neAhsV127h5bcSUoWI83toi=w120-h120-p-l90-rj'),
(15, 'Korn', 'UCdSgOgQ0WtelXBMKF3tDsqg', 'KORN changed the world with the release of their self-titled debut album.  It was a record that would pioneer a genre, while the band’s enduring success points to a larger cultural moment.  The FADER notes, “There was an unexpected opening in the pop landscape and KORN articulated a generational coming-of-angst for a claustrophobic, self-surveilled consciousness. KORN became the soundtrack for a generation’s arrival as a snarling, thrashing, systemically-restrained freak show.”\n \nSince forming, KORN has sold 40 million albums worldwide, collected two GRAMMYS, toured the world countless times, and set many records in the process that will likely never be surpassed. Vocalist Jonathan Davis, guitarists James “Munky” Shaffer and Brian “Head” Welch, bassist Reginald “Fieldy” Arvizu, and drummer Ray Luzier, have continued to push the limits of the rock, alternative and metal genres, while remaining a pillar of influence for legions of fans and generations of artists around the globe.  The level of KORN’s reach transcends accolades and platinum certifications.  They are “a genuine movement in a way bands cannot be now,” attests The Ringer.  They represent a new archetype and radical innovation, their ability to transcend genre makes barriers seem irrelevant.', 'https://lh3.googleusercontent.com/stTENs_iguH8neg1sIkSoUW4cFtuEDZvRZaTtljOmghycUXsts2rvmHkH0f3FUNGNSfm2UvnbkBP1w=w120-h120-p-l90-rj'),
(16, 'Weezer', 'UCtHZHneyvFGwxg6MHcbMLAw', 'Just keeping it weezy', 'https://lh3.googleusercontent.com/yIBXAFS-4n9ms_QpluWIfuIvzJWLPXMxJjAz42FOhFoSgSSAvnvsdvk1gDUpNL_cqaZwzwt8NBq-Tg=w120-h120-p-l90-rj'),
(17, 'Chevelle', 'UCHzSN1e7DqRkwi8DVlr1tkw', 'CHEVELLE is the understated musical powerhouse who have continually delivered rock anthems for the past 27 years. Chevelle will their 9th full length album, NIRATIAS, on March 5th, 2021. The album draws on Pete\'s fascination with space travel, simulation theory and a healthy distrust/skepticism of the unknown. NIRATIAS was recorded over 2019 and 2020 with their long time producer, Joe Barresi. After almost 5 years between releases, Chevelle decided that they needed to put music out again, even if the landscape for music is difficult and uncertain. \"We decided that pandemic or not, we are a rock band and writing and releasing music is just what we do. Even if it\'s just for our mental health, it\'s reason enough to put NIRATIAS out and feel some normalcy and pride in what we have been working on. As music fans, we appreciate this from the bands we follow and we hope our fans will appreciate it too.\"\n\nPlatinum and gold albums across their 8 studio records, 7 number one hits, 17 songs reaching the top 10 charts, over 5 million records sold in the USA and many more world wide. 2 compilation releases, a successful live CD and two live DVD releases completes their extensive body of work to date.', 'https://lh3.googleusercontent.com/-tlG14wX-HgdzSsLJvDFaIt5icrWIiFQQsrCYLZubhsdniPAjGwtz01ySfud0qNOrhvOC7cwy9DpwQ=w120-h120-p-l90-rj'),
(18, 'Bôa', 'UCaenWyZ-AH1CHWUsTYxgDgg', 'The alternative rock of BOA was a natural procession for the kids of Bad Company\'s Paul Rodgers. The band, which is fronted by the sister/brother duo of Jasmine Rodgers and Steve Rodgers, came together in 1993 with Alex Caird (bass), Paul Turrell (keyboards), and Lee Sullivan (drums), and together their single \"Duvet\" was a hit for the Japanese animation sci-fi series LAIN. Since then they have gone on to achieve critical acclaim in the U.K. and Japan, winning fans via the Internet. Signed to Pioneer, BOA\'s full-length debut Twilight was slated for an early 2001 release date.', 'https://lh3.googleusercontent.com/ZcnkOVEKXf9-Ki7BojUN8WPzzNUlKesynfD8OscAGxxLdSywuLn3Q6EbDLhCM7dPgNVcTRfyKN7DkX8=w120-h120-p-l90-rj'),
(19, 'Novulent', 'UCgQfBmV8q8KLlS-DfZe_V1w', '', 'https://lh3.googleusercontent.com/CJ9HeAPnI3Byp_tGoYugLnnPUVNl7hi-wVIUSfFIJ44W9PxP9wVRXj8h_ZdoOsHAEh-Solg3efoOSpBR=w120-h120-l90-rj'),
(20, 'Laufey', 'UCJtROTPxo3qnEzww8JyDxuA', 'Laufey Lín Bing Jónsdóttir, known mononymously as Laufey, is an Icelandic singer-songwriter and record producer. She achieved prominence in the early 2020s for her success as a jazz-inspired pop artist, with critics noting that her jazz-inflected songs have received considerable success for a genre that has largely declined commercially.\nHaving performed as a cello soloist with the Iceland Symphony Orchestra at age 15, Laufey was a finalist in the 2014 edition of Ísland Got Talent, and a semi-finalist on The Voice Iceland the following year. She released her debut EP, Typical of Me, and graduated from the Berklee College of Music in Boston. Her debut album, Everything I Know About Love, charted in Iceland and the United States. Its follow-up, Bewitched, won Best Traditional Pop Vocal Album at the 66th Annual Grammy Awards and its single \"From the Start\" found moderate chart success in Canada, New Zealand, and the United Kingdom.\n\nFrom Wikipedia (https://en.wikipedia.org/wiki/Laufey_(singer)) under Creative Commons Attribution CC-BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0/legalcode)', 'https://lh3.googleusercontent.com/1UeTp2cTje797NGcJ6IOXs6BjAtf3kBkoD4P7BLN6d-arHigrzlFL8UpF3YbmbkQwXYwWtHuiZczEvGG=w120-h120-p-l90-rj'),
(21, 'Beabadoobee', 'UCcGMuu89vageEKV8zUKhwdA', 'Beatrice Kristi Ilejay Laus, known professionally as Beabadoobee, is a Filipino-English singer and songwriter. From 2018 to 2021, she released five extended plays under the independent label Dirty Hit: Lice, Patched Up, Loveworm, Space Cadet and Our Extended Play. Her debut studio album, Fake It Flowers, was released in October 2020 and received critical acclaim. Her second studio album, Beatopia, was released on July 15, 2022.\nBeabadoobee served as a supporting act for labelmates the 1975 during several legs of their Music for Cars Tour, as well as American singer Clairo during her Immunity Tour. She was nominated for the Rising Star Award at the 2020 Brit Awards, and was presented with the Radar Award at the 2020 NME Awards. Beabadoobee was also predicted as a breakthrough act for 2020 in an annual BBC poll of music critics, Sound of 2020. In 2023, Beabadoobee was an opening act for Taylor Swift at the Eras Tour.\n\nFrom Wikipedia (https://en.wikipedia.org/wiki/Beabadoobee) under Creative Commons Attribution CC-BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0/legalcode)', 'https://lh3.googleusercontent.com/kdFz2_Hu8Vq0qTKpdSEr16QxhjpT5m-M0O-rYikdwhFdjTQMMX3jTkjgVKFWq3Mn0OaBblQnUyP2SUM=w120-h120-p-l90-rj'),
(22, 'Mitski', 'UCqqY2nAz23oGDMNdiDzKdsA', 'Sometimes Mitski feels life would be easier without hope or a soul or love. But when she closes her eyes and thinks about what’s truly hers, what can’t be repossessed or demolished, she sees love. “The best thing I ever did in my life was to love people,” she says. “I wish I could leave behind all the love I have after I die, so I can shine all this goodness, all this love that I’ve created onto other people.” She hopes her newest album, The Land Is Inhospitable and So Are We, will shine love long after she’s gone. That’s precisely how it feels: like a love that’s haunting the land.\n \n“This is my most American album,” she says. The music feels like a profound act of witnessing this country, in all its private sorrows and contradictions. Sonically Mitski’s most epic and wise album, it introduces wounds and then actively heals them. Here, love is time-traveling to bless our tender days, like light from a distant star.\n \nIt\'s full of the ache of the grown-up, seemingly mundane heartbreaks and joys that are often unsung but feel enormous. It’s a tiny epic. From the bottom of a glass, to a driveway slushy with memory and snow, to a freight train barreling through the Midwest, all the way to the moon, it feels like everything and everyone is crying out in pain, arching towards love. Love is that inhospitable land, beckoning and then rejecting us. To love this place, this earth, this America, this body takes work. It might be impossible. The best things are.\n\nWritten by Will Arbery', 'https://lh3.googleusercontent.com/G4cFrH3KEZL76OBK1TZJmtQsFTd6HWFWjweYduU4iAlsqjUVCoUVbCDTk5uHy8sa7L3jqkmOMyBHdpYi=w120-h120-p-l90-rj'),
(23, 'd4vd', 'UCGr1UQ4CwzRMmYoQfHQQWTg', 'Hailing from Houston, Texas, d4vd (pronounced “David”) burst onto the internet with his supernova single “Romantic Homicide,” which peaked at #19 on the Spotify US Top 50 chart and #1 on Spotify US Viral chart. With over 25 million global streams on Spotify alone, d4vd’s “pure and genuine” vocals, as Lyrical Lemonade deems, has officially won over the online music community. d4vd’s elusive beginnings as an artist only go back as far as 2021 with a string of genre-defying singles as the teenage sensation showcased his ability to chameleon his vocal and songwriting talents to various production styles - from indie to rock to R&B. With limited access to a studio let alone professional music equipment, d4vd began creating music by linking up with producers online and then recording his vocals over the production with just his iPhone. From there, the teenage maverick, who also doubles as an avid video game player, started off teasing his singles while playing Fortnite, causing a frenzy of interest from his viewers and fellow players to release the music he was playing. d4vd also took to TikTok and uploaded different versions of his music using the app BandLab, igniting millions of views and creates using the original sounds on his page before songs were even released.', 'https://lh3.googleusercontent.com/JjRSstvja5BjX3foPiYhdKiaLe3WGMIzsymwcNeL3AE4uYG_U4orJVQRw4BnPyHPvrLGt0G0KoqrMBw=w120-h120-p-l90-rj'),
(24, 'Foo Fighters', 'UCwDw2KaS8jRUxAPScL2U8og', 'Rock Band', 'https://lh3.googleusercontent.com/jz-K7CgyTTI8qC3kFCVLQSSzlw9-ReJQ1rJIJ09FN4ba4acUzGs-u1qBJzE6Sow7SzT78OC1kbW3dw=w120-h120-p-l90-rj'),
(25, 'Soundgarden', 'UCfTh3k6OyoUutinINQJiIHA', 'Soundgarden was an American rock band formed in Seattle, Washington, in 1984 by singer and drummer Chris Cornell, lead guitarist Kim Thayil, and bassist Hiro Yamamoto. Cornell switched to rhythm guitar in 1985, replaced on drums initially by Scott Sundquist, and later by Matt Cameron in 1986. Yamamoto left in 1989 and was replaced initially by Jason Everman and shortly thereafter by Ben Shepherd. The band dissolved in 1997 and reformed in 2010. Following Cornell\'s death in 2017 and a year of uncertainty regarding the band\'s future, Thayil declared in October 2018 that Soundgarden had disbanded once again, though they did reunite in January 2019 for a one-off concert in tribute to Cornell. Both Cornell and Thayil were the only members to appear in every incarnation of the band.\nThe band helped to popularize grunge music, a style of alternative rock that developed in the American Pacific Northwest in the mid-1980s, alongside such Seattle contemporaries as Alice in Chains, Pearl Jam, and Nirvana. They were the first of a number of grunge bands to sign to the Seattle-based record label Sub Pop, through which they released two EPs: Screaming Life and Fopp.\n\nFrom Wikipedia (https://en.wikipedia.org/wiki/Soundgarden) under Creative Commons Attribution CC-BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0/legalcode)', 'https://lh3.googleusercontent.com/mEx_GJ6sRrEhnd1OurdHJHX6qPWCf8rlkbHSHomLMgRfyB15fcplfJIq18IBxYzMqvyBIIvnBdesDIeu=w120-h120-p-l90-rj'),
(26, 'Mötley Crüe', 'UCaeBWvnAVVgyfFT-gnWwURg', 'Hailing from Los Angeles, CA, the quartet—Vince Neil (vocals), Mick Mars (guitars), Nikki Sixx (bass), and Tommy Lee (drums)—has commandeered the rock pantheon for 38years as the leaders in rock history. They’ve accumulated worldwide album sales exceeding 100m, 7 platinum and multi-platinum albums, 22 Top 40 mainstream rock hits, 6 Top 20 pop singles, 3 GRAMMY nominations, 4 New York Times best-sellers and even landed a star on the Hollywood Walk of Fame. Known for their iconic live performances, they’ve sold-out countless tours across the globe in front of millions with never-seen-before production elements such as Tommy Lee’s, Crüecifly-Drum-Rollercoaster and Nikki Sixx\'s, Flame-Throwing-Bass.', 'https://lh3.googleusercontent.com/3733Vu3lYU5XY_Mzk1VpsVVC8g2-qfiz4yygxpge-w4lsYhCG73ahvH0Ng989tC4gO8KpKuz_g=w120-h120-p-l90-rj'),
(27, 'Johnny Cash', 'UCiGs21G3KeE2tpbbMPzn9Qg', 'Johnny Cash is an icon whose music and image resonate among multiple generations. His unique, sparse songs bridged a gap between country and rock and roll; later in his career, his live prison concerts, popular television series and marriage to June Carter Cash shaped his image as “The Man In Black”: a lone musical maverick who made his own rules.', 'https://lh3.googleusercontent.com/SlNpMXIjETv20E18jDArTeP5iWam9pZvCPfnWyh3BiXhzwmQQ_FwFOzPd3_yXHjKFQhX7VpZ0Qgxpw=w120-h120-p-l90-rj'),
(28, 'Creed', 'UCU5EMBTzSO9gg6p4NFu2tWw', 'www.creed.com', 'https://lh3.googleusercontent.com/MVERRzfNr7plo8vdXg544bMr0_40wmQhIuQq-ikWWNAMnEghKZSF8CxJ0SBM5Vo2WKOtkx3uXIjlVQ=w120-h120-p-l90-rj');

-- --------------------------------------------------------

--
-- Table structure for table `FavoriteArtists`
--

CREATE TABLE `FavoriteArtists` (
  `UserID` int NOT NULL,
  `ArtistID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `FavoriteArtists`
--

INSERT INTO `FavoriteArtists` (`UserID`, `ArtistID`) VALUES
(3, 3),
(3, 4),
(3, 5),
(3, 6),
(4, 6),
(4, 7),
(4, 8),
(4, 9),
(4, 10),
(4, 11),
(4, 12),
(4, 13),
(4, 14),
(4, 15),
(4, 16),
(4, 17),
(4, 18),
(4, 19),
(4, 20),
(4, 21),
(4, 22),
(4, 23),
(4, 24),
(4, 25),
(3, 26),
(8, 27);

-- --------------------------------------------------------

--
-- Table structure for table `FavoriteSongs`
--

CREATE TABLE `FavoriteSongs` (
  `UserID` int NOT NULL,
  `SongID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `FavoriteSongs`
--

INSERT INTO `FavoriteSongs` (`UserID`, `SongID`) VALUES
(3, 3),
(3, 6),
(3, 7),
(3, 8),
(3, 9),
(4, 10),
(4, 11),
(4, 12),
(3, 16),
(8, 20),
(8, 21),
(3, 22);

-- --------------------------------------------------------

--
-- Table structure for table `LikedPlaylists`
--

CREATE TABLE `LikedPlaylists` (
  `UserID` int DEFAULT NULL,
  `PlaylistID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `LikedPlaylists`
--

INSERT INTO `LikedPlaylists` (`UserID`, `PlaylistID`) VALUES
(3, 21);

-- --------------------------------------------------------

--
-- Table structure for table `Playlists`
--

CREATE TABLE `Playlists` (
  `PlaylistID` int NOT NULL,
  `UserID` int DEFAULT NULL,
  `PlaylistName` varchar(255) DEFAULT NULL,
  `Likes` int DEFAULT NULL,
  `CreationDate` date DEFAULT NULL,
  `Public` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Playlists`
--

INSERT INTO `Playlists` (`PlaylistID`, `UserID`, `PlaylistName`, `Likes`, `CreationDate`, `Public`) VALUES
(10, 3, 'Random Mix #1', 274, '2024-04-29', 1),
(11, 8, 'Admin\'s playlist 1', 492, '2024-05-02', 1),
(12, 8, 'WIP', 43, '2024-05-02', 1),
(13, 8, 'sample 3', 891, '2024-05-02', 0),
(18, 21, 'Gordon\'s playlist', 27, '2024-05-05', 1),
(19, 21, 'usertest1', 311, '2024-05-05', 0),
(21, 21, 'Gordon\'s playlist 2', 99, '2024-05-05', 1),
(22, 22, 'test', 271, '2024-05-05', 1),
(23, 22, 'test2', 0, '2024-05-05', 1);

-- --------------------------------------------------------

--
-- Table structure for table `PlaylistSongs`
--

CREATE TABLE `PlaylistSongs` (
  `PlaylistID` int NOT NULL,
  `SongID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `PlaylistSongs`
--

INSERT INTO `PlaylistSongs` (`PlaylistID`, `SongID`) VALUES
(10, 3),
(10, 7),
(10, 8),
(10, 13),
(10, 15),
(11, 17),
(18, 18),
(21, 20),
(21, 26),
(21, 27),
(18, 28),
(21, 28),
(18, 29),
(18, 30),
(22, 32),
(22, 33),
(22, 34);

-- --------------------------------------------------------

--
-- Table structure for table `Songs`
--

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

--
-- Dumping data for table `Songs`
--

INSERT INTO `Songs` (`SongID`, `Title`, `Artist`, `Album`, `DurationInSeconds`, `YoutubeID`, `Genre`, `ReleaseDate`, `Artwork`) VALUES
(3, 'Ready to Let Go', 'Cage the Elephant', 'Social Cues', 188, '38DzgoMQGeg', 'Alternative', '2019-02-05', 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e9/31/cc/e931cc5a-e541-5348-b601-1a3053474acb/886447488812.jpg/1000x1000bb.jpg'),
(6, 'leavemealone', 'Fred again.. & Baby Keem', 'leavemealone - Single', 223, 'Ne_8fXkcAZw', 'Electronic', '2022-01-18', 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/f7/da/f7/f7daf71b-52b2-c906-1d68-eec11a75b2f6/5054197912979.jpg/1000x1000bb.jpg'),
(7, 'Delilah (pull me out of this)', 'Fred again..', 'Actual Life 3 (January 1 - September 9 2022)', 251, 'Q6MhT4n9nKI', 'Electronic', '2021-04-15', 'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/b0/9c/b7/b09cb72c-cca9-5d66-bc9d-a9b5e5f86b22/5054197236389.jpg/1000x1000bb.jpg'),
(8, 'Little Talks', 'Of Monsters and Men', 'My Head Is an Animal', 267, 'KtDmEy7R_c8', 'Alternative', '2011-09-20', 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/a3/a8/c2/a3a8c2ee-79ca-f4f0-8adb-0060e04432fd/12UMGIM10062.rgb.jpg/1000x1000bb.jpg'),
(9, 'Chop Suey!', 'System Of A Down', 'Toxicity', 210, 'CSvFpBOe8eY', 'Hard Rock', '2001-08-13', 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/82/51/52/825152b4-9423-b23b-c036-cc67ead732d4/888888046775.jpg/1000x1000bb.jpg'),
(10, 'Heart-Shaped Box', 'Nirvana', 'Nirvana', 279, 'n6P0SitRwy8', 'Alternative', '1993-08-30', 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/7b/58/c2/7b58c21a-2b51-2bb2-e59a-9bb9b96ad8c3/00602567924166.rgb.jpg/1000x1000bb.jpg'),
(11, 'Lithium', 'Nirvana', 'Nirvana', 255, '553VogDv5DI', 'Alternative', '1991-09-24', 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/7b/58/c2/7b58c21a-2b51-2bb2-e59a-9bb9b96ad8c3/00602567924166.rgb.jpg/1000x1000bb.jpg'),
(12, 'Riot', 'XXXTENTACION', 'Riot - Single', 79, 'QH1tsa-_G9Y', 'Hip-Hop/Rap', '2015-05-01', 'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/bf/ff/ee/bfffee78-6763-b159-20fe-6305127d6e59/194690234071_cover.jpg/1000x1000bb.jpg'),
(13, 'leavemealone', 'Fred again..', '', 223, 'Ne_8fXkcAZw', '', '0000-00-00', 'https://lh3.googleusercontent.com/ne8vuhbzhV0nXiNBlUD8blvTYEvl9njZNrwhcBpp3KIlR5gNqmwSHd9V3O72Q8Ln8DVkDU_tZLCv7IQh=w120-h120-s-l90-rj'),
(14, 'On With The Show (2021- Remaster)', 'Mötley Crüe', 'Unknown', 244, 'NijPVAu42aI', 'Unknown', '2024-05-01', 'https://lh3.googleusercontent.com/JArVQiAgR4b3lvCuqjzluDfybWQ00JcPSk3sb2qLrH-Ch9bzjIp9QBhGFhuLHvMxJe0Ufk4MH6yTI-um=w120-h120-l90-rj'),
(15, 'On With The Show', 'Motley Crue', 'Indulgence, Inc.: A Tribute to Motley Crue', 247, 'OE0ZGATMbCc', 'Glam Rock', '1995-10-04', 'https://lh3.googleusercontent.com/7-LncTw8mn5_l836c0OJHeon8iJ-I9lfZnDRXiTYUvhyFC11-nQihWsyBLv_7vYdm36rnkqKX3tAJFrz=w120-h120-l90-rj'),
(16, 'On With the Show', 'Doorslammer', 'Indulgence, Inc.: A Tribute to Motley Crue', 236, 'OE0ZGATMbCc', 'Glam Rock', '1995-10-04', 'https://is1-ssl.mzstatic.com/image/thumb/Music1/v4/4e/ee/c5/4eeec51b-52e1-1551-437d-a8b42bb5b85e/1023_300dpi.jpg/1000x1000bb.jpg'),
(17, 'Cowboys Prayer, Oh Bury Me Not (Live)', 'Johnny Cash', 'Unknown', 315, 'hdWvNwR_nxk', 'Unknown', '2024-05-02', 'https://lh3.googleusercontent.com/XrD00vtWtZGaZRmLBGPua0Umkw4EElzyrlt5Kzi3Wdf4NggQ3GAhmro5AGlqfvqJC0qNhlbO-Rqc41A=w120-h120-l90-rj'),
(18, 'A Cowboy\'s Prayer / Oh Bury Me Not (live)', 'Johnny Cash', 'Unknown', 315, '2uEGU8pFDls', 'Unknown', '2024-05-02', 'https://lh3.googleusercontent.com/qjCCm8wnQzwK2tdNRinmdYMIE9btE75oBAuQFitVzOaeqOk2l_Sf0JNm06hRmOjNGeMJ_sqQRom9UnM=w120-h120-l90-rj'),
(19, 'Walk', 'Pantera', 'The Best of Pantera: Far Beyond the Great Southern Cowboys\' Vulgar Hits! (Remastered)', 316, 'kOV2iTeGQik', 'Metal', '1992-02-25', 'https://lh3.googleusercontent.com/xfX88ACRutKYFjzHwddX-6ooMR9XVwrGVOUdGGCfIWSLWox0H5stlwtl1Hwx_Y7tbMuMiIIAu-GO_FE=w120-h120-l90-rj'),
(20, 'Ring of Fire', 'Ronnie Dunn', 'We Walk the Line - A Celebration of the Music of Johnny Cash (Live)', 195, '7PnypQU9HlM', 'Country', '2012-08-07', 'https://is1-ssl.mzstatic.com/image/thumb/Features114/v4/3e/66/d8/3e66d8ba-8496-ce79-5c87-5fcb984902d2/dj.quondcxn.jpg/1000x1000bb.jpg'),
(21, 'Rusty Cage (Live)', 'The Man In Black: A Tribute To Johnny Cash', 'The Man In Black at Riverside Casino', 308, 'DArJ46ov6qQ', 'Country', '2022-06-10', 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/15/6f/98/156f985e-237d-97b1-8d55-03833a91f266/859762492697_cover.jpg/1000x1000bb.jpg'),
(22, 'Cigarette Daydreams', 'Cage the Elephant', 'Melophobia', 209, 'opeETnB8m8w', 'Alternative', '2013-10-08', 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/73/34/af/7334affd-fc75-b3f7-04de-fad6e9f54c69/886444143073.jpg/1000x1000bb.jpg'),
(23, 'One Last Breath', 'Creed', 'Greatest Hits', 239, 'qcX9HNIHwkg', 'Hard Rock', '2001-01-01', 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/d5/b4/ef/d5b4ef8a-a68f-223b-df91-16294395ffce/00601501410321.rgb.jpg/1000x1000bb.jpg'),
(24, 'Epic Thunder & Rain, Rainstorm Sounds for Relaxing, Focus or Sleep', 'Nature Sounds', 'Tamer of Dragons (Original story sound track)', 7303, 'K6fFRo_tLgQ', 'Soundtrack', '2023-08-11', 'https://lh3.googleusercontent.com/gppgR-OmUgh0Epdeckm4Z7-3Q6sHjt_Pm7ZAsZhi8beqAQedEtmiFxwvrGls65U7inWhcflEh0MVCWeyZg=w120-h120-l90-rj'),
(25, 'Forgotten', 'Korn', 'Requiem', 198, 'YDloBItdalY', 'Hard Rock', '2022-02-04', 'https://lh3.googleusercontent.com/2KY_nWD196SIXVxwrZXuoOiFnW8SeWK-_9DMEgPZPupYOVpk8SWbbjDhdwXp7jzxkjJ3Jq0psa_QRirm=w120-h120-l90-rj'),
(26, 'Worst Is On Its Way', 'Korn', 'Requiem', 244, 'WU5379W_niI', 'Hard Rock', '2022-02-04', 'https://lh3.googleusercontent.com/2KY_nWD196SIXVxwrZXuoOiFnW8SeWK-_9DMEgPZPupYOVpk8SWbbjDhdwXp7jzxkjJ3Jq0psa_QRirm=w120-h120-l90-rj'),
(27, 'Bring Me To Life', 'Evanescence', 'Bring Me To Life - Evanescence (feat. Magnus Mefisto) [Cover en Español] - Single', 236, '-eGM0IJc70Y', 'Pop', '2020-05-08', 'https://lh3.googleusercontent.com/DMgrzZ84TP0DawBf7NwNbqzQg2-TY_prMUPh7WvjTOOPLxyiTryNgzxBFCkyZhKG0H8agCdcwitxSm8=w120-h120-l90-rj'),
(28, 'Cold', 'Jessie Murph', 'Cold - Single', 171, 'D4gQeplELmw', 'Pop', '2024-04-26', 'https://lh3.googleusercontent.com/O1ZYnZhGXCZJAxGcK4c0vUa01bjh3JszJnD9JvH8jsJPh_osNGIL8S__fh1uF0oDFOurZB_3SygkkSEjUw=w120-h120-l90-rj'),
(29, 'Can You Hear Me', 'Korn', 'The Nothing', 173, 'mWP8vlepbnE', 'Hard Rock', '2019-09-13', 'https://lh3.googleusercontent.com/pTAyxKxnS0EP7iU9-bAoCXKpyN94fM8rH_MNbn5z0Slv9y9qohx8oK4WQ-BfYn_wfytObway8vsxmT5Q=w120-h120-l90-rj'),
(30, 'Passenger', 'Deftones', 'Lullaby Versions of Deftones', 369, 'uTen4lcHVAo', 'Children\'s Music', '2012-10-30', 'https://lh3.googleusercontent.com/XEJt-XhTk5piMoZX9bjWm9davr_AEVPE7RC4kMHLX77jzLjjWhqgDcvqoNLnuTgk2GiOWgU5FoaVJn0=w120-h120-l90-rj'),
(31, 'The Way She Moves', 'Zion', 'The Perfect Melody', 234, '1Um0_bRxzV4', 'Urbano latino', '2007-05-15', 'https://lh3.googleusercontent.com/QoFer-_L2k9EJce3q2mdanfQd52-boY9vsgLm1vaefYtJFTp8s5fPYAl6xDlv5bmOrJk2bmHH34AZnrcvg=w120-h120-l90-rj'),
(32, 'Dreamscape', '009 Sound System', '009 Sound System', 294, 'uOqfs0ls92s', 'Dance', '2008-04-09', 'https://lh3.googleusercontent.com/EhViiEwu6H24aW8NWbpOQwTf8qnFdikgHMcWNTQRnGqE63vE0MDgULpA6j2GMTHaoFLtZW7oLKitrmlz=w120-h120-l90-rj'),
(33, 'With a Spirit', '009 Sound System', '009 Sound System', 599, '_It2Ao3-jgE', 'Dance', '2009-09-11', 'https://lh3.googleusercontent.com/eJHEpB0OKRRj2YqkZ7uzcgPmqNYSFfNo1C-_1AHLshR69AwMF__FJ7O-2Nl1y0RljQV2KkH5Jdj_4Y0=w120-h120-l90-rj'),
(34, 'Trinity', '009 Sound System', '009 Sound System', 603, 'kBVDRgbg_MU', 'Dance', '2009-02-11', 'https://lh3.googleusercontent.com/EhViiEwu6H24aW8NWbpOQwTf8qnFdikgHMcWNTQRnGqE63vE0MDgULpA6j2GMTHaoFLtZW7oLKitrmlz=w120-h120-l90-rj'),
(35, 'Born to Be Wasted', '009 Sound System', '009 Sound System', 374, 'GffbGvtZUkM', 'Dance', '2009-12-10', 'https://lh3.googleusercontent.com/eJHEpB0OKRRj2YqkZ7uzcgPmqNYSFfNo1C-_1AHLshR69AwMF__FJ7O-2Nl1y0RljQV2KkH5Jdj_4Y0=w120-h120-l90-rj');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `UserID` int NOT NULL,
  `Username` varchar(64) DEFAULT NULL,
  `Password_hash` varchar(72) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`UserID`, `Username`, `Password_hash`) VALUES
(3, 'jd', '$2b$10$D9XzUnQZQ91.hALjrbnAaOQP2AlYo.pScKPjz.tDO5eGGwNDCAdE.'),
(4, 'Jadin', '$2b$10$73BBR16G3tww5UGhLNClm.KurP.4f7vFyBWPGMbpQzrWxa42jsSGG'),
(8, 'admin', '$2b$10$hMWOHuKOuiIdFxA2kSCKN.xNqBf7dQemV2e8YRtanx52jg70Fgvk2'),
(10, 'darko', '$2b$10$6sTDj1IJY78RzFcIBtzZh.z2S4JY3uZ024LSl4xSWVsLEHuTrqsHi'),
(17, 'test', '$2b$10$2ld4R08n7KJZQxwiSf/wAOtgVwNHIisUfkbVNRbuhRFaM5.vGGLtq'),
(18, 'test2', '$2b$10$xJFa6YqKXEMTrQJQTVaG6ODE.SJspQNCaVu/5oRAhlwNpslBNYXiG'),
(19, 'test3', '$2b$10$GFwIW14RNVojkIny5U9ocu.fVA23zgFWU2WQwgsS3T8Onbc9Hg6.2'),
(20, 'test4', '$2b$10$bWU/Afra.pKcm9GBIrOwYOA1dNEqmJQcNY7/FbprDK2bKQTkx22Im'),
(21, 'test1', '$2b$10$YuinqL9IbQG/3f/FdOzcZua0JjEsHLC4w1B0Ph0W14OJ.L1MrHsz2'),
(22, 'user2', '$2b$10$LKiBWon.5K59lK5iQyXbUud5wXONlSYu/ujVEG0bW62YZTdtMNsMG');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Artists`
--
ALTER TABLE `Artists`
  ADD PRIMARY KEY (`ArtistID`);

--
-- Indexes for table `FavoriteArtists`
--
ALTER TABLE `FavoriteArtists`
  ADD PRIMARY KEY (`UserID`,`ArtistID`),
  ADD KEY `ArtistID` (`ArtistID`);

--
-- Indexes for table `FavoriteSongs`
--
ALTER TABLE `FavoriteSongs`
  ADD PRIMARY KEY (`UserID`,`SongID`),
  ADD KEY `SongID` (`SongID`);

--
-- Indexes for table `LikedPlaylists`
--
ALTER TABLE `LikedPlaylists`
  ADD KEY `UserID` (`UserID`),
  ADD KEY `PlaylistID` (`PlaylistID`);

--
-- Indexes for table `Playlists`
--
ALTER TABLE `Playlists`
  ADD PRIMARY KEY (`PlaylistID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `PlaylistSongs`
--
ALTER TABLE `PlaylistSongs`
  ADD PRIMARY KEY (`PlaylistID`,`SongID`),
  ADD KEY `SongID` (`SongID`);

--
-- Indexes for table `Songs`
--
ALTER TABLE `Songs`
  ADD PRIMARY KEY (`SongID`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`UserID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Artists`
--
ALTER TABLE `Artists`
  MODIFY `ArtistID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `Playlists`
--
ALTER TABLE `Playlists`
  MODIFY `PlaylistID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `Songs`
--
ALTER TABLE `Songs`
  MODIFY `SongID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `UserID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `FavoriteArtists`
--
ALTER TABLE `FavoriteArtists`
  ADD CONSTRAINT `FavoriteArtists_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`),
  ADD CONSTRAINT `FavoriteArtists_ibfk_2` FOREIGN KEY (`ArtistID`) REFERENCES `Artists` (`ArtistID`);

--
-- Constraints for table `FavoriteSongs`
--
ALTER TABLE `FavoriteSongs`
  ADD CONSTRAINT `FavoriteSongs_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`),
  ADD CONSTRAINT `FavoriteSongs_ibfk_2` FOREIGN KEY (`SongID`) REFERENCES `Songs` (`SongID`);

--
-- Constraints for table `LikedPlaylists`
--
ALTER TABLE `LikedPlaylists`
  ADD CONSTRAINT `LikedPlaylists_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`),
  ADD CONSTRAINT `LikedPlaylists_ibfk_2` FOREIGN KEY (`PlaylistID`) REFERENCES `Playlists` (`PlaylistID`);

--
-- Constraints for table `Playlists`
--
ALTER TABLE `Playlists`
  ADD CONSTRAINT `Playlists_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`);

--
-- Constraints for table `PlaylistSongs`
--
ALTER TABLE `PlaylistSongs`
  ADD CONSTRAINT `PlaylistSongs_ibfk_1` FOREIGN KEY (`PlaylistID`) REFERENCES `Playlists` (`PlaylistID`),
  ADD CONSTRAINT `PlaylistSongs_ibfk_2` FOREIGN KEY (`SongID`) REFERENCES `Songs` (`SongID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
