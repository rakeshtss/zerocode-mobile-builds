(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"/Kpx":function(t,e){t.exports=""},"1zN0":function(t,e){t.exports="agm-map{height:300px !important;width:100%}\n"},"D1i/":function(t,e){t.exports="agm-map{height:300px !important;width:100%}\n"},"Fjr/":function(t,e){t.exports='<div class="form-group" [style.display]="to.search ? \'block\' : \'none\'">\r\n  <input\r\n    placeholder="search for location"\r\n    autocorrect="off"\r\n    autocapitalize="off"\r\n    spellcheck="off"\r\n    type="text"\r\n    class="form-control"\r\n    [name]="searchId"\r\n    #mapsearch\r\n  />\r\n</div>\r\n<ng-container *ngIf="showMap">\r\n  <agm-map\r\n    #agmMap\r\n    (mapReady)="mapReady($event)"\r\n    [ngStyle]="to.cssStyle"\r\n    [fullscreenControl]="true"\r\n    [latitude]="to.lat"\r\n    [longitude]="to.lng"\r\n    [zoom]="to.zoom"\r\n    [fitBounds]="to.multiple && to.options && to.options.length > 0"\r\n    (mapClick)="to.mapClickable && mapClicked($event)"\r\n  >\r\n    <ng-container *ngIf="to.multiple && to.options && to.options.length > 0">\r\n      <agm-marker\r\n        [agmFitBounds]="true"\r\n        (markerClick)="clickEvent(marker)"\r\n        *ngFor="let marker of to.options"\r\n        [latitude]="marker.lat"\r\n        [longitude]="marker.log"\r\n        [animation]="marker.animation"\r\n        [markerClickable]="true"\r\n      >\r\n        <agm-info-window #infoWindow *ngIf="to.infoTemplate">\r\n          <ng-template\r\n            *ngIf="to.infoTemplate"\r\n            dynamic-template\r\n            [extraModules]="[myExtraModules]"\r\n            [template]="to.infoTemplate"\r\n            [context]="{\r\n              item: marker,\r\n              zc: _zc,\r\n              field: field\r\n            }"\r\n          >\r\n          </ng-template>\r\n        </agm-info-window>\r\n      </agm-marker>\r\n    </ng-container>\r\n    <ng-container\r\n      *ngIf="\r\n        !to.multiple && control.value && control.value.lat && control.value.log\r\n      "\r\n    >\r\n      <agm-marker\r\n        [markerDraggable]="to.markerDragable"\r\n        (markerClick)="clickEvent(control.value)"\r\n        (dragEnd)="markerDragEnd($event)"\r\n        [latitude]="control.value.lat"\r\n        [longitude]="control.value.log"\r\n      ></agm-marker>\r\n    </ng-container>\r\n  </agm-map>\r\n</ng-container>\r\n'},JLVQ:function(t,e,o){"use strict";o.d(e,"a",function(){return l});var n=o("D57K"),r=o("LoAr"),i=o("05nE"),a=o("vtXP"),l=function(){function t(t,e){this._http=t,this.as=e}return t.prototype.getMapData=function(t,e){var o=this,n=this.as.getParams(t.api.params||[],e);return"post"===t.api.method?this._http.post(t.api.url,n).pipe(Object(a.a)(function(e){return o.getMapping(e.data.listData.rows,t)})):this._http.get(t.api.url,{params:n}).pipe(Object(a.a)(function(t){return t.data}))},t.prototype.getMapping=function(t,e){var o=t;return e.api.filterScript&&(o=o.filter(function(t,o){return i.o.evalFun(e.api.filterScript,{item:t,index:o},!0)})),e.api.mapScript&&o.map(function(t,o){return i.o.evalFun(e.api.mapScript,{item:t,index:o})}),e.api.map&&o.map(function(t){return e.api.map.forEach(function(e){var o="data."+e.name+" = data."+e.value;i.o.evalFun(o,{data:t})}),t}),o},t=n.c([Object(r.Injectable)(),n.f("design:paramtypes",[i.c,i.a])],t)}()},JwAm:function(t,e,o){"use strict";o.d(e,"a",function(){return c});var n=o("D57K"),r=o("LoAr"),i=o("r1BU"),a=o("YUmB"),l=o("JLVQ"),s=o("05nE"),c=function(t){function e(e,o,n,r){var i=t.call(this)||this;return i.mapsAPILoader=e,i.ngZone=o,i.gs=n,i.unsavedDataAlertService=r,i.lat=17.432,i.log=78.44692,i}return n.d(e,t),e.prototype.ngAfterViewInit=function(){console.log("this.googleMapLoaded =-----------ngAfterViewInit",this.googleMapLoaded)},e.prototype.ngOnInit=function(){var t=this;this.to.cssStyle||(this.to.cssStyle={height:"300px"}),this.formControl.valueChanges.subscribe(function(e){"view"!==t.to.mode&&t.formState.options.properties&&t.formState.options.properties.unsavedDataAlert&&t.unsavedDataAlertService.activedAlert()}),this.googleMapLoaded=!0,console.log("this.googleMapLoaded",this.googleMapLoaded),setTimeout(function(){},500)},n.c([Object(r.Input)(),n.f("design:type",Object)],e.prototype,"formControl",void 0),n.c([Object(r.Input)(),n.f("design:type",Object)],e.prototype,"to",void 0),n.c([Object(r.Input)(),n.f("design:type",Object)],e.prototype,"field",void 0),n.c([Object(r.Input)(),n.f("design:type",Object)],e.prototype,"form",void 0),n.c([Object(r.Input)(),n.f("design:type",Object)],e.prototype,"model",void 0),e=n.c([Object(r.Component)({selector:"zc-map",template:o("l/Vu"),styles:[o("/Kpx")]}),n.f("design:paramtypes",[a.f,r.NgZone,l.a,s.l])],e)}(i.a)},MzWI:function(t,e){t.exports='<div\r\n  class="form-group"\r\n  [style.display]="to.searchFilter == false ? \'none\' : \'block\'"\r\n>\r\n  <input\r\n    placeholder="search for location"\r\n    autocorrect="off"\r\n    autocapitalize="off"\r\n    spellcheck="off"\r\n    type="text"\r\n    class="form-control"\r\n    [name]="searchId"\r\n    #search\r\n  />\r\n</div>\r\n<div>\r\n  <a *ngIf="to.showClearAll" (click)="clearAll()">Clear All</a>\r\n  <agm-map\r\n    (mapReady)="mapReady($event)"\r\n    [ngStyle]="to.cssStyle"\r\n    [fullscreenControl]="true"\r\n    [latitude]="to.lat"\r\n    [longitude]="to.lng"\r\n    [zoom]="to.zoom"\r\n    (idle)="mapIdle()"\r\n    (mapClick)="to.mapClickable && mapClicked($event)"\r\n    #agmMapArea\r\n  >\r\n    <ng-container>\r\n      <agm-marker\r\n        [agmFitBounds]="true"\r\n        *ngFor="let m of drawingArea; let i = index"\r\n        [latitude]="m.lat"\r\n        [longitude]="m.lng"\r\n        [label]="m.label"\r\n        (markerClick)="clickedMarker(m, i)"\r\n        [markerDraggable]="m.draggable"\r\n        [visible]="to.markerVisible"\r\n      >\r\n      </agm-marker>\r\n      <agm-polygon\r\n        zIndex="5"\r\n        *ngIf="showPolygon"\r\n        [paths]="drawingArea"\r\n        [clickable]="to.polyClickable"\r\n      >\r\n      </agm-polygon>\r\n    </ng-container>\r\n    <ng-container *ngIf="to.selectedArea">\r\n      <agm-polygon\r\n        (polyClick)="polyClick($event)"\r\n        fillColor="#1A5A7D"\r\n        [clickable]="to.selectedAreaClickable"\r\n        [paths]="to.selectedArea"\r\n        strokeWeight="2"\r\n        fillOpacity="0.5"\r\n      >\r\n      </agm-polygon>\r\n    </ng-container>\r\n    <ng-container *ngIf="to.multipleArea">\r\n      <agm-polygon\r\n        (polyClick)="polyClick($event, path)"\r\n        [clickable]="to.polyClickable"\r\n        *ngFor="let path of to.options"\r\n        [paths]="path"\r\n        fillColor="#F88181"\r\n        strokeWeight="1"\r\n        fillOpacity="0.2"\r\n      >\r\n      </agm-polygon>\r\n    </ng-container>\r\n  </agm-map>\r\n</div>\r\n'},NJOH:function(t,e){t.exports='\x3c!-- app.component.html --\x3e\r\n<div class="form-group address-map-search" [style.display]="to.search ? \'block\' : \'none\'">\r\n  <input type="text" class="form-control map-search-address-bar" (keydown.enter)="$event.preventDefault()"\r\n    [style.display]="to.search ? \'block\' : \'none\'" placeholder="Search Nearest Location" autocorrect="off"\r\n    autocapitalize="off" spellcheck="off" type="text" #search>\r\n\r\n  <button class="btn btn-default my-location" *ngIf="to.showMyLocation" [disabled]="btnDisable" (click)="setCurrentLocation()">\r\n    <span [innerHTML]="to.myLocationLabel || \'My location\'"></span></button>\r\n</div>\r\n<agm-map [latitude]="latitude" [longitude]="longitude" [zoom]="zoom" [fullscreenControl]="true">\r\n  <agm-marker [latitude]="latitude" [longitude]="longitude" [markerDraggable]="to.markerDragable"\r\n    (dragEnd)="markerDragEnd($event)">\r\n  </agm-marker>\r\n</agm-map>\r\n<p *ngIf="gpsErrorMsg" class="text-danger">{{gpsErrorMsg}}</p>\r\n<h5 *ngIf="address && to.showAddress">Address: {{address}}</h5>\r\n\x3c!-- \r\n\r\n<div>Latitude: {{latitude}}</div>\r\n  <div>Longitude: {{longitude}}</div> --\x3e'},Ptyq:function(t,e,o){"use strict";o.r(e);var n=o("D57K"),r=o("LoAr"),i=o("JwAm"),a=o("05nE"),l=function(){function t(t){this.apiKey=t.settings.googleMapKey,this.libraries=["places"]}return t=n.c([Object(r.Injectable)(),n.f("design:paramtypes",[a.b])],t)}(),s=o("YUmB"),c=o("eQXH"),p=o("IfiR"),d=o("JLVQ"),g=function(){function t(t,e,o){this.mapsAPILoader=t,this.ngZone=e,this.gs=o,this.markers=[],this.drawingArea=[],this.mapTypeId="roadmap",this.fillColor="red"}return t.prototype.ngOnInit=function(){var t=this;this.to.zoom||(this.to.zoom=11),this.to.showClearAll||!1===this.to.showClearAll||(this.to.showClearAll=!0),this.to.mapClickable||!1===this.to.mapClickable||(this.to.mapClickable=!1),this.to.polyClickable||!1===this.to.polyClickable||(this.to.polyClickable=!0),this.to.max||(this.to.max=3),this.to.min||(this.to.min=2),this.searchId=this.field.id+"_search",this.mapsAPILoader.load().then(function(){if(console.log("field",t.field.id),t.searchElementRef&&t.searchElementRef.nativeElement){var e=new google.maps.places.Autocomplete(t.searchElementRef.nativeElement,{});e.addListener("place_changed",function(){t.ngZone.run(function(){var o=e.getPlace();void 0!==o.geometry&&null!==o.geometry&&(t.to.lat=o.geometry.location.lat(),t.to.lng=o.geometry.location.lng())})})}}),this.control&&this.control.value&&(this.to.multipleArea||(this.drawingArea=this.control.value.data||[]),this.resetPolygon()),this.checkError(),this.control.valueChanges.subscribe(function(e){t.checkError()})},t.prototype.ngAfterViewInit=function(){var t=this.field.key;zc[t]=this,this.agmMapArea},t.prototype.mapReady=function(t){this.setMapCenter()},t.prototype.setMapCenter=function(){if(this.agmMapArea){var t=!0,e=new google.maps.LatLngBounds;if(this.to.selectedArea&&this.to.selectedArea.length>0)for(var o=0,n=this.to.selectedArea;o<n.length;o++){var r=n[o];e.extend(new google.maps.LatLng(r.lat,r.lng))}else if(this.to.options&&this.to.options.length>0)for(var i=0,a=this.to.options;i<a.length;i++){(r=a[i])[0]&&r[0].lat&&r[0].lng&&e.extend(new google.maps.LatLng(r[0].lat,r[0].lng))}else if(this.drawingArea&&this.drawingArea.length>0)for(var l=0,s=this.drawingArea;l<s.length;l++){(r=s[l])&&r.lat&&r.lng&&e.extend(new google.maps.LatLng(r.lat,r.lng))}else t=!1;t&&this.agmMapArea._mapsWrapper.fitBounds(e)}},t.prototype.mapClicked=function(t){!1!==this.to.drawingArea&&this.to.max>this.drawingArea.length&&(this.checkMarkerAddress(t.coords.lat,t.coords.lng),this.drawingArea.push({lat:t.coords.lat,lng:t.coords.lng,draggable:!1}),this.resetPolygon())},t.prototype.polyClick=function(t,e){var o={coords:{lat:t.latLng.lat(),lng:t.latLng.lng()}};this.mapClicked(o)},t.prototype.clickedMarker=function(t,e){!1!==this.to.drawingArea&&(this.drawingArea.splice(e,1),this.resetPolygon())},t.prototype.resetPolygon=function(t){var e=this;t&&(this.drawingArea=t),this.control.setValue(JSON.stringify({data:this.drawingArea})),this.to.options&&this.to.options[0]&&!this.to.multipleArea&&(this.to.lat=this.to.options[0].lat,this.to.lng=this.to.options[0].lng),this.showPolygon=!1,setTimeout(function(){e.showPolygon=!0},50)},t.prototype.checkMarkerAddress=function(t,e){new google.maps.Geocoder,new google.maps.LatLng(t,e)},t.prototype.mapIdle=function(){console.log("mapIdle")},t.prototype.clearAll=function(){this.resetPolygon([])},t.prototype.polygonCreated=function(t){console.log("event",t)},t.prototype.checkError=function(){this.to.max&&this.to.max<this.drawingArea.length?this.control.setErrors({"server-error":this.to.messages.max?this.to.messages.max:"This Marker should be less than "+this.to.max}):this.to.min&&this.to.min>this.drawingArea.length?this.control.setErrors({"server-error":this.to.messages.min?this.to.messages.min:"This Marker should be more than "+this.to.min}):this.control.setErrors(null)},n.c([Object(r.Input)(),n.f("design:type",p.FormControl)],t.prototype,"control",void 0),n.c([Object(r.Input)(),n.f("design:type",Object)],t.prototype,"to",void 0),n.c([Object(r.Input)(),n.f("design:type",Object)],t.prototype,"field",void 0),n.c([Object(r.Input)(),n.f("design:type",Object)],t.prototype,"model",void 0),n.c([Object(r.Input)(),n.f("design:type",Object)],t.prototype,"form",void 0),n.c([Object(r.ViewChild)("search"),n.f("design:type",r.ElementRef)],t.prototype,"searchElementRef",void 0),n.c([Object(r.ViewChild)("agmMapArea"),n.f("design:type",s.b)],t.prototype,"agmMapArea",void 0),t=n.c([Object(r.Component)({selector:"zc-ui-draw-area",template:o("MzWI"),styles:[o("TYVq")]}),n.f("design:paramtypes",[s.f,r.NgZone,d.a])],t)}(),h=o("WT9V"),m=function(){function t(t,e,o){this.mapsAPILoader=t,this.ngZone=e,this.gs=o,this.showMap=!1,this.myExtraModules=[h.CommonModule],this.infoWindowOpened=null,this.previous_info_window=null,this.lat=17.432,this.log=78.44692}return t.prototype.ngOnInit=function(){var t=this;if(this._zc=zc,console.log("agmMap",this.agmMap),this.to.zoom||(this.to.zoom=11),this.searchId=this.field.key+"_searchmap",this.mapsAPILoader.load().then(function(){if(t.showMap=!0,t.searchMapElementRef&&t.searchMapElementRef.nativeElement){var e=new google.maps.places.Autocomplete(t.searchMapElementRef.nativeElement,{});e.addListener("place_changed",function(){t.ngZone.run(function(){var o=e.getPlace();void 0!==o.geometry&&null!==o.geometry&&(t.to.lat=o.geometry.location.lat(),t.to.lng=o.geometry.location.lng())})})}}),!1!==this.to.search&&(this.to.search=!0),this.to.lat||(this.to.lat=this.lat,this.to.lng=this.log),!1!==this.to.mapClickable&&(this.to.mapClickable=!0),!1!==this.to.markerDragable&&(this.to.markerDragable=!0),this.to.readonly?this.to.markerDragable=!1:this.to.readonly=!1,"view"===this.to.mode&&(this.to.mapClickable=!1,this.to.search=!1,this.to.markerDragable=!1),(this.to.options&&this.to.options.length>0||this.to.multiple)&&(this.locationList=!0),this.to.dataSource&&this.to.dataSource&&this.to.dataSource.api&&this.to.dataSource.api.url&&(this.locationList=!0,this.gs.getMapData(this.to.dataSource,{}).subscribe(function(e){t.to.options=e,console.log(" this.to.options",t.to.options)})),this.control.value){var e=this.control.value;this.to.lat=this.lat=e.lat,this.to.lng=this.log=e.log}this.control.valueChanges.subscribe(function(e){if(e){var o=t.control.value;t.to.lat=t.lat=o.lat,t.to.lng=t.log=o.log}t.setMarkerAnimation()})},t.prototype.ngAfterViewInit=function(){zc[this.field.key]=this,setTimeout(function(){console.log("Resizing")},100)},t.prototype.mapReady=function(t){console.log("mapReady lo",this.to.options)},t.prototype.markerDragEnd=function(t){this.mapClicked(t),this.clickEvent({lat:t.coords.lat,log:t.coords.lng})},t.prototype.clickEvent=function(t){this.field.templateOptions.click&&this.field.templateOptions.click(this.field,t)},t.prototype.mapClicked=function(t){this.setValueMarker({lat:t.coords.lat,log:t.coords.lng})},t.prototype.setValueMarker=function(t){t&&this.control.setValue(t),this.control.value&&(this.field.templateOptions.change&&this.field.templateOptions.change(this.field,this.control.value),this.field.templateOptions.click&&this.field.templateOptions.click(this.field,this.control.value))},t.prototype.setMarkerAnimation=function(){var t=this;if(this.to.multiple){this.to.options.map(function(t){t.animation=!1});var e=this.to.options.find(function(e){return t.control.value&&e.lat===t.control.value.lat});e&&(e.animation="BOUNCE")}},t.prototype.closeWindow=function(){null!=this.previous_info_window&&this.previous_info_window.close()},t.prototype.openWindow=function(t){null==this.previous_info_window?this.previous_info_window=t:(this.infoWindowOpened=t,this.previous_info_window&&this.previous_info_window.close()),this.previous_info_window=t},t.prototype.setMapCenter=function(){var t=this;this.mapsAPILoader.load().then(function(){if(t.agmMap){var e=new google.maps.LatLngBounds;if(t.to.multiple){if(t.to.options&&t.to.options.length>0)for(var o=0,n=t.to.options;o<n.length;o++){var r=n[o];r&&r.lat&&r.lng&&e.extend(new google.maps.LatLng(r.lat,r.log))}}else t.control.value&&t.control.value.lat&&e.extend(new google.maps.LatLng(t.control.value.lat,t.control.value.log));t.agmMap._mapsWrapper.fitBounds(e)}})},n.c([Object(r.Input)(),n.f("design:type",Object)],t.prototype,"control",void 0),n.c([Object(r.Input)(),n.f("design:type",Object)],t.prototype,"to",void 0),n.c([Object(r.Input)(),n.f("design:type",Object)],t.prototype,"field",void 0),n.c([Object(r.Input)(),n.f("design:type",Object)],t.prototype,"model",void 0),n.c([Object(r.Input)(),n.f("design:type",Object)],t.prototype,"form",void 0),n.c([Object(r.ViewChild)("mapsearch"),n.f("design:type",r.ElementRef)],t.prototype,"searchMapElementRef",void 0),n.c([Object(r.ViewChild)("agmMap"),n.f("design:type",s.b)],t.prototype,"agmMap",void 0),t=n.c([Object(r.Component)({selector:"zc-ui-location-single",template:o("Fjr/"),styles:[o("1zN0")]}),n.f("design:paramtypes",[s.f,r.NgZone,d.a])],t)}(),u=o("87bh"),f=function(){function t(t,e){this.mapsAPILoader=t,this.ngZone=e,this.markerDraggable=!0,this.btnDisable=!1,this.myExtraModules=[],this.zoom=16}return t.prototype.ngOnInit=function(){var t=this;if(!1!==this.to.showAddress&&(this.to.showAddress=!0),!1!==this.to.showMyLocation&&(this.to.showMyLocation=!0),!1!==this.to.search&&(this.to.search=!0),!1!==this.to.markerDragable&&(this.to.markerDragable=!0),this.to.zoom||(this.to.zoom=12),"view"===this.to.mode&&(this.to.markerDragable=!1,this.to.search=!1),this.control.value){var e=this.control.value;this.latitude=e.lat,this.longitude=e.log,this.address=e.address}this.mapsAPILoader.load().then(function(){console.log("this.control.value",t.control.value),t.control.value||t.setCurrentLocation(!1),t.geoCoder=new google.maps.Geocoder;var e=new google.maps.places.Autocomplete(t.searchElementRef.nativeElement);e.addListener("place_changed",function(){t.ngZone.run(function(){var o=e.getPlace();void 0!==o.geometry&&null!==o.geometry&&(t.latitude=o.geometry.location.lat(),t.longitude=o.geometry.location.lng(),t.getAddress(t.latitude,t.longitude),t.zoom=t.to.zoom)})})})},t.prototype.ngAfterViewInit=function(){zc[this.field.key]=this},t.prototype.setCurrentLocation=function(t){var e=this;void 0===t&&(t=!0),this.gpsErrorMsg=null,"geolocation"in navigator&&(this.btnDisable=!0,navigator.geolocation.getCurrentPosition(function(o){e.btnDisable=!1,e.latitude=o.coords.latitude,e.longitude=o.coords.longitude,e.zoom=e.to.zoom,e.setValue(),t&&e.getAddress(e.latitude,e.longitude)},function(t){e.btnDisable=!1,"view"!==e.to.mode&&(e.gpsErrorMsg="We are Unable to fetch your location Now, Please try later or enter your address in search box."),console.warn("get current position",t)},{enableHighAccuracy:!0,maximumAge:0,timeout:3e4}))},t.prototype.markerDragEnd=function(t){console.log(t),this.latitude=t.coords.lat,this.longitude=t.coords.lng,this.getAddress(this.latitude,this.longitude)},t.prototype.getAddress=function(t,e){var o=this;this.geoCoder.geocode({location:{lat:t,lng:e}},function(t,e){"OK"===e?t[0]?(o.zoom=o.to.zoom,o.address=t[0].formatted_address,o.searchElementRef.nativeElement.value=o.address):console.warn("No results found"):console.warn("Geocoder failed due to: "+e),o.setValue()})},t.prototype.setValue=function(){var t={lat:this.latitude,log:this.longitude,address:this.address};this.control.setValue(t),this.control.value&&(this.field.templateOptions.change&&this.field.templateOptions.change(this.field,this.control.value),this.field.templateOptions.click&&this.field.templateOptions.click(this.field,this.control.value))},n.c([Object(r.Input)(),n.f("design:type",Object)],t.prototype,"control",void 0),n.c([Object(r.Input)(),n.f("design:type",Object)],t.prototype,"to",void 0),n.c([Object(r.Input)(),n.f("design:type",Object)],t.prototype,"field",void 0),n.c([Object(r.Input)(),n.f("design:type",Object)],t.prototype,"model",void 0),n.c([Object(r.Input)(),n.f("design:type",Object)],t.prototype,"form",void 0),n.c([Object(r.ViewChild)("search"),n.f("design:type",r.ElementRef)],t.prototype,"searchElementRef",void 0),t=n.c([Object(r.Component)({selector:"zc-ui-address-map",template:o("NJOH"),styles:[o("D1i/")]}),n.f("design:paramtypes",[s.f,r.NgZone])],t)}();o.d(e,"ZcFieldMapModule",function(){return y});var y=function(){function t(){}return t=n.c([Object(r.NgModule)({declarations:[i.a,g,m,f],imports:[a.n,p.FormsModule,c.a,s.a.forRoot({libraries:["places","drawing","geometry"]}),u.NgxDynamicTemplateModule],providers:[d.a,{provide:s.e,useClass:l,deps:[a.b]}],entryComponents:[i.a]})],t)}()},TYVq:function(t,e){t.exports=""},"l/Vu":function(t,e){t.exports='<div *ngIf="googleMapLoaded">\r\n  <div [ngSwitch]="to.displayStyle">\r\n    <div *ngSwitchCase="\'area\'">\r\n      <zc-ui-draw-area [control]="formControl" [to]="to" [field]="field" [model]="model" [form]="form">\r\n      </zc-ui-draw-area>\r\n    </div>\r\n    <div *ngSwitchCase="\'address\'">\r\n      <zc-ui-address-map [control]="formControl" [to]="to" [field]="field" [model]="model" [form]="form">\r\n\r\n      </zc-ui-address-map>\r\n    </div>\r\n    <div *ngSwitchDefault>\r\n      <zc-ui-location-single [control]="formControl" [to]="to" [field]="field" [model]="model" [form]="form">\r\n      </zc-ui-location-single>\r\n    </div>\r\n  </div>\r\n</div>'}}]);