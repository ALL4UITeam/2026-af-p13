import 'pretendard/dist/web/static/pretendard.css'
import '@noonnu/hangeul-nuri-bold/index.css'
import '../scss/main.scss'

function initVoicePanel() {
  const panel = document.getElementById('voicePanel')
  const trigger = document.getElementById('voiceTrigger')
  const expanded = document.getElementById('voiceExpanded')
  const cancel = document.getElementById('voiceCancel')

  if (!panel || !trigger || !expanded || !cancel) return

  const open = () => {
    panel.classList.add('is-expanded')
    trigger.setAttribute('aria-expanded', 'true')
    expanded.removeAttribute('hidden')
  }

  const close = () => {
    panel.classList.remove('is-expanded')
    trigger.setAttribute('aria-expanded', 'false')
    expanded.setAttribute('hidden', '')
  }

  trigger.addEventListener('click', open)
  cancel.addEventListener('click', close)
}

function initUserSelect() {
  const list = document.querySelector('.user-select__list')
  if (!list) return

  const items = list.querySelectorAll('.user-select-item')
  const radios = list.querySelectorAll('input[type="radio"]')

  radios.forEach((radio) => {
    radio.addEventListener('change', () => {
      items.forEach((item) => item.classList.remove('is-active'))
      const parent = radio.closest('.user-select-item')
      if (parent) parent.classList.add('is-active')
    })
  })

  document.getElementById('btnComplete')?.addEventListener('click', () => {
    window.location.href = './guide.html'
  })
}

function initGuide() {
  const guide = document.querySelector('.guide')
  const chips = document.getElementById('guideChips')
  const chatUser = document.getElementById('chatUser')
  const chatAnswer = document.getElementById('chatAnswer')
  const chatUserText = document.getElementById('chatUserText')
  const chatUserDesktop = document.getElementById('chatUserDesktop')
  const chatAnswerDesktop = document.getElementById('chatAnswerDesktop')
  const chatUserTextDesktop = document.getElementById('chatUserTextDesktop')
  const chatArea = document.getElementById('chatArea')
  const chatAreaDesktop = document.getElementById('chatAreaDesktop')
  const scrollBtns = document.querySelectorAll('.prompt-mobile__scroll, .prompt-pc__scroll')

  if (!guide || !chips) return

  const getActiveChatArea = () =>
    window.matchMedia(`(min-width: ${1024}px)`).matches ? chatAreaDesktop : chatArea

  const scrollChatToEnd = () => {
    const area = getActiveChatArea()
    area?.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }

  const showAnswer = (question) => {
    if (chatUserText) chatUserText.textContent = question
    if (chatUserTextDesktop) chatUserTextDesktop.textContent = question
    chatUser?.removeAttribute('hidden')
    chatAnswer?.removeAttribute('hidden')
    chatUserDesktop?.removeAttribute('hidden')
    chatAnswerDesktop?.removeAttribute('hidden')
    guide.classList.add('is-answered')
    chips.querySelectorAll('.m-chip').forEach((chip) => {
      chip.classList.toggle('m-chip--active', chip.dataset.question === question)
    })
    requestAnimationFrame(scrollChatToEnd)
  }

  chips.querySelectorAll('.m-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.querySelectorAll('.m-chip').forEach((c) => c.classList.remove('m-chip--active'))
      chip.classList.add('m-chip--active')
      showAnswer(chip.dataset.question || chip.textContent.trim())
    })
  })

  scrollBtns.forEach((btn) => {
    btn.addEventListener('click', scrollChatToEnd)
  })
}

function initFilterChips(rootId) {
  const chips = document.getElementById(rootId)
  if (!chips) return

  chips.addEventListener('click', (event) => {
    const chip = event.target.closest('.filter-chip')
    if (!chip) return

    chips.querySelectorAll('.filter-chip').forEach((item) => {
      item.classList.remove('filter-chip--active')
    })
    chip.classList.add('filter-chip--active')
  })
}

function initExplore() {
  initFilterChips('filterChips')
}

function initTour() {
  initFilterChips('tourFilterChips')
}

function initSettings() {
  const toggle = document.querySelector('.settings .toggle')
  if (!toggle) return

  toggle.addEventListener('click', () => {
    const isOn = toggle.classList.toggle('toggle--on')
    toggle.setAttribute('aria-pressed', String(isOn))
  })
}

function initMap() {
  const routeChips = document.getElementById('routeChips')
  routeChips?.addEventListener('click', (event) => {
    const chip = event.target.closest('.route-chip')
    if (!chip) return
    routeChips.querySelectorAll('.route-chip').forEach((item) => {
      item.classList.remove('route-chip--active')
      item.querySelector('.icon-slot')?.classList.remove('icon-slot--white')
    })
    chip.classList.add('route-chip--active')
    chip.querySelector('.icon-slot')?.classList.add('icon-slot--white')
  })

  const siteList = document.getElementById('mapSiteList')
  const featuredTitle = document.getElementById('mapFeaturedTitle')
  const featuredDesc = document.getElementById('mapFeaturedDesc')
  if (!siteList) return

  siteList.addEventListener('click', (event) => {
    const item = event.target.closest('.site-list-item')
    if (!item) return

    siteList.querySelectorAll('.site-list-item').forEach((el) => {
      el.classList.remove('site-list-item--active')
      el.querySelector('.site-list-item__icon')?.classList.remove('site-list-item__icon--active')
      const arrow = el.querySelector('.site-list-item + .icon-slot, .site-list-item .icon-slot--20')
      el.querySelectorAll('.icon-slot--20').forEach((icon) => {
        icon.classList.remove('icon-slot--primary')
      })
    })

    item.classList.add('site-list-item--active')
    item.querySelector('.site-list-item__icon')?.classList.add('site-list-item__icon--active')
    item.querySelector('.icon-slot--20')?.classList.add('icon-slot--primary')

    if (featuredTitle) featuredTitle.textContent = item.dataset.name || ''
    if (featuredDesc) featuredDesc.textContent = item.dataset.desc || ''
  })
}

document.addEventListener('DOMContentLoaded', () => {
  initVoicePanel()
  initUserSelect()
  initGuide()
  initExplore()
  initTour()
  initSettings()
  initMap()
})
