import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const pageData = {
  '/index.html': {
    title: '사용자 선택',
    description: 'AI 국가유산 해설사 - 사용자 유형 선택',
    topTitle: 'AI 해설사',
  },
  '/guide.html': {
    title: 'AI 해설사',
    description: 'AI 국가유산 해설사 - 일반사용자',
    topTitle: 'AI 해설사',
    guideDesktop: true,
  },
  '/guide-answer.html': {
    title: 'AI 해설사 - 답변',
    description: 'AI 국가유산 해설사 - 텍스트 답변',
    topTitle: 'AI 해설사',
    guideDesktop: true,
  },
  '/guide-image.html': {
    title: 'AI 해설사 - 이미지 답변',
    description: 'AI 국가유산 해설사 - 이미지 답변',
    topTitle: 'AI 해설사',
    guideDesktop: true,
  },
  '/guide-map.html': {
    title: 'AI 해설사 - 지도 답변',
    description: 'AI 국가유산 해설사 - 지도 답변',
    topTitle: 'AI 해설사',
    guideDesktop: true,
  },
  '/explore.html': {
    title: '탐방',
    description: 'AI 국가유산 해설사 - 탐방 목록',
    topTitle: '탐방',
    exploreDesktop: true,
  },
  '/explore-detail.html': {
    title: '탐방 상세',
    description: 'AI 국가유산 해설사 - 경복궁 상세',
    topTitle: '탐방',
    detailTitle: '경복궁',
    detailSubtitle: '조선의 대표 법궁',
    exploreDetailDesktop: true,
  },
  '/tour.html': {
    title: '투어',
    description: 'AI 국가유산 해설사 - 투어',
    topTitle: '투어',
    tourDesktop: true,
  },
  '/tour-course.html': {
    title: '투어 코스안내',
    description: 'AI 국가유산 해설사 - 투어 코스 상세',
    topTitle: '관광투어코스',
    tourCourseDesktop: true,
  },
  '/map.html': {
    title: '지도',
    description: 'AI 국가유산 해설사 - 지도',
    topTitle: '지도',
    mapFull: true,
    mapDesktop: true,
  },
}

function assetFileNames(assetInfo) {
  const original = (assetInfo.originalFileNames?.[0] || '').replace(/\\/g, '/')
  const fromSrcAssets = original.match(/(?:^|\/)src\/assets\/(.+)$/)
  if (fromSrcAssets) {
    return `assets/${fromSrcAssets[1]}`
  }

  const name = assetInfo.names?.[0] || assetInfo.name || 'asset'
  return `assets/${name}`
}

export default defineConfig({
  // 상대경로: dist를 Eclipse/로컬에서 바로 열어봐도 에셋 연결됨
  base: './',
  plugins: [
    handlebars({
      partialDirectory: path.resolve(__dirname, 'partials'),
      helpers: {
        ifeq(a, b, options) {
          return a === b ? options.fn(this) : options.inverse(this)
        },
      },
      context(pagePath) {
        const data = pageData[pagePath] ?? {
          title: 'AI 국가유산 해설사',
          description: 'AI 국가유산 해설사',
          topTitle: 'AI 해설사',
        }

        return { ...data }
      },
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [path.resolve(__dirname, 'src/scss')],
      },
    },
  },
  build: {
    // 파일명 해시 제거 — 개발자가 dist 경로를 고정으로 연결할 수 있게
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'index.html'),
        guide: path.resolve(__dirname, 'guide.html'),
        guideAnswer: path.resolve(__dirname, 'guide-answer.html'),
        guideImage: path.resolve(__dirname, 'guide-image.html'),
        guideMap: path.resolve(__dirname, 'guide-map.html'),
        explore: path.resolve(__dirname, 'explore.html'),
        exploreDetail: path.resolve(__dirname, 'explore-detail.html'),
        tour: path.resolve(__dirname, 'tour.html'),
        tourCourse: path.resolve(__dirname, 'tour-course.html'),
        map: path.resolve(__dirname, 'map.html'),
        viewer: path.resolve(__dirname, 'viewer.html'),
      },
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames,
      },
    },
  },
})
