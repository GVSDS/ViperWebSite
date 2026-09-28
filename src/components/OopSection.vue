<script setup lang="ts">
/** 对象模型：左侧代码窗（语法着色 + 行尾注释），右侧要点对照表 */
import { t } from '@/i18n'
</script>

<template>
  <section id="oop" class="section oop">
    <div class="container">
      <div class="sec-head" data-reveal>
        <p class="eyebrow mono">{{ t.oop.eyebrow }}</p>
        <h2 class="section-title">{{ t.oop.title }}</h2>
        <p class="section-sub">{{ t.oop.sub }}</p>
      </div>

      <div class="split">
        <div class="code-win code-pane" data-reveal>
          <div class="code-win__bar">
            <span class="code-win__dot"></span>
            <span class="code-win__dot"></span>
            <span class="code-win__dot"></span>
            <span class="code-win__file">{{ t.oop.codeTitle }}</span>
          </div>
          <pre><code><span
            v-for="(line, i) in t.oop.code"
            :key="i"
            class="cl"
          ><span class="cl-t">{{ line.t || ' ' }}</span><span v-if="line.c" class="cl-c">// {{ line.c }}</span></span></code></pre>
        </div>

        <div class="notes" data-reveal>
          <p class="pane-title mono">{{ t.oop.notesTitle }}</p>
          <dl class="note-list">
            <div v-for="(n, i) in t.oop.notes" :key="i" class="note-row">
              <dt class="note-key mono">{{ n.key }}</dt>
              <dd class="note-val">{{ n.value }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sec-head {
  margin-bottom: clamp(36px, 5vw, 54px);
}

.split {
  display: grid;
  grid-template-columns: minmax(0, 1.02fr) minmax(0, 0.98fr);
  gap: clamp(28px, 4vw, 56px);
  align-items: start;
}

.code-pane {
  --text: #e6f1ea;
  --accent: #4ddb8a;
  box-shadow: var(--shadow-code), 0 0 0 1px rgba(var(--accent-rgb), 0.16);
}

.code-pane code {
  display: block;
  padding: 18px 22px 22px;
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
  margin-left: 14px;
  color: var(--tok-cmt);
  font-style: italic;
}

.pane-title {
  color: var(--text-faint);
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin-bottom: 14px;
}

.note-list {
  border-top: 1px solid var(--line-soft);
}

.note-row {
  display: grid;
  grid-template-columns: minmax(120px, auto) minmax(0, 1fr);
  gap: 16px;
  align-items: baseline;
  padding: 11px 0;
  border-bottom: 1px dashed var(--line-soft);
}

.note-key {
  color: var(--accent-strong);
  font-size: 0.82rem;
  white-space: nowrap;
}

.note-val {
  color: var(--text-dim);
  font-size: 0.9rem;
}

@media (max-width: 980px) {
  .split {
    grid-template-columns: 1fr;
  }
}
</style>
