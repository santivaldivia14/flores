const $=s=>document.querySelector(s);
const loading=$("#loading"),app=$("#app"),enter=$("#enter"),flowers=$("#flowers"),ring=$("#ring");
const stars=$("#stars"),ctx=stars.getContext("2d"),heart=$("#heart"),hctx=heart.getContext("2d");
const loveText=$("#loveText"),reset=$("#reset");

let W=innerWidth,H=innerHeight,DPR=Math.min(devicePixelRatio||1,2);
function resize(){
 W=innerWidth;H=innerHeight;DPR=Math.min(devicePixelRatio||1,2);
 stars.width=W*DPR;stars.height=H*DPR;ctx.setTransform(DPR,0,0,DPR,0,0);
 heart.width=800;heart.height=800;
}
addEventListener("resize",resize);resize();

const messages=[
["Amor","Eres mi luz en los días más bonitos. 💛"],
["Cariño","Mi persona favorita, hoy y en cada pequeño detalle."],
["K-Drama","Si esto fuera un K-drama, esta sería mi escena favorita."],
["Respeto","Te quiero también por la persona increíble que eliges ser."],
["Aprecio","Gracias por cada risa, cada palabra y cada momento."],
["K-Drama","Entre tantas casualidades, qué bonito encontrarte en mi historia."],
["Admiración","Me encanta verte perseguir tus sueños y ser tú mismo."],
["Amor","Hay personas que convierten un día cualquiera en un recuerdo bonito."],
["Ternura","Ojalá nunca te falten motivos para sonreír."],
["K-Drama","Capítulo especial: tú, yo y un universo lleno de flores amarillas. 🌻"],
["Gratitud","Qué bonito poder decir: gracias por existir."],
["Cariño","No hacen falta grandes palabras cuando el corazón ya sabe qué decir."],
["Sueños","Que cada sueño tuyo encuentre un camino para hacerse realidad."],
["Amor","Si pudiera regalarte algo infinito, sería una colección de momentos felices."],
["K-Drama","Nuestra historia no necesita guion perfecto; solo momentos sinceros."],
["Respeto","Cuidar también es escuchar, comprender y valorar."],
["Especial","De todas estas flores, hay una razón para que estén aquí: tú."],
["Amor","Esta pequeña galaxia tiene un nombre que brilla más que las estrellas."],
["K-Drama","Y entonces apareció esa persona que hizo especial la escena. ✨"],
["Final","Todo este universo fue preparado pensando en ti, Jaasiel. 💛"]
];

function flowerHTML(){
 let p="";
 for(let i=0;i<20;i++)p+=`<i class="petal" style="transform:translate(-50%,-91%) rotate(${i*18}deg)"></i>`;
 let seeds="";
 for(let i=0;i<25;i++)seeds+=`<i style="left:${20+Math.random()*60}%;top:${20+Math.random()*60}%"></i>`;
 return `<div class="flower-main">${p}<div class="flower-center">${seeds}</div></div><div class="stem"></div><div class="leaf"></div><div class="leaf two"></div>`;
}
function buildFlowers(){
 const radius=Math.min(W,H)*.45;
 messages.forEach((m,i)=>{
  const el=document.createElement("div");el.className="flower";
  const a=i*(360/messages.length);
  const rad=a*Math.PI/180;
  const x=Math.sin(rad)*radius,y=Math.cos(rad)*radius*.33,z=Math.cos(rad)*radius;
  el.style.transform=`translate3d(calc(-50% + ${x}px),calc(-50% + ${y}px),${z}px) rotateY(${-a}deg)`;
  el.style.setProperty("--dur",`${2.2+Math.random()*1.5}s`);
  el.style.setProperty("--delay",`${-Math.random()*2}s`);
  el.innerHTML=flowerHTML()+`<div class="phrase"><b>${m[0]}</b>${m[1]}</div>`;
  flowers.appendChild(el);
 }
}
buildFlowers();

let stars3=[];
for(let i=0;i<650;i++)stars3.push({x:Math.random(),y:Math.random(),r:.35+Math.random()*1.8,a:.15+Math.random()*.8,t:Math.random()*8});
function drawStars(){
 ctx.clearRect(0,0,W,H);
 const now=performance.now()/700;
 for(const s of stars3){
  ctx.globalAlpha=s.a*(.6+.4*Math.sin(now+s.t));
  ctx.fillStyle="#ffe992";ctx.beginPath();ctx.arc(s.x*W,s.y*H,s.r,0,Math.PI*2);ctx.fill();
 }
 ctx.globalAlpha=1;requestAnimationFrame(drawStars);
}
drawStars();

/* Heart: fast spark -> formed particle heart */
const dots=[];
for(let i=0;i<2400;i++){
 const t=Math.random()*Math.PI*2;
 const edge=Math.random()>.28;
 const scale=edge?(1+Math.random()*.05):(.75+Math.random()*.27);
 const x=16*Math.sin(t)**3;
 const y=-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t));
 dots.push({x:400+x*24*scale+(Math.random()-.5)*4,y:400+y*24*scale+(Math.random()-.5)*4,r:.5+Math.random()*2.2,a:.3+Math.random()*.7,q:Math.random()*10});
}
let heartProgress=0,heartVisible=false;
function drawHeart(){
 hctx.clearRect(0,0,800,800);
 const t=performance.now()/450;
 for(const p of dots){
  const appear=Math.min(1,heartProgress*1.25);
  hctx.globalAlpha=p.a*appear*(.65+.35*Math.sin(t+p.q));
  hctx.fillStyle="#ffe56a";hctx.shadowColor="#ffc400";hctx.shadowBlur=8;
  hctx.beginPath();hctx.arc(p.x,p.y,p.r,0,Math.PI*2);hctx.fill();
 }
 hctx.shadowBlur=0;hctx.globalAlpha=1;
 if(heartVisible)requestAnimationFrame(drawHeart);
}
function revealHeart(){
 if(heartVisible)return;
 heartVisible=true;heartProgress=0;drawHeart();
 const start=performance.now();
 function grow(now){
  heartProgress=Math.min(1,(now-start)/1050);
  if(heartProgress<1)requestAnimationFrame(grow);
  else burst(innerWidth/2,innerHeight*.54,150);
 }
 burst(innerWidth/2,innerHeight*.54,220);
 requestAnimationFrame(grow);
}

let typed="",love="JAASIEL TE AMO",sparks=[];
function burst(x,y,n){
 for(let i=0;i<n;i++){
  const a=Math.random()*Math.PI*2,v=1+Math.random()*7;
  sparks.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,r:.5+Math.random()*2.5,l:1});
 }
}
function drawSparks(){
 for(let i=sparks.length-1;i>=0;i--){
  const p=sparks[i];p.x+=p.vx;p.y+=p.vy;p.vx*=.985;p.vy*=.985;p.l-=.02;
  if(p.l<=0){sparks.splice(i,1);continue}
  ctx.globalAlpha=p.l;ctx.fillStyle="#ffe45c";ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
 }
 ctx.globalAlpha=1;requestAnimationFrame(drawSparks);
}
drawSparks();

let dragging=false,lastX=0,lastY=0,rotY=0,targetY=0,rotX=0,targetX=0;
function pointerStart(x,y){dragging=true;lastX=x;lastY=y}
function pointerMove(x,y){
 if(!dragging)return;
 targetY+=(x-lastX)*.38;targetX-=(y-lastY)*.10;targetX=Math.max(-16,Math.min(16,targetX));
 lastX=x;lastY=y;
}
function pointerEnd(){dragging=false}
addEventListener("mousedown",e=>pointerStart(e.clientX,e.clientY));
addEventListener("mousemove",e=>pointerMove(e.clientX,e.clientY));
addEventListener("mouseup",pointerEnd);
addEventListener("touchstart",e=>pointerStart(e.touches[0].clientX,e.touches[0].clientY),{passive:true});
addEventListener("touchmove",e=>pointerMove(e.touches[0].clientX,e.touches[0].clientY),{passive:true});
addEventListener("touchend",pointerEnd,{passive:true});

function animate(){
 if(!dragging)targetY+=.065;
 rotY+=(targetY-rotY)*.075;rotX+=(targetX-rotX)*.075;
 const tr=`rotateX(${rotX}deg) rotateY(${rotY}deg)`;
 flowers.style.transform=tr;ring.style.transform=tr;
 requestAnimationFrame(animate);
}
animate();

let started=false;
app.addEventListener("click",e=>{
 if(e.target.closest("button"))return;
 if(!started){started=true;revealHeart()}
 if(typed.length<love.length){
  typed+=love[typed.length];loveText.textContent=typed;burst(W/2,H*.65,45);
 }else burst(W/2,H*.54,100);
});
enter.onclick=()=>{loading.classList.add("hidden");app.classList.remove("hidden");burst(W/2,H/2,200)}
reset.onclick=e=>{
 e.stopPropagation();typed="";loveText.textContent="";started=false;heartVisible=false;heartProgress=0;hctx.clearRect(0,0,800,800);burst(W/2,H*.54,130);
};

