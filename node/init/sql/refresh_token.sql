/*!40101 SET NAMES utf8 */;

# 用户信息表
CREATE TABLE   IF NOT EXISTS  `refresh_token` (
  `uid` int(11) NOT NULL,         # 用户ID
  `token` varchar(255) DEFAULT NULL,    # refresh_token
  `expired` varchar(255) DEFAULT NULL, # 过期时间
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;