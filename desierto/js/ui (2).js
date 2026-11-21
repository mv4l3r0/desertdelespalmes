(function(){
  var tipo = "Flora", tabs = document.getElementById("tabs"), box = document.getElementById("especies");
  if(!tabs || !box) return;
  var tf = function(v){return window.tField ? window.tField(v) : (typeof v === 'string' ? v : (v && v.es) || '')};
  var tr = function(k, fallback){return window.t ? window.t(k) : fallback};

  function draw(){
    tabs.innerHTML = "";
    [
      { key: "Flora", label: tr("nat_tab_flora", "Flora") },
      { key: "Fauna", label: tr("nat_tab_fauna", "Fauna") }
    ].forEach(function(t){
      var b = document.createElement("button");
      b.textContent = t.label;
      b.setAttribute("aria-pressed", t.key === tipo);
      b.onclick = function(){tipo = t.key; draw();};
      tabs.appendChild(b);
    });
    box.innerHTML = "";
    (window.ESPECIES || []).filter(function(e){return e.tipo === tipo}).forEach(function(e){
      var a = document.createElement("article");
      a.innerHTML = "<h2></h2><p class='sci'></p><p></p>";
      a.children[0].textContent = tf(e.nombre);
      a.children[1].textContent = e.cientifico;
      a.children[2].textContent = tf(e.texto);
      box.appendChild(a);
    });
  }
  window.addEventListener("langchange", draw);
  draw();
})();
