(window.webpackJsonp=window.webpackJsonp||[]).push([[24,54],{"9MPf":function(t,e,i){"use strict";i.r(e);var o=i("D57K"),n=i("LoAr"),r=i("WT9V"),s=i("sogb"),a=i("e+PY"),c=i("05nE"),p=i("vtXP"),u=i("GBFz"),h=i("autd"),f=i("mtXv");u(s),h(s),f(s);var d=function(){function t(t,e){this._zcHttp=t,this.actionService=e}return t.prototype.ngOnInit=function(){var t=this;this.config={lang:{contextButtonTitle:"Download Options"},exporting:{enabled:this.options.download||!1,buttons:{contextButton:{menuItems:["print","downloadPNG","downloadJPEG","downloadPDF","downloadSVG"]}}},chart:{type:"bubble",plotBorderWidth:1,zoomType:"xy"},legend:{},title:{text:""},subtitle:{text:""},accessibility:{point:{valueDescriptionFormat:"{index}. {point.name}, fat: {point.x}g, sugar: {point.y}g, obesity: {point.z}%."}},xAxis:{gridLineWidth:1,title:{text:"Research Papers"},labels:{format:"{value}"},plotLines:[],accessibility:{rangeDescription:"Range: 60 to 100 grams."}},yAxis:{startOnTick:!1,endOnTick:!1,title:{text:"Citations"},labels:{format:"{value}"},maxPadding:.2,plotLines:[],accessibility:{rangeDescription:"Range: 0 to 160 grams."}},tooltip:{useHTML:!0,headerFormat:"<table>",pointFormat:'<tr><th colspan="2"><h3>{point.country}</h3></th></tr><tr><th>Research Papers:</th><td>{point.x}</td></tr><tr><th>Citations:</th><td>{point.y}</td></tr>',footerFormat:"</table>",followPointer:!0,outside:!0},plotOptions:{series:{dataLabels:{enabled:!1,format:"{point.name}"}}},navigation:{},series:[{data:[{x:95,y:95,z:13.8,name:"BE",country:"Belgium",color:"#006400"},{x:86.5,y:102.9,z:14.7,name:"DE",country:"Germany",color:"#006400"},{x:80.8,y:91.5,z:15.8,name:"FI",country:"Finland",color:"#006400"},{x:80.4,y:102.5,z:12,name:"NL",country:"Netherlands",color:"#006400"},{x:80.3,y:86.1,z:11.8,name:"SE",country:"Sweden",color:"#006400"},{x:78.4,y:70.1,z:16.6,name:"ES",country:"Spain",color:"#006400"},{x:74.2,y:68.5,z:14.5,name:"FR",country:"France",color:"#006400"},{x:73.5,y:83.1,z:10,name:"NO",country:"Norway",color:"#006400"},{x:71,y:93.2,z:24.7,name:"UK",country:"United Kingdom",color:"#006400"},{x:69.2,y:57.6,z:10.4,name:"IT",country:"Italy",color:"#006400"},{x:68.6,y:20,z:16,name:"RU",country:"Russia",color:"#006400"},{x:65.5,y:126.4,z:35.3,name:"US",country:"United States",color:"#006400"},{x:65.4,y:50.8,z:28.5,name:"HU",country:"Hungary",color:"#006400"},{x:63.4,y:51.8,z:15.4,name:"PT",country:"Portugal",color:"#006400"},{x:64,y:82.9,z:31.3,name:"NZ",country:"New Zealand",color:"#006400"}]}]},this.chartId="hc_"+this.options.id,this.options.legend&&(this.config.legend=this.options.legend),this.options.navigation&&(this.config.navigation=this.options.navigation),this.options.chartTitle&&(this.config.title.y=this.options.chartTitle.y),this.getChartDataViaAPI(this.options).subscribe(function(e){c.n.mergeDeep(t.config.tooltip,t.options.tooltip),t.options.xAxis&&t.options.xAxis.title&&(t.config.xAxis.title.text=t.options.xAxis.title),t.options.yAxis&&t.options.yAxis.title&&(t.config.yAxis.title.text=t.options.yAxis.title),t.config.series=e,t.chart=new a.a(t.config)})},t.prototype.ngAfterViewInit=function(){this.options.id&&(zc[this.options.id]=this)},t.prototype.reload=function(){this.ngOnInit()},t.prototype.getChartDataViaAPI=function(t){var e=this;if(t.title&&(this.config.title.text=t.title),t.dataSource&&t.dataSource.api){var i={};return t.dataSource.api.params&&(i=this.actionService.getParams(t.dataSource.api.params,{})),this._zcHttp.post(t.dataSource.api.url,i).pipe(Object(p.a)(function(i){var o,n=[],r=[];if(e.options.dataSource.api.mapScript?(r=c.n.evalFun(e.options.dataSource.api.mapScript,{item:i.data,data:i.data,options:e.options,config:e.config}),console.log("graphData",r)):i.data&&i.data.listData&&i.data.listData.rows&&(r=i.data.listData.rows),r){o=r||[];var s="name",a="value",p="size";t.dataSource.api.map&&(t.dataSource.api.map.xAxis&&(s=t.dataSource.api.map.xAxis),t.dataSource.api.map.yAxis&&(a=t.dataSource.api.map.yAxis),t.dataSource.api.map.zAxis&&(p=t.dataSource.api.map.zAxis));var u=[];o.forEach(function(t){t.x=t[s]||0,t.y=t[a]||0,t.z=t[p]||0,u.push(t)}),n.push({name:"",data:u})}return n}))}},o.c([Object(n.Input)(),o.f("design:type",Object)],t.prototype,"options",void 0),t=o.c([Object(n.Component)({selector:"zc-highchart-bubble",template:i("JKSd"),styles:[i("qNJO")]}),o.f("design:paramtypes",[c.c,c.a])],t)}();i.d(e,"BubbleModule",function(){return l});var l=function(){function t(){}return t=o.c([Object(n.NgModule)({declarations:[d],imports:[r.CommonModule,a.b],entryComponents:[d],exports:[d]})],t)}()},JKSd:function(t,e){t.exports='<div [chart]="chart" *ngIf="chart"></div>'},YfSF:function(t,e,i){"use strict";var o=i("Jg5f");i.d(e,"a",function(){return o.a})},"e+PY":function(t,e,i){"use strict";i.d(e,"a",function(){return s}),i.d(e,"b",function(){return d});var o=i("sogb"),n=i("Uk0f"),r=i("LoAr"),s=function(){function t(t){void 0===t&&(t={series:[]}),this.options=t,this.refSubject=new n.a,this.ref$=this.refSubject.asObservable()}return t.prototype.addPoint=function(t,e,i,o){void 0===e&&(e=0),void 0===i&&(i=!0),void 0===o&&(o=!1),this.ref$.subscribe(function(n){n.series.length>e&&n.series[e].addPoint(t,i,o)})},t.prototype.addSeries=function(t,e,i){void 0===e&&(e=!0),this.ref$.subscribe(function(o){o.addSeries(t,e,i)})},t.prototype.removePoint=function(t,e){void 0===e&&(e=0),this.ref$.subscribe(function(i){i.series.length>e&&i.series[e].data.length>t&&i.series[e].removePoint(t,!0)})},t.prototype.removeSeries=function(t){this.ref$.subscribe(function(e){e.series.length>t&&e.series[t].remove(!0)})},t.prototype.init=function(t){var e=this;this.ref||Object(o.chart)(t.nativeElement,this.options,function(t){e.refSubject.next(t),e.ref=t,e.refSubject.complete()})},t.prototype.destroy=function(){this.ref&&(this.options=this.ref.options,this.ref.destroy(),this.ref=void 0,this.refSubject=new n.a,this.ref$=this.refSubject.asObservable())},t}(),a=function(){function t(t){void 0===t&&(t={series:[]}),this.options=t,this.refSubject=new n.a,this.ref$=this.refSubject.asObservable()}return t.prototype.init=function(t){var e=this;this.ref||Object(o.mapChart)(t.nativeElement,this.options,function(t){e.refSubject.next(t),e.ref=t,e.refSubject.complete()})},t.prototype.destroy=function(){this.ref&&(this.options=this.ref.options,this.ref.destroy(),this.ref=void 0,this.refSubject=new n.a,this.ref$=this.refSubject.asObservable())},t}(),c=function(){function t(t){void 0===t&&(t={series:[]}),this.options=t,this.refSubject=new n.a,this.ref$=this.refSubject.asObservable()}return t.prototype.init=function(t){var e=this;this.ref||Object(o.stockChart)(t.nativeElement,this.options,function(t){e.refSubject.next(t),e.ref=t,e.refSubject.complete()})},t.prototype.destroy=function(){this.ref&&(this.options=this.ref.options,this.ref.destroy(),this.ref=void 0,this.refSubject=new n.a,this.ref$=this.refSubject.asObservable())},t}(),p=function(){function t(t){this.el=t}return t.prototype.ngOnChanges=function(t){t.chart.isFirstChange()||(this.destroy(),this.init())},t.prototype.ngOnInit=function(){this.init()},t.prototype.ngOnDestroy=function(){this.destroy()},t.prototype.init=function(){(this.chart instanceof s||this.chart instanceof c||this.chart instanceof a)&&this.chart.init(this.el)},t.prototype.destroy=function(){(this.chart instanceof s||this.chart instanceof c||this.chart instanceof a)&&this.chart.destroy()},t.decorators=[{type:r.Directive,args:[{selector:"[chart]"}]}],t.ctorParameters=function(){return[{type:r.ElementRef}]},t.propDecorators={chart:[{type:r.Input}]},t}(),u=new r.InjectionToken("HighchartsModules"),h=function(){function t(t){this.chartModules=t}return t.prototype.initModules=function(){this.chartModules.forEach(function(t){t(o)})},t.decorators=[{type:r.Injectable}],t.ctorParameters=function(){return[{type:Array,decorators:[{type:r.Inject,args:[u]}]}]},t}(),f=[],d=function(){function t(t){this.cs=t,this.cs.initModules()}return t.decorators=[{type:r.NgModule,args:[{exports:[p],declarations:[p],providers:[{provide:u,useValue:f},h]}]}],t.ctorParameters=function(){return[{type:h}]},t}()},qNJO:function(t,e){t.exports=""},vtXP:function(t,e,i){"use strict";var o=i("YfSF");i.d(e,"a",function(){return o.a})}}]);