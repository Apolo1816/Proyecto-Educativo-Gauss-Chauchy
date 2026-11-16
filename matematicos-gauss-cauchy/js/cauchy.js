(function(){
'use strict';
var $=function(s){return document.querySelector(s)};
// Ejercicio A
$('#limCheck').addEventListener('click',function(){var v=$('#limAns').value,o=$('#limOut'),ok=Number(v)===4&&v!=='';
  o.className='out '+(ok?'ok':'bad');
  o.innerHTML=(ok?'Correcto. ':(v===''?'Escribe un número. ':'Aún no. '))+'<br>1) Si sustituyes x = 2 obtienes 0/0, una indeterminación: no se puede concluir nada.<br>2) Factoriza: x² − 4 = (x − 2)(x + 2).<br>3) Simplifica para x ≠ 2: (x − 2)(x + 2)/(x − 2) = x + 2.<br>4) Cuando x → 2, x + 2 → 4. El límite es 4.'});
// Ejercicio B
var sc,sl=$('#seqN');
function seq(){var n=+sl.value,t=[],i;$('#seqNv').textContent=n;
  for(i=1;i<=n;i++)t.push(1/i);
  $('#seqOut').textContent='a₁ = 1, a₂ = 0.5, … , a'+n+' = '+t[n-1].toFixed(4)+'. Cada término es menor que el anterior y se acerca a 0.';
  if(typeof Chart==='undefined')return;
  var L=t.map(function(_,k){return k+1});
  if(!sc){sc=new Chart($('#seqChart'),{type:'line',data:{labels:L,datasets:[{label:'1/n',data:t,borderColor:'#D5AD62',pointRadius:3}]},options:{maintainAspectRatio:false,animation:false}})}
  else{sc.data.labels=L;sc.data.datasets[0].data=t;sc.update()}}
sl.addEventListener('input',seq);window.addEventListener('load',seq);
// Ejercicio C
var EPS=[0.5,0.2,0.1,0.05,0.02],ce=$('#cEps');
function crit(){var e=EPS[ce.value-1],N=Math.floor(1/e)+1,d=[],i;$('#cEpsV').textContent=e;
  for(i=N;i<N+10;i++)d.push('<span>a'+i+' = '+(1/i).toFixed(3)+'</span>');
  $('#cOut').innerHTML='Para ε = '+e+', toma N = '+N+'. Cualquier par de términos con índices m, n ≥ N cumple |aₘ − aₙ| < 1/N = '+(1/N).toFixed(3)+' < ε. Los términos de la cola quedan «apretados» entre sí:';
  $('#cDots').innerHTML=d.join('')+'<span>…</span>'}
ce.addEventListener('input',crit);crit();
})();
