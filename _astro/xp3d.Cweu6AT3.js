import{A as e,B as t,C as n,E as r,J as i,O as a,T as o,V as s,X as c,Y as l,Z as u,_ as d,a as f,at as p,b as m,c as h,g,h as _,i as v,j as y,o as b,ot as x,st as S,t as C,w,y as T,z as E}from"./BufferGeometryUtils.DTieEH8s.js";import{a as ee,d as te,f as ne,i as re,l as ie,s as ae,u as oe}from"./kit.wFWyh0-h.js";var D=30,O=1.2,k=.5,se=.55,A=1.1,ce=11,j=(e,t)=>new p((e-150)/10,(t-150)/10);function le(){return new l({transparent:!0,depthWrite:!1,uniforms:{uHeat:{value:1},uTime:{value:0}},vertexShader:`
      varying vec2 vUv;
      void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
    `,fragmentShader:`
      uniform float uHeat; uniform float uTime; varying vec2 vUv;
      float g(vec2 p, vec2 c, float s) { vec2 d = p - c; return exp(-dot(d, d) / (2.0 * s * s)); }
      void main() {
        vec2 p = vUv;
        float t = 0.0;
        // 運算核心群（四個）＋ 次要熱源，彼此分開但有擴散
        t += 0.95 * g(p, vec2(0.36, 0.40), 0.075);
        t += 1.00 * g(p, vec2(0.64, 0.40), 0.075);
        t += 0.90 * g(p, vec2(0.36, 0.62), 0.075);
        t += 0.92 * g(p, vec2(0.64, 0.62), 0.075);
        t += 0.45 * g(p, vec2(0.50, 0.82), 0.06);
        t += 0.30 * g(p, vec2(0.50, 0.51), 0.22);
        t += 0.015 * sin(uTime * 1.3 + p.x * 9.0) * sin(p.y * 7.0);
        t = clamp(t, 0.0, 1.15);
        float amt = mix(0.28, 0.85, uHeat);
        float k = clamp(t * amt, 0.0, 1.0);
        // 熱：深 → 暗橘 → 橘 → 淡黃
        vec3 c0 = vec3(0.010, 0.011, 0.013);
        // 低飽和的熱色階：避免「電爐」感
        vec3 c1 = vec3(0.09, 0.045, 0.03);
        vec3 c2 = vec3(0.30, 0.15, 0.08);
        vec3 c3 = vec3(0.50, 0.34, 0.24);
        vec3 hot = k < 0.4 ? mix(c0, c1, k / 0.4) : (k < 0.75 ? mix(c1, c2, (k - 0.4) / 0.35) : mix(c2, c3, (k - 0.75) / 0.25));
        // 冷：低對比灰階
        vec3 cold = mix(c0, vec3(0.09, 0.10, 0.11), k);
        vec3 col = mix(cold, hot, uHeat);
        // 等溫線：極細的工程分析圖語言
        float iso = abs(fract(k * 7.0) - 0.5);
        float line = 1.0 - smoothstep(0.0, 0.035, iso);
        col += line * mix(0.025, 0.09, uHeat) * step(0.08, k);
        // 邊緣淡出
        float edge = smoothstep(0.0, 0.04, p.x) * smoothstep(1.0, 0.96, p.x) * smoothstep(0.0, 0.04, p.y) * smoothstep(1.0, 0.96, p.y);
        gl_FragColor = vec4(col, edge * smoothstep(0.02, 0.12, k + 0.05));
        #include <colorspace_fragment>
      }
    `})}var ue=13206852;function de(e,t,n,r=e){return new l({transparent:!0,depthWrite:!1,side:2,uniforms:{uTime:{value:0},uOpacity:{value:0},uColor:{value:new h(e)},uColor2:{value:new h(r)},uSpeed:{value:t},uDensity:{value:n}},vertexShader:`
      attribute float aDist; attribute float aT; varying float vDist; varying float vAcross; varying float vT;
      void main() { vDist = aDist; vT = aT; vAcross = uv.y; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
    `,fragmentShader:`
      uniform float uTime; uniform float uOpacity; uniform vec3 uColor; uniform vec3 uColor2; uniform float uSpeed; uniform float uDensity;
      varying float vDist; varying float vAcross; varying float vT;
      void main() {
        float s = fract(vDist * uDensity - uTime * uSpeed);
        // 粒子：前端銳利、尾巴漸淡
        float head = smoothstep(0.0, 0.04, s) * (1.0 - smoothstep(0.04, 0.42, s));
        float across = 1.0 - abs(vAcross * 2.0 - 1.0);
        float core = pow(across, 1.6);
        float a = (0.16 + 0.95 * head) * core * uOpacity;
        vec3 base = mix(uColor, uColor2, smoothstep(0.0, 1.0, vT));
        vec3 col = mix(base, vec3(1.0), head * 0.22);
        gl_FragColor = vec4(col, a);
        #include <colorspace_fragment>
      }
    `})}function fe(e,t,n,r){let i=[],a=[],o=[],s=[],c=[],l=0;e.forEach((e,u)=>{let d=0;for(let t=1;t<e.length;t++)d+=e[t].distanceTo(e[t-1]);let f=Math.random()*20,m=f;for(let h=1;h<e.length;h++){let g=e[h-1],_=e[h],v=_.clone().sub(g),y=v.length();if(y<1e-4)continue;v.normalize();let b=new p(-v.y,v.x).multiplyScalar(n/2),x=[g.clone().add(b),g.clone().sub(b),_.clone().add(b),_.clone().sub(b)];for(let e of x)i.push(e.x,t,e.y);a.push(0,0,0,1,1,0,1,1),o.push(m,m,m+y,m+y);let S=r?r[u]:(m-f)/(d||1),C=r?r[u]:(m+y-f)/(d||1);s.push(S,S,C,C),c.push(l,l+1,l+2,l+2,l+1,l+3),l+=4,m+=y}});let u=new b;return u.setAttribute(`position`,new d(i,3)),u.setAttribute(`uv`,new d(a,2)),u.setAttribute(`aDist`,new d(o,1)),u.setAttribute(`aT`,new d(s,1)),u.setIndex(c),u}function pe(e,t,n,r,i,a=6){let o=[],s=(e,t,n)=>{for(let r=0;r<=a;r++){let s=n+r/a*(Math.PI/2);o.push(j(e+Math.cos(s)*i,t+Math.sin(s)*i))}};return s(n-i,r-i,0),s(e+i,r-i,Math.PI/2),s(e+i,t+i,Math.PI),s(n-i,t+i,3*Math.PI/2),o.push(o[0].clone()),o}function me(e,t,r){let i=new n(new b().setFromPoints(e.map(e=>new x(e.x,t,e.y))),r);return i.computeLineDistances(),i}function he(){let e=e=>e.map(([e,t])=>j(e,t)),t=(e,t,n,r,i,a=8)=>Array.from({length:a+1},(o,s)=>{let c=r+(i-r)*s/a;return[e+Math.cos(c)*n,t+Math.sin(c)*n]});return{supply:[e([[150,58],[150,196]]),e([[136,40],[40,40],...t(40,54,14,-Math.PI/2,-Math.PI),[26,272]]),e([[164,40],[260,40],...t(260,54,14,-Math.PI/2,0),[274,272]])],ret:[e([[96,80],[96,236],...t(122,236,26,Math.PI,Math.PI/2),[136,262]]),e([[204,80],[204,236],...t(178,236,26,0,Math.PI/2),[164,262]])]}}function M(n,l,d,p,h){let M=re(n,`xp3d-canvas`),N=new i,P=new t(22,1,10,400);ee(N,M,26);let F=ae(),ge=F.top,_e=F.mid,ve=F.die,I=new e(new s(120,120),new c({opacity:.5}));I.rotation.x=-Math.PI/2,I.receiveShadow=!0,N.add(I);let L=new T,R=new e(new v(D,O,D),ve);R.castShadow=R.receiveShadow=!0,L.add(R);let ye=le(),z=new e(new s(29,29),ye);z.rotation.x=-Math.PI/2,z.position.y=.612,z.renderOrder=2,L.add(z),N.add(L);let B=new T,V=[],be=new v(D,k,D);be.translate(0,k/2,0),V.push(be);let xe=.62,H=[];for(let e=-14;e<=14.000001;e+=xe){let t=new v(28,se,.2);t.translate(0,.775,e),V.push(t),H.push(e+xe/2)}H.pop();for(let[e,t,n,r]of[[D,1,0,-14.5],[D,1,0,D/2-.5],[1,D,-14.5,0],[1,D,D/2-.5,0]]){let i=new v(e,se,t);i.translate(n,.775,r),V.push(i)}let Se=new e(C(V),_e);Se.castShadow=Se.receiveShadow=!0,B.add(Se);let Ce=new y({color:2594249,transparent:!0,opacity:0,depthWrite:!1}),we=new e(new s(27.8,27.8),Ce);we.rotation.x=-Math.PI/2,we.position.y=.51,B.add(we);let Te=[];for(let e=1;e<H.length;e+=3){let t=H[e]*10+150;Te.push([j(30,t),j(92,t)],[j(270,t),j(208,t)]),t<=200&&Te.push([j(146,t),j(100,t)],[j(154,t),j(200,t)])}let Ee=de(2594249,.55,.32,ue),De=de(2594249,.8,.22),Oe=de(ue,.8,.22),ke=he(),Ae=new e(fe(Te,.56,.32),Ee),je=new e(fe(ke.supply,1.1,.75),De),Me=new e(fe(ke.ret,1.1,.75),Oe);for(let e of[Ae,je,Me])e.renderOrder=3,B.add(e);N.add(B);let U=new T,W=new u;W.moveTo(-15,-15),W.lineTo(D/2,-15),W.lineTo(D/2,D/2),W.lineTo(-15,D/2),W.closePath();let Ne=(e,t)=>{let n=j(e,t),r=new E;return r.absarc(n.x,-n.y,1.5,0,Math.PI*2,!0),r};W.holes.push(Ne(150,40),Ne(150,262));let Pe=new g(W,{depth:A,bevelEnabled:!0,bevelThickness:.06,bevelSize:.06,bevelSegments:2,curveSegments:40});Pe.rotateX(-Math.PI/2);let Fe=new e(Pe,ge);Fe.castShadow=Fe.receiveShadow=!0,U.add(Fe),N.add(U);let Ie=new w({color:10726324,transparent:!0,opacity:.28,toneMapped:!1});for(let[e,t]of[[L,R.geometry],[U,Pe]]){let n=new r(new _(t,30),Ie);e===L&&n.position.copy(R.position),e.add(n)}{let e=new v(D,1.05,D);e.translate(0,1.05/2,0),B.add(new r(new _(e),Ie))}let Le=e=>(e.depthTest=!1,e.transparent=!0,e.toneMapped=!1,e),G=Le(new o({color:10134445,dashSize:.45,gapSize:.32,opacity:.55})),Re=1.1800000000000002,ze=new T;ze.add(me(pe(80,62,112,256,14),Re,G),me(pe(188,62,220,256,14),Re,G),me([j(141,58),j(141,204),j(159,204),j(159,58)],Re,G)),ze.renderOrder=10,U.add(ze);let Be=Le(new w({color:10726324,opacity:0})),Ve=new b;Ve.setAttribute(`position`,new f(new Float32Array(18),3));let He=new r(Ve,Be);He.renderOrder=11,N.add(He);let Ue=new S(1,1,{type:m,samples:4}),K=new ne(M,Ue);K.addPass(new te(N,P));let We=new oe(N,P,1,1);We.blendIntensity=.9,We.updateGtaoMaterial({radius:.9,thickness:1.2,scale:1,samples:12}),K.addPass(We),K.addPass(new ie);let q=1,J=1,Ge=()=>{let e=n.getBoundingClientRect();q=Math.max(1,e.width),J=Math.max(1,e.height),M.setSize(q,J,!1),K.setSize(q,J),P.aspect=q/J,P.setViewOffset(q,J,q*.06,0,q,J),P.updateProjectionMatrix()};Ge();let Ke=new ResizeObserver(Ge);Ke.observe(n);let Y={cam:0,sep:0,push:0,dof:0,ch:0,flow:0,heat:1,lbl:0,dim:1,step:0},X=a.lerp,Z=new x,qe=new x,Je=[[-15,-15],[D/2,-15],[D/2,D/2],[-15,D/2]],Ye=e=>(qe.copy(e).project(P),[(qe.x*.5+.5)*q,(-qe.y*.5+.5)*J]);function Xe(e,t,n,r){let i=-1/0,a=0,o=0;for(let[e,r]of Je){let[s,c]=Ye(new x(e,t.position.y+n,r));s>i&&(i=s,a=s,o=c)}let s=e.offsetWidth||160,c=Math.min(a+14,q-s-8);e.style.transform=`translate(${c}px, ${o-10}px)`,e.style.opacity=String(Y.lbl*(r?1:.62)),e.classList.toggle(`is-active`,r)}let Q=!0,$=0,Ze=!1,Qe=performance.now(),$e=Ve.attributes.position,et=()=>{if($=0,!Q)return;let e=(performance.now()-Qe)/1e3,t=Y.sep,n=a.degToRad(X(-30,34,Y.cam)),r=Math.sin(n),i=Math.cos(n);L.position.set(r*7*t,-9*t,i*7*t),I.position.y=L.position.y-O/2-.02,I.position.x=L.position.x,I.position.z=L.position.z,R.position.y=0,B.position.y=.61,U.position.set(-r*7*t,B.position.y+k+se+.01+ce*t,-i*7*t);let o=U.position.y+A,s=L.position.y-O/2,c=B.position.y+k,u=(o+s)/2;Z.set(0,X(u,c,Y.push),0);let f=a.degToRad(X(26,36,Y.cam)+Y.push*10),m=a.degToRad(X(-30,34,Y.cam)),g=a.degToRad(P.fov),_=2*Math.atan(Math.tan(g/2)*(q/J)),v=23+6*t,y=13+9.5*t*Math.cos(f)+4,b=Math.max(v/Math.tan(_/2),y/Math.tan(g/2))*1.12,S=Math.max(X(X(98,128,t),100,Y.push),b*X(1,.88,Y.push));P.position.set(Z.x+S*Math.cos(f)*Math.sin(m),Z.y+S*Math.sin(f),Z.z+S*Math.cos(f)*Math.cos(m)),P.lookAt(Z),Ce.opacity=Y.ch*.32,Ee.uniforms.uOpacity.value=Y.flow,De.uniforms.uOpacity.value=Y.flow*.9,Oe.uniforms.uOpacity.value=Y.flow*.9;for(let t of[Ee,De,Oe])t.uniforms.uTime.value=e;ye.uniforms.uHeat.value=Y.heat,ye.uniforms.uTime.value=e,G.opacity=.55*Math.max(Y.lbl,.35);let C=17.2,w=D/2,T=s,E=o,ee=[C,T,w,C,E,w,16.4,T,w,18,T,w,16.4,E,w,18,E,w];for(let e=0;e<ee.length;e++)$e.array[e]=ee[e];$e.needsUpdate=!0,Be.opacity=Y.dim*.9,K.render(),Xe(l[0],U,A,Y.step===0),Xe(l[1],B,1.05,Y.step===1),Xe(l[2],L,O/2,Y.step===2);for(let[e,[t,n]]of[[150,40],[150,262]].entries()){let r=j(t,n),[i,a]=Ye(new x(r.x+(e===0?2.2:-2.2),U.position.y+A+5.5,r.y));d[e].style.transform=`translate(${i-4}px, ${a-18}px)`,d[e].style.opacity=String(Y.lbl)}if(p){let[e,t]=Ye(new x(18.4,(T+E)/2,w));p.style.transform=`translate(${e+6}px, ${t-9}px)`,p.style.opacity=String(Y.dim)}Ze||(Ze=!0,h()),$=requestAnimationFrame(et)},tt=()=>{$||=requestAnimationFrame(et)},nt=new IntersectionObserver(([e])=>{Q=e.isIntersecting,Q&&tt()});return nt.observe(n),tt(),{state:Y,destroy:()=>{nt.disconnect(),Ke.disconnect(),$&&cancelAnimationFrame($),K.dispose(),M.dispose()}}}export{M as createXp3D};