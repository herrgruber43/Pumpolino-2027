/* ══════════════════════════════════════════════════════════
   flow.js — one engine, one rAF loop, every instance below.
   Regimes are parameter sets, not separate code paths.
   ══════════════════════════════════════════════════════════ */
(function(){
'use strict';

var WEB3FORMS_KEY = 'efb3d627-a22e-4735-a9a7-ff6069559d69';
var I18N = window.I18N || {};

var REDUCE = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var SMALL  = window.matchMedia && window.matchMedia('(max-width: 780px)').matches;
var TEAL='95,191,168', SLATE='156,186,206', VERM='228,87,46';
var insts=[], T=0;

function setup(cv,h){
  var dpr=Math.min(2, window.devicePixelRatio||1);
  var w=cv.clientWidth||cv.width||600;
  h=h||cv.clientHeight||cv.height||200;
  cv.width=Math.round(w*dpr); cv.height=Math.round(h*dpr);
  var x=cv.getContext('2d'); x.setTransform(dpr,0,0,dpr,0,0);
  return {x:x,w:w,h:h};
}

/* still = render N frames then stop. Never a blank canvas. */
function mount(cv, h, make, opt){
  if(!cv) return null;
  opt=opt||{};
  var s=setup(cv,h);
  var inst=make(s.x,s.w,s.h);
  inst.cv=cv; inst.ctx=s.x; inst.lw=s.w; inst.lh=s.h; inst.mk=make; inst.on=false;
  var still = REDUCE || (SMALL && !opt.keepOnMobile);
  inst.still = still;
  insts.push(inst);
  if(still){ for(var i=0;i<(opt.frames||240);i++) inst.step(); }
  else if('IntersectionObserver' in window){
    new IntersectionObserver(function(es){
      for(var j=0;j<es.length;j++) inst.on=es[j].isIntersecting;
    },{threshold:0.01, rootMargin:'80px'}).observe(cv);
  } else { inst.on=true; }
  return inst;
}

function loop(){
  T+=1/60;
  for(var i=0;i<insts.length;i++){ var n=insts[i]; if(n.on && !n.still) n.step(); }
  requestAnimationFrame(loop);
}

/* ── the field: every regime is this function with different numbers ── */
function field(x,w,h,o){
  o=o||{};
  var N=o.count||300, P=[], i;
  var curl=o.curl!==undefined?o.curl:0.6, sp=o.speed||1.8, jit=o.jitter||0;
  var grav=o.gravity||0, bias=o.bias!==undefined?o.bias:1.0;
  var fade=o.fade||0.03, ramp=!!o.ramp, hue=o.hue||SLATE, hue2=o.hue2, lw=o.lw||0.8;
  function spawn(p,anywhere){
    p.x = anywhere ? Math.random()*w : (o.inflow ? -4 - Math.random()*30 : Math.random()*w);
    p.y = Math.random()*h;
    p.l = 40+Math.random()*(o.life||150);
  }
  for(i=0;i<N;i++){ var p={}; spawn(p,true); P.push(p); }
  x.fillStyle='#0E1416'; x.fillRect(0,0,w,h);
  return { step:function(){
    x.fillStyle='rgba(14,20,22,'+fade+')'; x.fillRect(0,0,w,h);
    for(var i=0;i<N;i++){
      var p=P[i];
      var k = ramp ? (0.06 + 2.4*Math.pow(p.x/w,1.7)) : 1;
      var a = (Math.sin(p.y*0.021)*1.4 + Math.cos(p.x*0.016)*1.1
             + Math.sin((p.x+p.y)*0.008 + T*0.3)*0.9) * curl * k;
      var vx = Math.cos(a)*sp + bias*sp*0.55;
      var vy = Math.sin(a)*sp + grav*h*0.02;
      if(jit){ vx += (Math.random()-0.5)*jit*sp*k*2.2; vy += (Math.random()-0.5)*jit*sp*k*2.2; }
      if(o.obstacle && o.obstacle.on){
        var dx=p.x-o.obstacle.x, dy=p.y-o.obstacle.y, d2=dx*dx+dy*dy, R=o.obstacle.r;
        if(d2 < R*R && d2>0.5){ var d=Math.sqrt(d2), f=(1-d/R); f=f*f*7.5; vx+=dx/d*f; vy+=dy/d*f; }
      }
      var nx=p.x+vx, ny=p.y+vy;
      var c = hue2 ? (p.y/h<0.5?hue:hue2) : hue;
      x.strokeStyle='rgba('+c+','+(0.26+0.28*Math.random())+')';
      x.lineWidth=lw;
      x.beginPath(); x.moveTo(p.x,p.y); x.lineTo(nx,ny); x.stroke();
      p.x=nx; p.y=ny; p.l--;
      if(p.l<0||p.x>w+6||p.x<-40||p.y>h+6||p.y<-6) spawn(p, !o.inflow);
    }
  }};
}

/* ══ 01 · hero field, cursor as a body in the flow ══ */
(function(){
  var cv=document.getElementById('f-hero'); if(!cv) return;
  var hero=cv.parentNode;
  function size(){ cv.style.width=hero.offsetWidth+'px'; cv.style.height=hero.offsetHeight+'px'; }
  size();
  var ob={on:false,x:0,y:0,r:76};
  mount(cv, hero.offsetHeight, function(x,w,h){
    return field(x,w,h,{count:SMALL?300:760,curl:1.0,speed:1.9,fade:0.024,
      hue:TEAL,hue2:VERM,obstacle:ob,lw:0.85});
  }, {keepOnMobile:true, frames:300});
  if(!REDUCE){
    hero.addEventListener('pointermove',function(e){
      if(e.pointerType==='touch') return;
      var r=cv.getBoundingClientRect(); ob.on=true; ob.x=e.clientX-r.left; ob.y=e.clientY-r.top;
    });
    hero.addEventListener('pointerleave',function(){ ob.on=false; });
  }
})();

/* ══ 02 · impeller mark ══ */
(function(){
  var cv=document.getElementById('f-mark'); if(!cv) return;
  var spool={v:0.9,target:0.9};
  mount(cv,30,function(x,w,h){
    var cx=w/2, cy=h/2, R=Math.min(w,h)*0.42, r1=R*0.30, th=0, V=7, i;
    var P=[]; for(i=0;i<34;i++) P.push({r:r1*(0.4+Math.random()*0.9), a:Math.random()*6.283, s:0.5+Math.random()*0.8});
    return { step:function(){
      spool.v += (spool.target-spool.v)*0.07; th += spool.v*0.016;
      x.clearRect(0,0,w,h);
      for(i=0;i<P.length;i++){
        var p=P[i];
        var px=cx+Math.cos(p.a)*p.r, py=cy+Math.sin(p.a)*p.r;
        p.a += spool.v*0.085*(1+(R-p.r)/R)*p.s;
        p.r += spool.v*0.30*p.s;
        var nx=cx+Math.cos(p.a)*p.r, ny=cy+Math.sin(p.a)*p.r;
        var fr=Math.min(1,p.r/R);
        x.strokeStyle='rgba('+(fr>0.78?VERM:TEAL)+','+(0.16+0.5*fr)+')'; x.lineWidth=0.8;
        x.beginPath(); x.moveTo(px,py); x.lineTo(nx,ny); x.stroke();
        if(p.r>R*1.15){ p.r=r1*(0.35+Math.random()*0.5); p.a=Math.random()*6.283; }
      }
      x.save(); x.translate(cx,cy); x.rotate(th);
      for(i=0;i<V;i++){
        var a0=i*6.283/V;
        x.strokeStyle='rgba(232,236,238,0.86)'; x.lineWidth=1.5; x.lineCap='round';
        x.beginPath();
        x.moveTo(Math.cos(a0)*r1, Math.sin(a0)*r1);
        x.quadraticCurveTo(Math.cos(a0+0.40)*R*0.68, Math.sin(a0+0.40)*R*0.68,
                           Math.cos(a0+0.86)*R, Math.sin(a0+0.86)*R);
        x.stroke();
      }
      x.fillStyle='#E4572E'; x.beginPath(); x.arc(0,0,r1*0.44,0,6.283); x.fill();
      x.restore();
    }};
  },{keepOnMobile:true, frames:120});
  var brand=document.querySelector('.brand');
  if(brand && !REDUCE){
    brand.addEventListener('pointerenter',function(){ spool.target=4.2; });
    brand.addEventListener('pointerleave',function(){ spool.target=0.9; });
    brand.addEventListener('focus',function(){ spool.target=4.2; });
    brand.addEventListener('blur',function(){ spool.target=0.9; });
  }
})();

/* ══ 03 · three regimes ══ */
mount(document.getElementById('f-lam'),132,function(x,w,h){
  return field(x,w,h,{count:180,curl:0.15,speed:1.4,jitter:0,fade:0.028,hue:TEAL,inflow:true,bias:1.3,lw:0.85,life:500});
});
mount(document.getElementById('f-tur'),132,function(x,w,h){
  return field(x,w,h,{count:250,curl:1.7,speed:2.3,jitter:0.45,fade:0.036,hue:VERM,lw:0.75});
});
mount(document.getElementById('f-sed'),132,function(x,w,h){
  var base=field(x,w,h,{count:150,curl:0.05,speed:0.30,jitter:0.015,gravity:0.09,
                        fade:0.010,hue:SLATE,bias:0.05,lw:1.15,life:900});
  var bed=[],i; for(i=0;i*3<w;i++) bed.push(0);
  return { step:function(){
    base.step();
    for(i=0;i<bed.length;i++){
      if(Math.random()<0.0022) bed[i]=Math.min(8,bed[i]+0.7);
      if(bed[i]>0){ x.fillStyle='rgba('+SLATE+','+(0.10+bed[i]*0.030)+')'; x.fillRect(i*3,h-bed[i],3,bed[i]); }
    }
  }};
});

/* ══ 05 · dividers: laminar ▸ turbulent ══ */
['f-div1','f-div2','f-div3','f-div4'].forEach(function(id){
  mount(document.getElementById(id),60,function(x,w,h){
    return field(x,w,h,{count:190,curl:0.9,speed:1.7,jitter:0.30,fade:0.030,
      hue:TEAL,hue2:VERM,ramp:true,inflow:true,bias:1.4,lw:0.8,life:700});
  });
});

/* ══ 04 · ServiceFlow circuit ══ */
(function(){
  var cv=document.getElementById('f-pipe'); if(!cv) return;
  var mode={want:0};
  mount(cv,200,function(x,w,h){
    var y=h*0.58, stages=[0.24,0.5,0.76], names=I18N.stages, P=[], i;
    for(i=0;i<140;i++) P.push({x:Math.random()*w, hold:0, off:(Math.random()-0.5)*20});
    var on=0;
    return { step:function(){
      on += (mode.want-on)*0.07;
      x.fillStyle='#0E1416'; x.fillRect(0,0,w,h);
      x.strokeStyle='rgba(62,76,84,1)'; x.lineWidth=1.5;
      x.beginPath(); x.moveTo(0,y-28); x.lineTo(w,y-28); x.moveTo(0,y+28); x.lineTo(w,y+28); x.stroke();
      x.font='10px ui-monospace, monospace'; x.textAlign='center';
      for(i=0;i<3;i++){
        var sx=stages[i]*w;
        x.strokeStyle='rgba('+(on>0.5?TEAL:VERM)+',0.6)'; x.lineWidth=1.4;
        x.beginPath(); x.moveTo(sx,y-36); x.lineTo(sx,y+36); x.stroke();
        x.fillStyle='rgba(147,157,163,1)'; x.fillText(names[i], sx, y+54);
      }
      var speed=0.55+on*1.85;
      for(i=0;i<P.length;i++){
        var p=P[i];
        if(p.hold>0){ p.hold -= 1+on*6; }
        else {
          var prev=p.x;
          p.x += speed*(0.7+Math.random()*0.6*(1-on*0.85));
          for(var s=0;s<3;s++){ var sx2=stages[s]*w; if(prev<sx2 && p.x>=sx2){ p.hold=(1-on)*(20+Math.random()*70); } }
        }
        if(p.x>w+8){ p.x=-8; p.off=(Math.random()-0.5)*20; }
        var jitter=(1-on)*Math.sin(p.x*0.1+i)*4;
        var col = p.hold>0 ? VERM : (on>0.5?TEAL:SLATE);
        x.fillStyle='rgba('+col+','+(p.hold>0?0.95:0.72)+')';
        x.beginPath(); x.arc(p.x, y+p.off*(1-on*0.75)+jitter, p.hold>0?2.7:2.0, 0, 6.283); x.fill();
      }
      x.textAlign='left';
    }};
  },{keepOnMobile:true, frames:200});

  var btn=document.getElementById('mode-btn'), st=document.getElementById('mode-state');
  function set(v){
    mode.want=v?1:0;
    btn.setAttribute('aria-pressed', v?'true':'false');
    btn.textContent = v ? I18N.modeOff : I18N.modeOn;
    st.textContent = v ? I18N.stateProactive : I18N.stateReactive;
  }
  if(btn){ btn.addEventListener('click',function(){ set(btn.getAttribute('aria-pressed')!=='true'); }); }
  if(!REDUCE && cv){
    cv.parentNode.addEventListener('pointerenter',function(){ if(btn.getAttribute('aria-pressed')!=='true') mode.want=1; });
    cv.parentNode.addEventListener('pointerleave',function(){ if(btn.getAttribute('aria-pressed')!=='true') mode.want=0; });
  }
})();

/* ══ 06 · streamline nav underlines ══ */
(function(){
  var links=document.querySelectorAll('.nav a'); var ns='http://www.w3.org/2000/svg';
  Array.prototype.forEach.call(links,function(a,idx){
    var amp=parseFloat(a.getAttribute('data-amp')||'0.5')*2.0;
    var svg=document.createElementNS(ns,'svg');
    svg.setAttribute('viewBox','0 0 100 8');
    svg.setAttribute('preserveAspectRatio','none');
    svg.setAttribute('aria-hidden','true');
    var d='M 0 4';
    for(var i=1;i<=40;i++){ d+=' L '+(i*2.5)+' '+(4+Math.sin(i*0.85+idx)*amp).toFixed(2); }
    var pa=document.createElementNS(ns,'path');
    pa.setAttribute('d',d);
    pa.setAttribute('vector-effect','non-scaling-stroke');
    svg.appendChild(pa); a.appendChild(svg);
  });
})();

/* ══ 07 · pressure gauge ══ */
(function(){
  var arc=document.getElementById('g-arc'), nd=document.getElementById('g-needle'), rd=document.getElementById('g-read');
  if(!arc) return;
  var cur=0;
  nd.setAttribute('transform','rotate(-225 32 32)');
  function upd(){
    var max=document.documentElement.scrollHeight-window.innerHeight;
    var p=max>0?Math.min(1,Math.max(0,window.scrollY/max)):0;
    cur += (p-cur)*(REDUCE?1:0.16);
    arc.setAttribute('stroke-dashoffset',(123*(1-cur)).toFixed(1));
    nd.setAttribute('transform','rotate('+(-225+cur*270).toFixed(1)+' 32 32)');
    rd.textContent=(cur*6.30).toFixed(2)+' bar';
    requestAnimationFrame(upd);
  }
  upd();
})();

/* ══ 08 · meniscus fields + primed button ══ */
(function(){
  var flds=document.querySelectorAll('.fld');
  Array.prototype.forEach.call(flds,function(f){
    var cv=f.querySelector('canvas'), inp=f.querySelector('input,textarea');
    if(!cv||!inp) return;
    var st={lvl:0,vel:0,target:0,ripple:0};
    mount(cv,16,function(x,w,h){
      return { step:function(){
        var a=(st.target-st.lvl)*0.12; st.vel=(st.vel+a)*0.78; st.lvl+=st.vel;
        st.ripple*=0.985;
        x.clearRect(0,0,w,h);
        x.fillStyle='rgba(46,57,64,1)'; x.fillRect(0,h-2,w,1.3);
        var top=h-2-st.lvl*(h-5), i;
        if(st.lvl>0.004){
          x.beginPath(); x.moveTo(0,h-1);
          for(i=0;i<=w;i+=4) x.lineTo(i, top+Math.sin(i*0.06+T*3.2)*2.0*st.ripple+Math.sin(i*0.14-T*2.1)*1.0*st.ripple);
          x.lineTo(w,h-1); x.closePath();
          x.fillStyle='rgba(95,191,168,0.34)'; x.fill();
          x.strokeStyle='rgba(95,191,168,0.95)'; x.lineWidth=1.4;
          x.beginPath();
          for(i=0;i<=w;i+=4){
            var y2=top+Math.sin(i*0.06+T*3.2)*2.0*st.ripple+Math.sin(i*0.14-T*2.1)*1.0*st.ripple;
            i?x.lineTo(i,y2):x.moveTo(i,y2);
          }
          x.stroke();
        }
      }};
    },{keepOnMobile:true, frames:60});
    inp.addEventListener('focus',function(){ st.target=1; st.ripple=1; });
    inp.addEventListener('blur', function(){ if(!inp.value){ st.target=0; st.ripple=0.6; } });
    inp.addEventListener('input',function(){ st.ripple=Math.max(st.ripple,0.4); st.target=1; });
  });

  var bc=document.getElementById('f-btn');
  window.__prime={want:0,shot:0};
  if(bc){
    var bs=window.__prime;
    mount(bc,52,function(x,w,h){
      var P=[],i; for(i=0;i<52;i++) P.push({x:Math.random()*w,y:Math.random()*h,s:0.3+Math.random()});
      var pr=0;
      return { step:function(){
        pr += (bs.want-pr)*0.08; if(bs.shot>0) bs.shot-=0.026;
        x.clearRect(0,0,w,h);
        if(pr<0.01 && bs.shot<=0) return;
        for(i=0;i<P.length;i++){
          var p=P[i];
          p.x += (0.35+pr*1.7+bs.shot*6)*p.s;
          p.y += Math.sin(p.x*0.07+i)*0.32;
          if(p.x>w){ p.x=-3; p.y=Math.random()*h; }
          x.fillStyle='rgba('+VERM+','+(0.10+pr*0.45+bs.shot*0.5)+')';
          x.fillRect(p.x,p.y,1.8+bs.shot*3,1.6);
        }
      }};
    },{keepOnMobile:true, frames:1});
    var btn=document.getElementById('c-send');
    ['pointerenter','focus'].forEach(function(e){ btn.addEventListener(e,function(){ bs.want=1; }); });
    ['pointerleave','blur'].forEach(function(e){ btn.addEventListener(e,function(){ bs.want=0; }); });
  }
})();

/* ══ header state + mobile menu ══ */
(function(){
  var hdr=document.getElementById('hdr');
  function onScroll(){ hdr.classList.toggle('stuck', window.scrollY>12); }
  onScroll(); window.addEventListener('scroll',onScroll,{passive:true});

  var b=document.getElementById('burger'), wrap=document.getElementById('navwrap');
  if(b){
    b.addEventListener('click',function(){
      var open=wrap.classList.toggle('open');
      b.setAttribute('aria-expanded', open?'true':'false');
    });
    wrap.addEventListener('click',function(e){
      if(e.target.tagName==='A'){ wrap.classList.remove('open'); b.setAttribute('aria-expanded','false'); }
    });
  }
})();

/* ══ contact form ══ */
(function(){
  var form=document.getElementById('cform'); if(!form) return;
  var msg=document.getElementById('c-msg'),
      btn=document.getElementById('c-send'),
      lab=document.getElementById('c-send-label');

  function show(kind, html){
    msg.className='formmsg '+kind; msg.innerHTML=html; msg.hidden=false;
  }

  form.addEventListener('submit',function(e){
    e.preventDefault();
    if(window.__prime) window.__prime.shot=1;

    if(document.getElementById('c-website').value){ return; } /* bot */

    var email=document.getElementById('c-email'),
        subject=document.getElementById('c-subject'),
        message=document.getElementById('c-message'),
        consent=document.getElementById('c-consent');

    if(!email.value || email.value.indexOf('@')<1){
      show('err',I18N.errEmail); email.focus(); return;
    }
    if(!subject.value.trim()){ show('err',I18N.errSubject); subject.focus(); return; }
    if(!message.value.trim()){ show('err',I18N.errMessage); message.focus(); return; }
    if(!consent.checked){ show('err',I18N.errConsent); consent.focus(); return; }

    if(location.protocol==='file:'){
      show('ok',I18N.localPreview);
      return;
    }

    btn.disabled=true; lab.textContent=I18N.sending;
    var body={
      access_key: WEB3FORMS_KEY,
      name: document.getElementById('c-name').value,
      email: email.value,
      subject: subject.value,
      message: message.value,
      from_name: 'pumpolino.com'
    };
    fetch('https://api.web3forms.com/submit',{
      method:'POST',
      headers:{'Content-Type':'application/json','Accept':'application/json'},
      body:JSON.stringify(body)
    }).then(function(r){ return r.json(); })
      .then(function(d){
        if(d && d.success){
          show('ok',I18N.sendOk);
          form.reset();
          Array.prototype.forEach.call(document.querySelectorAll('.fld canvas'),function(){});
        } else { throw new Error('rejected'); }
      })
      .catch(function(){
        show('err',I18N.sendErr);
      })
      .then(function(){ btn.disabled=false; lab.textContent=I18N.send; });
  });
})();

/* ══ language switcher keeps your position on the page ══ */
(function(){
  var links=document.querySelectorAll('[data-lang-link]');
  if(!links.length) return;
  function sync(){
    var h=location.hash||'';
    for(var i=0;i<links.length;i++){
      var base=links[i].getAttribute('data-lang-link');
      links[i].setAttribute('href', base+h);
    }
  }
  sync();
  window.addEventListener('hashchange',sync);
  window.addEventListener('scroll',function(){
    /* reflect the section you are actually reading, not the last link clicked.
       At the top of the page there is no section yet — switch to the top. */
    var cur='';
    if(window.scrollY>60){
      var secs=document.querySelectorAll('section[id]');
      for(var i=0;i<secs.length;i++){
        var r=secs[i].getBoundingClientRect();
        if(r.top<140 && r.bottom>140) cur='#'+secs[i].id;
      }
    }
    for(var j=0;j<links.length;j++) links[j].setAttribute('href', links[j].getAttribute('data-lang-link')+cur);
  },{passive:true});
})();

/* ══ resize: rescale surfaces, never reload ══ */
(function(){
  var rt;
  window.addEventListener('resize',function(){
    clearTimeout(rt);
    rt=setTimeout(function(){
      var dpr=Math.min(2, window.devicePixelRatio||1), i, k;
      var hero=document.getElementById('f-hero');
      if(hero && hero.parentNode){
        hero.style.width=hero.parentNode.offsetWidth+'px';
        hero.style.height=hero.parentNode.offsetHeight+'px';
      }
      for(i=0;i<insts.length;i++){
        var n=insts[i], cw=n.cv.clientWidth, ch=n.cv.clientHeight||n.lh;
        if(!cw||!n.lw) continue;
        n.cv.width=Math.round(cw*dpr); n.cv.height=Math.round(ch*dpr);
        n.ctx.setTransform(dpr*cw/n.lw, 0, 0, dpr*ch/n.lh, 0, 0);
        if(n.still){ for(k=0;k<180;k++) n.step(); }
      }
    },180);
  });
})();

if(!REDUCE) requestAnimationFrame(loop);
})();
