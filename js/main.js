// Centro aproximado de la zona: AJUSTAR con coordenadas reales.
const CENTER=[-0.063,40.096], DIFF_COLORS={Fácil:'#2f7d4f',Media:'#c98a1b',Difícil:'#b4532b'};
// Mapa base: OpenFreeMap (gratuito, sin clave). Alternativas: MapTiler, Stadia, Protomaps.
const STYLE='https://tiles.openfreemap.org/styles/liberty';
const DEM={type:'raster-dem',encoding:'terrarium',tileSize:256,maxzoom:15,
  tiles:['https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'],
  attribution:'Elevación: Mapzen/AWS Terrain Tiles'};
const map=new maplibregl.Map({container:'map',style:STYLE,center:CENTER,zoom:12});
map.addControl(new maplibregl.NavigationControl());
let routes=[],filter='Todas',current=null;
const $=i=>document.getElementById(i);

function parseGPX(xml){
  const doc=new DOMParser().parseFromString(xml,'application/xml');
  const pts=[...doc.querySelectorAll('trkpt')].map(p=>({lat:+p.getAttribute('lat'),lon:+p.getAttribute('lon'),ele:+(p.querySelector('ele')?.textContent||0)}));
  let km=0,gain=0;const prof=[[0,pts[0]?.ele||0]];
  for(let i=1;i<pts.length;i++){
    km+=haversine(pts[i-1],pts[i]);
    const d=pts[i].ele-pts[i-1].ele; if(d>0)gain+=d;
    prof.push([km,pts[i].ele]);
  }
  return {pts,km,gain:Math.round(gain),prof};
}
function haversine(a,b){const R=6371,r=x=>x*Math.PI/180,dl=r(b.lat-a.lat),dn=r(b.lon-a.lon);
  const h=Math.sin(dl/2)**2+Math.cos(r(a.lat))*Math.cos(r(b.lat))*Math.sin(dn/2)**2;return 2*R*Math.asin(Math.sqrt(h))}

async function init(){
  const meta=window.ROUTES_DATA||await (await fetch('data/routes.json')).json();
  routes=await Promise.all(meta.map(async m=>({...m,...parseGPX(m.gpxText||await (await fetch(m.gpx)).text())})));
  await new Promise(r=>map.loaded()?r():map.once('load',r));
  map.addSource('dem',DEM);
  routes.forEach(r=>{
    map.addSource(r.id,{type:'geojson',data:{type:'Feature',geometry:{type:'LineString',coordinates:r.pts.map(p=>[p.lon,p.lat])}}});
    map.addLayer({id:r.id,type:'line',source:r.id,layout:{'line-cap':'round','line-join':'round'},
      paint:{'line-color':DIFF_COLORS[r.difficulty]||'#b4532b','line-width':4}});
    map.on('click',r.id,()=>select(r.id));
    map.on('mouseenter',r.id,()=>map.getCanvas().style.cursor='pointer');
    map.on('mouseleave',r.id,()=>map.getCanvas().style.cursor='');
  });
  renderFilters();renderList();
}
function renderFilters(){
  $('filters').innerHTML='';
  ['Todas','Fácil','Media','Difícil'].forEach(f=>{const b=document.createElement('button');b.textContent=f==='Todas'?T.all:(T.diff[f]||f);
    b.setAttribute('aria-pressed',f===filter);b.onclick=()=>{filter=f;renderFilters();renderList()};$('filters').appendChild(b)});
}
function renderList(){
  $('list').innerHTML='';
  routes.forEach(r=>{const show=filter==='Todas'||r.difficulty===filter;
    map.setLayoutProperty(r.id,'visibility',show?'visible':'none');if(!show)return;
    const li=document.createElement('li'),b=document.createElement('button');
    b.setAttribute('aria-pressed',r.id===current);
    b.innerHTML='<b></b><small></small>';b.firstChild.textContent=L(r.name);
    b.lastChild.textContent=`${T.diff[r.difficulty]||r.difficulty} · ${r.km.toFixed(1)} km · +${r.gain} m`;
    b.onclick=()=>select(r.id);li.appendChild(b);$('list').appendChild(li)});
}
function select(id){
  current=id;const r=routes.find(x=>x.id===id);renderList();
  const b=new maplibregl.LngLatBounds();r.pts.forEach(p=>b.extend([p.lon,p.lat]));
  map.fitBounds(b,{padding:60});
  const W=300,H=90,es=r.prof.map(p=>p[1]),mn=Math.min(...es),mx=Math.max(...es);
  const pts=r.prof.map(p=>`${(p[0]/r.km*W).toFixed(1)},${(H-6-(p[1]-mn)/((mx-mn)||1)*(H-14)).toFixed(1)}`).join(' ');
  $('detail').innerHTML=`<h3></h3><p></p><svg viewBox="0 0 ${W} ${H}"><polyline points="${pts}" fill="none" stroke="#2f5a43" stroke-width="2"/></svg>
    <small>${Math.round(mn)}–${Math.round(mx)} m</small>`;
  $('detail').children[0].textContent=L(r.name);$('detail').children[1].textContent=L(r.description);
}
$('btn3d').onclick=e=>{
  const on=e.target.getAttribute('aria-pressed')!=='true';
  e.target.setAttribute('aria-pressed',on);
  map.setTerrain(on?{source:'dem',exaggeration:1.4}:null);
  map.easeTo({pitch:on?70:0,bearing:on?20:0,duration:1200});
};
init();
