# 项目结构与内容修改指南

本文档详细说明了《轧戏》项目 (`gaxi_pro`) 的文件结构，以及如何修改文案、图片和页面内容。

## 1. 页面与组件对应关系

本项目是单页应用 (Single Page Application)，主页面文件为 `src/app/page.tsx`。页面由多个组件垂直堆叠而成，以下是页面从上到下的组件对应关系：

| 页面区块 (从上到下) | 对应组件文件 | 说明 |
| :--- | :--- | :--- |
| **全屏转场动画** | `src/components/VRTransition.tsx` | 切换现实/剧本模式时的黑屏过渡效果 |
| **首屏 (Header)** | `src/components/HeroSection.tsx` | 标题、副标题、模式切换入口 (车票/工牌) |
| **剧情大纲** | `src/components/StoryArcs.tsx` | ACT 1 - ACT 4 的剧情手风琴展示 |
| **爱情时间轴** | `src/components/LoveTimeline.tsx` | 垂直时间轴，展示关键剧情节点 (EP01 - EP28) |
| **剧照/写真墙** | `src/components/InteractivePhotoWall.tsx` | 瀑布流展示图片，支持点击放大 |
| **人物关系图** (现实) | `src/components/CharacterCards.tsx` | 现实模式下显示，金色连线关系网 |
| **真相调查墙** (剧本) | `src/components/ClueWall.tsx` | 剧本模式下显示，红线连接的线索墙 |
| **平行手机** | `src/components/ParallelPhone.tsx` | 模拟手机短信/通话界面 |
| **记忆碎片** | `src/components/MemoryScavengerHunt.tsx` | 寻找物品的互动小游戏 |
| **背景音乐** | `src/components/AtmosphericPlayer.tsx` | 左下角悬浮，控制背景音乐 |
| **心跳按钮** | `src/components/HeartbeatButton.tsx` | 右下角悬浮，随机弹出台词 |

---

## 2. 如何修改文案 (Copywriting)

项目中绝大部分文案都集中在一个数据文件中，**不需要**去修改组件代码。

*   **数据文件路径**: `src/data/drama-data.ts`

在该文件中，你可以找到以下常量进行修改：

*   **首屏标题/标语**: 修改 `HERO_CONTENT` 对象。
*   **剧情大纲内容**: 修改 `STORY_ARCS` 数组。
*   **时间轴事件**: 修改 `TIMELINE_EVENTS` 数组。
*   **人物信息与关系**: 修改 `CHARACTERS` 数组 (包括名字、介绍、关系描述)。
*   **心跳按钮台词**: 修改 `HEARTBEAT_QUOTES` 数组。
*   **手机短信内容**: 修改 `PARALLEL_PHONE_MESSAGES` 对象。
*   **线索墙内容**: 修改 `INVESTIGATION_CLUES` 数组。
*   **寻宝游戏物品**: 修改 `SCAVENGER_ITEMS` 数组。

**修改示例**:
如果你想修改现实模式下的首屏副标题：
1. 打开 `src/data/drama-data.ts`
2. 找到 `HERO_CONTENT` -> `reality` -> `subtitle`
3. 修改引号内的文字即可。

---

## 3. 如何修改图片 (Images)

图片主要涉及两个步骤：**存放图片文件** 和 **引用图片路径**。

### 步骤 A: 存放图片
将你的图片文件（.jpg, .png, .webp 等）放入 `public/` 目录下的子文件夹中。
建议结构：
*   `public/photo/` - 存放人物立绘、剧照
*   `public/clues/` - 存放线索图片
*   `public/backgrounds/` - 存放背景图

### 步骤 B: 引用图片
同样是在 `src/data/drama-data.ts` 文件中修改图片路径。

**引用规则**:
在代码中引用 `public` 目录下的图片时，**不需要**写 `public` 前缀，直接从 `/` 开始。
例如，如果图片在 `public/photo/my-image.png`，引用路径应为 `/photo/my-image.png`。

**具体修改位置 (`src/data/drama-data.ts`)**:

1.  **人物头像**:
    *   找到 `CHARACTERS` 数组。
    *   修改 `avatar` 字段。
    *   例如: `avatar: "/photo/huxiu_avatar.png"`

2.  **剧照墙/写真**:
    *   找到 `DUAL_GALLERY_IMAGES` (人物写真) 或 `SCENE_PHOTOS` (场景剧照)。
    *   修改 `realitySrc` (现实模式图), `scriptSrc` (剧本模式图) 或 `src` (通用图) 字段。

3.  **线索墙图片**:
    *   找到 `INVESTIGATION_CLUES` 数组。
    *   修改 `src` 字段。

4.  **寻宝物品图标**:
    *   找到 `SCAVENGER_ITEMS` 数组。
    *   注意：这里目前使用的是 Lucide 图标名称 (如 `"headset"`)。如果要改为图片，需要修改组件代码 `MemoryScavengerHunt.tsx`，或者保持使用图标。

### 现有图片资源
当前项目 `public/photo/` 目录下已有的图片文件：
*   `gong01.png`
*   `hu01.png`
*   `pei01.png`
*   `wang01.png`
*   `xiao01.png`
*   `zhao01.png`

你可以直接在 `src/data/drama-data.ts` 中使用这些路径来替换目前的占位图 (placeholder)。
