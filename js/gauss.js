(function(){
'use strict';
var $=function(s){return document.querySelector(s)};
function mod(a,n){return((a%n)+n)%n}
// Ejercicio A
$('#modCheck').addEventListener('click',function(){var v=$('#modAns').value,o=$('#modOut');
  if(v===''){o.className='out bad';o.textContent='Escribe un número.';return}
  var ok=Number(v)===2;o.className='out '+(ok?'ok':'bad');
  o.innerHTML=(ok?'Correcto. ':'Aún no. ')+'Procedimiento: 17 ÷ 5 = 3 con resto 2, porque 5 × 3 = 15 y 17 − 15 = 2. Por tanto 17 mod 5 = 2, es decir, 17 ≡ 2 (mod 5).'});
$('#modCalc').addEventListener('click',function(){var a=parseInt($('#modA').value,10),n=parseInt($('#modN').value,10),o=$('#modCalcOut');
  if(isNaN(a)||isNaN(n)||n<1){o.className='out bad';o.textContent='Usa enteros, con n ≥ 1.';return}
  var q=Math.floor(a/n);o.className='out';o.textContent=a+' = '+n+' × '+q+' + '+mod(a,n)+' → '+a+' mod '+n+' = '+mod(a,n)});
// Ejercicio B
var X=[1,2,3,4,5],Y=[2,4,5,4,5],chart,box=$('#lsInputs');
X.forEach(function(x,i){var l=document.createElement('label');l.innerHTML='x='+x+' y=<input type="number" step="any" value="'+Y[i]+'" data-i="'+i+'"> ';box.appendChild(l)});
box.addEventListener('input',function(e){var i=e.target.dataset.i;if(i!==undefined){var v=parseFloat(e.target.value);if(!isNaN(v)){Y[i]=v;calc()}}});
function calc(){var n=X.length,mx=X.reduce(function(a,b){return a+b},0)/n,my=Y.reduce(function(a,b){return a+b},0)/n,sxy=0,sxx=0;
  for(var i=0;i<n;i++){sxy+=(X[i]-mx)*(Y[i]-my);sxx+=(X[i]-mx)*(X[i]-mx)}
  var b=sxy/sxx,a=my-b*mx,f=function(v){return Math.round(v*1000)/1000};
  $('#lsSteps').innerHTML='1) Medias: x̄ = '+f(mx)+', ȳ = '+f(my)+'<br>2) Σ(x−x̄)(y−ȳ) = '+f(sxy)+'; Σ(x−x̄)² = '+f(sxx)+'<br>3) Pendiente b = '+f(sxy)+' / '+f(sxx)+' = '+f(b)+'<br>4) Intercepto a = ȳ − b·x̄ = '+f(a)+'<br><b>Recta: ŷ = '+f(a)+' + '+f(b)+'x</b>';
  var line=X.map(function(x){return a+b*x});
  if(typeof Chart==='undefined')return;
  if(!chart){chart=new Chart($('#lsChart'),{data:{labels:X,datasets:[{type:'scatter',label:'Datos',data:[],backgroundColor:'#D5AD62',pointRadius:6},{type:'line',label:'Recta de ajuste',data:[],borderColor:'#7fb0e8',pointRadius:0}]},options:{maintainAspectRatio:false,scales:{x:{type:'linear'}}}})}
  chart.data.datasets[0].data=X.map(function(x,i){return{x:x,y:Y[i]}});chart.data.datasets[1].data=X.map(function(x,i){return{x:x,y:line[i]}});chart.update();
  if(window.MathJax&&MathJax.typesetPromise)MathJax.typesetPromise()}
window.addEventListener('load',calc);
})();
