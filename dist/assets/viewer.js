import"./modulepreload-polyfill.js";const a={mobile:{width:360,label:"모바일"},tablet:{width:768,label:"태블릿"},desktop:{width:1280,label:"PC"}},m=[{title:"온보딩",items:[{id:"01",name:"사용자선택",file:"index.html",ready:!0}]},{title:"AI 해설사",items:[{id:"02",name:"AI 해설사 초기",file:"guide.html",ready:!0},{id:"03",name:"답변",file:"guide-answer.html",ready:!0},{id:"04",name:"이미지 답변",file:"guide-image.html",ready:!0},{id:"05",name:"지도 답변",file:"guide-map.html",ready:!0}]},{title:"탐방",items:[{id:"06",name:"탐방",file:"explore.html",ready:!0},{id:"07",name:"탐방 상세",file:"explore-detail.html",ready:!0}]},{title:"투어",items:[{id:"08",name:"투어",file:"tour.html",ready:!0},{id:"09",name:"투어 코스안내",file:"tour-course.html",ready:!0}]},{title:"지도",items:[{id:"10",name:"지도",file:"map.html",ready:!0}]}],u=document.getElementById("viewerNav"),o=document.getElementById("viewerIframe"),s=document.getElementById("viewerFrame"),p=document.getElementById("viewerSizeLabel"),g=document.getElementById("viewerPageCount"),y=document.getElementById("viewerOpenTab"),v=document.querySelectorAll(".viewer-device");let l="index.html",r="mobile";function f(){return m.flatMap(e=>e.items.filter(t=>t.ready&&t.file))}function w(){const e=f().length;g.textContent=`${e}개 화면`,u.innerHTML=m.map(t=>{const i=t.items.map(n=>!n.ready||!n.file?`
          <li class="viewer-nav__item viewer-nav__item--pending">
            <span class="viewer-nav__id">${n.id}</span>
            <span class="viewer-nav__name">${n.name}</span>
            <span class="viewer-nav__badge">대기</span>
          </li>`:`
        <li>
          <button
            type="button"
            class="viewer-nav__btn${n.file===l?" viewer-nav__btn--active":""}"
            data-file="${n.file}"
          >
            <span class="viewer-nav__id">${n.id}</span>
            <span class="viewer-nav__name">${n.name}</span>
          </button>
        </li>`).join("");return`
      <section class="viewer-nav__group">
        <h2>${t.title}</h2>
        <ul>${i}</ul>
      </section>`}).join("")}function _(e){l=e,o.src=`./${e}`,w(),history.replaceState(null,"",`#${encodeURIComponent(e)}`)}function h(e){r=e;const{width:t,label:i}=a[e];s.dataset.device=e,s.className=`viewer-frame viewer-frame--${e}`,s.style.setProperty("--frame-width",`${t}px`),v.forEach(n=>{const d=n.dataset.device===e;n.classList.toggle("viewer-device--active",d),n.setAttribute("aria-selected",String(d))}),c(t,i)}function c(e,t){const i=Math.round(s.getBoundingClientRect().height);p.textContent=`${t} · ${e} × ${i||"—"}`}function b(){const e=decodeURIComponent(window.location.hash.replace("#",""));if(!e)return;f().some(i=>i.file===e)&&(l=e)}u.addEventListener("click",e=>{const t=e.target.closest(".viewer-nav__btn");t&&_(t.dataset.file)});v.forEach(e=>{e.addEventListener("click",()=>{h(e.dataset.device)})});y.addEventListener("click",()=>{window.open(`./${l}`,"_blank")});o.addEventListener("load",()=>{c(a[r].width,a[r].label)});window.addEventListener("resize",()=>{c(a[r].width,a[r].label)});b();w();o.src=`./${l}`;h("mobile");
