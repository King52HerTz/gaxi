
export const HERO_CONTENT = {
  reality: {
    title: "胡羞 & 肖稚宇",
    subtitle: "从互相试探的房东与租客，到灵魂契合的合伙人。",
    quote: "“我在现实中等你，并在摩天大楼顶端拥抱你。”"
  },
  script: {
    title: "入局者 & 破局人",
    subtitle: "不仅是督军与特工，更是彼此唯一的救赎。",
    quote: "“雪中容城，哪怕世界是假的，我的爱是真的。”"
  }
};

export const TIMELINE_EVENTS = [
  {
    episode: "EPISODE 01",
    reality: {
      title: "初遇 · 现实的废墟",
      description: "订婚宴上的难堪收场，让胡羞跌入谷底。在VR游戏中，她第一次见到了那个让她“输得彻底”的男人。现实的擦肩而过，是命运埋下的伏笔。"
    },
    script: {
      title: "初遇 · 容城的变数",
      description: "只有她敢直视秦宵一的眼睛。那一刻，督军原本无心的棋局，有了唯一的变数。那句“你想要的，究竟是什么”，击碎了她的伪装。"
    }
  },
  {
    episode: "EPISODE 15",
    reality: {
      title: "守护 · 无声的誓言",
      description: "为了保住胡羞的项目，肖稚宇甘愿被误解，独自背负“背叛者”的骂名与裴家周旋。他在众人面前保持距离，却在背后为她撑起一片天。"
    },
    script: {
      title: "守护 · 唯一的骑士",
      description: "灯红酒绿的晚宴暗流涌动，秦宵一用并不宽厚的肩膀，为她挡住了所有的枪林弹雨。在这个虚构的世界里，他违背了系统设定，只为护她周全。"
    }
  },
  {
    episode: "EPISODE 26",
    reality: {
      title: "抉择 · 浴火重生",
      description: "肖稚宇在复仇与爱人之间选择了后者。他冲进火场救出胡羞：“别怕，我在。” 大火烧毁了过去的阴霾，也炼净了彼此的真心。"
    },
    script: {
      title: "定情 · 雪中拥吻",
      description: "漫天飞雪中，她吻了他。“我不在乎你是NPC还是谁，我只知道我爱你。” 在这个注定要醒来的梦里，他们许下了永恒。"
    }
  },
  {
    episode: "EPISODE 28",
    reality: {
      title: "结局 · 共同的未来",
      description: "误会解除，母子和解。他们在Dynamism并肩而立，俯瞰这座他们共同设计的城市。蓝图变成了现实，你也变成了我的家。"
    },
    script: {
      title: "落幕 · 破壁的爱意",
      description: "游戏结束，秦宵一目送她离开。剧本落幕，但爱意穿透了次元壁。当她再次推开那扇门，那句“欢迎来到容城”，是新的开始。"
    }
  }
];

export const CHARACTERS = [
  {
    id: "huxiu",
    name: "胡羞",
    avatar: "https://placehold.co/400x400/Fdfbf7/4a4a4a?text=Hu+Xiu",
    relationships: [
      { targetId: "xiaozhiyu", desc: "爱人 / 救赎", type: "love" },
      { targetId: "zhaoxiaorou", desc: "最强闺蜜", type: "friend" },
      { targetId: "peizhen", desc: "被追求", type: "work" }
    ],
    reality: {
      role: "建筑师 / 治愈者",
      desc: "敢于裸辞追求梦想的建筑师。是她用温暖和直觉，治愈了肖稚宇二十年的创伤，带他走出了仇恨的黑夜。"
    },
    script: {
      role: "玩家 / 破局者",
      desc: "直觉敏锐的特工。她是唯一一个能看穿秦宵一伪装的人，也是唯一一个让他甘愿输掉游戏的对手。"
    }
  },
  {
    id: "xiaozhiyu",
    name: "肖稚宇",
    avatar: "https://placehold.co/400x400/0a0a0a/cc0000?text=Xiao+Zhiyu",
    relationships: [
      { targetId: "peizhen", desc: "宿敌 / 兄弟", type: "enemy" },
      { targetId: "gonghuaicong", desc: "死党 / 合伙人", type: "friend" }
    ],
    reality: {
      role: "创始人 / 复仇者",
      desc: "外表冷漠内心深情的复仇者。他的每一步精明算计，最后都变成了对她最笨拙的保护。"
    },
    script: {
      role: "督军 / 觉醒NPC",
      desc: "拥有自我意识的觉醒NPC。他违抗了所有的系统指令，哪怕代码崩塌，也要爱她一次。"
    }
  },
  {
    id: "peizhen",
    name: "裴轸",
    avatar: "https://placehold.co/400x400/2a2a2a/F4E7D3?text=Pei+Zhen",
    relationships: [
      { targetId: "huxiu", desc: "单恋", type: "love" }
    ],
    reality: {
      role: "竞争者 / 兄弟",
      desc: "曾经针锋相对的竞争者，最终释怀的兄弟。他放下了执念，也放过了自己。"
    },
    script: {
      role: "旁观者 / 局外人",
      desc: "在这场戏中，他始终试图入局，却最终发现自己只是二人故事的见证者。"
    }
  },
  {
    id: "zhaoxiaorou",
    name: "赵孝柔",
    avatar: "https://placehold.co/400x400/Fdfbf7/d4af37?text=Zhao+Xiaorou",
    relationships: [
      { targetId: "huxiu", desc: "生死闺蜜", type: "friend" },
      { targetId: "wangguangming", desc: "前妻 / 前夫", type: "enemy" },
      { targetId: "gonghuaicong", desc: "商业伙伴", type: "work" }
    ],
    reality: {
      role: "闺蜜 / 咖啡店主",
      desc: "最好的闺蜜，最坚强的后盾。经历了婚姻破碎后的重生，活出了自己的精彩。"
    },
    script: {
      role: "引路人 / 神助攻",
      desc: "将胡羞带入游戏的“引路人”，在关键时刻点醒梦中人，是爱情的神助攻。"
    }
  },
  {
    id: "gonghuaicong",
    name: "龚怀聪",
    avatar: "https://placehold.co/400x400/Fdfbf7/333?text=Gong+Huaicong",
    relationships: [
      { targetId: "xiaozhiyu", desc: "死党 / 合伙人", type: "friend" }
    ],
    reality: {
      role: "合伙人 / 喜剧担当",
      desc: "肖稚宇最信任的好友，全剧最强“神助攻”。从帮忙租房到掩护身份，他用钞能力守护着这对CP。"
    },
    script: {
      role: "幕后金主 / 吃瓜群众",
      desc: "虽然不常穿戏服，但他才是这座“容城”的拥有者。看着这群痴男怨女在自己的地盘谈恋爱，他是最大的吃瓜群众。"
    }
  },
  {
    id: "wangguangming",
    name: "王光明",
    avatar: "https://placehold.co/400x400/333/666?text=Wang+Guangming",
    relationships: [],
    reality: {
      role: "前夫 / 伪善者",
      desc: "他的出轨与背叛，虽然给赵孝柔带来了痛苦，却也彻底打碎了她对虚假婚姻的幻想，逼迫她涅槃重生。"
    },
    script: {
      role: "盲人 / 局外人",
      desc: "即使在游戏里，他也看不清身边人的价值。他的存在是为了衬托出“真诚”的可贵，最终只能黯然退场。"
    }
  }
];

export const HEARTBEAT_QUOTES = [
  "“你想要的，究竟是什么？”",
  "“进了容城，我也可以不做肖稚宇了。”",
  "“我不想演了，我想爱你。”",
  "“别怕，我在。”",
  "“我不在乎你是谁，我只想爱你。”",
  "“欢迎来到容城。”",
  "“Cut！刚才那个眼神，你是在演戏，还是在看我？”",
  "“在这个虚构的世界里，唯有这份爱意是真实而滚烫的。”",
  "“你比真相更重要。”"
];

export const PARALLEL_PHONE_MESSAGES = {
  reality: [
    { sender: "me", text: "房租我转过去了。", time: "10:30" },
    { sender: "other", text: "收到。那个...热水器修好了。", time: "10:32" },
    { sender: "me", text: "今晚晚宴小心点。", time: "18:45" },
    { sender: "other", text: "我知道，你在帮我，对吗？", time: "18:46" },
    { sender: "other", text: "今晚回家吃饭吗？", time: "19:00" },
    { sender: "me", text: "嗯，买了你爱吃的鱼。", time: "19:05" }
  ],
  script: [
    { sender: "other", text: "想赢吗？来找我。", time: "1932年" },
    { sender: "me", text: "枪里没有子弹，但我心里有你。", time: "1933年" },
    { sender: "other", text: "容城的雪停了，但我不想让你走。", time: "1934年" }
  ]
};

export const SCAVENGER_ITEMS = [
  {
    id: "vr-headset",
    name: "VR眼镜",
    desc: "一切开始的地方 (Ep 1)",
    icon: "headset"
  },
  {
    id: "blueprint",
    name: "旧图纸",
    desc: "父亲的遗憾与真相 (Ep 12)",
    icon: "scroll"
  },
  {
    id: "petal",
    name: "樱花瓣",
    desc: "那个吻，是真的 (Ep 19)",
    icon: "flower"
  },
  {
    id: "lighter",
    name: "打火机",
    desc: "为你点燃黑暗 (Ep 26)",
    icon: "flame"
  }
];

export const FINAL_REWARD = {
  title: "胡羞的手写独白",
  content: "我曾以为世界是冰冷的蓝图，直到你在废墟中为我点亮了一盏灯。现实也好，剧本也罢，只要是你，我就愿意入戏。肖稚宇，欢迎回家。"
};

export const STORY_ARCS = [
  {
    id: "act1",
    episodes: "EP 01-06",
    reality: {
        title: "ACT 1: 现实的崩塌与重建",
        quote: "“胡羞的人生在二十六岁这年崩塌了。”",
        content: [
            "二十六岁的胡羞遭遇人生滑铁卢：订婚宴上被当众分手，体面的总助工作也变得索然无味。为了逃避现实的狼狈，她裸辞并搬进了弄堂阁楼。谁知房东竟是她在剧本杀里遇到的“死对头”——肖稚宇。",
            "肖稚宇不仅是古怪的房东，更是Dynamism建筑事务所的创始人。胡羞误打误撞进入Dynamism面试，两人从游戏里的敌对关系变成了现实中的上下级。在这个充满烟火气的弄堂里，两个原本平行的人生开始交汇。",
            "面对父母的突然造访，胡羞拉着肖稚宇演戏，谎称是同事。肖稚宇看穿了她对建筑梦想的渴望与胆怯，用独特的方式鼓励她：“你的空白期如同建筑中的留白，象征着无限可能。”"
        ]
    },
    script: {
        title: "ACT 1: 容城的迷雾与初遇",
        quote: "“你想要的，究竟是什么？”",
        content: [
            "Midnight Express 俱乐部，火车驶入迷雾中的民国容城。胡羞遇到了那个改变她命运的NPC——督军秦宵一。初入游戏的她心不在焉，却偏偏抽到了身怀机密的特工角色。",
            "秦宵一那双仿佛能洞穿灵魂的眼睛，让她无处遁形。“你想要的，究竟是什么？”这句来自虚拟角色的发问，击碎了胡羞的伪装。在第一局游戏中，她被秦宵一设计“杀害”，成为了第一个出局的玩家。",
            "不甘心的胡羞重返游戏，誓要赢过秦宵一。两人在虚拟的容城里斗智斗勇，胡羞终于设局让秦宵一落败。然而，这场胜负未分的博弈，才刚刚开始。"
        ]
    }
  },
  {
    id: "act2",
    episodes: "EP 07-14",
    reality: {
        title: "ACT 2: 阴谋与无声的靠近",
        quote: "“不知道到底要走多久，才能看清一个人。”",
        content: [
            "Dynamism事务所因匿名爆料失去莱蒙项目资格。肖稚宇带胡羞出席前任婚礼，并在酒会上为她出气，揭穿渣男面目。胡羞看到了肖稚宇冷漠外表下的维护，心生悸动。",
            "肖稚宇的过往逐渐浮出水面：二十年前的新城体育馆坍塌事故，父亲秦宇泽含冤自杀。他多年蛰伏只为查清真相。裴轸作为竞争对手出现，更是揭开了兄弟反目的序幕。",
            "在一次次并肩作战中，两人的默契悄然滋长。胡羞在裴轸的车上，肖稚宇强势带走她，那份在意已无法掩饰。然而，复仇的阴影始终笼罩着他，让他不敢轻易触碰这份温暖。"
        ]
    },
    script: {
        title: "ACT 2: 觉醒与破格的守护",
        quote: "“进了容城，我也可以不做肖稚宇了。”",
        content: [
            "胡羞在恐怖凶宅副本中受惊，秦宵一违背NPC守则，带她离开恐怖空间。两人从敌人变成了默契的搭档。在这个虚拟世界里，他不再是那个背负深仇的肖稚宇，而只是守护她的秦宵一。",
            "一场夜雨将两人困在门口，虽然游戏结束，但那份心动却延续到了戏外。肖稚宇开始在游戏中借秦宵一之口，说出那些现实中不敢言说的话：“进了容城，我也可以不做肖稚宇了。”",
            "为了保护差点被砸中的胡羞，秦宵一毫不犹豫地挡在她身前，受了伤。由于这次意外，肖稚宇俱乐部老板的身份暴露，但他却并未在意，因为他找到了比游戏更重要的东西。"
        ]
    }
  },
  {
    id: "act3",
    episodes: "EP 15-20",
    reality: {
        title: "ACT 3: 推开与坚定的选择",
        quote: "“我不想演了，我想爱你。”",
        content: [
            "莱蒙项目晚宴上，肖稚宇为了保护胡羞不被卷入裴家阴谋，故意宣布与筑翎合作，当众推开她。胡羞虽心痛，却凭着对他的了解，读懂了他的不得已。她选择相信他。",
            "樱花树下，肖稚宇终于卸下伪装，向胡羞告白。两人确定关系，但为了安全暂时保密。肖稚宇加快了复仇的步伐，利用筑翎的合作设局，引出当年的关键证人。",
            "胡羞发现了肖稚宇书房里的秘密，看到了署名“Q”的图纸，心疼他多年独自背负的隐忍。她决定无论发生什么，都要坚定地站在他身边，做他唯一的同盟。"
        ]
    },
    script: {
        title: "ACT 3: 沦陷与真实的爱意",
        quote: "“如果你的世界是黑夜，那我就做你唯一的星光。”",
        content: [
            "秦宵一想在游戏里证明他对胡羞的感情是特殊的。胡羞却因他在现实中的推开而爆发情绪：“我不再喜欢不能直面心意的你。”",
            "离场时，秦宵一将她拉进容城角落，深情一吻。这一吻，打破了虚拟与现实的界限。他不想再演了，他想在现实中拥抱她。",
            "“在这个虚构的世界里，唯有这份爱意是真实而滚烫的。” 秦宵一在游戏中一次次偏爱胡羞，哪怕被系统警告，哪怕剧情崩塌，他也要护她周全。"
        ]
    }
  },
  {
    id: "act4",
    episodes: "EP 21-28",
    reality: {
        title: "ACT 4: 真相与摩天大楼",
        quote: "“别怕，我在。”",
        content: [
            "真相大白：当年事故是裴康华栽赃陷害。裴康华狗急跳墙绑架胡羞，并放火烧仓库。肖稚宇毫不犹豫冲进火场：“别怕，我在。” 大火炼净了仇恨，也见证了生死与共的爱情。",
            "裴康华入狱，秦宇泽沉冤得雪。肖稚宇与母亲和解，裴轸也放下了执念远走他乡。胡羞与肖稚宇终于可以坦荡地相爱。",
            "摩天大楼顶端，两人并肩俯瞰这座他们共同设计的城市。蓝图终成现实，曾经的废墟之上已是万家灯火。肖稚宇拥抱着胡羞，找到了真正的归宿。"
        ]
    },
    script: {
        title: "ACT 4: 终章与新的开始",
        quote: "“欢迎来到容城。”",
        content: [
            "故事迎来了终章，但爱意没有落幕。ME俱乐部换了新主题，这一次，肖稚宇以玩家身份入局，而等待他的NPC，正是胡羞。",
            "城门缓缓打开，穿着戏服的胡羞款款走来，微笑着说出那句熟悉的台词：“欢迎来到容城。”",
            "这一次，不再是互相试探的博弈，而是属于他们真实的、永不散场的恋爱故事。游戏结束了，但他们的人生才刚刚开始。"
        ]
    }
  }
];

export const DUAL_GALLERY_IMAGES = [
  {
    id: "huxiu",
    name: "胡羞",
    realitySrc: "https://placehold.co/800x1200/Fdfbf7/4a4a4a?text=HuXiu+Architect",
    scriptSrc: "https://placehold.co/800x1200/2a0a0a/8B0000?text=Agent+026"
  },
  {
    id: "xiaozhiyu",
    name: "肖稚宇",
    realitySrc: "https://placehold.co/800x1200/Fdfbf7/4a4a4a?text=XiaoZhiyu+Founder",
    scriptSrc: "https://placehold.co/800x1200/2a0a0a/8B0000?text=Commander+Qin"
  },
  {
    id: "peizhen",
    name: "裴轸",
    realitySrc: "https://placehold.co/800x1200/Fdfbf7/4a4a4a?text=PeiZhen+CEO",
    scriptSrc: "https://placehold.co/800x1200/2a0a0a/8B0000?text=Noble+Pei"
  },
  {
    id: "zhaoxiaorou",
    name: "赵孝柔",
    realitySrc: "https://placehold.co/800x1200/Fdfbf7/4a4a4a?text=Xiaorou+Barista",
    scriptSrc: "https://placehold.co/800x1200/2a0a0a/8B0000?text=Singer+Xiaorou"
  },
  {
    id: "gonghuaicong",
    name: "龚怀聪",
    realitySrc: "https://placehold.co/800x1200/Fdfbf7/4a4a4a?text=Gong+Rich",
    scriptSrc: "https://placehold.co/800x1200/2a0a0a/8B0000?text=Investor+Gong"
  },
  {
    id: "wangguangming",
    name: "王光明",
    realitySrc: "https://placehold.co/800x1200/Fdfbf7/4a4a4a?text=Wang+ExHusband",
    scriptSrc: "https://placehold.co/800x1200/2a0a0a/8B0000?text=Blind+Man"
  }
];

export const SCENE_PHOTOS = [
  {
    id: "scene-1",
    type: "scene",
    title: "弄堂雨夜",
    desc: "“别怕，我在。” 两个世界，一场夜雨，两颗心靠近。",
    src: "https://placehold.co/1200x800/1a1a1a/4a4a4a?text=Rainy+Alley"
  },
  {
    id: "scene-2",
    type: "scene",
    title: "摩天大楼",
    desc: "俯瞰城市的灯火，蓝图终成现实。",
    src: "https://placehold.co/1200x800/Fdfbf7/cccccc?text=Skyscraper+View"
  },
  {
    id: "char-1",
    type: "character",
    title: "肖稚宇 · 独白",
    desc: "“我不在乎你是谁，我只想爱你。”",
    src: "https://placehold.co/800x1200/333/666?text=Xiao+Zhiyu+Portrait"
  },
  {
    id: "scene-3",
    type: "scene",
    title: "容城雪景",
    desc: "漫天飞雪中，她吻了他。注定要醒来的梦，却许下了永恒。",
    src: "https://placehold.co/1200x800/eee/aaa?text=Snowy+City"
  },
  {
    id: "char-2",
    type: "character",
    title: "胡羞 · 觉醒",
    desc: "她不再是那个逃避现实的女孩，而是敢于直视深渊的破局者。",
    src: "https://placehold.co/800x1200/f5f5f5/888?text=Hu+Xiu+Portrait"
  },
  {
    id: "scene-4",
    type: "scene",
    title: "Midnight Express",
    desc: "火车驶入迷雾，故事从这里开始。",
    src: "https://placehold.co/1200x800/000/333?text=Train+Station"
  }
];

// Investigation Wall Data
export const INVESTIGATION_CLUES = [
  {
    id: "clue-1",
    title: "2004年旧报纸",
    desc: "新城体育馆坍塌事故报道。秦宇泽含冤自杀，留下了无尽的谜团与伤痛。",
    src: "https://placehold.co/400x600/2a2a2a/f0f0f0?text=News+2004",
    type: "evidence",
    x: 10,
    y: 10,
    rotation: -5
  },
  {
    id: "clue-2",
    title: "署名'Q'的设计图",
    desc: "秦宇泽的遗物，肖稚宇设计灵感的来源，也是他建筑梦想的起点。",
    src: "https://placehold.co/500x400/1a1a1a/4a90e2?text=Blueprint+Q",
    type: "document",
    x: 35,
    y: 15,
    rotation: 3
  },
  {
    id: "clue-3",
    title: "工厂储存卡",
    desc: "在黄奕德工厂找到的关键证据，记录了裴康华与陈军浩勾结的罪行。",
    src: "https://placehold.co/300x200/000/fff?text=SD+Card",
    type: "evidence",
    x: 65,
    y: 20,
    rotation: 8
  },
  {
    id: "clue-4",
    title: "胡鼎与韩川合影",
    desc: "受害者视角。胡鼎腿伤的真相，揭示了两家跨越二十年的渊源。",
    src: "https://placehold.co/400x500/333/ccc?text=Old+Photo",
    type: "photo",
    x: 15,
    y: 50,
    rotation: -2
  },
  {
    id: "clue-5",
    title: "伪造的遗书",
    desc: "裴康华栽赃秦宇泽畏罪自杀的铁证。真相终将大白。",
    src: "https://placehold.co/350x500/fff/000?text=Fake+Letter",
    type: "document",
    x: 45,
    y: 60,
    rotation: 5
  },
  {
    id: "clue-6",
    title: "不平等供货合同",
    desc: "裴康华利用职权扶持黄奕德的证据，也是利益输送的链条。",
    src: "https://placehold.co/400x600/f0f0f0/000?text=Contract",
    type: "document",
    x: 75,
    y: 55,
    rotation: -4
  }
];
