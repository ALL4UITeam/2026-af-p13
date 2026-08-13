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
    ],
  },
  {
    title: 'AI 해설사',
    items: [
      { id: '02', name: 'AI 해설사 초기', file: 'guide.html', ready: true },
      { id: '03', name: '답변', file: 'guide-answer.html', ready: true },
      { id: '04', name: '이미지 답변', file: 'guide-image.html', ready: true },
      { id: '05', name: '지도 답변', file: 'guide-map.html', ready: true },
    ],
  },
  {
    title: '탐방',
    items: [
      { id: '06', name: '탐방', file: 'explore.html', ready: true },
      { id: '07', name: '탐방 상세', file: 'explore-detail.html', ready: true },
    ],
  },
  {
    title: '투어',
    items: [
      { id: '08', name: '투어', file: 'tour.html', ready: true },
      { id: '09', name: '투어 코스안내', file: 'tour-course.html', ready: true },
    ],
  },
  {
    title: '지도',
    items: [
      { id: '10', name: '지도', file: 'map.html', ready: true },
      { id: '11', name: '로드뷰', file: 'roadview.html', ready: true },
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
  history.replaceState(null, '', `#${encodeURIComponent(file)}`)
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
  const hash = decodeURIComponent(window.location.hash.replace('#', ''))
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
