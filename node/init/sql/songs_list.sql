/*!40101 SET NAMES utf8 */;

# 音乐列表
CREATE TABLE   IF NOT EXISTS  `songs_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT, # 音乐ID
  `uid` int(11) NOT NULL,   # 用户ID
  `song_name` varchar(255) DEFAULT NULL,    # 音乐名
  `origin` varchar(255) DEFAULT NULL, # 音乐来源
  `singer` varchar(255) DEFAULT NULL,     # 歌手名 
  `create_time` varchar(20) DEFAULT NULL,   # 创建时间
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;