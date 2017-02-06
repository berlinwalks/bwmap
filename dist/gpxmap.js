define(["exports","leaflet","require"],function(t,e,i){"use strict";function r(t){this.buf=ArrayBuffer.isView&&ArrayBuffer.isView(t)?t:new Uint8Array(t||0),this.pos=0,this.type=0,this.length=this.buf.length}function n(t,e,i){var r,n,o=i.buf;if(n=o[i.pos++],r=(112&n)>>4,n<128)return s(t,r,e);if(n=o[i.pos++],r|=(127&n)<<3,n<128)return s(t,r,e);if(n=o[i.pos++],r|=(127&n)<<10,n<128)return s(t,r,e);if(n=o[i.pos++],r|=(127&n)<<17,n<128)return s(t,r,e);if(n=o[i.pos++],r|=(127&n)<<24,n<128)return s(t,r,e);if(n=o[i.pos++],r|=(1&n)<<31,n<128)return s(t,r,e);throw new Error("Expected varint not more than 10 bytes")}function o(t){return t.type===r.Bytes?t.readVarint()+t.pos:t.pos+1}function s(t,e,i){return i?4294967296*e+(t>>>0):4294967296*(e>>>0)+(t>>>0)}function a(t,e){var i,r;if(t>=0?(i=t%4294967296|0,r=t/4294967296|0):(i=~(-t%4294967296),r=~(-t/4294967296),4294967295^i?i=i+1|0:(i=0,r=r+1|0)),t>=0x10000000000000000||t<-0x10000000000000000)throw new Error("Given varint doesn't fit into 10 bytes");e.realloc(10),u(i,r,e),h(r,e)}function u(t,e,i){i.buf[i.pos++]=127&t|128,t>>>=7,i.buf[i.pos++]=127&t|128,t>>>=7,i.buf[i.pos++]=127&t|128,t>>>=7,i.buf[i.pos++]=127&t|128,t>>>=7,i.buf[i.pos]=127&t}function h(t,e){var i=(7&t)<<4;e.buf[e.pos++]|=i|((t>>>=3)?128:0),t&&(e.buf[e.pos++]=127&t|((t>>>=7)?128:0),t&&(e.buf[e.pos++]=127&t|((t>>>=7)?128:0),t&&(e.buf[e.pos++]=127&t|((t>>>=7)?128:0),t&&(e.buf[e.pos++]=127&t|((t>>>=7)?128:0),t&&(e.buf[e.pos++]=127&t)))))}function c(t,e,i){var r=e<=16383?1:e<=2097151?2:e<=268435455?3:Math.ceil(Math.log(e)/(7*Math.LN2));i.realloc(r);for(var n=i.pos-1;n>=t;n--)i.buf[n+r]=i.buf[n]}function l(t,e){for(var i=0;i<t.length;i++)e.writeVarint(t[i])}function p(t,e){for(var i=0;i<t.length;i++)e.writeSVarint(t[i])}function f(t,e){for(var i=0;i<t.length;i++)e.writeFloat(t[i])}function d(t,e){for(var i=0;i<t.length;i++)e.writeDouble(t[i])}function y(t,e){for(var i=0;i<t.length;i++)e.writeBoolean(t[i])}function v(t,e){for(var i=0;i<t.length;i++)e.writeFixed32(t[i])}function _(t,e){for(var i=0;i<t.length;i++)e.writeSFixed32(t[i])}function g(t,e){for(var i=0;i<t.length;i++)e.writeFixed64(t[i])}function w(t,e){for(var i=0;i<t.length;i++)e.writeSFixed64(t[i])}function m(t,e){return(t[e]|t[e+1]<<8|t[e+2]<<16)+16777216*t[e+3]}function x(t,e,i){t[i]=e,t[i+1]=e>>>8,t[i+2]=e>>>16,t[i+3]=e>>>24}function b(t,e){return(t[e]|t[e+1]<<8|t[e+2]<<16)+(t[e+3]<<24)}function F(t,e,i){for(var r="",n=e;n<i;){var o=t[n],s=null,a=o>239?4:o>223?3:o>191?2:1;if(n+a>i)break;var u,h,c;1===a?o<128&&(s=o):2===a?(u=t[n+1],128===(192&u)&&(s=(31&o)<<6|63&u,s<=127&&(s=null))):3===a?(u=t[n+1],h=t[n+2],128===(192&u)&&128===(192&h)&&(s=(15&o)<<12|(63&u)<<6|63&h,(s<=2047||s>=55296&&s<=57343)&&(s=null))):4===a&&(u=t[n+1],h=t[n+2],c=t[n+3],128===(192&u)&&128===(192&h)&&128===(192&c)&&(s=(15&o)<<18|(63&u)<<12|(63&h)<<6|63&c,(s<=65535||s>=1114112)&&(s=null))),null===s?(s=65533,a=1):s>65535&&(s-=65536,r+=String.fromCharCode(s>>>10&1023|55296),s=56320|1023&s),r+=String.fromCharCode(s),n+=a}return r}function S(t,e,i){for(var r,n,o=0;o<e.length;o++){if(r=e.charCodeAt(o),r>55295&&r<57344){if(!n){r>56319||o+1===e.length?(t[i++]=239,t[i++]=191,t[i++]=189):n=r;continue}if(r<56320){t[i++]=239,t[i++]=191,t[i++]=189,n=r;continue}r=n-55296<<10|r-56320|65536,n=null}else n&&(t[i++]=239,t[i++]=191,t[i++]=189,n=null);r<128?t[i++]=r:(r<2048?t[i++]=r>>6|192:(r<65536?t[i++]=r>>12|224:(t[i++]=r>>18|240,t[i++]=r>>12&63|128),t[i++]=r>>6&63|128),t[i++]=63&r|128)}return i}function V(t,e){this.x=t,this.y=e}function M(t,e,i,r,n){this.properties={},this.extent=i,this.type=0,this._pbf=t,this._geometry=-1,this._keys=r,this._values=n,t.readFields(k,this,e)}function k(t,e,i){1==t?e.id=i.readVarint():2==t?P(i,e):3==t?e.type=i.readVarint():4==t&&(e._geometry=i.pos)}function P(t,e){for(var i=t.readVarint()+t.pos;t.pos<i;){var r=e._keys[t.readVarint()],n=e._values[t.readVarint()];e.properties[r]=n}}function C(t){var e=t.length;if(e<=1)return[t];for(var i,r,n=[],o=0;o<e;o++){var s=T(t[o]);0!==s&&(void 0===r&&(r=s<0),r===s<0?(i&&n.push(i),i=[t[o]]):i.push(t[o]))}return i&&n.push(i),n}function T(t){for(var e,i,r=0,n=0,o=t.length,s=o-1;n<o;s=n++)e=t[n],i=t[s],r+=(i.x-e.x)*(e.y+i.y);return r}function B(t,e){this.version=1,this.name=null,this.extent=4096,this.length=0,this._pbf=t,this._keys=[],this._values=[],this._features=[],t.readFields(A,this,e),this.length=this._features.length}function A(t,e,i){15===t?e.version=i.readVarint():1===t?e.name=i.readString():5===t?e.extent=i.readVarint():2===t?e._features.push(i.pos):3===t?e._keys.push(i.readString()):4===t&&e._values.push(z(i))}function z(t){for(var e=null,i=t.readVarint()+t.pos;t.pos<i;){var r=t.readVarint()>>3;e=1===r?t.readString():2===r?t.readFloat():3===r?t.readDouble():4===r?t.readVarint64():5===r?t.readVarint():6===r?t.readSVarint():7===r?t.readBoolean():null}return e}function E(t,e){this.layers=t.readFields(G,{},e)}function G(t,e,i){if(3===t){var r=new at(i,i.readVarint()+i.pos);r.length&&(e[r.name]=r)}}function D(){var t=Array.prototype.slice.call(arguments);return Object.keys(t[0]).map(function(e){return t.map(function(t){return t[e]})})}function I(){function t(e,i){var r={};return r.walks=function(){return e},r.distance=function(){return i},r.toString=function(){return[e+" walks",+(i/1e3).toFixed(1)+"km"].join(" — ")},r.accumulate=function(r){return t(1+e,r+i)},r}return t(0,0)}function U(t,e){function i(i,s){s!=n[i]&&(n[i]=s,o=t.flatMap(function(t){return D(t.dates,t.distances)}).reduce(function(t,e){return n[e[0].substr(0,4)]?t.accumulate(e[1]):t},I()),e&&e.call(r))}var r={},n={},o=I();return r.addLayer=function(t,e){return t.on("add",i.bind(null,e,!0)).on("remove",i.bind(null,e,!1)),r},r.removeLayer=function(t){return t.off("add").off("remove"),r},r.render=function(){var t=document.createDocumentFragment();if(o.walks()){var e=document.createElement("div");e.textContent=""+o,t.appendChild(e)}return t},r}function N(t,e){for(var i=-1,r=t.length;1+i!==r;){var n=i+(r-i>>1);e(t[n])?r=n:i=n}return r}function O(t){return["hsl(",170+45*(t>>1),",",100,"%,",27*(1+t%2),"%)"].join("")}function j(t,e){var i=N(e.dates,function(e){return t<=e});if(e.dates[i]!==t)return void console.log("walkPopup",t,e);var r=document.createDocumentFragment(),n=document.createElement("h3");n.textContent=e.title,r.appendChild(n),n=document.createElement("div"),n.textContent=[[+t.substr(8,2),+t.substr(5,2),+t.substr(0,4)].join("/"),+(e.distances[i]/1e3).toFixed(1)+"km",e.walkers+" walkers",e.categories.join(" — "),""].join(" — ");var o=document.createElement("a");return o.setAttribute("href",e.link),o.textContent="blog",n.appendChild(o),r.appendChild(n),n=document.createElement("p"),n.textContent=e.people.sort().join(" • "),r.appendChild(n),r}function Z(t,r){function n(t,e){return function(i){var r=i.date.substr(0,4);return l[r]?[]:{className:ct.TRACK,color:O(r-2011),opacity:t?1:.8,weight:t?4:e?3.5:2}}}var o=r.tileLayers.map(function(t){return{name:t.name,tileLayer:e.tileLayer(t.url,t.options)}}),s=e.control.layers(null,null,{hideSingleBase:!0});o.forEach(function(t){s.addBaseLayer(t.tileLayer,t.name)});var a=e.DomUtil.get(t);e.DomUtil.addClass(a,ct.VBOX);var u,h=e.map(e.DomUtil.create("div",ct.VIEW,a)).addControl(e.control.scale()).addControl(s).addLayer(o[0].tileLayer),c=e.DomUtil.create("div",ct.DETAILS,a),l={},p=e.vectorGrid.protobuf(r.url,{pane:"overlayPane",maxNativeZoom:13,getFeatureId:function(t){return t.properties.date},vectorTileLayerStyles:{"":n(!1)}}).addTo(h),f=e.vectorGrid.protobuf(r.url,{pane:"overlayPane",maxNativeZoom:13,getFeatureId:function(t){return t.properties.date},vectorTileLayerStyles:{"":function(t){return l[t.date.substr(0,4)]?[]:{opacity:0,weight:20}}},interactive:!0}).on("mouseover",function(t){p.setFeatureStyle(t.layer.properties.date,n(!0))}).on("mouseout",function(t){var e=t.layer.properties.date;e===u?p.setFeatureStyle(e,n(!1,!0)):p.resetFeatureStyle(e)}).addTo(h);return i(["dA/json!"+r.index],function(t){function i(){var t=e.DomUtil.create("h3");t.textContent=r.title,e.DomUtil.empty(c),c.appendChild(t),c.appendChild(this.render())}var o={};t.flatMap(function(t){return t.dates}).forEach(function(t){return o[t.substr(0,4)]=!0}),f.on("click",function(i){var r=i.layer.properties.date;if(e.DomEvent.stopPropagation(i),r!==u){u&&p.resetFeatureStyle(u);var o=N(t,function(t){return r<t.dates[0]})-1,s=j(r,t[o]);s&&(e.DomUtil.empty(c),c.appendChild(j(r,t[o])),u=r,p.setFeatureStyle(u,n(!0,!0)))}});var a=U(t,i);h.on("click",function(){u&&(p.resetFeatureStyle(u),u=void 0,i.call(a))}),Object.keys(o).forEach(function(t){var i=e.layerGroup().on("add",function(){l[t]&&(u=void 0,l[t]=!1,p.redraw(),f.redraw())}).on("remove",function(){l[t]||(u=void 0,l[t]=!0,p.redraw(),f.redraw())});h.addLayer(i),s.addOverlay(i,t),a.addLayer(i,t)});var d=e.latLngBounds(t.flatMap(function(t){return t.bboxes}).flatMap(function(t){var i=t.length>>1;return e.GeoJSON.coordsToLatLngs([[t[0],t[1]],[t[i],t[1+i]]])}));h.setMaxBounds(d.pad(.05)).fitBounds(d)}),h}e="default"in e?e.default:e,i="default"in i?i.default:i,L.SVG.Tile=L.SVG.extend({initialize:function(t,e,i){L.SVG.prototype.initialize.call(this,i),this._tileCoord=t,this._size=e,this._initContainer(),this._container.setAttribute("width",this._size.x),this._container.setAttribute("height",this._size.y),this._container.setAttribute("viewBox",[0,0,this._size.x,this._size.y].join(" ")),i.interactive&&(this._container.style.pointerEvents="auto"),this._layers={}},getCoord:function(){return this._tileCoord},getContainer:function(){return this._container},onAdd:L.Util.falseFn,addTo:function(t){var e=this;if(this._map=t,this.options.interactive)for(var i in e._layers){var r=e._layers[i];e._map._targets[L.stamp(r._path)]=r}},_initContainer:function(){L.SVG.prototype._initContainer.call(this);L.SVG.create("rect")},_addPath:function(t){this._rootGroup.appendChild(t._path),this._layers[L.stamp(t)]=t},_updateIcon:function(t){var e=t._path=L.SVG.create("image"),i=t.options.icon,r=i.options,n=L.point(r.iconSize),o=r.iconAnchor||n&&n.divideBy(2,!0),s=t._point.subtract(o);e.setAttribute("x",s.x),e.setAttribute("y",s.y),e.setAttribute("width",n.x+"px"),e.setAttribute("height",n.y+"px"),e.setAttribute("href",r.iconUrl)}}),L.svg.tile=function(t,e,i){return new L.SVG.Tile(t,e,i)},L.VectorGrid=L.GridLayer.extend({options:{rendererFactory:L.svg.tile,vectorTileLayerStyles:{},interactive:!1},initialize:function(t){L.setOptions(this,t),L.GridLayer.prototype.initialize.apply(this,arguments),this.options.getFeatureId&&(this._vectorTiles={},this._overriddenStyles={},this.on("tileunload",function(t){delete this._vectorTiles[this._tileCoordsToKey(t.coords)]},this))},createTile:function(t,e){var i=this.options.getFeatureId,r=this.getTileSize(),n=this.options.rendererFactory(t,r,this.options),o=this._getVectorTilePromise(t);return i&&(this._vectorTiles[this._tileCoordsToKey(t)]=n,n._features={}),o.then(function(r){var o=this;for(var s in r.layers){var a=r.layers[s],u=o.getTileSize().x/a.extent,h=o.options.vectorTileLayerStyles[s]||L.Path.prototype.options;for(var c in a.features){var l,p=a.features[c],f=h;if(i){l=o.options.getFeatureId(p);var d=o._overriddenStyles[l];d&&(f=d[s]?d[s]:d)}if(f instanceof Function&&(f=f(p.properties,t.z)),f instanceof Array||(f=[f]),f.length){var y=o._createLayer(p,u);for(var v in f){var _=L.extend({},L.Path.prototype.options,f[v]);y.render(n,_),n._addPath(y)}o.options.interactive&&y.makeInteractive(),i&&(n._features[l]={layerName:s,feature:y})}}}null!=this._map&&n.addTo(this._map),L.Util.requestAnimFrame(e.bind(t,null,null))}.bind(this)),n.getContainer()},setFeatureStyle:function(t,e){var i=this;this._overriddenStyles[t]={};for(var r in i._vectorTiles){var n=i._vectorTiles[r],o=n._features,s=o[t];if(s){i._overriddenStyles[t]=e;var a=s.feature,u=e;e[s.layerName]&&(u=e[s.layerName]),u=u instanceof Function?u(a.properties,n.getCoord().z):u,i._updateStyles(a,n,u)}else i._overriddenStyles[t]=e}},resetFeatureStyle:function(t){var e=this;delete this._overriddenStyles[t];for(var i in e._vectorTiles){var r=e._vectorTiles[i],n=r._features,o=n[t];if(o){var s=o.feature,a=e.options.vectorTileLayerStyles[o.layerName]||L.Path.prototype.options,u=a instanceof Function?a(s.properties,r.getCoord().z):a;e._updateStyles(s,r,u)}}},_updateStyles:function(t,e,i){i instanceof Array||(i=[i]);for(var r in i){var n=L.extend({},L.Path.prototype.options,i[r]);t.updateStyle(e,n)}},_createLayer:function(t,e,i){var r;switch(t.type){case 1:r=new R(t,e);break;case 2:r=new K(t,e);break;case 3:r=new X(t,e)}return this.options.interactive&&r.addEventParent(this),r}}),L.vectorGrid=function(t){return new L.VectorGrid(t)};var q=L.Class.extend({render:function(t,e){this._renderer=t,this.options=e,t._initPath(this),t._updateStyle(this)},updateStyle:function(t,e){this.options=e,t._updateStyle(this)},_getPixelBounds:function(){for(var t=this._parts,e=L.bounds([]),i=0;i<t.length;i++)for(var r=t[i],n=0;n<r.length;n++)e.extend(r[n]);var o=this._clickTolerance(),s=new L.Point(o,o);return e.min._subtract(s),e.max._add(s),e},_clickTolerance:L.Path.prototype._clickTolerance}),R=L.CircleMarker.extend({includes:q.prototype,statics:{iconCache:{}},initialize:function(t,e){this.properties=t.properties,this._makeFeatureParts(t,e)},render:function(t,e){q.prototype.render.call(this,t,e),this._radius=e.radius||L.CircleMarker.prototype.options.radius,this._updatePath()},_makeFeatureParts:function(t,e){var i=t.geometry[0];"object"==typeof i[0]&&"x"in i[0]?(this._point=L.point(i[0].x*e,i[0].y*e),this._empty=L.Util.falseFn):(this._point=L.point(i[0]*e,i[1]*e),this._empty=L.Util.falseFn)},makeInteractive:function(){this._updateBounds()},updateStyle:function(t,e){return this._radius=e.radius||this._radius,this._updateBounds(),q.prototype.updateStyle.call(this,t,e)},_updateBounds:function(){var t=this.options.icon;if(t){var e=L.point(t.options.iconSize),i=t.options.iconAnchor||e&&e.divideBy(2,!0),r=this._point.subtract(i);this._pxBounds=new L.Bounds(r,r.add(t.options.iconSize))}else L.CircleMarker.prototype._updateBounds.call(this)},_updatePath:function(){this.options.icon?this._renderer._updateIcon(this):L.CircleMarker.prototype._updatePath.call(this)},_getImage:function(){if(this.options.icon){var t=this.options.icon.options.iconUrl,e=R.iconCache[t];if(!e){var i=this.options.icon;e=R.iconCache[t]=i.createIcon()}return e}return null},_containsPoint:function(t){var e=this.options.icon;return e?this._pxBounds.contains(t):L.CircleMarker.prototype._containsPoint.call(this,t)}}),W={_makeFeatureParts:function(t,e){var i,r=this,n=t.geometry;this._parts=[];for(var o in n){var s=n[o],a=[];for(var u in s)i=s[u],"x"in i?a.push(L.point(i.x*e,i.y*e)):a.push(L.point(i[0]*e,i[1]*e));r._parts.push(a)}},makeInteractive:function(){this._pxBounds=this._getPixelBounds()}},K=L.Polyline.extend({includes:[q.prototype,W],initialize:function(t,e){this.properties=t.properties,this._makeFeatureParts(t,e)},render:function(t,e){e.fill=!1,q.prototype.render.call(this,t,e),this._updatePath()},updateStyle:function(t,e){e.fill=!1,q.prototype.updateStyle.call(this,t,e)}}),X=L.Polygon.extend({includes:[q.prototype,W],initialize:function(t,e){this.properties=t.properties,this._makeFeatureParts(t,e)},render:function(t,e){q.prototype.render.call(this,t,e),this._updatePath()}}),H=function(t,e,i,r,n){var o,s,a=8*n-r-1,u=(1<<a)-1,h=u>>1,c=-7,l=i?n-1:0,p=i?-1:1,f=t[e+l];for(l+=p,o=f&(1<<-c)-1,f>>=-c,c+=a;c>0;o=256*o+t[e+l],l+=p,c-=8);for(s=o&(1<<-c)-1,o>>=-c,c+=r;c>0;s=256*s+t[e+l],l+=p,c-=8);if(0===o)o=1-h;else{if(o===u)return s?NaN:(f?-1:1)*(1/0);s+=Math.pow(2,r),o-=h}return(f?-1:1)*s*Math.pow(2,o-r)},J=function(t,e,i,r,n,o){var s,a,u,h=8*o-n-1,c=(1<<h)-1,l=c>>1,p=23===n?Math.pow(2,-24)-Math.pow(2,-77):0,f=r?0:o-1,d=r?1:-1,y=e<0||0===e&&1/e<0?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(a=isNaN(e)?1:0,s=c):(s=Math.floor(Math.log(e)/Math.LN2),e*(u=Math.pow(2,-s))<1&&(s--,u*=2),e+=s+l>=1?p/u:p*Math.pow(2,1-l),e*u>=2&&(s++,u/=2),s+l>=c?(a=0,s=c):s+l>=1?(a=(e*u-1)*Math.pow(2,n),s+=l):(a=e*Math.pow(2,l-1)*Math.pow(2,n),s=0));n>=8;t[i+f]=255&a,f+=d,a/=256,n-=8);for(s=s<<n|a,h+=n;h>0;t[i+f]=255&s,f+=d,s/=256,h-=8);t[i+f-d]|=128*y},Q={read:H,write:J},Y=r,$=Q;r.Varint=0,r.Fixed64=1,r.Bytes=2,r.Fixed32=5;var tt=4294967296,et=1/tt;r.prototype={destroy:function(){this.buf=null},readFields:function(t,e,i){var r=this;for(i=i||this.length;this.pos<i;){var n=r.readVarint(),o=n>>3,s=r.pos;r.type=7&n,t(o,e,r),r.pos===s&&r.skip(n)}return e},readMessage:function(t,e){return this.readFields(t,e,this.readVarint()+this.pos)},readFixed32:function(){var t=m(this.buf,this.pos);return this.pos+=4,t},readSFixed32:function(){var t=b(this.buf,this.pos);return this.pos+=4,t},readFixed64:function(){var t=m(this.buf,this.pos)+m(this.buf,this.pos+4)*tt;return this.pos+=8,t},readSFixed64:function(){var t=m(this.buf,this.pos)+b(this.buf,this.pos+4)*tt;return this.pos+=8,t},readFloat:function(){var t=$.read(this.buf,this.pos,!0,23,4);return this.pos+=4,t},readDouble:function(){var t=$.read(this.buf,this.pos,!0,52,8);return this.pos+=8,t},readVarint:function(t){var e,i,r=this.buf;return i=r[this.pos++],e=127&i,i<128?e:(i=r[this.pos++],e|=(127&i)<<7,i<128?e:(i=r[this.pos++],e|=(127&i)<<14,i<128?e:(i=r[this.pos++],e|=(127&i)<<21,i<128?e:(i=r[this.pos],e|=(15&i)<<28,n(e,t,this)))))},readVarint64:function(){return this.readVarint(!0)},readSVarint:function(){var t=this.readVarint();return t%2===1?(t+1)/-2:t/2},readBoolean:function(){return Boolean(this.readVarint())},readString:function(){var t=this.readVarint()+this.pos,e=F(this.buf,this.pos,t);return this.pos=t,e},readBytes:function(){var t=this.readVarint()+this.pos,e=this.buf.subarray(this.pos,t);return this.pos=t,e},readPackedVarint:function(t,e){var i=this,r=o(this);for(t=t||[];this.pos<r;)t.push(i.readVarint(e));return t},readPackedSVarint:function(t){var e=this,i=o(this);for(t=t||[];this.pos<i;)t.push(e.readSVarint());return t},readPackedBoolean:function(t){var e=this,i=o(this);for(t=t||[];this.pos<i;)t.push(e.readBoolean());return t},readPackedFloat:function(t){var e=this,i=o(this);for(t=t||[];this.pos<i;)t.push(e.readFloat());return t},readPackedDouble:function(t){var e=this,i=o(this);for(t=t||[];this.pos<i;)t.push(e.readDouble());return t},readPackedFixed32:function(t){var e=this,i=o(this);for(t=t||[];this.pos<i;)t.push(e.readFixed32());return t},readPackedSFixed32:function(t){var e=this,i=o(this);for(t=t||[];this.pos<i;)t.push(e.readSFixed32());return t},readPackedFixed64:function(t){var e=this,i=o(this);for(t=t||[];this.pos<i;)t.push(e.readFixed64());return t},readPackedSFixed64:function(t){var e=this,i=o(this);for(t=t||[];this.pos<i;)t.push(e.readSFixed64());return t},skip:function(t){var e=7&t;if(e===r.Varint)for(;this.buf[this.pos++]>127;);else if(e===r.Bytes)this.pos=this.readVarint()+this.pos;else if(e===r.Fixed32)this.pos+=4;else{if(e!==r.Fixed64)throw new Error("Unimplemented type: "+e);this.pos+=8}},writeTag:function(t,e){this.writeVarint(t<<3|e)},realloc:function(t){for(var e=this.length||16;e<this.pos+t;)e*=2;if(e!==this.length){var i=new Uint8Array(e);i.set(this.buf),this.buf=i,this.length=e}},finish:function(){return this.length=this.pos,this.pos=0,this.buf.subarray(0,this.length)},writeFixed32:function(t){this.realloc(4),x(this.buf,t,this.pos),this.pos+=4},writeSFixed32:function(t){this.realloc(4),x(this.buf,t,this.pos),this.pos+=4},writeFixed64:function(t){this.realloc(8),x(this.buf,t&-1,this.pos),x(this.buf,Math.floor(t*et),this.pos+4),this.pos+=8},writeSFixed64:function(t){this.realloc(8),x(this.buf,t&-1,this.pos),x(this.buf,Math.floor(t*et),this.pos+4),this.pos+=8},writeVarint:function(t){return t=+t||0,t>268435455||t<0?void a(t,this):(this.realloc(4),this.buf[this.pos++]=127&t|(t>127?128:0),void(t<=127||(this.buf[this.pos++]=127&(t>>>=7)|(t>127?128:0),t<=127||(this.buf[this.pos++]=127&(t>>>=7)|(t>127?128:0),t<=127||(this.buf[this.pos++]=t>>>7&127)))))},writeSVarint:function(t){this.writeVarint(t<0?2*-t-1:2*t)},writeBoolean:function(t){this.writeVarint(Boolean(t))},writeString:function(t){t=String(t),this.realloc(4*t.length),this.pos++;var e=this.pos;this.pos=S(this.buf,t,this.pos);var i=this.pos-e;i>=128&&c(e,i,this),this.pos=e-1,this.writeVarint(i),this.pos+=i},writeFloat:function(t){this.realloc(4),$.write(this.buf,t,this.pos,!0,23,4),this.pos+=4},writeDouble:function(t){this.realloc(8),$.write(this.buf,t,this.pos,!0,52,8),this.pos+=8},writeBytes:function(t){var e=this,i=t.length;this.writeVarint(i),this.realloc(i);for(var r=0;r<i;r++)e.buf[e.pos++]=t[r]},writeRawMessage:function(t,e){this.pos++;var i=this.pos;t(e,this);var r=this.pos-i;r>=128&&c(i,r,this),this.pos=i-1,this.writeVarint(r),this.pos+=r},writeMessage:function(t,e,i){this.writeTag(t,r.Bytes),this.writeRawMessage(e,i)},writePackedVarint:function(t,e){this.writeMessage(t,l,e)},writePackedSVarint:function(t,e){this.writeMessage(t,p,e)},writePackedBoolean:function(t,e){this.writeMessage(t,y,e)},writePackedFloat:function(t,e){this.writeMessage(t,f,e)},writePackedDouble:function(t,e){this.writeMessage(t,d,e)},writePackedFixed32:function(t,e){this.writeMessage(t,v,e)},writePackedSFixed32:function(t,e){this.writeMessage(t,_,e)},writePackedFixed64:function(t,e){this.writeMessage(t,g,e)},writePackedSFixed64:function(t,e){this.writeMessage(t,w,e)},writeBytesField:function(t,e){this.writeTag(t,r.Bytes),this.writeBytes(e)},writeFixed32Field:function(t,e){this.writeTag(t,r.Fixed32),this.writeFixed32(e)},writeSFixed32Field:function(t,e){this.writeTag(t,r.Fixed32),this.writeSFixed32(e)},writeFixed64Field:function(t,e){this.writeTag(t,r.Fixed64),this.writeFixed64(e)},writeSFixed64Field:function(t,e){this.writeTag(t,r.Fixed64),this.writeSFixed64(e)},writeVarintField:function(t,e){this.writeTag(t,r.Varint),this.writeVarint(e)},writeSVarintField:function(t,e){this.writeTag(t,r.Varint),this.writeSVarint(e)},writeStringField:function(t,e){this.writeTag(t,r.Bytes),this.writeString(e)},writeFloatField:function(t,e){this.writeTag(t,r.Fixed32),this.writeFloat(e)},writeDoubleField:function(t,e){this.writeTag(t,r.Fixed64),this.writeDouble(e)},writeBooleanField:function(t,e){this.writeVarintField(t,Boolean(e))}};var it=V;V.prototype={clone:function(){return new V(this.x,this.y)},add:function(t){return this.clone()._add(t)},sub:function(t){return this.clone()._sub(t)},mult:function(t){return this.clone()._mult(t)},div:function(t){return this.clone()._div(t)},rotate:function(t){return this.clone()._rotate(t)},matMult:function(t){return this.clone()._matMult(t)},unit:function(){return this.clone()._unit()},perp:function(){return this.clone()._perp()},round:function(){return this.clone()._round()},mag:function(){return Math.sqrt(this.x*this.x+this.y*this.y)},equals:function(t){return this.x===t.x&&this.y===t.y},dist:function(t){return Math.sqrt(this.distSqr(t))},distSqr:function(t){var e=t.x-this.x,i=t.y-this.y;return e*e+i*i},angle:function(){return Math.atan2(this.y,this.x)},angleTo:function(t){return Math.atan2(this.y-t.y,this.x-t.x)},angleWith:function(t){return this.angleWithSep(t.x,t.y)},angleWithSep:function(t,e){return Math.atan2(this.x*e-this.y*t,this.x*t+this.y*e)},_matMult:function(t){var e=t[0]*this.x+t[1]*this.y,i=t[2]*this.x+t[3]*this.y;return this.x=e,this.y=i,this},_add:function(t){return this.x+=t.x,this.y+=t.y,this},_sub:function(t){return this.x-=t.x,this.y-=t.y,this},_mult:function(t){return this.x*=t,this.y*=t,this},_div:function(t){return this.x/=t,this.y/=t,this},_unit:function(){return this._div(this.mag()),this},_perp:function(){var t=this.y;return this.y=this.x,this.x=-t,this},_rotate:function(t){var e=Math.cos(t),i=Math.sin(t),r=e*this.x-i*this.y,n=i*this.x+e*this.y;return this.x=r,this.y=n,this},_round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}},V.convert=function(t){return t instanceof V?t:Array.isArray(t)?new V(t[0],t[1]):t};var rt=it,nt=M;M.types=["Unknown","Point","LineString","Polygon"],M.prototype.loadGeometry=function(){var t=this._pbf;t.pos=this._geometry;for(var e,i=t.readVarint()+t.pos,r=1,n=0,o=0,s=0,a=[];t.pos<i;){if(!n){var u=t.readVarint();r=7&u,n=u>>3}if(n--,1===r||2===r)o+=t.readSVarint(),s+=t.readSVarint(),1===r&&(e&&a.push(e),e=[]),e.push(new rt(o,s));else{if(7!==r)throw new Error("unknown command "+r);e&&e.push(e[0].clone())}}return e&&a.push(e),a},M.prototype.bbox=function(){var t=this._pbf;t.pos=this._geometry;for(var e=t.readVarint()+t.pos,i=1,r=0,n=0,o=0,s=1/0,a=-(1/0),u=1/0,h=-(1/0);t.pos<e;){if(!r){var c=t.readVarint();i=7&c,r=c>>3}if(r--,1===i||2===i)n+=t.readSVarint(),o+=t.readSVarint(),n<s&&(s=n),n>a&&(a=n),o<u&&(u=o),o>h&&(h=o);else if(7!==i)throw new Error("unknown command "+i)}return[s,u,a,h]},M.prototype.toGeoJSON=function(t,e,i){function r(t){for(var e=0;e<t.length;e++){var i=t[e],r=180-360*(i.y+u)/s;t[e]=[360*(i.x+a)/s-180,360/Math.PI*Math.atan(Math.exp(r*Math.PI/180))-90]}}var n,o,s=this.extent*Math.pow(2,i),a=this.extent*t,u=this.extent*e,h=this.loadGeometry(),c=M.types[this.type];switch(this.type){case 1:var l=[];for(n=0;n<h.length;n++)l[n]=h[n][0];h=l,r(h);break;case 2:for(n=0;n<h.length;n++)r(h[n]);break;case 3:for(h=C(h),n=0;n<h.length;n++)for(o=0;o<h[n].length;o++)r(h[n][o])}1===h.length?h=h[0]:c="Multi"+c;var p={type:"Feature",geometry:{type:c,coordinates:h},properties:this.properties};return"id"in this&&(p.id=this.id),p};var ot=nt,st=B;B.prototype.feature=function(t){if(t<0||t>=this._features.length)throw new Error("feature index out of bounds");this._pbf.pos=this._features[t];var e=this._pbf.readVarint()+this._pbf.pos;return new ot(this._pbf,e,this.extent,this._keys,this._values)};var at=st,ut=E,ht=ut;L.VectorGrid.Protobuf=L.VectorGrid.extend({options:{minZoom:0,maxZoom:18,maxNativeZoom:null,minNativeZoom:null,subdomains:"abc",zoomOffset:0,zoomReverse:!1},initialize:function(t,e){this._url=t,L.VectorGrid.prototype.initialize.call(this,e)},_getSubdomain:L.TileLayer.prototype._getSubdomain,getTileSize:L.TileLayer.prototype.getTileSize,_getZoomForUrl:L.TileLayer.prototype._getZoomForUrl,_getVectorTilePromise:function(t){var e={s:this._getSubdomain(t),x:t.x,y:t.y,z:this._getZoomForUrl()};if(this._map&&!this._map.options.crs.infinite){var i=this._globalTileRange.max.y-t.y;this.options.tms&&(e.y=i),e["-y"]=i}var r=L.Util.template(this._url,L.extend(e,this.options));return fetch(r).then(function(t){return t.ok?t.blob().then(function(t){var e=new FileReader;return new Promise(function(i){e.addEventListener("loadend",function(){var t=new Y(e.result);return i(new ht(t))}),e.readAsArrayBuffer(t)})}):{layers:[]}}).then(function(t){for(var e in t.layers){for(var i=[],r=0;r<t.layers[e].length;r++){var n=t.layers[e].feature(r);n.geometry=n.loadGeometry(),i.push(n)}t.layers[e].features=i}return t})}}),L.vectorGrid.protobuf=function(t,e){return new L.VectorGrid.Protobuf(t,e)},L.Canvas.Tile=L.Canvas.extend({initialize:function(t,e,i){L.Canvas.prototype.initialize.call(this,i),this._tileCoord=t,this._size=e,this._initContainer(),this._container.setAttribute("width",this._size.x),this._container.setAttribute("height",this._size.y),this._layers={},this._drawnLayers={},this._drawing=!0,i.interactive&&(this._container.style.pointerEvents="auto")},getCoord:function(){return this._tileCoord},getContainer:function(){return this._container},getOffset:function(){return this._tileCoord.scaleBy(this._size).subtract(this._map.getPixelOrigin())},onAdd:L.Util.falseFn,addTo:function(t){this._map=t},_onClick:function(t){var e,i=this,r=this._map.mouseEventToLayerPoint(t).subtract(this.getOffset()),n=[];for(var o in i._layers)e=i._layers[o],e.options.interactive&&e._containsPoint(r)&&!i._map._draggableMoved(e)&&(L.DomEvent._fakeStop(t),n.push(e));n.length&&this._fireEvent(n,t)},_onMouseMove:function(t){if(this._map&&!this._map.dragging.moving()&&!this._map._animatingZoom){var e=this._map.mouseEventToLayerPoint(t).subtract(this.getOffset());this._handleMouseOut(t,e),this._handleMouseHover(t,e)}},_updateIcon:function(t){if(this._drawing){var e=t.options.icon,i=e.options,r=L.point(i.iconSize),n=i.iconAnchor||r&&r.divideBy(2,!0),o=t._point.subtract(n),s=this._ctx,a=t._getImage();a.complete?s.drawImage(a,o.x,o.y,r.x,r.y):L.DomEvent.on(a,"load",function(){s.drawImage(a,o.x,o.y,r.x,r.y)}),this._drawnLayers[t._leaflet_id]=t}}}),L.canvas.tile=function(t,e,i){return new L.Canvas.Tile(t,e,i)},"function"!=typeof Array.prototype.flatMap&&Object.defineProperty(Array.prototype,"flatMap",{value:function(){return Array.prototype.concat.apply([],Array.prototype.map.apply(this,arguments))}});var ct={DETAILS:"gpxmap-details",HBOX:"gpxmap-hbox",SELECT:"gpxmap-select",TRACK:"gpxmap-track",VBOX:"gpxmap-vbox",VIEW:"gpxmap-view"};t.CSS=ct,t.gpxmap=Z,Object.defineProperty(t,"__esModule",{value:!0})});
//# sourceMappingURL=gpxmap.js.map
