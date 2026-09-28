<script setup lang="ts">
/** 源码导览版块：规模数据条 + 目录职责表 */
import { t } from '@/i18n'
</script>

<template>
  <section id="source" class="section source">
    <div class="container">
      <div class="sec-head" data-reveal>
        <p class="eyebrow mono">{{ t.source.eyebrow }}</p>
        <h2 class="section-title">{{ t.source.title }}</h2>
        <p class="section-sub">{{ t.source.sub }}</p>
      </div>

      <div class="stat-strip" data-reveal>
        <div v-for="(s, i) in t.source.stats" :key="i" class="stat">
          <span class="stat-value mono">{{ s.value }}</span>
          <span class="stat-label">{{ s.label }}</span>
        </div>
      </div>

      <div class="tree" data-reveal>
        <p class="tree-title mono">{{ t.source.dirsTitle }}</p>
        <div class="tree-list">
          <div v-for="(d, i) in t.source.dirs" :key="i" class="tree-row">
            <span class="tree-mark mono">{{ i === t.source.dirs.length - 1 ? '└─' : '├─' }}</span>
            <span class="tree-path mono">{{ d.path }}</span>
            <span class="tree-desc">{{ d.desc }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.source {
  /* 全站浅色带统一形态：两端回到 --bg，中段 18% 处柔和起伏，保证相邻 section 无接缝 */
  background: linear-gradient(180deg, var(--bg), var(--bg-soft) 18%, var(--bg));
}

.sec-head {
  margin-bottom: clamp(36px, 5vw, 56px);
}

.stat-strip {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 1px;
  background: var(--line-soft);
  border: 1px solid var(--line-soft);
  border-radius: var(--radius);
  overflow: hidden;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 22px 18px;
  background: var(--bg);
  min-width: 0; /* 允许网格列被压缩，不被内容顶宽 */
}

.stat-value {
  /* 强制单行：数值一律不换行，否则各列标签基线会错位；
     字号随视口收缩，保证最长的 "Windows x64" 也能在最窄的六分列内放下 */
  white-space: nowrap;
  font-size: clamp(1rem, 1.5vw, 1.4rem);
  font-weight: 700;
  color: var(--accent-strong);
  letter-spacing: -0.02em;
}

.stat-label {
  color: var(--text-faint);
  font-size: 0.8rem;
  line-height: 1.5;
}

.tree {
  margin-top: clamp(40px, 6vw, 64px);
}

.tree-title {
  color: var(--text-faint);
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.tree-list {
  border-left: 1px dashed var(--line-soft);
  padding-left: 18px;
}

.tree-row {
  display: grid;
  grid-template-columns: 20px minmax(170px, auto) minmax(0, 1fr);
  gap: 12px;
  align-items: baseline;
  padding: 9px 0;
}

.tree-mark {
  color: var(--text-faint);
  font-size: 0.8rem;
}

.tree-path {
  color: var(--text);
  font-size: 0.84rem;
  font-weight: 600;
  white-space: nowrap;
}

.tree-desc {
  color: var(--text-dim);
  font-size: 0.9rem;
}

@media (max-width: 1100px) {
  .stat-strip {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 700px) {
  .stat-strip {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .tree-row {
    grid-template-columns: 20px minmax(0, 1fr);
    gap: 4px 10px;
  }

  .tree-desc {
    grid-column: 2;
  }
}
</style>
