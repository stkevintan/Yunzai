<div align="center">

# TRSS-Yunzai 开发文档

</div>

## 开发文档咕咕咕中，有问题可联系：

- QQ：[2536554304](https://qm.qq.com/cgi-bin/qm/qr?k=x8LtlP8vwZs7qLwmsbCsyLoAHy7Et1Pj)
- QQ 群组：
1. [659945190](https://jq.qq.com/?k=VBuHGPv3)
2. [1027131254](https://jq.qq.com/?k=Af0pTDHU)
3. [300714227](https://jq.qq.com/?k=V2xVpaR7)

## 目录

| 对象 | 名称 |
| - | - |
| [Bot](#应用端) | 应用端 |
| [bot](#机器人) | 机器人 |
| [Friend](#好友) | 好友 |
| [Group](#群) | 群 |
| [Member](#群成员) | 群成员 |
| [Guild](#频道) | 频道 |
| [GuildMember](#频道成员) | 频道成员 |
| [segment](#消息段) | 消息段 |

## 应用端

> 使用 `Bot`

| 属性 | 值 | 说明 |
| - | - | - |
| uin | [ bot1_id, bot2_id, bot3_id... ] | 机器人账号 |

| 方法 | 参数 | 说明 |
| - | - | - |
| pickFriend | user_id | [好友对象](#好友) |
| pickGroup | group_id | [群对象](#群) |
| pickMember | group_id, user_id | [群成员对象](#群成员) |
| pickGuild | guild_id, channel_id | [频道对象](#频道) |
| pickGuildMember | guild_id, channel_id, user_id | [频道成员对象](#频道成员) |

## 机器人

> 使用 `this.e.bot` 或 `Bot[bot_id]`

| 属性 | 值 | 说明 |
| - | - | - |
| uin | bot_id | 机器人账号 |
| nickname | bot_name | 机器人昵称 |
| version.impl | go-cqhttp / ComWeChat / TelegramBot | 适配器名称 |
| fl | Map | 好友列表 |
| gl | Map | 群列表 |
| tl | Map | 频道列表 |

| 方法 | 参数 | 说明 | 支持 |
| - | - | - | - |
| pickFriend | user_id | [好友对象](#好友) | 全部 |
| pickGroup | group_id | [群对象](#群) | 全部 |
| pickMember | group_id, user_id | [群成员对象](#群成员) | 全部 |
| pickGuild | guild_id, channel_id | [频道对象](#频道) | go-cqhttp |
| pickGuildMember | guild_id, channel_id, user_id | [频道成员对象](#频道成员) | go-cqhttp |
| getFriendList | 无 | 好友列表 | go-cqhttp ComWeChat |
| getFriendMap | 无 | 好友列表(Map) | go-cqhttp ComWeChat |
| getGroupList | 无 | 群列表 | go-cqhttp ComWeChat |
| getGroupMap | 无 | 群列表(Map) | go-cqhttp ComWeChat |
| getGuildList | 无 | 频道列表 | go-cqhttp |
| getGuildMap | 无 | 频道列表(Map) | go-cqhttp |
| sendApi | action, params | 发送 API 请求 | go-cqhttp ComWeChat |

## 好友

> 使用 `this.e.friend` 或 `Bot.pickFriend(user_id)`

| 方法 | 参数 | 说明 | 支持 |
| - | - | - | - |
| sendMsg | msg | 发送消息 | 全部
| recallMsg | message_id | 撤回消息 | go-cqhttp |
| makeForwardMsg | msg | 发送合并消息 | go-cqhttp |
| getInfo | 无 | 好友信息 | 全部 |
| getAvatarUrl | 无 | 好友头像 | 全部 |

## 群

> 使用 `this.e.group` 或 `Bot.pickGroup(group_id)`

| 方法 | 参数 | 说明 | 支持 |
| - | - | - | - |
| sendMsg | msg | 发送消息 | 全部 |
| recallMsg | message_id | 撤回消息 | go-cqhttp |
| makeForwardMsg | msg | 发送合并消息 | go-cqhttp |
| getInfo | 无 | 群信息 | 全部 |
| getAvatarUrl | 无 | 群头像 | 全部 |
| getMemberList | 无 | 群成员列表 | go-cqhttp ComWeChat |
| getMemberMap | 无 | 群成员列表(Map) | go-cqhttp ComWeChat |
| pickMember | user_id | [群成员对象](#群成员) | 全部 |
| pokeMember | user_id | 戳一戳 | go-cqhttp |
| setName | group_name | 设置群名 | go-cqhttp |
| setAvatar | file | 设置群头像 | go-cqhttp |
| setAdmin | user_id, enable | 设置群管理员 | go-cqhttp |
| setCard | user_id, card | 设置群名片 | go-cqhttp |
| setTitle | user_id, special_title, duration | 设置群头衔 | go-cqhttp |

## 群成员

> 使用 `this.e.member` 或 `Bot.pickMember(group_id, user_id)`

| 方法 | 参数 | 说明 | 支持 |
| - | - | - | - |
| ...pickFriend | 无 | [继承好友对象](#好友) | 全部 |
| poke | 无 | 戳一戳 | go-cqhttp |

## 频道

> 使用 `this.e.guild` 或 `Bot.pickGuild(guild_id, channel_id)`

| 方法 | 参数 | 说明 | 支持 |
| - | - | - | - |
| sendMsg | msg | 发送消息 | go-cqhttp |
| getInfo | 无 | 频道信息 | go-cqhttp |
| getChannelList | 无 | 子频道列表 | go-cqhttp |
| getChannelMap | 无 | 子频道列表(Map) | go-cqhttp |
| getMemberList | 无 | 频道成员列表 | go-cqhttp |
| getMemberMap | 无 | 频道成员列表(Map) | go-cqhttp |
| pickMember | user_id | [频道成员对象](#频道成员) | go-cqhttp |

## 频道成员

> 使用 `this.e.member` 或 `Bot.pickGuildMember(guild_id, channel_id, user_id)`

| 方法 | 参数 | 说明 | 支持 |
| - | - | - | - |
| ...pickGuild | 无 | [继承频道对象](#频道) | go-cqhttp |
| getAvatarUrl | 无 | 频道成员头像 | go-cqhttp |

## 消息段

> 使用 `segment`

| 方法 | 参数 | 说明 | 支持 |
| - | - | - | - |
| image | file, type, subType | 图片 | 全部 |
| at | qq, name | 提及 | go-cqhttp ComWeChat |
| record | file | 语音 | go-cqhttp TelegramBot |
| video | file | 视频 | go-cqhttp TelegramBot |
| reply | id, text, qq, time, seq | 回复 | go-cqhttp TelegramBot |
| face | id | 表情 | go-cqhttp |
| share | url, title, content, image | 分享 | go-cqhttp |
| music | type, id, url, audio, title | 音乐 | go-cqhttp |
| poke | qq | 戳一戳 | go-cqhttp |
| gift | qq, id | 礼物 | go-cqhttp |
| xml | data, resid | XML | go-cqhttp |
| json | data, resid | JSON | go-cqhttp |
| cardimage | file, minwidth, minheight, maxwidth, maxheight, source, icon | 大图 | go-cqhttp |
| tts | text | 文本转语音 | go-cqhttp |
| custom | type, data | 自定义 | 全部 |

## 适配器文档

- [go-cqhttp](https://docs.go-cqhttp.org)
- [ComWeChat](https://justundertaker.github.io/ComWeChatBotClient)
- [TelegramBot](https://github.com/yagop/node-telegram-bot-api)