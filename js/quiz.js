(function(){
'use strict';
var preguntas=[
  {p:'¿En qué ciudad nació Carl Friedrich Gauss?',ops:['Brunswick','Göttingen','Berlín','Hamburgo'],r:0},
  {p:'¿En qué año publicó Gauss las <em>Disquisitiones Arithmeticae</em>?',ops:['1795','1801','1809','1827'],r:1},
  {p:'¿Qué método usó Gauss para predecir la posición del planeta enano Ceres?',ops:['Triangulación geodésica','Mínimos cuadrados','Integración compleja','Aritmética modular'],r:1},
  {p:'¿Qué representa la curva de campana asociada a Gauss?',ops:['La trayectoria de Ceres','La distribución normal','El criterio de convergencia','La curvatura gaussiana'],r:1},
  {p:'¿En qué ciudad nació Augustin-Louis Cauchy?',ops:['Lyon','Versalles','París','Marsella'],r:2},
  {p:'¿Cuál de estas obras es de Cauchy?',ops:['Theoria motus','Disquisitiones Arithmeticae','Cours d\'analyse','Principia Mathematica'],r:2},
  {p:'¿Qué establece el teorema integral de Cauchy?',ops:['Que toda serie converge','Que la integral de una función holomorfa sobre un contorno cerrado es cero','Que los mínimos cuadrados minimizan el error','Que todo polígono regular es construible'],r:1},
  {p:'¿Cuál de estos nombres lleva la huella de ambos matemáticos?',ops:['Desigualdad de Cauchy–Schwarz','Distribución gaussiana','Criterio de Cauchy','Todas las anteriores son solo de uno de ellos'],r:3}
];

var box=document.getElementById('quizBox');
var result=document.getElementById('quizResult');
var respuestas=[];

preguntas.forEach(function(q,i){
  var div=document.createElement('div');
  div.className='card';
  div.style.marginBottom='14px';
  var enunciado=document.createElement('p');
  enunciado.innerHTML='<b>'+(i+1)+'. </b>'+q.p;
  div.appendChild(enunciado);
  q.ops.forEach(function(op,j){
    var label=document.createElement('label');
    label.style.display='block';
    label.style.marginBottom='4px';
    label.style.cursor='pointer';
    var input=document.createElement('input');
    input.type='radio';
    input.name='q'+i;
    input.value=j;
    input.style.marginRight='8px';
    input.addEventListener('change',function(){respuestas[i]=j});
    label.appendChild(input);
    label.appendChild(document.createTextNode(op));
    div.appendChild(label);
  });
  div.id='qblock'+i;
  box.appendChild(div);
});

var btn=document.createElement('button');
btn.className='btn';
btn.textContent='Ver resultados';
btn.addEventListener('click',function(){
  var correctas=0;
  preguntas.forEach(function(q,i){
    var block=document.getElementById('qblock'+i);
    var labels=block.querySelectorAll('label');
    labels.forEach(function(l,j){
      if(j===q.r)l.style.color='var(--ok)';
      else if(j===respuestas[i]&&j!==q.r)l.style.color='var(--bad)';
    });
    if(respuestas[i]===q.r)correctas++;
  });
  result.style.display='block';
  var pct=Math.round(correctas/preguntas.length*100);
  var msg=pct===100?'¡Perfecto! Dominas el tema.':pct>=75?'¡Muy bien! Repasa los puntos en rojo.':pct>=50?'Bien, pero vale la pena releer las secciones.':'Revisa el contenido y vuelve a intentarlo.';
  result.innerHTML='<b>Resultado: '+correctas+' de '+preguntas.length+' correctas ('+pct+'%)</b><br>'+msg;
  btn.disabled=true;
});
box.appendChild(btn);
})();
