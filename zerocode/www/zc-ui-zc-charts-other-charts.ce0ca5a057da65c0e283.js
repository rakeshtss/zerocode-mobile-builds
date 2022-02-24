(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{"8DY1":function(t,n){t.exports='<div *ngIf="options.displayTitle" class="zc-widget-header-title">\n  <h2 *ngIf="options.title">{{options.title}}</h2>\n  <span class="description" *ngIf="options.description">{{options.description}}</span>\n</div>\n<ngx-charts-bubble-chart\n  *ngIf="options.chartType === \'bubble\'"\n  [view]="options.view"\n  class="chart-container"\n  [results]="options.data"\n  [scheme]="options.colorScheme"\n  [animations]="options.animations"\n  [showGridLines]="options.showGridLines"\n  [legend]="options.showLegend"\n  [legendTitle]="options.legendTitle"\n  [legendPosition]="options.legendPosition"\n  [xAxis]="options.showXAxis"\n  [yAxis]="options.showYAxis"\n  [showXAxisLabel]="options.showXAxisLabel"\n  [showYAxisLabel]="options.showYAxisLabel"\n  [xAxisLabel]="options.xAxisLabel"\n  [yAxisLabel]="options.yAxisLabel"\n  [autoScale]="options.autoScale"\n  [xScaleMin]="options.xScaleMin"\n  [xScaleMax]="options.xScaleMax"\n  [yScaleMin]="options.yScaleMin"\n  [yScaleMax]="options.yScaleMax"\n  [roundDomains]="options.roundDomains"\n  [tooltipDisabled]="options.tooltipDisabled"\n  >\n</ngx-charts-bubble-chart>\n\n<ngx-charts-tree-map\n  *ngIf="options.chartType === \'tree-map\'"\n  class="chart-container"\n  [view]="options.view"\n  [scheme]="options.colorScheme"\n  [results]="options.data"\n  [animations]="options.animations"\n  [tooltipDisabled]="options.tooltipDisabled"\n  [gradient]="options.gradient"\n  (legendLabelClick)="onLegendLabelClick($event)"\n  (select)="select($event)">\n</ngx-charts-tree-map>\n\n<ngx-charts-number-card\n  *ngIf="options.chartType === \'number-card\'"\n  class="chart-container"\n  [view]="options.view"\n  (legendLabelClick)="onLegendLabelClick($event)"\n  [scheme]="options.colorScheme"\n  [cardColor]="options.cardColor"\n  [emptyColor]="options.emptyColor"\n  [results]="options.data"\n  [animations]="options.animations"\n  (select)="select($event)">\n</ngx-charts-number-card>\n\n<ngx-charts-gauge\n  *ngIf="options.chartType === \'gauge\'"\n  class="chart-container"\n  [view]="options.view"\n  [scheme]="options.colorScheme"\n  [legend]="options.showLegend"\n  [legendTitle]="options.legendTitle"\n  [legendPosition]="options.legendPosition"\n  [results]="options.data"\n  [animations]="options.animations"\n  [textValue]="options.gaugeTextValue"\n  [min]="options.gaugeMin"\n  [max]="options.gaugeMax"\n  [units]="options.gaugeUnits"\n  [angleSpan]="options.gaugeAngleSpan || 240"\n  [startAngle]="options.gaugeStartAngle || -120"\n  [showAxis]="options.gaugeShowAxis"\n  [bigSegments]="options.gaugeLargeSegments"\n  [smallSegments]="options.gaugeSmallSegments"\n  [tooltipDisabled]="options.tooltipDisabled"\n  (select)="select($event)"\n  [margin]="options.margin ? [options.marginTop, options.marginRight, options.marginBottom, options.marginLeft] : null"\n  (legendLabelClick)="onLegendLabelClick($event)">\n</ngx-charts-gauge>\n\n<ngx-charts-linear-gauge\n  *ngIf="options.chartType === \'linear-gauge\'"\n  class="chart-container" [view]="options.view"\n  [scheme]="options.colorScheme"\n  [animations]="options.animations"\n  [min]="options.gaugeMin"\n  [max]="options.gaugeMax"\n  [value]="options.gaugeValue"\n  [units]="options.gaugeUnits"\n  (select)="select($event)">\n</ngx-charts-linear-gauge>\n'},QDW9:function(t,n,e){"use strict";e.r(n);var o=e("D57K"),i=e("LoAr"),s=e("WT9V"),a=function(){function t(){}return t.prototype.ngOnInit=function(){this.options.chartType||(this.options.chartType="bubble"),this.options.cardColor||(this.options.cardColor="#232837"),this.options.emptyColor||(this.options.emptyColor="#1e222e"),this.options.gaugeUnits||(this.options.gaugeUnits="units"),this.options.gaugeValue||(this.options.gaugeValue=75),this.setChartData(this.options.chartType),console.log("options",this.options)},t.prototype.onLegendLabelClick=function(t){console.log("onLegendLabelClick",t)},t.prototype.select=function(t){console.log("select",t)},t.prototype.dblclick=function(t){console.log("dblclick",t)},t.prototype.setChartData=function(t){switch(t){case"bubble":this.options.title=this.options.title?this.options.title:"Bubble Chart",this.options.autoScale=!0,this.options.showGridLines=!0,this.bubbleChartData();break;case"tree-map":this.options.title=this.options.title?this.options.title:"Tree Map Chart",this.treeMapData();break;case"number-card":this.options.title=this.options.title?this.options.title:"Number Card Chart",this.treeMapData();break;case"gauge":this.options.title=this.options.title?this.options.title:"Gauge Chart",this.treeMapData();break;case"linear-gauge":this.options.title=this.options.title?this.options.title:"Linear Gauge Chart",this.treeMapData();break;default:this.options.title=this.options.title?this.options.title:"Bubble Chart",this.bubbleChartData()}},t.prototype.bubbleChartData=function(){this.options.data=[],this.options.chartData&&this.options.chartData.length&&(this.options.data=this.options.chartData),this.options.data.length||(this.options.data=[{name:"Hungary",series:[{name:"2002",x:"2001-12-31T18:30:00.000Z",y:53,r:32}]},{name:"Brazil",series:[{name:"2009",x:"2008-12-31T18:30:00.000Z",y:49,r:32}]},{name:"Bermuda",series:[{name:"1992",x:"1991-12-31T18:30:00.000Z",y:97,r:48}]},{name:"Saudi Arabia",series:[{name:"1995",x:"1994-12-31T18:30:00.000Z",y:49,r:36}]},{name:"Romania",series:[{name:"2001",x:"2000-12-31T18:30:00.000Z",y:56,r:35}]},{name:"Argentina",series:[{name:"2003",x:"2002-12-31T18:30:00.000Z",y:65,r:31}]},{name:"Yemen",series:[{name:"2008",x:"2007-12-31T18:30:00.000Z",y:94,r:32}]},{name:"Malaysia",series:[{name:"1994",x:"1993-12-31T18:30:00.000Z",y:34,r:31}]}])},t.prototype.treeMapData=function(){this.options.data=[],this.options.chartData&&this.options.chartData.length&&(this.options.data=this.options.chartData),this.options.data.length||(this.options.data=[{name:"Germany",value:40632},{name:"United Kingdom",value:36240},{name:"Spain",value:33e3},{name:"Suriname",value:52703},{name:"Qatar",value:45292},{name:"Suriname",value:22809},{name:"Cook Islands",value:11338}])},t.prototype.bubbleChartData1=function(){this.options.data=[{name:"Germany",series:[{name:2010,x:2010,y:80.3,r:80.4},{name:2e3,x:2e3,y:80.3,r:78},{name:1990,x:1990,y:75.4,r:79}]},{name:"United States",series:[{name:2010,x:2010,y:78.8,r:310},{name:2e3,x:2e3,y:76.9,r:283},{name:1990,x:1990,y:75.4,r:253}]},{name:"France",series:[{name:2010,x:2010,y:81.4,r:63},{name:2e3,x:2e3,y:79.1,r:59.4},{name:1990,x:1990,y:77.2,r:56.9}]},{name:"United Kingdom",series:[{name:2010,x:2010,y:80.2,r:62.7},{name:2e3,x:2e3,y:77.8,r:58.9},{name:1990,x:1990,y:75.7,r:57.1}]}]},o.c([Object(i.Input)(),o.f("design:type",Object)],t.prototype,"options",void 0),t=o.c([Object(i.Component)({selector:"zc-other-charts",template:e("8DY1"),styles:[e("U6Uy")]}),o.f("design:paramtypes",[])],t)}(),r=e("bY52");e.d(n,"ZcOtherChartsModule",function(){return l});var l=function(){function t(){}return t=o.c([Object(i.NgModule)({declarations:[a],imports:[s.CommonModule,r.a],exports:[a]})],t)}()},"R+ki":function(t,n,e){"use strict";e.d(n,"a",function(){return a});var o=e("D57K"),i=e("DwTn"),s=e("diMa");function a(t,n){return void 0===n&&(n=s.a),function(e){return e.lift(new r(t,n))}}var r=function(){function t(t,n){this.dueTime=t,this.scheduler=n}return t.prototype.call=function(t,n){return n.subscribe(new l(t,this.dueTime,this.scheduler))},t}(),l=function(t){function n(n,e,o){var i=t.call(this,n)||this;return i.dueTime=e,i.scheduler=o,i.debouncedSubscription=null,i.lastValue=null,i.hasValue=!1,i}return o.d(n,t),n.prototype._next=function(t){this.clearDebounce(),this.lastValue=t,this.hasValue=!0,this.add(this.debouncedSubscription=this.scheduler.schedule(p,this.dueTime,this))},n.prototype._complete=function(){this.debouncedNext(),this.destination.complete()},n.prototype.debouncedNext=function(){if(this.clearDebounce(),this.hasValue){var t=this.lastValue;this.lastValue=null,this.hasValue=!1,this.destination.next(t)}},n.prototype.clearDebounce=function(){var t=this.debouncedSubscription;null!==t&&(this.remove(t),t.unsubscribe(),this.debouncedSubscription=null)},n}(i.a);function p(t){t.debouncedNext()}},U6Uy:function(t,n){t.exports=""}}]);