(function(){
'use strict';
var $=function(s,r){return (r||document).querySelector(s)};
// Menu, theme, progress, back-to-top
var menu=$('#menu'),mb=$('#menuBtn');
mb.addEventListener('click',function(){var o=menu.classList.toggle('open');mb.setAttribute('aria-expanded',o)});
menu.addEventListener('click',function(e){if(e.target.tagName==='A')menu.classList.remove('open')});
var root=document.documentElement;
try{var t=localStorage.getItem('theme');if(t)root.dataset.theme=t}catch(e){}
$('#themeBtn').addEventListener('click',function(){var n=root.dataset.theme==='light'?'dark':'light';root.dataset.theme=n;try{localStorage.setItem('theme',n)}catch(e){}
  window.dispatchEvent(new Event('themechange'))});
var prog=$('#progress'),top_=$('#toTop');
addEventListener('scroll',function(){var h=document.documentElement;prog.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%';top_.hidden=h.scrollTop<500;
  document.querySelectorAll('#menu a').forEach(function(a){var s=$(a.getAttribute('href'));a.classList.toggle('on',s&&s.getBoundingClientRect().top<120&&s.getBoundingClientRect().bottom>120)})},{passive:true});
top_.addEventListener('click',function(){scrollTo({top:0})});
// Timelines
document.querySelectorAll('[data-tl]').forEach(function(tl){var out=tl.nextElementSibling;
  tl.querySelectorAll('button').forEach(function(b){b.addEventListener('click',function(){tl.querySelectorAll('button').forEach(function(x){x.classList.remove('on')});b.classList.add('on');
    out.innerHTML='<b>'+b.dataset.y+' · '+b.dataset.t+'</b><br>'+b.innerHTML;});});});
// Comparison
var C={'Nacionalidad y época':['Alemán. Vivió entre 1777 y 1855, de la Ilustración tardía a la Revolución industrial.','Francés. Vivió entre 1789 y 1857, marcado por la Revolución francesa, el Imperio y la Restauración.'],
'Formación':['Collegium Carolinum y Universidad de Göttingen, con mecenazgo del Duque de Brunswick.','École Polytechnique y École des Ponts et Chaussées; trabajó como ingeniero.'],
'Obras principales':['<em>Disquisitiones Arithmeticae</em> (1801), <em>Theoria motus</em> (1809), <em>Disquisitiones generales circa superficies curvas</em> (1827).','<em>Cours d\'analyse</em> (1821), <em>Leçons sur le calcul différentiel</em> (1829), <em>Exercices de mathématiques</em>.'],
'Campos':['Teoría de números, astronomía, geodesia, geometría diferencial, magnetismo.','Análisis real y complejo, ecuaciones diferenciales, series, álgebra, física matemática.'],
'Contribuciones':['Aritmética modular, reciprocidad cuadrática, mínimos cuadrados, curva normal, curvatura gaussiana.','Límites, continuidad, convergencia, criterio de Cauchy, teorema integral, residuos.'],
'Influencia actual':['Datos, estadística, regresión, geodesia, aprendizaje automático.','Análisis numérico, simulación, análisis complejo, fundamentos del cálculo.']};
var tabs=$('#cmpTabs'),co=$('#cmpOut');
function show(k,btn){tabs.querySelectorAll('button').forEach(function(b){b.classList.toggle('on',b===btn)});
  co.innerHTML='<div><b>Gauss</b><br>'+C[k][0]+'</div><div><b>Cauchy</b><br>'+C[k][1]+'</div>'}
Object.keys(C).forEach(function(k,i){var b=document.createElement('button');b.textContent=k;b.onclick=function(){show(k,b)};tabs.appendChild(b);if(!i)show(k,b)});
// Hero background: formulas floating
var cv=$('#bg'),cx=cv.getContext('2d'),W,H,items=['∑','π','∫','ε','δ','x²','∮','σ','μ','√','∞','e^{-x²}'],P=[];
function rs(){W=cv.width=cv.offsetWidth;H=cv.height=cv.offsetHeight}rs();addEventListener('resize',rs);
for(var i=0;i<22;i++)P.push({x:Math.random(),y:Math.random(),s:14+Math.random()*28,v:.00005+Math.random()*.0001,t:items[i%items.length]});
(function draw(){cx.clearRect(0,0,W,H);cx.fillStyle='#D5AD62';cx.globalAlpha=.35;P.forEach(function(p){p.y-=p.v*16;if(p.y<-.05)p.y=1.05;cx.font=p.s+'px serif';cx.fillText(p.t,p.x*W,p.y*H)});requestAnimationFrame(draw)})();
})();
