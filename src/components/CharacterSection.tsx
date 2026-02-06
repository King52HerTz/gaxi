"use client";

import { motion } from "framer-motion";
import CharacterDossier, { CharacterData } from "./CharacterDossier";

const CHARACTERS: CharacterData[] = [
  {
    id: "PLAYER-01",
    actorName: "陈星旭",
    characterName: "肖稚宇",
    role: "男主角",
    publicIdentity: "理性至上的建筑设计师",
    hiddenScript: "为了寻找灵感误入剧本杀局。在游戏世界里，他必须卸下理性的伪装，演绎一段截然不同的人生。而那个让他频频出戏的‘意外变量’，似乎比谜题更吸引人。",
    keywords: ["建筑师", "高智商", "反差萌"],
    themeColor: "#0a0a0a"
  },
  {
    id: "PLAYER-02",
    actorName: "卢昱晓",
    characterName: "胡羞",
    role: "女主角",
    publicIdentity: "古灵精怪的剧本杀玩家",
    hiddenScript: "游戏是她的逃避，也是她的战场。在‘戏中戏’里，她与肖稚宇的命运意外交织。原本只是想演好一个角色，却在真假难辨的互动中，交付了真心。",
    keywords: ["双重人格", "入戏太深", "治愈"],
    themeColor: "#ff2a2a"
  }
];

export default function CharacterSection() {
  return (
    <section className="min-h-screen py-24 px-4 md:px-12 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif-sc font-bold text-off-white mb-4"
          >
            主演阵容
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            viewport={{ once: true }}
            className="h-1 bg-neon-red mx-auto mb-6" 
          />
          <p className="font-courier text-white/50 tracking-widest uppercase text-sm">
            Player Profiles Loaded • Game Session Active
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center justify-items-center">
          {CHARACTERS.map((char, index) => (
            <motion.div
              key={char.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <CharacterDossier data={char} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
