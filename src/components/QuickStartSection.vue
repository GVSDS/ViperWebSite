<script setup lang="ts">
import { computed } from 'vue'
import { t } from '@/i18n'

// 终端命令（编译器本体已自举：TransPyV 原生可执行文件）
const term = computed(() => [
  { kind: 'prompt', html: '<span class="tt-cmd">git clone</span> <span class="tt-arg">https://git.gvsds.com/GVSDS/TransPyC</span>' },
  { kind: 'prompt', html: '<span class="tt-cmd">git clone</span> <span class="tt-arg">https://git.gvsds.com/GVSDS/ViperTemplateProject</span>' },
  { kind: 'gap', html: '' },
  { kind: 'cmt', html: t.quickstart.cmdNote },
  { kind: 'prompt', html: '<span class="tt-cmd">.\\TransPyC\\TransPyV\\output\\TransPyV.exe</span> <span class="tt-arg">--project</span> <span class="tt-arg">.\\ViperTemplateProject\\project.vpj</span>' },
  { kind: 'ok', html: '<span class="tt-ok">✓ build ok</span> <span class="tt-dim">— native app.exe · 86ms</span>' },
  { kind: 'gap', html: '' },
  { kind: 'prompt', html: '<span class="tt-cmd">.\\ViperTemplateProject\\output\\app.exe</span>' },
  { kind: 'out', html: t.quickstart.output },
])
</script>

<template>
  <section id="start" class="section quickstart">
    <div class="container">
      <div class="sec-head" data-reveal>
        <p class="eyebrow mono">{{ t.quickstart.eyebrow }}</p>
        <h2 class="section-title">{{ t.quickstart.title }}</h2>
        <p class="section-tagline">{{ t.quickstart.tagline }}</p>
        <p class="section-sub">{{ t.quickstart.sub }}</p>
      </div>

      <div class="prereqs" data-reveal>
        <span v-for="p in t.quickstart.prereqs" :key="p" class="prereq-chip mono">{{ p }}</span>
      </div>

      <div class="qs-grid">
        <ol class="steps">
          <li
            v-for="(step, i) in t.quickstart.steps"
            :key="step.num"
            class="step"
            :style="{ '--stagger': `${i * 120}ms` }"
            data-reveal
          >
            <span class="step-num mono">{{ step.num }}</span>
            <div class="step-body">
              <h3 class="step-title">{{ step.title }}</h3>
              <p class="step-desc">{{ step.desc }}</p>
            </div>
          </li>
        </ol>

        <div class="qs-visual" data-reveal>
          <div class="code-win">
            <div class="code-win__bar">
              <span class="code-win__dot"></span>
              <span class="code-win__dot"></span>
              <span class="code-win__dot"></span>
              <span class="code-win__file">PowerShell</span>
            </div>
            <pre><code>
              <span
                v-for="(line, i) in term"
                :key="i"
                class="tt-line"
                :class="`tt-line--${line.kind}`"
                v-html="line.html"
              ></span>
              <span class="caret"></span>
            </code></pre>
          </div>
        </div>
      </div>

      <!-- 常用命令行参数 -->
      <div class="cli" data-reveal>
        <p class="cli-title mono">{{ t.quickstart.cliTitle }}</p>
        <div class="cli-grid">
          <div v-for="(c, i) in t.quickstart.cli" :key="i" class="cli-row">
            <span class="cli-flag mono">{{ c.flag }}</span>
            <span class="cli-desc">{{ c.desc }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.quickstart {
  /* 与前后 section 无缝衔接：两端都回到 --bg，浅色带只在中段柔和起伏；
     去掉原来的上下边框（那正是"分段"感的来源） */
  background: linear-gradient(180deg, var(--bg), var(--bg-soft) 18%, var(--bg));
}

.sec-head {
  margin-bottom: 30px;
}

.section-tagline {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin: -6px 0 14px;
  color: var(--accent-strong);
  font-size: 1.28rem;
  font-weight: 650;
  letter-spacing: 0.01em;
}

.section-tagline::before {
  content: '❝';
  color: var(--accent);
  font-size: 1.4rem;
  line-height: 1;
  opacity: 0.75;
}

.prereqs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: clamp(40px, 6vw, 64px);
}

.prereq-chip {
  font-size: 0.78rem;
  color: var(--text-dim);
  border: 1px solid var(--line-soft);
  border-radius: 999px;
  padding: 6px 14px;
  background: var(--panel);
}

.qs-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
  align-items: start;
  gap: clamp(36px, 5vw, 72px);
}

/* 步骤列表 */
.steps {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.step {
  display: grid;
  grid-template-columns: 58px 1fr;
  gap: 18px;
  padding: 22px 0;
  border-bottom: 1px solid var(--line-soft);
}

.step-num {
  font-size: 1.5rem;
  font-weight: 750;
  color: var(--accent);
  opacity: 0.85;
  line-height: 1;
}

.step-title {
  font-size: 1.12rem;
  font-weight: 650;
  margin-bottom: 7px;
}

.step-desc {
  color: var(--text-dim);
  font-size: 0.95rem;
}

/* 终端 */
.qs-visual .code-win {
  --accent: #4ddb8a;
}

.tt-line {
  display: block;
}

.tt-line--gap {
  height: 6px;
}

.tt-line--cmt {
  color: var(--tok-cmt);
  font-style: italic;
}

.tt-line--prompt::before {
  content: '$ ';
  color: var(--accent);
  font-weight: 700;
  user-select: none;
}

.tt-cmd {
  color: var(--tok-plain);
}

.tt-arg {
  color: var(--tok-str);
}

.tt-ok {
  color: var(--accent);
}

.tt-dim {
  color: var(--text-faint);
}

.tt-line--out {
  color: var(--tok-str);
}

@media (max-width: 900px) {
  .qs-grid {
    grid-template-columns: 1fr;
  }
  .qs-visual {
    order: -1;
  }
}
/* 常用命令行参数 */
.cli {
  margin-top: clamp(40px, 6vw, 64px);
  border-top: 1px solid var(--line-soft);
  padding-top: 26px;
}

.cli-title {
  color: var(--text-faint);
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.cli-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px 30px;
}

.cli-row {
  display: grid;
  grid-template-columns: minmax(190px, auto) minmax(0, 1fr);
  gap: 12px;
  align-items: baseline;
  padding: 7px 0;
  border-bottom: 1px dashed var(--line-soft);
}

.cli-flag {
  color: var(--accent-strong);
  font-size: 0.82rem;
  white-space: nowrap;
}

.cli-desc {
  color: var(--text-dim);
  font-size: 0.86rem;
}

@media (max-width: 980px) {
  .cli-grid {
    grid-template-columns: 1fr;
  }
}
</style>
