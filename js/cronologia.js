(function(){var tl=document.getElementById("tl");if(!tl)return;
(window.CRONO||[]).slice().sort(function(a,b){return a.orden-b.orden}).forEach(function(e){
var li=document.createElement("li"),b=document.createElement("b");b.textContent=e.anio;li.appendChild(b);
var h=document.createElement("h2");h.textContent=L(e.titulo);li.appendChild(h);
var p=document.createElement("p");p.textContent=L(e.texto);li.appendChild(p);
if(e.fuente){var s=document.createElement("p");s.className="src";s.textContent=T.source+": "+e.fuente;li.appendChild(s)}
tl.appendChild(li)})})();
