(function(){
  var CATS=["Vida Carmelita","Ciencia y Naturaleza","Protección y Mecenazgo","Arte y Cultura"],MIN_FILTROS=8;
  var data=(window.PERSONAJES||[]).slice().sort(function(a,b){return a.orden-b.orden});
  var cat="Todas",q="",$=function(i){return document.getElementById(i)};
  var norm=function(s){return String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")};
  var cn=function(c){return T.cats[c]||c};
  function bar(){
    if(data.length<MIN_FILTROS){$("toolbar").hidden=true;return}
    var f=$("filters");f.innerHTML="";
    ["Todas"].concat(CATS).forEach(function(c){var b=document.createElement("button");b.textContent=c==="Todas"?T.all:cn(c);b.setAttribute("aria-pressed",c===cat);b.onclick=function(){cat=c;bar();draw()};f.appendChild(b)});
  }
  function line(p,label,text){if(!text)return;var e=document.createElement("p"),b=document.createElement("strong");b.textContent=label+": ";e.appendChild(b);e.appendChild(document.createTextNode(text));p.appendChild(e)}
  function draw(){
    var box=$("lista");box.innerHTML="";
    var rs=data.filter(function(p){
      if(cat!=="Todas"&&p.categorias.indexOf(cat)<0)return false;
      return !q||norm([L(p.nombre),L(p.rol),L(p.vinculo),L(p.legado),p.categorias.map(cn).join(" ")].join(" ")).indexOf(q)>=0});
    $("cuenta").textContent=rs.length+" "+(rs.length===1?T.person:T.persons);
    rs.forEach(function(p){
      var a=document.createElement("article");a.id=p.id;
      a.appendChild(FIG(p.imagen,L(p.nombre),false,T.noimg));var h=document.createElement("h2");h.textContent=L(p.nombre);a.appendChild(h);
      var m=document.createElement("p");m.className="cat";m.textContent=L(p.fechas)+" · "+p.categorias.map(cn).join(", ");a.appendChild(m);
      if(p.estado!=="verificado"){var s=document.createElement("span");s.className="estado";s.textContent=p.estado==="con fuente"?T.src:T.unv;a.appendChild(s)}
      line(a,T.who,L(p.rol));line(a,T.link,L(p.vinculo));line(a,T.legacy,L(p.legado));
      if(p.fuentes&&p.fuentes.length)line(a,T.sources,p.fuentes.join("; "));
      if(p.enlaces&&p.enlaces.length){var q=document.createElement("p"),s2=document.createElement("strong");s2.textContent=T.links+": ";q.appendChild(s2);p.enlaces.forEach(function(e,i){if(i)q.appendChild(document.createTextNode(" · "));var k=document.createElement("a");k.href=e.url;k.textContent=L(e.titulo);k.rel="noopener noreferrer";k.target="_blank";q.appendChild(k)});a.appendChild(q)}
      box.appendChild(a)});
  }
  $("buscar").oninput=function(e){q=norm(e.target.value.trim());draw()};
  bar();draw();
  if(location.hash){var t=document.getElementById(location.hash.slice(1));if(t)t.scrollIntoView()}
})();
