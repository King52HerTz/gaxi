
export const HERO_CONTENT = {
  reality: {
    title: "胡羞 x 肖稚宇",
    subtitle: "从互相试探的房东与租客，到灵魂契合的合伙人。",
    quote: "“我在现实中等你，并在摩天大楼顶端拥抱你。”"
  },
  script: {
    title: "编号026 x NPC秦宵一",
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
      description: "只有编号026敢直视秦宵一的眼睛。那一刻，督军原本无心的棋局，有了唯一的变数。那句“你想要的，究竟是什么”，击碎了她的伪装。"
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
    reality: {
      role: "建筑师 / 治愈者",
      desc: "敢于裸辞追求梦想的建筑师。是她用温暖和直觉，治愈了肖稚宇二十年的创伤，带他走出了仇恨的黑夜。"
    },
    script: {
      role: "玩家 026 / 破局者",
      desc: "直觉敏锐的特工。她是唯一一个能看穿秦宵一伪装的人，也是唯一一个让他甘愿输掉游戏的对手。"
    }
  },
  {
    id: "xiaozhiyu",
    name: "肖稚宇",
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
    title: "ACT 1: 入局与初识",
    episodes: "EP 01-06",
    quote: "“你想要的，究竟是什么？”",
    content: [
      "胡羞的人生在二十六岁这年崩塌了。体面的工作、门当户对的未婚夫，在一夜之间化为乌有。为了逃避现实的狼狈，她躲进了【Midnight Express】剧本杀俱乐部。火车驶入迷雾中的民国容城，她遇到了那个改变她命运的NPC——督军秦宵一。",
      "初入游戏的胡羞心不在焉，只想快点结束这场闹剧。然而，秦宵一那双仿佛能洞穿灵魂的眼睛，却让她无处遁形。“你想要的，究竟是什么？”这句来自虚拟角色的发问，如同一记重锤，击碎了胡羞的伪装。她意识到，自己从未真正活过。",
      "在游戏里，她被秦宵一设计“杀害”；在现实中，她为了省钱租下的弄堂阁楼，房东竟然就是秦宵一的扮演者——肖稚宇。两人在戏里相爱相杀，在戏外尴尬同居。命运的齿轮，在这一刻悄然转动。"
    ]
  },
  {
    id: "act2",
    title: "ACT 2: 试探与靠近",
    episodes: "EP 07-14",
    quote: "“进了容城，我也可以不做肖稚宇了。”",
    content: [
      "肖稚宇是个充满谜团的男人。他在Dynamism建筑事务所是雷厉风行的创始人，在弄堂里却是独来独往的怪房东。胡羞在与他的朝夕相处中，逐渐发现了由于二十年前新城体育馆坍塌事故留下的伤痕。他在黑夜中独自前行了太久，直到胡羞带着人间烟火气闯入他的生活。",
      "书房内间的白板上，密密麻麻的线索图揭示了他复仇者的身份。胡羞没有退缩，反而更想靠近这颗孤独的灵魂。在一次次剧本杀的交锋中，两人的默契悄然滋长。肖稚宇开始贪恋这份温暖，甚至在游戏中借秦宵一之口，说出了现实中不敢言说的心意。",
      "“进了容城，我也可以不做肖稚宇了。”在这个虚拟的时空里，他卸下了复仇的铠甲，第一次想要去爱一个人。"
    ]
  },
  {
    id: "act3",
    title: "ACT 3: 守护与沦陷",
    episodes: "EP 15-20",
    quote: "“他不是在玩游戏，他是在爱她。”",
    content: [
      "莱蒙项目的晚宴上，灯红酒绿背后是波云诡谲的商业博弈。为了保护胡羞不被卷入裴家的阴谋，肖稚宇选择了最残忍的方式——推开她。他独自背负了“背叛者”的骂名，在众人面前与她划清界限，却在无人的角落，默默为她挡下了所有的明枪暗箭。",
      "然而，爱意是无法隐藏的。樱花树下的那个吻，是肖稚宇理智崩塌的瞬间。他不想再演了，他想在现实中拥抱她。胡羞看懂了他的隐忍与深情，她选择站在他身边，哪怕要对抗全世界。",
      "“如果你的世界是黑夜，那我就做你唯一的星光。”在这场关于爱与复仇的博弈中，他们终于成为了彼此唯一的同盟。"
    ]
  },
  {
    id: "act4",
    title: "ACT 4: 真相与终章",
    episodes: "EP 21-28",
    quote: "“别怕，我在。”",
    content: [
      "真相终于揭开。二十年前的事故并非秦宇泽之过，而是裴康华的栽赃陷害。雪夜的容城，肖稚宇在复仇的终点，选择了放下。因为他有了比恨更重要的东西——胡羞。火场中的那句“别怕，我在”，是他对她最郑重的承诺。",
      "摩天大楼顶端，两人并肩而立，俯瞰着这座他们共同设计的城市。蓝图变成了现实，曾经的废墟之上，如今已是万家灯火。母亲肖婉月终于释怀，裴轸也远走他乡寻找自我。",
      "ME俱乐部换了新主题，这一次，肖稚宇以玩家的身份入局。城门打开，穿着NPC戏服的胡羞款款走来：“欢迎来到容城。” 故事回到了原点，但这一次，是属于他们真实的、不再散场的恋爱故事。"
    ]
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
