(function(){
  var tipo="Flora",tabs=document.getElementById("tabs"),box=document.getElementById("especies");
  if(!tabs||!box)return;
  function draw(){
    tabs.innerHTML="";
    ["Flora","Fauna"].forEach(function(t){var b=document.createElement("button");b.textContent=T[t.toLowerCase()];b.setAttribute("aria-pressed",t===tipo);b.onclick=function(){tipo=t;draw()};tabs.appendChild(b)});
    box.innerHTML="";
    (window.ESPECIES||[]).filter(function(e){return e.tipo===tipo}).forEach(function(e){
      var a=document.createElement("article");a.appendChild(FIG(e.foto,L(e.nombre)));var h=document.createElement("div");h.innerHTML="<h2></h2><p class='sci'></p><p></p>";h.children[0].textContent=L(e.nombre);h.children[1].textContent=e.cientifico;h.children[2].textContent=L(e.texto);a.appendChild(h.children[0]);a.appendChild(h.children[0]);a.appendChild(h.children[0]);if(e.estado!=="verificado"){var s=document.createElement("span");s.className="estado";s.textContent=T.unv;a.appendChild(s)}box.appendChild(a)});
  }
  draw();
})();
