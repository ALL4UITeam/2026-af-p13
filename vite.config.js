import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const pageData = {
  '/index.html': {
    title: '사용자 선택',
    description: 'AI 국가유산 가이드 - 사용자 유형 선택',
    topTitle: 'AI 가이드',
    leftBarActive: 'home',
  },
  '/guide.html': {
    title: 'AI 가이드',
    description: 'AI 국가유산 가이드 - 일반사용자',
    topTitle: 'AI 가이드',
    gnbActive: 'guide',
    leftBarActive: 'guide',
    guideDesktop: true,
  },
  '/explore.html': {
    title: '탐방',
    description: 'AI 국가유산 가이드 - 탐방 목록',
    topTitle: '탐방',
    gnbActive: 'explore',
    leftBarActive: 'explore',
    exploreDesktop: true,
  },
  '/explore-intro.html': {
    title: '탐방 - 소개',
    description: 'AI 국가유산 가이드 - 경복궁 소개',
    topTitle: '탐방',
    gnbActive: 'explore',
    leftBarActive: 'explore',
    activeTab: 'intro',
  },
  '/explore-history.html': {
    title: '탐방 - 역사',
    description: 'AI 국가유산 가이드 - 경복궁 역사',
    topTitle: '탐방',
    gnbActive: 'explore',
    leftBarActive: 'explore',
    activeTab: 'history',
  },
  '/explore-food.html': {
    title: '탐방 - 주변맛집',
    description: 'AI 국가유산 가이드 - 경복궁 주변 맛집',
    topTitle: '탐방',
    gnbActive: 'explore',
    leftBarActive: 'explore',
    activeTab: 'food',
  },
  '/explore-guide.html': {
    title: '탐방 - AI가이드',
    description: 'AI 국가유산 가이드 - 경복궁 AI 가이드',
    topTitle: '탐방',
    gnbActive: 'explore',
    leftBarActive: 'explore',
    activeTab: 'guide',
  },
  '/tour.html': {
    title: '관광투어코스',
    description: 'AI 국가유산 가이드 - 관광투어코스',
    topTitle: '관광투어코스',
    gnbActive: 'tour',
  },
  '/tour-course.html': {
    title: '투어 코스안내',
    description: 'AI 국가유산 가이드 - 투어 코스 상세',
    gnbActive: 'tour',
  },
  '/settings-kor.html': {
    title: '언어설정',
    description: 'AI 국가유산 가이드 - 언어설정 (한국어)',
    topTitle: '언어설정',
    gnbActive: 'lang',
    activeLang: 'kor',
    settingsIntro: '원하는 언어를 설정하세요',
    aiGuideTitle: 'AI 다국어 가이드',
    aiGuideDesc: '선택한 언어로 유적지 정보와 AI가이드를 이용할 수 있습니다. 실 시간으로 콘텐츠가 선택 언어로 변환됩니다.',
    voiceTitle: '음성 가이드',
    voiceDesc: 'AI 음성 가이드를 통해 유적지를 더욱 생생하게 탐방 하세요',
    tipTitle: '다국어 팁',
    tipDesc: '언어를 변경하면 앱 내 모든 유적지 설명, AI 안내, 투어 코스 정보가 즉시 선택한 언어로 표시됩니다.',
    statusLang: '한국어',
    statusSuffix: '로 설정됨',
    statusFlag: 'kor',
  },
  '/settings-eng.html': {
    title: 'Language Setting',
    description: 'AI 국가유산 가이드 - Language Setting (English)',
    topTitle: 'Language Setting',
    gnbActive: 'lang',
    activeLang: 'eng',
    settingsIntro: 'Choose your preferred language',
    aiGuideTitle: 'AI Multilingual Guide',
    aiGuideDesc: 'Access heritage site information and AI guides in your selected language. All content is instantly translated to your chosen language.',
    voiceTitle: 'Audio Guide',
    voiceDesc: 'Explore heritage sites more vividly with the AI audio guide',
    tipTitle: 'Multilingual Tip',
    tipDesc: 'Changing the language instantly displays all heritage descriptions, AI guidance, and tour information in your selected language.',
    statusLang: 'English',
    statusSuffix: 'selected',
    statusFlag: 'eng',
  },
  '/settings-jpn.html': {
    title: '言語設定',
    description: 'AI 국가유산 가이드 - 言語設定 (日本語)',
    topTitle: '言語設定',
    gnbActive: 'lang',
    activeLang: 'jpn',
    settingsIntro: 'ご希望の言語をお選びください',
    aiGuideTitle: 'AI多言語ガイド',
    aiGuideDesc: '選択した言語で遺跡情報とAIガイドをご利用いただけます。全てのコンテンツが選択した言語にリアルタイムで変換されます。',
    voiceTitle: '音声ガイド',
    voiceDesc: 'AI音声ガイドを通じて遺跡をより生き生きと探訪してください',
    tipTitle: '多言語のヒント',
    tipDesc: '言語を変更すると、アプリ内の全ての遺跡説明、AIガイド、ツアー情報が即座に選択した言語で表示されます。',
    statusLang: '日本語',
    statusSuffix: 'に設定済み',
    statusFlag: 'jpn',
  },
  '/settings-chn.html': {
    title: '语言设置',
    description: 'AI 국가유산 가이드 - 语言设置 (中文)',
    topTitle: '语言设置',
    gnbActive: 'lang',
    activeLang: 'chn',
    settingsIntro: '请选择您偏好的语言',
    aiGuideTitle: 'AI多语言导览',
    aiGuideDesc: '以您选择的语言访问遗址信息和AI导览。所有内容即时转换为您所选的语言。',
    voiceTitle: '语音导览',
    voiceDesc: '通过AI语音导览更加生动地探访遗址',
    tipTitle: '多语言提示',
    tipDesc: '更改语言后，应用内所有遗址说明、AI指引和旅游路线信息将即时以所选语言显示。',
    statusLang: '中文',
    statusSuffix: '已设置',
    statusFlag: 'chn',
  },
  '/map.html': {
    title: '지도&루트',
    description: 'AI 국가유산 가이드 - 지도 및 루트',
    topTitle: '지도&루트',
    gnbActive: 'map',
  },
}

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/2026-af-p13/' : '/',
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
          title: 'AI 국가유산 가이드',
          description: 'AI 국가유산 가이드',
          topTitle: 'AI 가이드',
        }

        return {
          ...data,
          navActive: data.leftBarActive ?? data.gnbActive ?? '',
        }
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
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        guide: path.resolve(__dirname, 'guide.html'),
        explore: path.resolve(__dirname, 'explore.html'),
        exploreIntro: path.resolve(__dirname, 'explore-intro.html'),
        exploreHistory: path.resolve(__dirname, 'explore-history.html'),
        exploreFood: path.resolve(__dirname, 'explore-food.html'),
        exploreGuide: path.resolve(__dirname, 'explore-guide.html'),
        tour: path.resolve(__dirname, 'tour.html'),
        tourCourse: path.resolve(__dirname, 'tour-course.html'),
        settingsKor: path.resolve(__dirname, 'settings-kor.html'),
        settingsEng: path.resolve(__dirname, 'settings-eng.html'),
        settingsJpn: path.resolve(__dirname, 'settings-jpn.html'),
        settingsChn: path.resolve(__dirname, 'settings-chn.html'),
        map: path.resolve(__dirname, 'map.html'),
        viewer: path.resolve(__dirname, 'viewer.html'),
      },
    },
  },
}))
