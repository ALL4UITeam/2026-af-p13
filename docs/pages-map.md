# Mobile 화면 맵 (Figma `zLylQmcmiLzjenXu4Fbrq5`)

| # | Figma 노드 | 화면명 | HTML 파일 | 상태 |
|---|-----------|--------|-----------|------|
| 01 | `505:3607` | 사용자선택 | `index.html` | 완료 |
| 02 | `505:3549` | AI 해설사 초기 | `guide.html` | 완료 |
| 03 | `505:3511` | 답변 | `guide.html#answer` | 완료 (상태) |
| 04 | `505:3478` | 이미지 답변 | `guide.html#image` | 완료 (상태) |
| 05 | `505:3469` | 지도 답변 | `guide.html#map` | 완료 (상태) |
| 06 | `505:4317` | 탐방 | `explore.html` | 완료 |
| 07 | `505:4210` | 탐방 상세 | `explore-detail.html` | 완료 |
| 08 | `505:3860` | 투어 | `tour.html` | 완료 |
| 09 | `505:3756` | 투어 코스안내 | `tour-course.html` | 완료 |
| 10 | `505:3628` | 지도 | `map.html` | 완료 |

## 공통 레이아웃

- **layout-user-select** — 온보딩 (top 없음): 01
- **layout-app** — 앱 화면 (top 50px, 언어 드롭다운 포함): 02~06, 08~10
- **layout-explore-detail** — 탐방 상세 (자체 히어로 헤더): 07

## 삭제된 화면

- 언어설정 페이지 (`settings-*.html`) → 상단 언어 드롭다운으로 이동
- 탐방 탭 분리 (`explore-intro/history/food/guide.html`) → `explore-detail.html` 통합
- PC 전용 레이아웃 / left-bar / GNB

## 목업 뷰어

- `viewer.html` — Responsive Viewer 스타일 미리보기 (페이지 목록 + 모바일/태블릿/PC 전환)
