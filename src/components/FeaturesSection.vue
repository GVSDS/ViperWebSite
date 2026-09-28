<script setup lang="ts">
/** 核心特性：卡片网格（与行式列表、时间轴、代码窗形成形式差异） */
import { computed } from 'vue'
import { t } from '@/i18n'

/** 标题里的 Viper 单独成 span，作为首屏巨字滚动飞行的落点（中英标题都以 Viper 结尾） */
const VIPER_WORD = 'Viper'
const titleParts = computed(() => {
  const full = t.features.title
  const at = full.indexOf(VIPER_WORD)
  return at < 0
    ? { head: full, hasWord: false }
    : { head: full.slice(0, at), hasWord: true }
})

/** 鼠标跟随光晕：在网格上做事件委托，把指针在卡片内的坐标写进该卡片的 CSS 变量 --mx / --my */
function onCardPointerMove(e: PointerEvent) {
  const card = (e.target as HTMLElement | null)?.closest<HTMLElement>('.f-card')
  if (!card) return
  const rect = card.getBoundingClientRect()
  card.style.setProperty('--mx', `${e.clientX - rect.left}px`)
  card.style.setProperty('--my', `${e.clientY - rect.top}px`)
}
</script>

<template>
  <section id="features" class="section features">
    <div class="container">
      <div class="sec-head" data-reveal>
        <p class="eyebrow mono">{{ t.features.eyebrow }}</p>
        <h2 class="section-title">{{ titleParts.head }}<span v-if="titleParts.hasWord" class="title-viper" data-viper-target>Viper</span></h2>
        <p class="section-sub">{{ t.features.sub }}</p>
      </div>

      <div class="card-grid" @pointermove="onCardPointerMove">
        <article
          v-for="(c, i) in t.features.cards"
          :key="i"
          class="f-card"
          :style="{ '--reveal-delay': `${(i % 4) * 70}ms` }"
          data-reveal
        >
          <span class="f-idx mono">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3 class="f-term">{{ c.term }}</h3>
          <p class="f-desc">{{ c.desc }}</p>
          <div class="f-code mono">{{ c.code }}</div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.features {
  /* 顶部留透明区：让首屏柔光透上来继续可见，实现跨 section 的光晕衔接；
     其后接浅色带（两端回到 --bg，与相邻 section 无接缝） */
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    var(--bg) 20%,
    var(--bg-soft) 42%,
    var(--bg) 100%
  );
}

.sec-head {
  margin-bottom: clamp(36px, 5vw, 54px);
}

/* 首屏巨字的落点槽位：只负责占位与测量，字形由飞过来的巨字呈现。
   inline-block 便于取到稳定的盒子；颜色由 --viper-slot-color 控制（脚本启用时置 transparent，
   效果关闭时保持正常可读的标题文字）。 */
.title-viper {
  display: inline-block;
  color: var(--viper-slot-color, inherit);
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.f-card {
  position: relative;
  overflow: hidden; /* 裁掉光晕的直角，贴合圆角卡片 */
  display: flex;
  flex-direction: column;
  gap: 9px;
  padding: 22px 20px 20px;
  border: 1px solid var(--line-soft);
  border-radius: var(--radius);
  background: var(--bg);
  transition: border-color 0.25s var(--ease-out), box-shadow 0.25s var(--ease-out),
    transform 0.25s var(--ease-out);
}

/* 鼠标跟随光晕：位置由 --mx / --my 决定，未移动时落在卡片中心 */
.f-card::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  background: radial-gradient(
    240px circle at var(--mx, 50%) var(--my, 50%),
    rgba(var(--accent-rgb), 0.16),
    transparent 68%
  );
  opacity: 0;
  transition: opacity 0.28s var(--ease-out);
  pointer-events: none;
}

/* 仅在支持悬停的指针设备上启用，触屏不残留光斑 */
@media (hover: hover) and (pointer: fine) {
  .f-card:hover::before {
    opacity: 1;
  }
}

.f-card:hover {
  border-color: rgba(var(--accent-rgb), 0.45);
  box-shadow: var(--shadow-code);
  transform: translateY(-2px);
}

/* 卡片内容压在光晕之上 */
.f-idx,
.f-term,
.f-desc,
.f-code {
  position: relative;
  z-index: 1;
}

.f-idx {
  color: var(--text-faint);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
}

.f-term {
  font-size: 1.04rem;
  font-weight: 650;
  letter-spacing: -0.01em;
}

.f-desc {
  color: var(--text-dim);
  font-size: 0.9rem;
  line-height: 1.7;
  flex: 1;
}

.f-code {
  font-size: 0.76rem;
  color: var(--tok-type);
  background: var(--bg-deep);
  border-radius: var(--radius-sm);
  padding: 7px 11px;
  overflow-x: auto;
  white-space: nowrap;
}

@media (max-width: 1100px) {
  .card-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 620px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
}
</style>
