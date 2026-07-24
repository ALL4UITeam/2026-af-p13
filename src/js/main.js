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

function initLangMenu() {
  document.querySelectorAll('.lang-menu').forEach((menu) => {
    const toggle = menu.querySelector('button[aria-haspopup="true"]')
    const dropdown = menu.querySelector('.lang-menu__dropdown')
    if (!toggle || !dropdown) return

    const close = () => {
      dropdown.setAttribute('hidden', '')
      toggle.setAttribute('aria-expanded', 'false')
    }

    toggle.addEventListener('click', (event) => {
      event.stopPropagation()
      document.querySelectorAll('.lang-menu__dropdown').forEach((el) => {
        if (el !== dropdown) {
          el.setAttribute('hidden', '')
          el.closest('.lang-menu')?.querySelector('button[aria-haspopup="true"]')?.setAttribute('aria-expanded', 'false')
        }
      })
      const open = dropdown.hasAttribute('hidden')
      if (open) {
        dropdown.removeAttribute('hidden')
        toggle.setAttribute('aria-expanded', 'true')
      } else {
        close()
      }
    })

    dropdown.addEventListener('click', (event) => {
      const item = event.target.closest('.lang-menu__item')
      if (!item) return
      document.querySelectorAll('.lang-menu__item').forEach((el) => el.classList.remove('is-active'))
      item.classList.add('is-active')

      const label = item.querySelector('span')?.textContent?.trim()
      const lang = item.getAttribute('data-lang')

      document.querySelectorAll('.lang-menu').forEach((otherMenu) => {
        const otherToggle = otherMenu.querySelector('button[aria-haspopup="true"]')
        if (!otherToggle) return
        if (otherToggle.classList.contains('user-select-header__lang')) {
          const textEl = otherToggle.querySelector('.user-select-header__lang-label')
          if (textEl && label) textEl.textContent = label
          if (lang) otherToggle.setAttribute('data-lang', lang)
        }
      })

      close()
    })
  })

  document.addEventListener('click', () => {
    document.querySelectorAll('.lang-menu__dropdown').forEach((dropdown) => {
      dropdown.setAttribute('hidden', '')
    })
    document.querySelectorAll('.lang-menu button[aria-haspopup="true"]').forEach((toggle) => {
      toggle.setAttribute('aria-expanded', 'false')
    })
  })
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

function initDesktopVoiceBridge() {
  document.getElementById('voiceTriggerDesktop')?.addEventListener('click', () => {
    document.getElementById('voiceTrigger')?.click()
    document.querySelector('.top__voice')?.click()
  })
}

function initGuide() {
  const guide = document.querySelector('.guide')
  const chips = document.getElementById('guideChips')
  const chatArea = document.getElementById('chatArea')
  const scrollBtns = document.querySelectorAll('.prompt-mobile__scroll')

  if (!guide) return

  const scrollChatToEnd = () => {
    chatArea?.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }

  chips?.querySelectorAll('.m-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const mode = chip.dataset.mode || 'text'
      if (mode === 'image') {
        window.location.href = './guide-image.html'
      } else if (mode === 'map') {
        window.location.href = './guide-map.html'
      } else {
        window.location.href = './guide-answer.html'
      }
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

function initExploreDetail() {
  const moreBtn = document.getElementById('introMore')
  const introText = document.getElementById('introText')
  if (!moreBtn || !introText) return

  moreBtn.addEventListener('click', () => {
    const expanded = introText.classList.toggle('is-expanded')
    moreBtn.firstChild.textContent = expanded ? '접기 ' : '더 보기 '
  })
}

function initTour() {
  initFilterChips('tourFilterChips')
}

function initTourCourseTabs() {
  document.querySelectorAll('.tour-course-tabs').forEach((tabs) => {
    tabs.addEventListener('click', (event) => {
      const tab = event.target.closest('.tour-course-tabs__tab')
      if (!tab) return

      tabs.querySelectorAll('.tour-course-tabs__tab').forEach((el) => {
        el.classList.remove('is-active')
        el.setAttribute('aria-selected', 'false')
      })
      tab.classList.add('is-active')
      tab.setAttribute('aria-selected', 'true')
    })
  })
}

function initMap() {
  const query = document.getElementById('mapSearchQuery')
  const clearBtn = document.getElementById('mapSearchClear')
  const backBtn = document.getElementById('mapSearchBack')
  const searchBar = document.getElementById('mapSearch')

  const syncEmpty = () => {
    if (!query || !searchBar) return
    searchBar.classList.toggle('is-empty', !query.value.trim())
  }

  clearBtn?.addEventListener('click', () => {
    if (!query) return
    query.value = ''
    query.focus()
    syncEmpty()
  })

  query?.addEventListener('input', syncEmpty)

  backBtn?.addEventListener('click', () => {
    if (window.history.length > 1) {
      window.history.back()
    } else {
      window.location.href = './'
    }
  })

  syncEmpty()
}

document.addEventListener('DOMContentLoaded', () => {
  initVoicePanel()
  initLangMenu()
  initDesktopVoiceBridge()
  initUserSelect()
  initGuide()
  initExplore()
  initExploreDetail()
  initTour()
  initTourCourseTabs()
  initMap()
})
