<script setup lang="ts">
/** 编译期设施：居中的声明/修饰代码窗 + 下方横排能力胶囊 */
import { t } from '@/i18n'
</script>

<template>
  <section id="meta" class="section meta">
    <div class="container">
      <div class="sec-head" data-reveal>
        <p class="eyebrow mono">{{ t.meta.eyebrow }}</p>
        <h2 class="section-title">{{ t.meta.title }}</h2>
        <p class="section-sub">{{ t.meta.sub }}</p>
      </div>

      <div class="code-win code-pane" data-reveal>
        <div class="code-win__bar">
          <span class="code-win__dot"></span>
          <span class="code-win__dot"></span>
          <span class="code-win__dot"></span>
          <span class="code-win__file">{{ t.meta.codeTitle }}</span>
        </div>
        <pre><code><span
          v-for="(line, i) in t.meta.code"
          :key="i"
          class="cl"
        ><span class="cl-t">{{ line.t || ' ' }}</span><span v-if="line.c" class="cl-c"># {{ line.c }}</span></span></code></pre>
      </div>

      <div class="chips-wrap" data-reveal>
        <p class="chips-title mono">{{ t.meta.chipsTitle }}</p>
        <div class="chips">
          <div v-for="(c, i) in t.meta.chips" :key="i" class="chip">
            <span class="chip-name">{{ c.name }}</span>
            <span class="chip-note mono">{{ c.note }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.meta {
  /* 与前后 section 无缝衔接：两端都回到 --bg */
  background: linear-gradient(180deg, var(--bg), var(--bg-soft) 18%, var(--bg));
}

.sec-head {
  margin-bottom: clamp(36px, 5vw, 54px);
}

.code-pane {
  --text: #e6f1ea;
  --accent: #4ddb8a;
  max-width: 760px;
  margin-inline: auto;
  box-shadow: var(--shadow-code), 0 0 0 1px rgba(var(--accent-rgb), 0.16);
}

.code-pane code {
  display: block;
  padding: 18px 24px 22px;
}

.cl {
  display: block;
  font-size: 0.85rem;
  line-height: 1.95;
  white-space: pre;
}

.cl-t {
  color: var(--tok-plain);
}

.cl-c {
  margin-left: 16px;
  color: var(--tok-cmt);
  font-style: italic;
}

.chips-wrap {
  margin-top: clamp(34px, 5vw, 52px);
  max-width: 760px;
  margin-inline: auto;
}

.chips-title {
  color: var(--text-faint);
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin-bottom: 14px;
}

.chips {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.chip {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 13px 16px;
  border: 1px solid var(--line-soft);
  border-radius: 999px;
  background: var(--panel);
  transition: border-color 0.25s var(--ease-out), background 0.25s var(--ease-out);
}

.chip:hover {
  border-color: rgba(var(--accent-rgb), 0.45);
  background: rgba(var(--accent-rgb), 0.04);
}

.chip-name {
  font-size: 0.92rem;
  font-weight: 650;
}

.chip-note {
  font-size: 0.76rem;
  color: var(--text-faint);
  overflow-x: auto;
  white-space: nowrap;
}

@media (max-width: 700px) {
  .chips {
    grid-template-columns: 1fr;
  }
}
</style>
