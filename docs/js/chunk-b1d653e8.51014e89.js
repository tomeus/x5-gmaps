(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b1d653e8"],{"4e76":function(t,e,n){},b83a:function(t,e,n){"use strict";n("4e76")},e19f:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"wrapper"},[t.title?n("h2",{staticClass:"title"},[t._v(" "+t._s(t.title)+" ")]):t._e(),n("div",{staticClass:"description"},[t._t("description")],2),n("div",{staticClass:"sides"},[n("div",{staticClass:"side",staticStyle:{overflow:"hidden"}},[t._t("map")],2),n("div",{staticClass:"side"},[n("div",{staticClass:"code"},[n("h4",[t._v("Code:")]),t._t("code")],2)])]),t._t("default")],2)},s=[],a={name:"Wrapper",props:{title:{type:String,default:null}}},r=a,i=(n("b83a"),n("2877")),l=Object(i["a"])(r,o,s,!1,null,"62ebedd4",null);e["a"]=l.exports},fba4:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("example-wrapper",{attrs:{title:"Map with options and events"},scopedSlots:t._u([{key:"description",fn:function(){return[n("p",[t._v(" You can add many "),n("a",{attrs:{href:"https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions",target:"_blank"}},[t._v(" options ")]),t._v(" for the map in an options property object."),n("br"),t._v("e.g. All controls turned off ")])]},proxy:!0},{key:"map",fn:function(){return[n("gmaps-map",{ref:"map",attrs:{options:t.mapOptions},on:{centerChanged:t.centerChanged}})]},proxy:!0},{key:"code",fn:function(){return[n("div",[n("pre",[t._v('<gmaps-map\n  :options="mapOptions"\n  @centerChanged="centerChanged"\n/>\n\n...\n\nmapOptions = {\n    center: { lat: -27.47, lng: 153.025 },\n    zoom: 14,\n    fullscreenControl: false,\n    mapTypeControl: false,\n    rotateControl: false,\n    scaleControl: false,\n    streetViewControl: false,\n    zoomControl: false\n}\n\n...\n\ncenterChanged(center) {\n  this.center = center.toJSON()\n}\n        ')])])]},proxy:!0}])},[n("div",{staticClass:"instructions"},[n("p",{staticClass:"instructions-title"},[t._v(" Move the map to see a live update of its center. ")]),n("button",{staticClass:"instructions-action",on:{click:t.reset}},[t._v("Reset")]),n("span",[t._v("Center: "+t._s(t.center))])])])},s=[],a=n("5530"),r=(n("bf19"),n("e19f")),i=n("4d85"),l={name:"ExampleMapOptions",components:{ExampleWrapper:r["a"],gmapsMap:i["h"]},data:function(){return{center:{lat:-27.47,lng:153.025},mapOptions:{center:{lat:-27.47,lng:153.025},zoom:12,fullscreenControl:!1,mapTypeControl:!1,rotateControl:!1,scaleControl:!1,streetViewControl:!1,zoomControl:!1}}},methods:{centerChanged:function(t){this.center=t.toJSON()},reset:function(){this.mapOptions=Object(a["a"])({},this.mapOptions)}}},p=l,c=n("2877"),d=Object(c["a"])(p,o,s,!1,null,null,null);e["default"]=d.exports}}]);
//# sourceMappingURL=chunk-b1d653e8.51014e89.js.map