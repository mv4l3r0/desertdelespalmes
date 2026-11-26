(function(){
  var id=window.ROUTE_ID,d=(window.TRAZADOS||{})[id];if(!d||!window.maplibregl)return;
  var co=d.c.map(function(p){return[p[0],p[1]]});
  var map=new maplibregl.Map({container:"map",style:"https://tiles.openfreemap.org/styles/liberty",center:co[0],zoom:12});
  map.addControl(new maplibregl.NavigationControl());
  map.on("load",function(){
    map.addSource("dem",{type:"raster-dem",encoding:"terrarium",tileSize:256,maxzoom:15,tiles:["https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"],attribution:"Elevación: Mapzen/AWS Terrain Tiles"});
    map.addSource("r",{type:"geojson",data:{type:"Feature",geometry:{type:"LineString",coordinates:co}}});
    var lay={"line-cap":"round","line-join":"round"};
    map.addLayer({id:"r-c",type:"line",source:"r",layout:lay,paint:{"line-color":"#ffffff","line-width":7,"line-opacity":.85}});
    map.addLayer({id:"r",type:"line",source:"r",layout:lay,paint:{"line-color":"#d9532b","line-width":4}});
    new maplibregl.Marker({color:"#2f5a43"}).setLngLat(co[0]).addTo(map);
    var b=new maplibregl.LngLatBounds();co.forEach(function(c){b.extend(c)});map.fitBounds(b,{padding:50,duration:0});
  });
  document.getElementById("btn3d").onclick=function(e){
    var on=e.target.getAttribute("aria-pressed")!=="true";e.target.setAttribute("aria-pressed",on);
    map.setTerrain(on?{source:"dem",exaggeration:1.4}:null);map.easeTo({pitch:on?65:0,bearing:on?20:0,duration:1200});
  };
})();
