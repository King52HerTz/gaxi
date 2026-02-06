# 项目结构与组件说明文档

本文档详细说明了《轧戏》项目 (`gaxi_pro`) 中各个文件的作用，特别是 `src/components` 目录下的组件与页面视觉呈现的对应关系。

## 核心页面结构 (`src/app/page.tsx`)

`src/app/page.tsx` 是项目的主入口文件，负责组装所有核心组件，并管理全局状态（如：现实/剧本模式切换 `mode`、VR 转场动画 `VRTransition`）。

页面按照以下顺序渲染组件：

1.  **[VRTransition.tsx](src/components/VRTransition.tsx)**
    *   **视觉位置**: 全屏覆盖层（隐藏状态，切换模式时出现）。
    *   **功能**: 负责 "现实模式" 与 "剧本模式" 切换时的过渡动画（类似 VR 眼镜佩戴/摘下的效果）。包含 "欢迎来到容城" 或 "欢迎回到上海" 的文字动画。

2.  **[HeroSection.tsx](src/components/HeroSection.tsx)**
    *   **视觉位置**: 网页首屏 (Header)。
    *   **功能**: 展示主标题（"胡羞 x 肖稚宇" vs "玩家胡羞 x NPC秦宵一"）和核心切换交互。
    *   **关键元素**:
        *   **现实模式**: 显示一张 "Midnight Express 车票"，点击进入剧本世界。
        *   **剧本模式**: 显示一个 "Dynamism 工牌"，点击返回现实世界。

3.  **[StoryArcs.tsx](src/components/StoryArcs.tsx)**
    *   **视觉位置**: 首屏下方，剧情章节展示区。
    *   **功能**: 手风琴（Accordion）风格的剧情大纲。展示 ACT 1 到 ACT 4 的核心剧情，根据模式显示 "现实视角的崩塌与重建" 或 "剧本视角的迷雾与救赎"。

4.  **[LoveTimeline.tsx](src/components/LoveTimeline.tsx)**
    *   **视觉位置**: 剧情章节下方，垂直时间轴。
    *   **功能**: 展示两人关系发展的关键节点（如 EP01 初遇, EP19 告白, EP28 结局）。
    *   **视觉差异**: 现实模式下是蓝图风格；剧本模式下是霓虹/胶卷风格。

5.  **[InteractivePhotoWall.tsx](src/components/InteractivePhotoWall.tsx)**
    *   **视觉位置**: 图片墙/画廊区域。
    *   **功能**: 瀑布流布局展示剧照和人物写真。支持点击放大查看大图（Lightbox）。
    *   **注意**: 此组件替代了早期的 `DualLookGallery.tsx`。

6.  **[CharacterCards.tsx](src/components/CharacterCards.tsx)**
    *   **视觉位置**: 人物卡片区域。
    *   **功能**: **核心人物关系图** (Relationship Map)。以互动节点图的形式展示人物之间的羁绊与关系。点击节点可查看人物详情。
    *   **视觉差异**:
        *   **现实模式**: 金色线条，展示现实中的人际网络。
        *   **剧本模式**: 红色霓虹线条，展示剧本中的复杂纠葛。

7.  **[ClueWall.tsx](src/components/ClueWall.tsx)**
    *   **视觉位置**: 人物关系图下方。
    *   **功能**: "真相调查墙"。通过红线连接的线索照片墙，展示 "洗清秦宇泽冤屈" 的关键证据链。
    *   **视觉风格**: 暗黑/红黑配色，悬疑风格。

8.  **[ParallelPhone.tsx](src/components/ParallelPhone.tsx)**
    *   **视觉位置**: 互动手机功能区（页面中下部）。
    *   **功能**: 模拟手机界面，展示短信或通话记录，体现跨越次元的交流。

9.  **[MemoryScavengerHunt.tsx](src/components/MemoryScavengerHunt.tsx)**
    *   **视觉位置**: 记忆碎片收集区（接近底部）。
    *   **功能**: 互动小游戏或探索区域，寻找隐藏的线索。

10. **[AtmosphericPlayer.tsx](src/components/AtmosphericPlayer.tsx)**
    *   **视觉位置**: 屏幕左下角（固定悬浮）。
    *   **功能**: 背景音乐播放器。控制 "Reality Theme" (白噪音/轻音乐) 和 "Script Theme" (悬疑/爵士) 的切换。

11. **[HeartbeatButton.tsx](src/components/HeartbeatButton.tsx)**
    *   **视觉位置**: 屏幕右下角（固定悬浮）。
    *   **功能**: 心跳按钮。点击后随机弹出角色的经典台词或心动瞬间。

## 数据文件

*   **[src/data/drama-data.ts](src/data/drama-data.ts)**: 核心数据文件。存储了所有文案、人物信息、时间轴事件、图片链接等。修改网页内容主要在此文件中进行。
