import{A as e,B as t,C as n,D as r,J as i,R as a,S as o,T as s,X as c,Y as l,_ as u,a as d,at as f,b as p,c as m,g as h,h as g,i as _,it as v,k as y,o as b,q as x,rt as ee,t as S,w as C,y as w,z as T}from"./BufferGeometryUtils.Ct_sQrVn.js";import{a as te,c as ne,l as re,n as ie,r as ae,s as oe,u as se}from"./kit.D8IT_Zod.js";var E=30,D=1.2,O=.5,ce=.55,k=1.1,le=11,A=(e,t)=>new ee((e-150)/10,(t-150)/10);function ue(){return new i({transparent:!0,depthWrite:!1,uniforms:{uHeat:{value:1},uTime:{value:0}},vertexShader:`
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
    `})}var de=13206852;function j(e,t,n,r=e){return new i({transparent:!0,depthWrite:!1,side:2,uniforms:{uTime:{value:0},uOpacity:{value:0},uColor:{value:new m(e)},uColor2:{value:new m(r)},uSpeed:{value:t},uDensity:{value:n}},vertexShader:`
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
    `})}function M(e,t,n,r){let i=[],a=[],o=[],s=[],c=[],l=0;e.forEach((e,u)=>{let d=0;for(let t=1;t<e.length;t++)d+=e[t].distanceTo(e[t-1]);let f=Math.random()*20,p=f;for(let m=1;m<e.length;m++){let h=e[m-1],g=e[m],_=g.clone().sub(h),v=_.length();if(v<1e-4)continue;_.normalize();let y=new ee(-_.y,_.x).multiplyScalar(n/2),b=[h.clone().add(y),h.clone().sub(y),g.clone().add(y),g.clone().sub(y)];for(let e of b)i.push(e.x,t,e.y);a.push(0,0,0,1,1,0,1,1),o.push(p,p,p+v,p+v);let x=r?r[u]:(p-f)/(d||1),S=r?r[u]:(p+v-f)/(d||1);s.push(x,x,S,S),c.push(l,l+1,l+2,l+2,l+1,l+3),l+=4,p+=v}});let d=new b;return d.setAttribute(`position`,new u(i,3)),d.setAttribute(`uv`,new u(a,2)),d.setAttribute(`aDist`,new u(o,1)),d.setAttribute(`aT`,new u(s,1)),d.setIndex(c),d}function fe(e,t,n,r,i,a=6){let o=[],s=(e,t,n)=>{for(let r=0;r<=a;r++){let s=n+r/a*(Math.PI/2);o.push(A(e+Math.cos(s)*i,t+Math.sin(s)*i))}};return s(n-i,r-i,0),s(e+i,r-i,Math.PI/2),s(e+i,t+i,Math.PI),s(n-i,t+i,3*Math.PI/2),o.push(o[0].clone()),o}function N(e,t,n){let r=new o(new b().setFromPoints(e.map(e=>new v(e.x,t,e.y))),n);return r.computeLineDistances(),r}function pe(){let e=e=>e.map(([e,t])=>A(e,t)),t=(e,t,n,r,i,a=8)=>Array.from({length:a+1},(o,s)=>{let c=r+(i-r)*s/a;return[e+Math.cos(c)*n,t+Math.sin(c)*n]});return{supply:[e([[150,58],[150,196]]),e([[136,40],[40,40],...t(40,54,14,-Math.PI/2,-Math.PI),[26,272]]),e([[164,40],[260,40],...t(260,54,14,-Math.PI/2,0),[274,272]])],ret:[e([[96,80],[96,236],...t(122,236,26,Math.PI,Math.PI/2),[136,262]]),e([[204,80],[204,236],...t(178,236,26,0,Math.PI/2),[164,262]])]}}function P(i,o,u,m,ee){let P=ie(i,`xp3d-canvas`),F=new x,I=new T(22,1,10,400);ae(F,P,26);let me=te(),he=me.top,ge=me.mid,_e=me.die,L=new y(new t(120,120),new l({opacity:.5}));L.rotation.x=-Math.PI/2,L.receiveShadow=!0,F.add(L);let R=new w,z=new y(new _(E,D,E),_e);z.castShadow=z.receiveShadow=!0,R.add(z);let ve=ue(),B=new y(new t(29,29),ve);B.rotation.x=-Math.PI/2,B.position.y=.612,B.renderOrder=2,R.add(B),F.add(R);let V=new w,H=[],ye=new _(E,O,E);ye.translate(0,O/2,0),H.push(ye);let be=.62,U=[];for(let e=-14;e<=14.000001;e+=be){let t=new _(28,ce,.2);t.translate(0,.775,e),H.push(t),U.push(e+be/2)}U.pop();for(let[e,t,n,r]of[[E,1,0,-14.5],[E,1,0,E/2-.5],[1,E,-14.5,0],[1,E,E/2-.5,0]]){let i=new _(e,ce,t);i.translate(n,.775,r),H.push(i)}let xe=new y(S(H),ge);xe.castShadow=xe.receiveShadow=!0,V.add(xe);let Se=new e({color:2594249,transparent:!0,opacity:0,depthWrite:!1}),Ce=new y(new t(27.8,27.8),Se);Ce.rotation.x=-Math.PI/2,Ce.position.y=.51,V.add(Ce);let we=[];for(let e=1;e<U.length;e+=3){let t=U[e]*10+150;we.push([A(30,t),A(92,t)],[A(270,t),A(208,t)]),t<=200&&we.push([A(146,t),A(100,t)],[A(154,t),A(200,t)])}let Te=j(2594249,.55,.32,de),Ee=j(2594249,.8,.22),De=j(de,.8,.22),Oe=pe(),ke=new y(M(we,.56,.32),Te),Ae=new y(M(Oe.supply,1.1,.75),Ee),je=new y(M(Oe.ret,1.1,.75),De);for(let e of[ke,Ae,je])e.renderOrder=3,V.add(e);F.add(V);let W=new w,G=new c;G.moveTo(-15,-15),G.lineTo(E/2,-15),G.lineTo(E/2,E/2),G.lineTo(-15,E/2),G.closePath();let Me=(e,t)=>{let n=A(e,t),r=new a;return r.absarc(n.x,-n.y,1.5,0,Math.PI*2,!0),r};G.holes.push(Me(150,40),Me(150,262));let Ne=new h(G,{depth:k,bevelEnabled:!0,bevelThickness:.06,bevelSize:.06,bevelSegments:2,curveSegments:40});Ne.rotateX(-Math.PI/2);let Pe=new y(Ne,he);Pe.castShadow=Pe.receiveShadow=!0,W.add(Pe),F.add(W);let Fe=new n({color:10726324,transparent:!0,opacity:.28,toneMapped:!1});for(let[e,t]of[[R,z.geometry],[W,Ne]]){let n=new s(new g(t,30),Fe);e===R&&n.position.copy(z.position),e.add(n)}{let e=new _(E,1.05,E);e.translate(0,1.05/2,0),V.add(new s(new g(e),Fe))}let Ie=e=>(e.depthTest=!1,e.transparent=!0,e.toneMapped=!1,e),K=Ie(new C({color:10134445,dashSize:.45,gapSize:.32,opacity:.55})),Le=1.1800000000000002,Re=new w;Re.add(N(fe(80,62,112,256,14),Le,K),N(fe(188,62,220,256,14),Le,K),N([A(141,58),A(141,204),A(159,204),A(159,58)],Le,K)),Re.renderOrder=10,W.add(Re);let ze=Ie(new n({color:10726324,opacity:0})),Be=new b;Be.setAttribute(`position`,new d(new Float32Array(18),3));let Ve=new s(Be,ze);Ve.renderOrder=11,F.add(Ve);let He=new f(1,1,{type:p,samples:4}),q=new se(P,He);q.addPass(new re(F,I));let Ue=new ne(F,I,1,1);Ue.blendIntensity=.9,Ue.updateGtaoMaterial({radius:.9,thickness:1.2,scale:1,samples:12}),q.addPass(Ue),q.addPass(new oe);let J=1,Y=1,We=()=>{let e=i.getBoundingClientRect();J=Math.max(1,e.width),Y=Math.max(1,e.height),P.setSize(J,Y,!1),q.setSize(J,Y),I.aspect=J/Y,I.setViewOffset(J,Y,J*.06,0,J,Y),I.updateProjectionMatrix()};We();let Ge=new ResizeObserver(We);Ge.observe(i);let X={cam:0,sep:0,push:0,dof:0,ch:0,flow:0,heat:1,lbl:0,dim:1,step:0},Z=r.lerp,Q=new v,Ke=new v,qe=[[-15,-15],[E/2,-15],[E/2,E/2],[-15,E/2]],Je=e=>(Ke.copy(e).project(I),[(Ke.x*.5+.5)*J,(-Ke.y*.5+.5)*Y]);function Ye(e,t,n,r){let i=-1/0,a=0,o=0;for(let[e,r]of qe){let[s,c]=Je(new v(e,t.position.y+n,r));s>i&&(i=s,a=s,o=c)}let s=e.offsetWidth||160,c=Math.min(a+14,J-s-8);e.style.transform=`translate(${c}px, ${o-10}px)`,e.style.opacity=String(X.lbl*(r?1:.62)),e.classList.toggle(`is-active`,r)}let Xe=!0,$=0,Ze=!1,Qe=performance.now(),$e=Be.attributes.position,et=()=>{if($=0,!Xe)return;let e=(performance.now()-Qe)/1e3,t=X.sep,n=r.degToRad(Z(-30,34,X.cam)),i=Math.sin(n),a=Math.cos(n);R.position.set(i*7*t,-9*t,a*7*t),L.position.y=R.position.y-D/2-.02,L.position.x=R.position.x,L.position.z=R.position.z,z.position.y=0,V.position.y=.61,W.position.set(-i*7*t,V.position.y+O+ce+.01+le*t,-a*7*t);let s=W.position.y+k,c=R.position.y-D/2,l=V.position.y+O,d=(s+c)/2;Q.set(0,Z(d,l,X.push),0);let f=r.degToRad(Z(26,36,X.cam)+X.push*10),p=r.degToRad(Z(-30,34,X.cam)),h=r.degToRad(I.fov),g=2*Math.atan(Math.tan(h/2)*(J/Y)),_=23+6*t,y=13+9.5*t*Math.cos(f)+4,b=Math.max(_/Math.tan(g/2),y/Math.tan(h/2))*1.12,x=Math.max(Z(Z(98,128,t),100,X.push),b*Z(1,.88,X.push));I.position.set(Q.x+x*Math.cos(f)*Math.sin(p),Q.y+x*Math.sin(f),Q.z+x*Math.cos(f)*Math.cos(p)),I.lookAt(Q),Se.opacity=X.ch*.32,Te.uniforms.uOpacity.value=X.flow,Ee.uniforms.uOpacity.value=X.flow*.9,De.uniforms.uOpacity.value=X.flow*.9;for(let t of[Te,Ee,De])t.uniforms.uTime.value=e;ve.uniforms.uHeat.value=X.heat,ve.uniforms.uTime.value=e,K.opacity=.55*Math.max(X.lbl,.35);let S=17.2,C=E/2,w=c,T=s,te=[S,w,C,S,T,C,16.4,w,C,18,w,C,16.4,T,C,18,T,C];for(let e=0;e<te.length;e++)$e.array[e]=te[e];$e.needsUpdate=!0,ze.opacity=X.dim*.9,q.render(),Ye(o[0],W,k,X.step===0),Ye(o[1],V,1.05,X.step===1),Ye(o[2],R,D/2,X.step===2);for(let[e,[t,n]]of[[150,40],[150,262]].entries()){let r=A(t,n),[i,a]=Je(new v(r.x+(e===0?2.2:-2.2),W.position.y+k+5.5,r.y));u[e].style.transform=`translate(${i-4}px, ${a-18}px)`,u[e].style.opacity=String(X.lbl)}if(m){let[e,t]=Je(new v(18.4,(w+T)/2,C));m.style.transform=`translate(${e+6}px, ${t-9}px)`,m.style.opacity=String(X.dim)}Ze||(Ze=!0,ee()),$=requestAnimationFrame(et)},tt=()=>{$||=requestAnimationFrame(et)},nt=new IntersectionObserver(([e])=>{Xe=e.isIntersecting,Xe&&tt()});return nt.observe(i),tt(),{state:X,destroy:()=>{nt.disconnect(),Ge.disconnect(),$&&cancelAnimationFrame($),q.dispose(),P.dispose()}}}export{de as AMBER,j as coolantMaterial,P as createXp3D,M as ribbon};