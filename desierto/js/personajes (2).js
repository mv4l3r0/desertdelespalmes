(function(){
  var CAT_KEYS = [
    { key: "Vida Carmelita", i18n: "pers_cat_carmelita" },
    { key: "Ciencia y Naturaleza", i18n: "pers_cat_ciencia" },
    { key: "Protección y Mecenazgo", i18n: "pers_cat_proteccion" },
    { key: "Arte y Cultura", i18n: "pers_cat_arte" }
  ];
  var MIN_FILTROS = 8;
  var data = (window.PERSONAJES || []).slice().sort(function(a,b){return a.orden - b.orden});
  var cat = "Todas", q = "", $ = function(i){return document.getElementById(i)};
  var norm = function(s){return (s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")};
  var tf = function(v){return window.tField ? window.tField(v) : (typeof v === 'string' ? v : (v && v.es) || '')};
  var tr = function(k, fallback){return window.t ? window.t(k) : fallback};

  function catLabel(key){
    var found = CAT_KEYS.find(function(c){return c.key === key});
    return found ? tr(found.i18n, key) : key;
  }

  function bar(){
    if(data.length < MIN_FILTROS){$("toolbar").hidden = true; return;}
    var f = $("filters"); f.innerHTML = "";
    var allBtn = document.createElement("button");
    allBtn.textContent = tr("pers_all", "Todas");
    allBtn.setAttribute("aria-pressed", "Todas" === cat);
    allBtn.onclick = function(){cat = "Todas"; bar(); draw();};
    f.appendChild(allBtn);

    CAT_KEYS.forEach(function(c){
      var b = document.createElement("button");
      b.textContent = tr(c.i18n, c.key);
      b.setAttribute("aria-pressed", c.key === cat);
      b.onclick = function(){cat = c.key; bar(); draw();};
      f.appendChild(b);
    });
  }

  function line(p, label, text){
    if(!text) return;
    var e = document.createElement("p");
    var b = document.createElement("strong");
    b.textContent = label + ": ";
    e.appendChild(b);
    e.appendChild(document.createTextNode(text));
    p.appendChild(e);
  }

  function draw(){
    var box = $("lista"); box.innerHTML = "";
    var rs = data.filter(function(p){
      if(cat !== "Todas" && p.categorias.indexOf(cat) < 0) return false;
      var hay = [tf(p.nombre), tf(p.rol), tf(p.vinculo), tf(p.legado), p.categorias.map(catLabel).join(" ")].join(" ");
      return !q || norm(hay).indexOf(q) >= 0;
    });
    $("cuenta").textContent = rs.length + (rs.length === 1 ? tr("pers_count_1", " personaje") : tr("pers_count_n", " personajes"));
    rs.forEach(function(p){
      var a = document.createElement("article"); a.id = p.id;
      var h = document.createElement("h2"); h.textContent = tf(p.nombre); a.appendChild(h);
      var m = document.createElement("p"); m.className = "cat";
      m.textContent = tf(p.fechas) + " · " + p.categorias.map(catLabel).join(", ");
      a.appendChild(m);
      if(p.estado !== "verificado"){
        var s = document.createElement("span"); s.className = "estado";
        s.textContent = p.estado === "con fuente" ? tr("pers_st_source", "Con fuente, por revisar") : tr("pers_st_unverified", "Por verificar");
        a.appendChild(s);
      }
      line(a, tr("pers_lbl_who", "Quién fue"), tf(p.rol));
      line(a, tr("pers_lbl_link", "Vínculo con el Desierto"), tf(p.vinculo));
      line(a, tr("pers_lbl_legacy", "Legado"), tf(p.legado));
      if(p.fuentes && p.fuentes.length) line(a, tr("pers_lbl_sources", "Fuentes"), p.fuentes.join("; "));
      box.appendChild(a);
    });
  }

  $("buscar").oninput = function(e){q = norm(e.target.value.trim()); draw();};
  window.addEventListener("langchange", function(){bar(); draw();});
  bar(); draw();
  if(location.hash){var t = document.getElementById(location.hash.slice(1)); if(t) t.scrollIntoView();}
})();
