<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { projects, experience, skills } from './data'

const filter = ref('Selected')
const filters = ['Selected', 'Websites', 'UI/UX', 'In progress', 'All work']
const visibleProjects = computed(() => filter.value === 'Selected' ? projects.filter(p => p.featured) : filter.value === 'All work' ? projects : projects.filter(p => p.category === filter.value))
const menuOpen = ref(false)
const expanded = ref(0)
const activeSection = ref('home')
const copied = ref(false)
const copyFailed = ref(false)
const year = new Date().getFullYear()
const resumeUrl = `${import.meta.env.BASE_URL}Anurag_Tamrakar.docx`
const portfolioUrl = `${import.meta.env.BASE_URL}Anurag_Tamrakar_Portfolio.pdf`
const motionPaused = ref(false)
const reducedMotion = ref(false)
const pageHidden = ref(false)
const menuToggle = ref(null)
const motionStopped = computed(() => motionPaused.value || reducedMotion.value || pageHidden.value)
let observer, sectionObserver, copyTimer, motionQuery, navigationQuery
const closeMenu = () => { menuOpen.value = false }
function toggleMotion() {
  motionPaused.value = !motionPaused.value
  try { localStorage.setItem('portfolio-motion-paused', String(motionPaused.value)) } catch {}
}
function syncMotionPreference() {
  reducedMotion.value = motionQuery.matches
  if (reducedMotion.value) document.querySelectorAll('.will-reveal').forEach(el => el.classList.add('is-visible'))
}
function syncVisibility() { pageHidden.value = document.hidden }
function handleKey(event) {
  if (event.key === 'Escape' && menuOpen.value) { closeMenu(); menuToggle.value?.focus() }
}
function handleOutsideClick(event) { if (menuOpen.value && !event.target.closest('.header')) closeMenu() }
function syncNavigation() { if (navigationQuery.matches) closeMenu() }
async function copyEmail() {
  try { await navigator.clipboard.writeText('anuragtamrakar4@gmail.com'); copied.value = true; copyFailed.value = false; clearTimeout(copyTimer); copyTimer = setTimeout(() => copied.value = false, 2500) }
  catch { copyFailed.value = true }
}
onMounted(() => {
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  navigationQuery = window.matchMedia('(min-width: 901px)')
  navigationQuery.addEventListener('change', syncNavigation)
  syncMotionPreference()
  syncVisibility()
  try { motionPaused.value = localStorage.getItem('portfolio-motion-paused') === 'true' } catch {}
  motionQuery.addEventListener('change', syncMotionPreference)
  document.addEventListener('visibilitychange', syncVisibility)
  document.addEventListener('keydown', handleKey)
  document.addEventListener('click', handleOutsideClick)
  if (!reducedMotion.value) {
    observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) } }), { threshold: 0.08 })
    document.querySelectorAll('.reveal').forEach(el => { el.classList.add('will-reveal'); observer.observe(el) })
  }
  sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) activeSection.value = entry.target.id }), { rootMargin: '-105px 0px -50% 0px' })
  document.querySelectorAll('main > section[id]').forEach(el => sectionObserver.observe(el))
})
onUnmounted(() => {
  observer?.disconnect(); sectionObserver?.disconnect(); clearTimeout(copyTimer)
  motionQuery?.removeEventListener('change', syncMotionPreference)
  navigationQuery?.removeEventListener('change', syncNavigation)
  document.removeEventListener('visibilitychange', syncVisibility)
  document.removeEventListener('keydown', handleKey)
  document.removeEventListener('click', handleOutsideClick)
})
</script>

<template>
  <div class="ambient-background" :class="{ 'motion-paused': motionStopped }" aria-hidden="true"><div class="ambient-light light-lavender"></div><div class="ambient-light light-indigo"></div><div class="ambient-light light-lime"></div><div class="ambient-grain"></div></div>
  <div class="portfolio-shell" :class="{ 'motion-paused': motionStopped }">
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="header">
    <a class="wordmark" href="#home" aria-label="Anurag Tamrakar home" @click="closeMenu">AT<span class="brand-dot">.</span><span class="wordmark-name">ANURAG<br>TAMRAKAR</span></a>
    <nav class="desktop-nav" aria-label="Main navigation">
      <a v-for="item in ['home', 'work', 'about', 'experience']" :key="item" :href="`#${item}`" :class="{ active: activeSection === item }" :aria-current="activeSection === item ? 'location' : undefined">{{ item }}</a>
    </nav>
    <a class="header-contact" href="#contact" :aria-current="activeSection === 'contact' ? 'location' : undefined">Let’s talk <span aria-hidden="true">↗</span></a>
    <button ref="menuToggle" class="menu-button" :aria-expanded="menuOpen" aria-controls="mobile-nav" @click="menuOpen = !menuOpen"><span>{{ menuOpen ? 'Close −' : 'Menu +' }}</span><svg class="menu-icon" :class="{ opened: menuOpen }" viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path class="menu-line-first" d="M3 6H17"/><path class="menu-line-last" d="M3 14H17"/></svg></button>
    <nav v-if="menuOpen" id="mobile-nav" class="mobile-nav" aria-label="Mobile navigation"><a v-for="item in ['home', 'work', 'about', 'experience', 'contact']" :key="item" :href="`#${item}`" :aria-current="activeSection === item ? 'location' : undefined" @click="closeMenu">{{ item }} <span aria-hidden="true">↗</span></a></nav>
  </header>

  <main id="main">
    <section id="home" class="hero container">
      <div class="hero-top"><span class="eyebrow"><span class="status-dot"></span> UI/UX & FRONTEND ENGINEER</span><span class="location">FORT WORTH, TX <span>↗</span></span></div>
      <div class="hero-grid">
        <div class="hero-copy">
          <div class="hero-intro">HELLO, I’M ANURAG <span>✳</span></div>
          <h1>Design that<br><span class="serif">connects.</span><br>Code that delivers<span class="blue-dot">.</span></h1>
          <div class="hero-description"><span class="intro-line"></span><p>I’m Anurag. I bring design and code together to create accessible, intuitive digital experiences that feel as good as they work.</p></div>
          <div class="hero-actions"><a class="button primary" href="#work">Explore my work <span>↘</span></a><a class="text-link" :href="resumeUrl" download>Download CV <span>↓</span></a></div>
        </div>
        <div class="design-art" aria-label="Animated creative workspace with interface shapes and code" role="img">
          <div class="art-glow"></div><div class="art-grid"></div>
          <div class="creative-window"><div class="window-bar"><span class="window-dots">● ● ●</span><span>the creative workspace</span><span>↗</span></div><div class="canvas-toolbar"><span>✳</span><span>↖</span><span>▧</span><span>◯</span><span>T</span></div><div class="canvas-content"><span class="canvas-label">IDEA → INTERFACE → EXPERIENCE</span><div class="sculpture"><div class="sculpture-loop loop-a"></div><div class="sculpture-loop loop-b"></div><div class="sculpture-loop loop-c"></div></div><div class="selection-frame"><i></i><i></i><i></i><i></i></div><span class="canvas-caption">Make it meaningful.</span><span class="canvas-cursor">↖ <b>Anurag</b></span></div></div>
          <div class="code-card"><div><span class="code-dot"></span> built with intention <span>&lt;/&gt;</span></div><code><span>const</span> experience = {<br>&nbsp; design: <em>'human-centered'</em>,<br>&nbsp; code: <em>'accessible'</em>,<br>&nbsp; details: <em>'everything'</em><br>}</code></div>
          <div class="design-sticker"><span>✳</span> DESIGN<br>MEETS CODE</div><div class="art-footnote"><span class="status-dot"></span> FROM FIRST PIXEL TO FINAL PRODUCT</div>
        </div>
      </div>
      <div class="hero-bottom"><div><strong>5+</strong><span>Years of experience</span></div><div><strong>13</strong><span>Website projects</span></div><div><strong>8</strong><span>UI/UX explorations</span></div><a href="#work" class="scroll-cue">SCROLL TO EXPLORE <span>↓</span></a></div>
    </section>

    <div class="principle-strip" aria-hidden="true"><span>DESIGN WITH EMPATHY</span><span>✳</span><span>BUILD WITH PURPOSE</span><span>✳</span><span>REFINE EVERY DETAIL</span><span>✳</span><span>DESIGN WITH EMPATHY</span></div>

    <section id="work" class="section container">
      <div class="section-heading reveal"><div><span class="eyebrow section-number">01 / THE WORK</span><h2>Ideas made <span class="serif">real.</span></h2></div><p>From first wireframe to final interaction.<br>A selection of websites and interface explorations.</p></div>
      <div class="filter-row"><div class="filters" role="group" aria-label="Filter projects"><button v-for="f in filters" :key="f" :class="{ selected: filter === f }" :aria-pressed="filter === f" @click="filter = f">{{ f }}<span v-if="filter === f" aria-hidden="true">↗</span></button></div><span class="project-count" role="status" aria-live="polite" aria-atomic="true">{{ String(visibleProjects.length).padStart(2, '0') }} PROJECTS<span class="sr-only"> · {{ filter }}</span></span></div>
      <TransitionGroup name="project" tag="div" class="project-grid">
        <a v-for="(project, index) in visibleProjects" :key="project.name" class="project-card" :href="project.url" target="_blank" rel="noopener noreferrer" :aria-label="`Open ${project.name} ${project.category === 'UI/UX' ? 'in Figma' : 'website'} in a new tab`">
          <div class="project-art" :class="project.color">
            <div class="project-art-top"><span>{{ project.industry }}</span><span>{{ String(index + 1).padStart(2, '0') }}</span></div>
            <div class="project-visual" aria-hidden="true"><div class="visual-orb"></div><div class="visual-ring"></div><div class="project-monogram">{{ project.mark }}<span>↗</span></div><div class="visual-caption">{{ project.name }}</div></div>
            <div class="project-art-bottom"><span>{{ project.category === 'UI/UX' ? 'INTERFACE EXPLORATION' : 'DIGITAL EXPERIENCE' }}</span><span class="preview-label">{{ project.category === 'UI/UX' ? 'FIGMA' : 'WEB' }} ↗</span></div>
            <span class="project-open">{{ project.category === 'UI/UX' ? 'Open Figma' : 'Visit website' }} ↗</span>
          </div>
          <div class="project-info"><div><h3>{{ project.name }}</h3><p>{{ project.role }}<span v-if="project.category === 'In progress'" class="progress-tag">In progress</span></p></div><span class="project-arrow">↗</span></div>
        </a>
      </TransitionGroup>
      <div class="work-bottom"><p>Across industries. Always with people at the center.</p><button v-if="filter === 'Selected'" class="text-link" @click="filter = 'All work'">View all 21 projects <span>↗</span></button><a v-else class="text-link" :href="portfolioUrl" download>Download portfolio <span>↓</span></a></div>
    </section>

    <section id="about" class="about-section">
      <div class="container about-grid"><div class="about-heading reveal"><span class="eyebrow section-number">02 / A LITTLE ABOUT ME</span><h2>A designer’s eye.<br>An engineer’s<br><span class="serif">mindset.</span></h2><div class="about-emblem" aria-hidden="true">a<span>t</span><i>✳</i></div><span class="about-caption">ROOTED IN CURIOSITY. BUILT ON CRAFT.</span></div>
      <div class="about-body reveal"><p class="large-copy">Great interfaces live at the intersection of thoughtful design and thoughtful engineering. That’s where I do my best work.</p><p>I’m a UI/UX and Frontend Engineer with 5+ years of experience translating ideas and Figma designs into accessible, responsive, high-performance web applications.</p><p>My work spans teams in Nepal and the United States. I enjoy collaborating with designers and developers, mentoring teammates, and bringing consistency to every detail—from a component’s layout to its keyboard behavior.</p><div class="about-facts"><div><span>BASED IN</span><strong>Fort Worth, Texas</strong></div><div><span>MOBILITY</span><strong>Open to relocation</strong></div><div><span>WORK AUTHORIZATION</span><strong>Green Card holder</strong></div><div><span>EDUCATION</span><strong>Bachelor’s in CIS</strong><small>Apex College · Pokhara University<br>Kathmandu · 2015–2019</small></div></div><a class="text-link" href="https://www.linkedin.com/in/anurag-tamrakar-630b8b137/" target="_blank" rel="noopener noreferrer">Connect on LinkedIn <span>↗</span></a></div></div>
    </section>

    <section class="section skills-section container"><div class="section-heading reveal"><div><span class="eyebrow section-number">THE TOOLKIT</span><h2>Craft, backed by <span class="serif">capability.</span></h2></div></div><div class="skills-grid"><article v-for="(group, i) in skills" :key="group.title" class="skill-group reveal"><span class="skill-index">0{{ i + 1 }} <span>{{ ['✳', '⌘', '◎', '↗'][i] }}</span></span><h3>{{ group.title }}</h3><div class="skill-tags"><span v-for="skill in group.items" :key="skill">{{ skill }}</span></div></article></div></section>

    <section id="experience" class="section container experience-section"><div class="section-heading reveal"><div><span class="eyebrow section-number">03 / THE JOURNEY</span><h2>Experience that <span class="serif">adds up.</span></h2></div><p>Different teams. New challenges.<br>A consistent commitment to better experiences.</p></div><div class="experience-list"><article v-for="(job, i) in experience" :key="job.company" class="experience-item reveal" :class="{ expanded: expanded === i }"><button class="experience-toggle" :aria-expanded="expanded === i" :aria-controls="`job-${i}`" @click="expanded = expanded === i ? null : i"><span class="job-date">{{ job.date }}</span><span class="job-title"><strong>{{ job.title }}</strong><span>{{ job.company }} <span class="job-location">/ {{ job.location }}</span></span></span><span class="expand-icon">{{ expanded === i ? '−' : '+' }}</span></button><div v-if="expanded === i" :id="`job-${i}`" class="job-details"><ul><li v-for="detail in job.details" :key="detail">{{ detail }}</li></ul></div></article></div></section>

    <section id="contact" class="contact-section"><div class="container"><div class="contact-top"><span class="eyebrow">04 / LET’S CONNECT</span><span>GOOD WORK STARTS WITH A CONVERSATION.</span></div><div class="contact-main"><h2>Something in mind?<br>Let’s make it <span class="serif">happen.</span></h2><a class="contact-round" href="mailto:anuragtamrakar4@gmail.com" aria-label="Email Anurag">↗</a></div><div class="contact-bottom"><div><a class="email-link" href="mailto:anuragtamrakar4@gmail.com">anuragtamrakar4@gmail.com</a><button class="copy-button" @click="copyEmail">{{ copied ? 'Copied ✓' : 'Copy email ⧉' }}</button><span class="copy-status" role="status">{{ copied ? 'Email copied to clipboard.' : copyFailed ? 'Please select and copy the email above.' : '' }}</span></div><div class="contact-links"><a href="tel:+16823779175">(682) 377-9175 ↗</a><a href="https://www.linkedin.com/in/anurag-tamrakar-630b8b137/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a :href="resumeUrl" download>Résumé ↓</a></div></div></div></section>
  </main>
  <footer class="footer container"><a class="footer-brand" href="#home">AT.</a><span>© {{ year }} Anurag Tamrakar</span><span class="footer-note">Thoughtfully designed. Precisely built.</span><button class="motion-control" :aria-pressed="motionPaused" :disabled="reducedMotion" @click="toggleMotion">{{ reducedMotion ? 'Reduced motion' : motionPaused ? 'Resume motion ▶' : 'Pause motion Ⅱ' }}</button><a href="#home">Back to top ↑</a></footer>
  </div>
</template>
