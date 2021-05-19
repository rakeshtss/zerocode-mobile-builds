(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{"bnX+":function(t,i,n){"use strict";n.r(i);var o=n("D57K"),e=n("LoAr"),r=n("WT9V"),s=n("05nE"),a=n("mUyW"),p=n("vtXP"),d=function(){function t(t,i,n){this._http=t,this.as=i,this.loadingInding=n}return t.prototype.updateTrackerPosition=function(t){},t.prototype.getTrackerPosition=function(t,i){void 0===i&&(i={}),this.loadingInding.skipLoading=!0;var n={};t.api.params&&(n=this.as.getParams(t.api.params||[],i));return"post"===t.api.method?this._http.post(t.api.url,n).pipe(Object(p.a)(function(t){return t.data})):this._http.get(t.api.url,{params:n}).pipe(Object(p.a)(function(t){return t.data}))},t=o.c([Object(e.Injectable)(),o.f("design:paramtypes",[s.c,s.a,s.h])],t)}(),c=function(){function t(t,i){this.gMapTrackerService=t,this.as=i,this.show=!1,this.showCursor=!0,this.origin={lat:null,lng:null},this.destination={lat:17.438525560187767,lng:78.4100729227066},this.zoom=15,this.enableView=!1,this.transitOptions={},this.renderOptions={suppressMarkers:!0}}return t.prototype.ngOnInit=function(){var t=this;this.markerOptions={origin:{draggable:this.options.origin.draggable,visible:!this.options.updateDirection},destination:{icon:"https://www.shareicon.net/data/32x32/2015/07/09/66679_maps_128x128.png",draggable:this.options.destination.draggable}},this.options.origin.icon&&(this.markerOptions.origin.icon=this.options.origin.icon),this.options.destination.icon&&(this.markerOptions.destination.icon=this.options.destination.icon),this.showCursor=!0,this.setDestination(),this.interval$=Object(a.a)(this.options.origin.intervalTime).subscribe(function(i){t.updateGetGeoByApi()})},t.prototype.setDestination=function(){this.destination.lat=s.o.evalFun(this.options.destination.latKey,{},!0),this.destination.lng=s.o.evalFun(this.options.destination.lngKey,{},!0),this.updateGetGeoByApi()},t.prototype.updateGetGeoByApi=function(){var t=this,i=s.o.evalFun(this.options.origin.getApi.condition,{options:this.options},!0),n=s.o.evalFun(this.options.origin.updateApi.condition,{options:this.options},!0);i&&this.gMapTrackerService.getTrackerPosition(this.options.origin.getApi).subscribe(function(i){t.options.origin.getApi.api&&t.options.origin.getApi.api.onSuccess&&t.as.onSuccess(t.options.origin.getApi.api.onSuccess,i),t.origin.lat=s.o.evalFun(t.options.origin.getApi.api.map.lat,i,!0),t.origin.lng=s.o.evalFun(t.options.origin.getApi.api.map.lng,i,!0),t.setDirections()}),n&&this.getCurrentLocation()},t.prototype.getCurrentLocation=function(){var t=this;navigator.geolocation?navigator.geolocation.getCurrentPosition(function(i){i&&(t.origin.lat=i.coords.latitude,t.origin.lng=i.coords.longitude,t.origin.log=i.coords.longitude,t.gMapTrackerService.getTrackerPosition(t.options.origin.updateApi,{origion:t.origin,options:t.options}).subscribe(function(i){t.options.origin.updateApi.api.onSuccess&&t.as.onSuccess(t.options.origin.updateApi.api.onSuccess,i),console.log("updateApiCondition",i)}))},function(t){console.warn("Get location ",t)},{enableHighAccuracy:!0,maximumAge:0,timeout:3e4}):console.warn("Geolocation is not supported by this browser."),this.setDirections()},t.prototype.trackLocation=function(){var t=this;navigator.geolocation?navigator.geolocation.watchPosition(function(i){t.origin.lat=i.coords.latitude,t.origin.lng=i.coords.longitude,t.origin.log=i.coords.longitude}):console.warn("Geolocation is not supported by this browser."),this.showCursor=!1,this.setDirections()},t.prototype.getLocation=function(){this.showCursor=!1,this.getCurrentLocation()},t.prototype.start=function(){this.zoom=17},t.prototype.setDirections=function(){var t=this;this.options.updateDirection&&(this.show=!1),setTimeout(function(){t.show=!0},300)},t.prototype.updateDirections=function(){var t=this;this.show=!1,setTimeout(function(){t.show=!0},300)},t.prototype.markerDragEnd=function(t){this.destination={lat:t.coords.lat,lng:t.coords.lng}},t.prototype.placeMarker=function(t){console.log(t.coords)},t.prototype.updateOrigionApi=function(){},t.prototype.onResponse=function(t){console.log("$event",t),this.destination.lat=t.request.destination.location.lat(),this.destination.lng=t.request.destination.location.lng();try{t.routes[0].legs[0];this.distance=t,this.enableView=!0}catch(i){console.warn("You have exceeded your daily request quota for this API")}},t.prototype.ngOnDestroy=function(){this.interval$.unsubscribe()},o.c([Object(e.Input)(),o.f("design:type",Object)],t.prototype,"options",void 0),t=o.c([Object(e.Component)({selector:"zc-g-map-tracker",template:n("oiIc"),styles:[n("lPhv")]}),o.f("design:paramtypes",[d,s.a])],t)}(),g=n("87bh"),u=n("YUmB"),l=n("j3C3"),h=function(){function t(t){this.gmapsApi=t,this.waypoints=[],this.optimizeWaypoints=!0,this.provideRouteAlternatives=!1,this.avoidHighways=!1,this.avoidTolls=!1,this.avoidFerries=!1,this.visible=!0,this.onChange=new e.EventEmitter,this.onResponse=new e.EventEmitter,this.sendInfoWindow=new e.EventEmitter,this.status=new e.EventEmitter,this.originDrag=new e.EventEmitter,this.destinationDrag=new e.EventEmitter,this.waypointsMarker=[],this.isFirstChange=!0}return t.prototype.ngOnInit=function(){!0===this.visible&&this.directionDraw()},t.prototype.ngOnChanges=function(t){if(this.visible){if(this.isFirstChange)return void 0===this.directionsRenderer&&this.directionDraw(),void(this.isFirstChange=!1);void 0!==t.renderOptions&&!1===t.renderOptions.firstChange&&(this.removeMarkers(),this.removeDirections()),this.directionDraw()}else try{this.removeMarkers(),this.removeDirections()}catch(i){}},t.prototype.ngOnDestroy=function(){this.destroyMarkers(),this.removeDirections()},t.prototype.directionDraw=function(){var t=this;this.gmapsApi.getNativeMap().then(function(i){var n=i;void 0===t.directionsRenderer&&(t.directionsRenderer=new google.maps.DirectionsRenderer(t.renderOptions),t.directionsRenderer.setMap(n),t.directionsRenderer.addListener("directions_changed",function(){t.onChange.emit(t.directionsRenderer.getDirections())})),void 0===t.directionsService&&(t.directionsService=new google.maps.DirectionsService),void 0===t.panel?t.directionsRenderer.setPanel(null):t.directionsRenderer.setPanel(t.panel),t.renderRoute?(t.directionsRenderer.setDirections(t.renderRoute),t.renderRoute=void 0):t.directionsService.route({origin:t.origin,destination:t.destination,travelMode:t.travelMode||google.maps.TravelMode.DRIVING,transitOptions:t.transitOptions,drivingOptions:t.drivingOptions,waypoints:t.waypoints,optimizeWaypoints:t.optimizeWaypoints,provideRouteAlternatives:t.provideRouteAlternatives,avoidHighways:t.avoidHighways,avoidTolls:t.avoidTolls,avoidFerries:t.avoidFerries,unitSystem:t.unitSystem},function(i,o){switch(t.onResponse.emit(i),t.status.emit(o),o){case google.maps.DirectionsStatus.OK:if(t.directionsRenderer.setDirections(i),void 0!==t.markerOptions){t.destroyMarkers();var e=i.routes[0].legs[0];try{void 0!==t.markerOptions.origin&&(t.markerOptions.origin.map=n,t.markerOptions.origin.position=e.start_location,t.originMarker=t.setMarker(n,t.originMarker,t.markerOptions.origin,e.start_address),t.markerOptions.origin.draggable&&t.originMarker.addListener("dragend",function(){t.origin=t.originMarker.position,t.directionDraw(),t.originDrag.emit(t.origin)})),void 0!==t.markerOptions.destination&&(t.markerOptions.destination.map=n,t.markerOptions.destination.position=e.end_location,t.destinationMarker=t.setMarker(n,t.destinationMarker,t.markerOptions.destination,e.end_address),t.markerOptions.destination.draggable&&t.destinationMarker.addListener("dragend",function(){t.destination=t.destinationMarker.position,t.directionDraw(),t.destinationDrag.emit(t.destination)})),void 0!==t.markerOptions.waypoints&&t.waypoints.forEach(function(i,o){Array.isArray(t.markerOptions.waypoints)?(t.markerOptions.waypoints[o].map=n,t.markerOptions.waypoints[o].position=e.via_waypoints[o],t.waypointsMarker.push(t.setMarker(n,i,t.markerOptions.waypoints[o],e.via_waypoints[o]))):(t.markerOptions.waypoints.map=n,t.markerOptions.waypoints.position=e.via_waypoints[o],t.waypointsMarker.push(t.setMarker(n,i,t.markerOptions.waypoints,e.via_waypoints[o])))})}catch(r){console.error("MarkerOptions error.",r)}}break;case google.maps.DirectionsStatus.OVER_QUERY_LIMIT:console.warn("The webpage has sent too many requests within the allowed time period.")}})})},t.prototype.setMarker=function(t,i,n,o){var e=this;return void 0===this.infoWindow&&(this.infoWindow=new google.maps.InfoWindow,this.sendInfoWindow.emit(this.infoWindow)),(i=new google.maps.Marker(n)).getClickable()&&i.addListener("click",function(){var r=void 0===n.infoWindow?o:n.infoWindow;e.infoWindow.setContent(r),e.infoWindow.open(t,i)}),i},t.prototype.removeMarkers=function(){void 0!==this.originMarker&&this.originMarker.setMap(null),void 0!==this.destinationMarker&&this.destinationMarker.setMap(null),this.waypointsMarker.forEach(function(t){void 0!==t&&t.setMap(null)})},t.prototype.removeDirections=function(){void 0!==this.directionsRenderer&&(this.directionsRenderer.setPanel(null),this.directionsRenderer.setMap(null),this.directionsRenderer=void 0)},t.prototype.destroyMarkers=function(){try{void 0!==this.originMarker&&(google.maps.event.clearListeners(this.originMarker,"click"),this.markerOptions.origin.draggable&&google.maps.event.clearListeners(this.originMarker,"dragend")),void 0!==this.destinationMarker&&(google.maps.event.clearListeners(this.destinationMarker,"click"),this.markerOptions.origin.draggable&&google.maps.event.clearListeners(this.destinationMarker,"dragend")),this.waypointsMarker.forEach(function(t){void 0!==t&&google.maps.event.clearListeners(t,"click")}),this.removeMarkers()}catch(t){console.error("Can not reset custom marker.",t)}},t.decorators=[{type:e.Directive,args:[{selector:"agm-direction"}]}],t.ctorParameters=function(){return[{type:u.c}]},t.propDecorators={origin:[{type:e.Input}],destination:[{type:e.Input}],travelMode:[{type:e.Input}],transitOptions:[{type:e.Input}],drivingOptions:[{type:e.Input}],waypoints:[{type:e.Input}],optimizeWaypoints:[{type:e.Input}],provideRouteAlternatives:[{type:e.Input}],avoidHighways:[{type:e.Input}],avoidTolls:[{type:e.Input}],avoidFerries:[{type:e.Input}],unitSystem:[{type:e.Input}],renderOptions:[{type:e.Input}],panel:[{type:e.Input}],markerOptions:[{type:e.Input}],infoWindow:[{type:e.Input}],visible:[{type:e.Input}],renderRoute:[{type:e.Input}],onChange:[{type:e.Output}],onResponse:[{type:e.Output}],sendInfoWindow:[{type:e.Output}],status:[{type:e.Output}],originDrag:[{type:e.Output}],destinationDrag:[{type:e.Output}]},t}(),v=function(){function t(){}return t.forRoot=function(){return{ngModule:t}},t.forChild=function(){return{ngModule:t}},t.decorators=[{type:e.NgModule,args:[{declarations:[h],exports:[h]}]}],t}(),m=n("eQXH"),y=n("IfiR");n.d(i,"GMapTrackerModule",function(){return k});var k=function(){function t(){}return t=o.c([Object(e.NgModule)({declarations:[c],imports:[r.CommonModule,m.a,y.FormsModule,g.NgxDynamicTemplateModule,u.a.forRoot(),g.NgxDynamicTemplateModule,v],providers:[{provide:u.e,useClass:l.a,deps:[s.b]},d],exports:[c]})],t)}()},lPhv:function(t,i){t.exports="agm-map{height:75vh;margin-top:0}.btn{padding:5px;text-align:center}.get{margin-left:15px;padding:10px;font-size:15px}\n"},oiIc:function(t,i){t.exports='<div class="row">\r\n  <div class="col-12">\r\n    <div>Distance : \r\n        <span *ngIf="(enableView || !show) && distance">\r\n          {{distance.routes[0].legs[0].distance.text}}\r\n        </span>\r\n    </div>\r\n    <agm-map [fullscreenControl]="true" [latitude]="origin.lat" [zoom]="zoom" [longitude]="origin.lng"\r\n      (mapClick)="placeMarker($event)">\r\n      <agm-direction *ngIf="origin.lat" [origin]="origin" [destination]="destination" [transitOptions]="options.transitOptions"\r\n        (onResponse)="onResponse($event)" [visible]="show" [renderOptions]="renderOptions"\r\n        [markerOptions]="markerOptions">\r\n      </agm-direction>\r\n       <agm-marker [latitude]="origin.lat" iconUrl="https://www.shareicon.net/data/32x32/2015/12/29/694757_transport_512x512.png" [longitude]="origin.lng" [markerDraggable]="false"></agm-marker>\r\n      \x3c!--<agm-marker *ngIf="!showCursor" (dragEnd)="markerDragEnd($event)" [latitude]="origin.lat" [longitude]="origin.lng" [markerDraggable]="true"></agm-marker> --\x3e\r\n    </agm-map>\r\n  </div>\r\n</div>\r\n<div class="col-12" *ngIf="options.debug">\r\n  <div class="row">\r\n    <button class="btn btn-sm" style="cursor: pointer;" (click)="getLocation()"><i class="icon icon-target"></i></button>\r\n    <button class="btn btn-sm" style="cursor: pointer;" (click)="updateDirections()">Update Directions</button>\r\n    \x3c!-- <button class="btn btn-sm" style="cursor: pointer;" (click)="start()">Start</button> --\x3e\r\n  </div>\r\n  <div class="row btns">\r\n    <div class="col-6 btn">\r\n      <h3>Target</h3>\r\n      <input class="" type="number" [(ngModel)]="destination.lat" /> <br>\r\n      <input class="" type="number" [(ngModel)]="destination.lng" />\r\n      \x3c!-- <span>Latitude: {{destination.lat}}</span> <br>\r\n      <span>Longitude: {{destination.lng}}</span> --\x3e\r\n    </div>\r\n    <div class="col-6 btn">\r\n      <h3>Current</h3>\r\n      \x3c!-- <input class="" type="number" [(ngModel)]="origin.lat" /> <br>\r\n      <input class="" type="number" [(ngModel)]="origin.lng" /> --\x3e\r\n\r\n      <span>Latitude: {{origin.lat}}</span> <br>\r\n      <span>Longitude: {{origin.lng}}</span>\r\n    </div>\r\n    \x3c!-- <div class="col-12">\r\n      \r\n    </div> --\x3e\r\n\r\n  </div>\r\n</div>'}}]);