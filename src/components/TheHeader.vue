<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { t, currentLang, setLang, type Lang } from '@/i18n'

const scrolled = ref(false)
const menuOpen = ref(false)

/** 主题：属性驱动的暗黑模式（具体色值覆盖见 src/assets/base.css） */
type Theme = 'light' | 'dark'
const THEME_KEY = 'viper-theme'
const theme = ref<Theme>('light')
const systemDark = window.matchMedia('(prefers-color-scheme: dark)')

/** 写入主题：属性驱动 base.css 的变量覆盖，同时同步移动端浏览器 UI 底色 */
function applyTheme(next: Theme) {
  theme.value = next
  document.documentElement.setAttribute('data-theme', next)
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', next === 'dark' ? '#0c1512' : '#ffffff')
}

function toggleTheme() {
  const next: Theme = theme.value === 'dark' ? 'light' : 'dark'
  applyTheme(next)
  try {
    // 记住手动选择；写入失败（隐私模式等）只影响下次访问，不影响本次
    localStorage.setItem(THEME_KEY, next)
  } catch {
    /* 忽略写入失败 */
  }
}

/** 用户没手动选择过时跟随系统切换 */
function onSystemThemeChange(e: MediaQueryListEvent) {
  try {
    if (localStorage.getItem(THEME_KEY)) return
  } catch {
    /* 读取失败按"未选择"处理 */
  }
  applyTheme(e.matches ? 'dark' : 'light')
}

function onScroll() {
  scrolled.value = window.scrollY > 10
}

function toggleLang() {
  setLang(currentLang.value === 'zh' ? 'en' : 'zh')
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

const links: { id: string; key: keyof typeof t.nav }[] = [
  { id: 'features', key: 'features' },
  { id: 'compiler', key: 'compiler' },
  { id: 'oop', key: 'oop' },
  { id: 'meta', key: 'meta' },
  { id: 'repl', key: 'repl' },
  { id: 'source', key: 'source' },
  { id: 'start', key: 'quickstart' },
]

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
  // index.html 的内联脚本已在首屏前写好 data-theme，这里只把组件状态同步回来
  theme.value = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
  systemDark.addEventListener('change', onSystemThemeChange)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  systemDark.removeEventListener('change', onSystemThemeChange)
})
</script>

<template>
  <header class="site-header" :class="{ scrolled }">
    <div class="container header-inner">
      <a class="brand" href="#top" @click="closeMenu">
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M18 46 V18 h7 l9 15 9-15 h7 V46 H42 V31 L32 46 22 31 v15 Z" />
        </svg>
        <span class="brand-name">Viper</span>
        <span class="brand-sub mono">lang</span>
      </a>

      <nav class="nav-links" :class="{ open: menuOpen }">
        <a
          v-for="link in links"
          :key="link.id"
          :href="`#${link.id}`"
          class="nav-link"
          @click="closeMenu"
        >
          {{ t.nav[link.key] }}
        </a>
        <a
          class="nav-link nav-source"
          href="https://git.gvsds.com/GVSDS/TransPyC"
          target="_blank"
          rel="noreferrer"
        >
          {{ t.nav.repo }}
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" /></svg>
        </a>
      </nav>

      <div class="header-actions">
        <button
          class="theme-btn"
          type="button"
          :title="theme === 'dark' ? '切换到浅色模式' : '切换到暗黑模式'"
          :aria-label="theme === 'dark' ? '切换到浅色模式' : '切换到暗黑模式'"
          @click="toggleTheme"
        >
          <!-- 图标示意"将切换到的目标主题"：当前是暗色 → 显示太阳 -->
          <svg v-if="theme === 'dark'" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="4.3" />
            <path
              d="M12 2.2v2.3M12 19.5v2.3M2.2 12h2.3M19.5 12h2.3M5 5l1.6 1.6M17.4 17.4 19 19M19 5l-1.6 1.6M6.6 17.4 5 19"
            />
          </svg>
          <svg v-else viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.7 13.6A8.4 8.4 0 1 1 10.4 3.3a6.7 6.7 0 0 0 10.3 10.3z" />
          </svg>
        </button>
        <button class="lang-btn mono" @click="toggleLang" aria-label="Switch language">
          {{ currentLang === 'zh' ? 'EN' : '中' }}
        </button>
        <button
          class="burger"
          :class="{ open: menuOpen }"
          @click="toggleMenu"
          aria-label="Menu"
        >
          <span></span><span></span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 60;
  height: var(--nav-h);
  display: flex;
  align-items: center;
  border-bottom: 1px solid transparent;
  transition: background 0.35s var(--ease-out), border-color 0.35s var(--ease-out),
    backdrop-filter 0.35s var(--ease-out);
}

.site-header.scrolled {
  background: var(--glass);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom-color: var(--line-soft);
}

.header-inner {
  display: flex;
  align-items: center;
  gap: 28px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.brand svg {
  width: 26px;
  height: 26px;
  fill: var(--accent);
}

.brand-name {
  font-weight: 750;
  font-size: 1.22rem;
  letter-spacing: 0.02em;
}

.brand-sub {
  color: var(--accent);
  font-size: 0.68rem;
  letter-spacing: 0.2em;
  transform: translateY(1px);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
}

.nav-link {
  position: relative;
  padding: 8px 13px;
  font-size: 0.94rem;
  color: var(--text-dim);
  border-radius: 6px;
  transition: color 0.2s var(--ease-out), background 0.2s var(--ease-out);
}

.nav-link:hover {
  color: var(--text);
  background: var(--hover);
}

.nav-source {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.nav-source svg {
  width: 13px;
  height: 13px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.lang-btn,
.theme-btn {
  border: 1px solid var(--line-soft);
  color: var(--text-dim);
  height: 34px;
  border-radius: 8px;
  transition: border-color 0.2s, color 0.2s, background 0.2s;
}

.lang-btn {
  width: 42px;
  font-size: 0.82rem;
  letter-spacing: 0.08em;
}

.theme-btn {
  width: 38px;
  display: inline-grid;
  place-items: center;
}

.theme-btn svg {
  width: 17px;
  height: 17px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
}

.lang-btn:hover,
.theme-btn:hover {
  border-color: var(--line);
  color: var(--accent-strong);
  background: rgba(var(--accent-rgb), 0.06);
}

.burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 38px;
  height: 34px;
  border: 1px solid var(--line-soft);
  border-radius: 8px;
  padding: 0 9px;
}

.burger span {
  height: 2px;
  background: var(--text);
  border-radius: 2px;
  transition: transform 0.25s var(--ease-out), opacity 0.2s;
}

.burger.open span:nth-child(1) {
  transform: translateY(3.5px) rotate(45deg);
}
.burger.open span:nth-child(2) {
  transform: translateY(-3.5px) rotate(-45deg);
}

@media (max-width: 1180px) {
  .nav-link {
    padding: 8px 9px;
    font-size: 0.9rem;
  }
}

@media (max-width: 860px) {
  .burger {
    display: flex;
  }

  .nav-links {
    position: fixed;
    top: var(--nav-h);
    left: 0;
    right: 0;
    margin: 0;
    flex-direction: column;
    align-items: stretch;
    gap: 2px;
    background: var(--glass-strong);
    backdrop-filter: blur(18px);
    border-bottom: 1px solid var(--line-soft);
    padding: 10px 20px 18px;
    transform: translateY(-14px);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s var(--ease-out), transform 0.25s var(--ease-out);
  }

  .nav-links.open {
    opacity: 1;
    transform: none;
    pointer-events: auto;
  }

  .nav-link {
    padding: 13px 6px;
    font-size: 1.05rem;
  }
}
</style>
