import './viewer.scss'

const DEVICES = {
  mobile: { width: 360, label: '모바일' },
  tablet: { width: 768, label: '태블릿' },
  desktop: { width: 1280, label: 'PC' },
}

const PAGE_GROUPS = [
  {
    title: '온보딩',
    items: [
      { id: '01', name: '사용자선택', file: 'index.html', ready: true },
      { id: '02', name: '음성안내 (확장)', file: null, ready: false, note: 'index 확장 상태' },
    ],
  },
  {
    title: 'AI 가이드',
    items: [
      { id: '03', name: 'AI 가이드', file: 'guide.html', ready: true },
      { id: '04', name: 'AI가이드 답변', file: null, ready: false, note: 'guide 확장 상태' },
    ],
  },
  {
    title: 'VPS',
    items: [
      { id: '05', name: 'VPS모드', file: 'vps.html', ready: false },
      { id: '06', name: 'VPS모드 완료', file: 'vps-complete.html', ready: false },
      { id: '07', name: 'VPS 현재위치 지도', file: 'vps-map.html', ready: false },
    ],
  },
  {
    title: '탐방',
    items: [
      { id: '08', name: '탐방 목록', file: 'explore.html', ready: true },
      { id: '09', name: '탐방 · 소개', file: 'explore-intro.html', ready: true },
      { id: '10', name: '탐방 · 역사', file: 'explore-history.html', ready: true },
      { id: '11', name: '탐방 · 주변맛집', file: 'explore-food.html', ready: true },
      { id: '12', name: '탐방 · AI가이드', file: 'explore-guide.html', ready: true },
    ],
  },
  {
    title: '투어',
    items: [
      { id: '13', name: '투어 목록', file: 'tour.html', ready: true },
      { id: '14', name: '투어 · 코스안내', file: 'tour-course.html', ready: true },
    ],
  },
  {
    title: '지도',
    items: [
      { id: '15', name: '지도&루트', file: 'map.html', ready: true },
    ],
  },
  {
    title: '언어설정',
    items: [
      { id: '16', name: '언어설정 KOR', file: 'settings-kor.html', ready: true },
      { id: '17', name: '언어설정 ENG', file: 'settings-eng.html', ready: true },
      { id: '18', name: '언어설정 JPN', file: 'settings-jpn.html', ready: true },
      { id: '19', name: '언어설정 CHN', file: 'settings-chn.html', ready: true },
    ],
  },
]

const nav = document.getElementById('viewerNav')
const iframe = document.getElementById('viewerIframe')
const frame = document.getElementById('viewerFrame')
const sizeLabel = document.getElementById('viewerSizeLabel')
const pageCount = document.getElementById('viewerPageCount')
const openTabBtn = document.getElementById('viewerOpenTab')
const deviceButtons = document.querySelectorAll('.viewer-device')

let currentFile = 'index.html'
let currentDevice = 'mobile'

function getReadyPages() {
  return PAGE_GROUPS.flatMap((group) => group.items.filter((item) => item.ready && item.file))
}

function renderNav() {
  const readyCount = getReadyPages().length
  pageCount.textContent = `${readyCount}개 화면`

  nav.innerHTML = PAGE_GROUPS.map((group) => {
    const items = group.items.map((item) => {
      if (!item.ready || !item.file) {
        return `
          <li class="viewer-nav__item viewer-nav__item--pending">
            <span class="viewer-nav__id">${item.id}</span>
            <span class="viewer-nav__name">${item.name}</span>
            <span class="viewer-nav__badge">대기</span>
          </li>`
      }

      const isActive = item.file === currentFile
      return `
        <li>
          <button
            type="button"
            class="viewer-nav__btn${isActive ? ' viewer-nav__btn--active' : ''}"
            data-file="${item.file}"
          >
            <span class="viewer-nav__id">${item.id}</span>
            <span class="viewer-nav__name">${item.name}</span>
          </button>
        </li>`
    }).join('')

    return `
      <section class="viewer-nav__group">
        <h2>${group.title}</h2>
        <ul>${items}</ul>
      </section>`
  }).join('')
}

function loadPage(file) {
  currentFile = file
  iframe.src = `./${file}`
  renderNav()
  history.replaceState(null, '', `#${file}`)
}

function setDevice(device) {
  currentDevice = device
  const { width, label } = DEVICES[device]

  frame.dataset.device = device
  frame.className = `viewer-frame viewer-frame--${device}`
  frame.style.setProperty('--frame-width', `${width}px`)

  deviceButtons.forEach((btn) => {
    const active = btn.dataset.device === device
    btn.classList.toggle('viewer-device--active', active)
    btn.setAttribute('aria-selected', String(active))
  })

  updateSizeLabel(width, label)
}

function updateSizeLabel(width, label) {
  const frameHeight = Math.round(frame.getBoundingClientRect().height)
  sizeLabel.textContent = `${label} · ${width} × ${frameHeight || '—'}`
}

function initFromHash() {
  const hash = window.location.hash.replace('#', '')
  if (!hash) return

  const exists = getReadyPages().some((page) => page.file === hash)
  if (exists) currentFile = hash
}

nav.addEventListener('click', (event) => {
  const btn = event.target.closest('.viewer-nav__btn')
  if (!btn) return
  loadPage(btn.dataset.file)
})

deviceButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    setDevice(btn.dataset.device)
  })
})

openTabBtn.addEventListener('click', () => {
  window.open(`./${currentFile}`, '_blank')
})

iframe.addEventListener('load', () => {
  updateSizeLabel(DEVICES[currentDevice].width, DEVICES[currentDevice].label)
})

window.addEventListener('resize', () => {
  updateSizeLabel(DEVICES[currentDevice].width, DEVICES[currentDevice].label)
})

initFromHash()
renderNav()
iframe.src = `./${currentFile}`
setDevice('mobile')
