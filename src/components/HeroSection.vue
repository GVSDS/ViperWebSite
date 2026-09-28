<script setup lang="ts">
/** 首屏：整屏宽巨字 + 错位排版（左巨字 / 右对齐文案），非对称构图
 *  滚动联动：巨字里的 Viper 随滚动向下飞行并缩小，最终直接落进「为什么是 Viper」标题的
 *  Viper 槽位（同一个词的两个位置，不做交叉淡化，文字样式一路保留） */
import { onMounted, onBeforeUnmount, watch, nextTick, ref } from 'vue'
import { t, currentLang } from '@/i18n'

const brandRef = ref<HTMLElement | null>(null)

/** 元素的文档坐标（offsetLeft/offsetTop 逐级累加）：不受 transform 与进入动画影响 */
function docOffset(el: HTMLElement) {
  let left = 0
  let top = 0
  let node: HTMLElement | null = el
  while (node) {
    left += node.offsetLeft
    top += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }
  return { left, top }
}

/** 首个文本节点的排版宽度（Range 只取宽度：不受 translate 影响，measure 前已清掉 scale） */
function firstTextWidth(el: HTMLElement) {
  const node = el.firstChild
  if (!node || node.nodeType !== Node.TEXT_NODE) return el.getBoundingClientRect().width
  const range = document.createRange()
  range.selectNodeContents(node)
  return range.getBoundingClientRect().width
}

const origin = { left: 0, top: 0 } // 巨字元素文档位置（transform 原点）
const word = { centerX: 0, centerY: 0, width: 0 } // 巨字里的 Viper（中心 + 宽度）
const slot = { centerX: 0, centerY: 0, width: 0 } // 标题里的 Viper 槽位（同上）
let endY = 0 // 飞行终点对应的滚动位置
let enabled = false
let rafId = 0

/** 复位到自然状态（同时用于测量前清场） */
function reset() {
  const brand = brandRef.value
  if (brand) brand.style.transform = ''
  document.documentElement.style.removeProperty('--viper-slot-color')
}

/** 测量巨字与标题槽位；视口过窄、无槽位或用户偏好减少动效时关闭该效果 */
function measure() {
  const brand = brandRef.value
  const target = document.querySelector<HTMLElement>('[data-viper-target]')
  reset()
  if (
    !brand ||
    !target ||
    window.innerWidth < 640 ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    enabled = false
    return
  }

  // 巨字里的 Viper：宽度取 Range（只受水平排版影响），中心由 offset + 计算样式推算 ——
  // 这样即便外层入场动画仍在跑（只做 translateY），测量结果也完全不受影响
  Object.assign(origin, docOffset(brand))
  const brandStyle = getComputedStyle(brand)
  const brandLineH = parseFloat(brandStyle.lineHeight) || parseFloat(brandStyle.fontSize)
  const wordWidth = firstTextWidth(brand)
  Object.assign(word, {
    width: wordWidth,
    centerX: origin.left + parseFloat(brandStyle.paddingLeft) + wordWidth / 2,
    centerY: origin.top + parseFloat(brandStyle.paddingTop) + brandLineH / 2,
  })

  // 标题槽位：位置取 offset 链，尺寸取 rect（translate 不改变尺寸）
  const slotOffset = docOffset(target)
  const slotRect = target.getBoundingClientRect()
  Object.assign(slot, {
    width: slotRect.width,
    centerX: slotOffset.left + slotRect.width / 2,
    centerY: slotOffset.top + slotRect.height / 2,
  })

  // 终点：标题里的 Viper 升到视口 78% 高度处时飞行刚好结束
  endY = slotOffset.top - window.innerHeight * 0.78
  enabled = endY > 240 && word.width > 0 && slot.width > 0
  if (enabled) {
    // 槽位交给飞过来的巨字呈现，标题自身不再显示该词（关闭效果时不设置，标题正常可读）
    document.documentElement.style.setProperty('--viper-slot-color', 'transparent')
  }
  update()
}

function update() {
  rafId = 0
  const brand = brandRef.value
  if (!brand) return
  if (!enabled) {
    reset()
    return
  }
  const p = Math.min(1, Math.max(0, window.scrollY / endY))
  const e = p * p * (3 - 2 * p) // smoothstep：起步与收尾都更柔
  // 终态：把巨字里的 Viper 等比缩到槽位宽度，并与其中心重合（transform-origin: 0 0）
  const scale = slot.width / word.width
  const txFinal = slot.centerX - origin.left - scale * (word.centerX - origin.left)
  const tyFinal = slot.centerY - origin.top - scale * (word.centerY - origin.top)
  // 按进度插值：词语中心沿直线从原位置走到槽位中心，尺寸同步过渡
  const s = 1 + (scale - 1) * e
  brand.style.transform = `translate3d(${txFinal * e}px, ${tyFinal * e}px, 0) scale(${s})`
}

function onScroll() {
  if (rafId) return
  rafId = requestAnimationFrame(update)
}

function onResize() {
  if (rafId) return
  rafId = requestAnimationFrame(() => {
    rafId = 0
    measure()
  })
}

onMounted(async () => {
  await nextTick()
  measure()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize, { passive: true })
  // 字体载入后字宽会变，需重测
  document.fonts?.ready.then(measure)
})

// 语言切换后标题文案与排版都会变，重新测量
watch(currentLang, async () => {
  await nextTick()
  measure()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
  if (rafId) cancelAnimationFrame(rafId)
  reset()
})
</script>

<template>
  <section id="top" class="hero">
    <div class="hero-bg" aria-hidden="true">
      <span class="hero-halo"></span>
      <span class="hero-halo hero-halo--sky"></span>
    </div>

    <div class="hero-inner">
      <div class="hero-head">
        <span class="hero-vert">{{ t.hero.kicker }}</span>
        <div class="hero-brand-wrap">
          <h1 ref="brandRef" class="hero-brand">Viper<span class="brand-dot">.</span></h1>
        </div>
      </div>

      <div class="hero-lower">
        <p class="hero-statement">{{ t.hero.statement }}</p>
        <p class="hero-lead">{{ t.hero.lead }}</p>
        <div class="hero-cta">
          <a class="btn btn-primary" href="#start">
            {{ t.hero.ctaStart }}
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
          </a>
          <a
            class="btn btn-ghost"
            href="https://git.gvsds.com/GVSDS/TransPyC"
            target="_blank"
            rel="noreferrer"
          >
            {{ t.hero.ctaSource }}
          </a>
        </div>
      </div>

      <!-- 横贯数据行：只放稳定的能力断言，不放会随代码变化的数字 -->
      <ul class="hero-data">
        <li
          v-for="(datum, i) in t.hero.dataRows"
          :key="i"
          class="datum"
          :style="{ '--reveal-delay': `${i * 60}ms` }"
          data-reveal
        >
          <span class="datum-dot" :class="`dot-${i}`" aria-hidden="true"></span>
          <span class="datum-text">{{ datum }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  /* 柔光要越过底边渗入下一 section，所以不能整体裁剪。
     这里只做横向裁剪：柔光是 1260px / 860px 的固定宽度，不横向裁会把页面撑得比视口宽
     （手机端表现为可以左右拖动、右侧一片空白）。
     前置的 overflow: hidden 是不支持 overflow: clip 的浏览器的回退：柔光不外溢，但布局一定安全。 */
  overflow: hidden;
  padding: calc(var(--nav-h) + 40px) 0 36px;
}

@supports (overflow-x: clip) {
  .hero {
    overflow-x: clip;
    overflow-y: visible;
  }
}

/* 背景：两团柔光（主题绿 / 浅蓝），无网格 */
.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.hero-halo {
  position: absolute;
  top: -30%;
  right: -12%;
  width: 1260px;
  height: 1260px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(var(--accent-rgb), 0.16), transparent 62%);
  filter: blur(30px);
}

.hero-halo--sky {
  top: auto;
  bottom: -46%;
  left: -18%;
  width: 860px;
  height: 860px;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.11), transparent 64%);
}

/* 首屏单独放宽容器：巨字接近整屏宽（全站 .container 仍为 1140px） */
.hero-inner {
  position: relative;
  z-index: 1;
  width: min(1620px, 100% - 40px);
  margin-inline: auto;
}

/* 顶部：竖排标识 + 整屏宽巨字 */
.hero-head {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.hero-vert {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding-top: 6px;
  writing-mode: vertical-rl;
  font-size: 0.72rem;
  letter-spacing: 0.42em;
  color: var(--text-faint);
  text-transform: uppercase;
  opacity: 0;
  animation: riseIn 0.7s var(--ease-out) 0.05s forwards;
}

.hero-vert::before {
  content: '';
  width: 2px;
  height: 48px;
  border-radius: 2px;
  background: var(--lime);
}

/* 巨字外层：只负责入场动画（riseIn 会写 transform/opacity，必须与滚动飞行的 transform 分离） */
.hero-brand-wrap {
  flex: 1;
  min-width: 0;
  opacity: 0;
  animation: riseIn 0.9s var(--ease-out) 0.12s forwards;
}

/* 品牌字：整屏宽量级
   line-height + padding 共同决定内容盒高度 —— 渐变由 background-clip
   绘制在内容盒内，内容盒必须高于字形，否则笔画会被吃掉 */
.hero-brand {
  margin: 0;
  font-family: var(--font-brand);
  font-size: clamp(5.5rem, 26vw, 26rem);
  line-height: 0.96;
  padding: 0.1em 0 0.2em;
  letter-spacing: 0.01em;
  font-weight: 900;
  background: linear-gradient(96deg, var(--text) 26%, var(--accent) 94%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  /* 滚动飞行：以左上角为原点做 translate + scale，便于精确落到目标词的位置 */
  transform-origin: 0 0;
  will-change: transform;
}

/* 句点单独上色：不依赖父级 background-clip 对后代文本的裁切，颜色与渐变末端的主题色一致 */
.brand-dot {
  color: var(--accent);
}

/* 文案块右对齐并与巨字轻微压叠，制造错位构图 */
.hero-lower {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
  margin-top: clamp(-34px, -1.8vw, -8px);
}

.hero-statement {
  font-size: clamp(1.7rem, 4.1vw, 3.3rem);
  line-height: 1.22;
  letter-spacing: -0.02em;
  font-weight: 700;
  color: var(--accent);
  opacity: 0;
  animation: riseIn 0.7s var(--ease-out) 0.26s forwards;
}

.hero-lead {
  max-width: 46ch;
  margin-top: 18px;
  font-size: 1.04rem;
  line-height: 1.8;
  color: var(--text-dim);
  opacity: 0;
  animation: riseIn 0.7s var(--ease-out) 0.32s forwards;
}

.hero-cta {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 14px;
  margin-top: 26px;
  opacity: 0;
  animation: riseIn 0.7s var(--ease-out) 0.38s forwards;
}

.hero-cta .btn svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2.2;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform 0.25s var(--ease-out);
}

.btn-primary:hover svg {
  transform: translateX(3px);
}

/* 数据行：横贯整宽、四段等分，圆点按主题四色轮转 */
.hero-data {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin-top: clamp(36px, 5vw, 62px);
  border-top: 1px solid var(--line-soft);
  list-style: none;
}

.datum {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 18px 20px 0;
  border-left: 1px dashed var(--line-soft);
}

.datum:first-child {
  border-left: none;
  padding-left: 0;
}

.datum-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.dot-0 {
  background: var(--accent);
  box-shadow: 0 0 10px var(--glow);
}

.dot-1 {
  background: var(--lime);
}

.dot-2 {
  background: var(--sky);
}

.dot-3 {
  background: var(--red);
}

.datum-text {
  font-size: 0.88rem;
  letter-spacing: 0.02em;
  color: var(--text-dim);
}

@media (max-width: 980px) {
  .hero {
    padding-top: calc(var(--nav-h) + 30px);
  }

  .hero-vert {
    display: none;
  }

  .hero-lower {
    align-items: flex-start;
    text-align: left;
    margin-top: 20px;
  }

  .hero-cta {
    justify-content: flex-start;
  }

  .hero-data {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 14px;
  }

  .datum {
    border-left: none;
    padding: 0;
  }
}

@media (max-width: 560px) {
  .hero-data {
    grid-template-columns: 1fr;
  }
}
</style>
