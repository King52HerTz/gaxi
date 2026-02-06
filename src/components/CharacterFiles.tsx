"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import clsx from "clsx";

interface CharacterProfile {
  id: string;
  name: string;
  actor: string;
  theme: "warm" | "cold";
  keywords: string[];
  publicInfo: string;
  secretInfo: string;
}

const PROFILES: CharacterProfile[] = [
  {
    id: "huxiu",
    name: "胡羞",
    actor: "Hu Xiu",
    theme: "warm",
    keywords: ["建筑师", "直觉", "破局者"],
    publicInfo: "前总助，现Dynamism建筑设计师。为了梦想裸辞，误入“Midnight Express”剧本杀世界，在虚拟与现实的交错中寻找自我与真爱。",
    secretInfo: "她曾以为秦宵一只是个NPC，却没想到这个男人会成为她生命中最重要的建筑师，为她设计了一个名为“家”的未来。她用温暖治愈了他的伤痕。",
  },
  {
    id: "xiaozhiyu",
    name: "肖稚宇",
    actor: "Xiao Zhiyu",
    theme: "cold",
    keywords: ["复仇", "深情", "双面人生"],
    publicInfo: "Dynamism创始人，天才建筑师，也是剧本杀店的人气NPC“秦宵一”。背负着父亲的污名和复仇的重担，在黑夜中独自前行二十年。",
    secretInfo: "他在容城做督军，是为了寻找真相；他在现实做肖稚宇，是为了掩盖伤痕。直到胡羞出现，他才明白，有些光是挡不住的。她是他唯一的变数。",
  },
];

export default function CharacterFiles() {
  return (
    <section className="min-h-screen py-24 px-4 bg-deep-black relative flex flex-col items-center">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-serif-sc text-warm-light font-bold mb-4">人物双面档案</h2>
        <div className="h-[1px] w-20 bg-fate-red mx-auto mb-2" />
        <p className="font-courier text-warm-light/40 text-xs tracking-widest uppercase">
          Hold to reveal hidden truth
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
        {PROFILES.map((profile) => (
          <CharacterFileCard key={profile.id} profile={profile} />
        ))}
      </div>
    </section>
  );
}

function CharacterFileCard({ profile }: { profile: CharacterProfile }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const isWarm = profile.theme === "warm";

  return (
    <div 
      className="relative group h-[500px] cursor-pointer"
      onMouseDown={() => setIsRevealed(true)}
      onMouseUp={() => setIsRevealed(false)}
      onMouseLeave={() => setIsRevealed(false)}
      onTouchStart={() => setIsRevealed(true)}
      onTouchEnd={() => setIsRevealed(false)}
    >
      <motion.div
        className={clsx(
          "h-full w-full p-8 flex flex-col relative overflow-hidden transition-colors duration-500",
          isWarm ? "bg-[#e8e0d5] text-gray-900" : "bg-[#2a303c] text-gray-100"
        )}
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 p-4 opacity-20">
           <span className="font-courier text-4xl font-bold tracking-tighter uppercase">{profile.id.substring(0, 3)}</span>
        </div>
        <div className={clsx("w-full h-1 mb-8", isWarm ? "bg-fate-red" : "bg-blue-400/50")} />

        {/* Header */}
        <div className="mb-8">
          <h3 className="text-4xl font-serif-sc font-bold mb-1">{profile.name}</h3>
          <p className="font-courier text-xs uppercase tracking-widest opacity-60">{profile.actor}</p>
        </div>

        {/* Keywords */}
        <div className="flex gap-2 mb-8">
          {profile.keywords.map((kw, i) => (
            <span key={i} className={clsx(
              "text-xs px-2 py-1 border font-courier",
              isWarm ? "border-gray-400 text-gray-600" : "border-gray-500 text-gray-300"
            )}>
              {kw}
            </span>
          ))}
        </div>

        {/* Content Area */}
        <div className="relative flex-1">
           {/* Public Info (Default Visible) */}
           <motion.div 
             className="absolute inset-0"
             animate={{ opacity: isRevealed ? 0.1 : 1, filter: isRevealed ? "blur(4px)" : "blur(0px)" }}
           >
             <h4 className="font-courier text-xs uppercase tracking-widest mb-2 opacity-50">Public Profile</h4>
             <p className="font-serif-sc text-lg leading-relaxed">{profile.publicInfo}</p>
           </motion.div>

           {/* Secret Info (Revealed on Hold) */}
           <motion.div 
             className="absolute inset-0 flex flex-col justify-center"
             initial={{ opacity: 0 }}
             animate={{ opacity: isRevealed ? 1 : 0 }}
           >
             <div className="flex items-center gap-2 mb-2 text-fate-red">
               <Eye size={16} />
               <h4 className="font-courier text-xs uppercase tracking-widest font-bold">Inner Voice</h4>
             </div>
             <p className={clsx(
               "font-serif-sc text-xl leading-relaxed font-bold italic",
               isWarm ? "text-fate-red" : "text-blue-300"
             )}>
               "{profile.secretInfo}"
             </p>
           </motion.div>
        </div>

        {/* Interaction Hint */}
        <div className="mt-auto pt-8 flex justify-center">
           <motion.div 
             className={clsx("p-2 rounded-full border", isWarm ? "border-black/10" : "border-white/10")}
             animate={{ scale: isRevealed ? 1.2 : 1 }}
           >
             {isRevealed ? <Eye size={20} /> : <EyeOff size={20} className="opacity-40" />}
           </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
