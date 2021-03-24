(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1d244257"],{"60b5":function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("example-wrapper",{attrs:{title:"Polylines and Polygons"},scopedSlots:t._u([{key:"description",fn:function(){return[n("p",[t._v("We can also add polylines.")])]},proxy:!0},{key:"map",fn:function(){return[n("gmaps-map",{attrs:{options:t.mapOptions}},[t.polygon?n("gmaps-polygon",{attrs:{editable:t.editable,path:t.items,"fill-color":"red","stroke-color":"dodgerblue","stroke-weight":"5"},on:{pathChanged:function(e){t.items=e}}}):n("gmaps-polyline",{attrs:{editable:t.editable,icons:t.icons,path:t.items,"stroke-color":"dodgerblue","stroke-weight":"5"},on:{pathChanged:function(e){t.items=e}}})],1)]},proxy:!0},{key:"code",fn:function(){return[n("div",[n("pre",[t._v('<gmaps-map>\n  <gmaps-polyline\n    :editable="editable"\n    :icons="icons"\n    :path="items"\n    stroke-color="dodgerblue"\n    stroke-weight="5"\n    @pathChanged="items = $event"\n  />\n</gmaps-map>\n\n...\n\nicon = {\n  path: \'M -2,0 0,-2 2,0 0,2 z\',\n  strokeColor: \'#F00\',\n  fillColor: \'#F00\',\n  fillOpacity: 1\n}\n\nitems = [\n  { lat: -27.41, lng: 153.01 },\n  { lat: -27.42, lng: 153.02 },\n  ...,\n  { lat: -27.48, lng: 153.08 },\n  { lat: -27.49, lng: 153.09 },\n]\n\nicons: [\n  { icon, offset: \'0%\' },\n  { icon, offset: \'100%\' }\n]\n        ')])])]},proxy:!0}])},[n("div",{staticClass:"instructions"},[n("p",{staticClass:"instructions-title"},[t._v(" Polygons are basically the same as polylines but are able to be filled in. ")]),n("button",{staticClass:"instructions-action",on:{click:function(e){t.polygon=!t.polygon}}},[t._v(" Switch to "+t._s(t.polygon?"Polyline":"Polygon")+" ")]),n("button",{staticClass:"instructions-action",on:{click:t.generatePoints}},[t._v(" Regenerate points ")]),n("label",[n("input",{directives:[{name:"model",rawName:"v-model",value:t.editable,expression:"editable"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.editable)?t._i(t.editable,null)>-1:t.editable},on:{change:function(e){var n=t.editable,o=e.target,i=!!o.checked;if(Array.isArray(n)){var a=null,l=t._i(n,a);o.checked?l<0&&(t.editable=n.concat([a])):l>-1&&(t.editable=n.slice(0,l).concat(n.slice(l+1)))}else t.editable=i}}}),t._v(" Editable")])])])},i=[],a=n("e19f"),l=n("4d85"),s={path:"M -2,0 0,-2 2,0 0,2 z",strokeColor:"#F00",fillColor:"#F00",fillOpacity:1},r={name:"ExamplePolyline",components:{ExampleWrapper:a["a"],gmapsMap:l["f"],gmapsPolyline:l["i"],gmapsPolygon:l["h"]},data:function(){return{mapOptions:{center:{lat:-27.5,lng:153},zoom:11,fullscreenControl:!1,mapTypeControl:!1,rotateControl:!1,scaleControl:!1,streetViewControl:!1,zoomControl:!1},polygon:!1,editable:!1,items:[],icons:[{icon:s,offset:"0%"},{icon:s,offset:"100%"}]}},created:function(){this.generatePoints()},methods:{generatePoints:function(){for(var t=[],e=0;e<5;e++)t.push({lat:Math.random()/5-27.6,lng:152.9+Math.random()/5});this.items=t}}},c=r,p=n("2877"),d=Object(p["a"])(c,o,i,!1,null,null,null);e["default"]=d.exports},b069:function(t,e,n){"use strict";n("d060")},d060:function(t,e,n){},e19f:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"wrapper"},[t.title?n("h2",{staticClass:"title"},[t._v(t._s(t.title))]):t._e(),n("div",{staticClass:"description"},[t._t("description")],2),n("div",{staticClass:"sides"},[n("div",{staticClass:"side",staticStyle:{overflow:"hidden"}},[t._t("map")],2),n("div",{staticClass:"side"},[n("div",{staticClass:"code"},[n("h4",[t._v("Code:")]),t._t("code")],2)])]),t._t("default")],2)},i=[],a={name:"Wrapper",props:{title:{type:String,default:null}}},l=a,s=(n("b069"),n("2877")),r=Object(s["a"])(l,o,i,!1,null,"633b07d0",null);e["a"]=r.exports}}]);
//# sourceMappingURL=chunk-1d244257.bd658ebd.js.map