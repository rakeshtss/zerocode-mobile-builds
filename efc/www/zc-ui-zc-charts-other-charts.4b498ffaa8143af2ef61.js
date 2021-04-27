(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{"8DY1":function(t,n){t.exports='<div *ngIf="options.displayTitle" class="zc-widget-header-title">\r\n  <h2 *ngIf="options.title">{{options.title}}</h2>\r\n  <span class="description" *ngIf="options.description">{{options.description}}</span>\r\n</div>\r\n<ngx-charts-bubble-chart\r\n  *ngIf="options.chartType === \'bubble\'"\r\n  [view]="options.view"\r\n  class="chart-container"\r\n  [results]="options.data"\r\n  [scheme]="options.colorScheme"\r\n  [animations]="options.animations"\r\n  [showGridLines]="options.showGridLines"\r\n  [legend]="options.showLegend"\r\n  [legendTitle]="options.legendTitle"\r\n  [legendPosition]="options.legendPosition"\r\n  [xAxis]="options.showXAxis"\r\n  [yAxis]="options.showYAxis"\r\n  [showXAxisLabel]="options.showXAxisLabel"\r\n  [showYAxisLabel]="options.showYAxisLabel"\r\n  [xAxisLabel]="options.xAxisLabel"\r\n  [yAxisLabel]="options.yAxisLabel"\r\n  [autoScale]="options.autoScale"\r\n  [xScaleMin]="options.xScaleMin"\r\n  [xScaleMax]="options.xScaleMax"\r\n  [yScaleMin]="options.yScaleMin"\r\n  [yScaleMax]="options.yScaleMax"\r\n  [roundDomains]="options.roundDomains"\r\n  [tooltipDisabled]="options.tooltipDisabled"\r\n  >\r\n</ngx-charts-bubble-chart>\r\n\r\n<ngx-charts-tree-map\r\n  *ngIf="options.chartType === \'tree-map\'"\r\n  class="chart-container"\r\n  [view]="options.view"\r\n  [scheme]="options.colorScheme"\r\n  [results]="options.data"\r\n  [animations]="options.animations"\r\n  [tooltipDisabled]="options.tooltipDisabled"\r\n  [gradient]="options.gradient"\r\n  (legendLabelClick)="onLegendLabelClick($event)"\r\n  (select)="select($event)">\r\n</ngx-charts-tree-map>\r\n\r\n<ngx-charts-number-card\r\n  *ngIf="options.chartType === \'number-card\'"\r\n  class="chart-container"\r\n  [view]="options.view"\r\n  (legendLabelClick)="onLegendLabelClick($event)"\r\n  [scheme]="options.colorScheme"\r\n  [cardColor]="options.cardColor"\r\n  [emptyColor]="options.emptyColor"\r\n  [results]="options.data"\r\n  [animations]="options.animations"\r\n  (select)="select($event)">\r\n</ngx-charts-number-card>\r\n\r\n<ngx-charts-gauge\r\n  *ngIf="options.chartType === \'gauge\'"\r\n  class="chart-container"\r\n  [view]="options.view"\r\n  [scheme]="options.colorScheme"\r\n  [legend]="options.showLegend"\r\n  [legendTitle]="options.legendTitle"\r\n  [legendPosition]="options.legendPosition"\r\n  [results]="options.data"\r\n  [animations]="options.animations"\r\n  [textValue]="options.gaugeTextValue"\r\n  [min]="options.gaugeMin"\r\n  [max]="options.gaugeMax"\r\n  [units]="options.gaugeUnits"\r\n  [angleSpan]="options.gaugeAngleSpan || 240"\r\n  [startAngle]="options.gaugeStartAngle || -120"\r\n  [showAxis]="options.gaugeShowAxis"\r\n  [bigSegments]="options.gaugeLargeSegments"\r\n  [smallSegments]="options.gaugeSmallSegments"\r\n  [tooltipDisabled]="options.tooltipDisabled"\r\n  (select)="select($event)"\r\n  [margin]="options.margin ? [options.marginTop, options.marginRight, options.marginBottom, options.marginLeft] : null"\r\n  (legendLabelClick)="onLegendLabelClick($event)">\r\n</ngx-charts-gauge>\r\n\r\n<ngx-charts-linear-gauge\r\n  *ngIf="options.chartType === \'linear-gauge\'"\r\n  class="chart-container" [view]="options.view"\r\n  [scheme]="options.colorScheme"\r\n  [animations]="options.animations"\r\n  [min]="options.gaugeMin"\r\n  [max]="options.gaugeMax"\r\n  [value]="options.gaugeValue"\r\n  [units]="options.gaugeUnits"\r\n  (select)="select($event)">\r\n</ngx-charts-linear-gauge>\r\n'},QDW9:function(t,n,e){"use strict";e.r(n);var o=e("D57K"),i=e("LoAr"),s=e("WT9V"),a=function(){function t(){}return t.prototype.ngOnInit=function(){this.options.chartType||(this.options.chartType="bubble"),this.options.cardColor||(this.options.cardColor="#232837"),this.options.emptyColor||(this.options.emptyColor="#1e222e"),this.options.gaugeUnits||(this.options.gaugeUnits="units"),this.options.gaugeValue||(this.options.gaugeValue=75),this.setChartData(this.options.chartType),console.log("options",this.options)},t.prototype.onLegendLabelClick=function(t){console.log("onLegendLabelClick",t)},t.prototype.select=function(t){console.log("select",t)},t.prototype.dblclick=function(t){console.log("dblclick",t)},t.prototype.setChartData=function(t){switch(t){case"bubble":this.options.title=this.options.title?this.options.title:"Bubble Chart",this.options.autoScale=!0,this.options.showGridLines=!0,this.bubbleChartData();break;case"tree-map":this.options.title=this.options.title?this.options.title:"Tree Map Chart",this.treeMapData();break;case"number-card":this.options.title=this.options.title?this.options.title:"Number Card Chart",this.treeMapData();break;case"gauge":this.options.title=this.options.title?this.options.title:"Gauge Chart",this.treeMapData();break;case"linear-gauge":this.options.title=this.options.title?this.options.title:"Linear Gauge Chart",this.treeMapData();break;default:this.options.title=this.options.title?this.options.title:"Bubble Chart",this.bubbleChartData()}},t.prototype.bubbleChartData=function(){this.options.data=[],this.options.chartData&&this.options.chartData.length&&(this.options.data=this.options.chartData),this.options.data.length||(this.options.data=[{name:"Hungary",series:[{name:"2002",x:"2001-12-31T18:30:00.000Z",y:53,r:32}]},{name:"Brazil",series:[{name:"2009",x:"2008-12-31T18:30:00.000Z",y:49,r:32}]},{name:"Bermuda",series:[{name:"1992",x:"1991-12-31T18:30:00.000Z",y:97,r:48}]},{name:"Saudi Arabia",series:[{name:"1995",x:"1994-12-31T18:30:00.000Z",y:49,r:36}]},{name:"Romania",series:[{name:"2001",x:"2000-12-31T18:30:00.000Z",y:56,r:35}]},{name:"Argentina",series:[{name:"2003",x:"2002-12-31T18:30:00.000Z",y:65,r:31}]},{name:"Yemen",series:[{name:"2008",x:"2007-12-31T18:30:00.000Z",y:94,r:32}]},{name:"Malaysia",series:[{name:"1994",x:"1993-12-31T18:30:00.000Z",y:34,r:31}]}])},t.prototype.treeMapData=function(){this.options.data=[],this.options.chartData&&this.options.chartData.length&&(this.options.data=this.options.chartData),this.options.data.length||(this.options.data=[{name:"Germany",value:40632},{name:"United Kingdom",value:36240},{name:"Spain",value:33e3},{name:"Suriname",value:52703},{name:"Qatar",value:45292},{name:"Suriname",value:22809},{name:"Cook Islands",value:11338}])},t.prototype.bubbleChartData1=function(){this.options.data=[{name:"Germany",series:[{name:2010,x:2010,y:80.3,r:80.4},{name:2e3,x:2e3,y:80.3,r:78},{name:1990,x:1990,y:75.4,r:79}]},{name:"United States",series:[{name:2010,x:2010,y:78.8,r:310},{name:2e3,x:2e3,y:76.9,r:283},{name:1990,x:1990,y:75.4,r:253}]},{name:"France",series:[{name:2010,x:2010,y:81.4,r:63},{name:2e3,x:2e3,y:79.1,r:59.4},{name:1990,x:1990,y:77.2,r:56.9}]},{name:"United Kingdom",series:[{name:2010,x:2010,y:80.2,r:62.7},{name:2e3,x:2e3,y:77.8,r:58.9},{name:1990,x:1990,y:75.7,r:57.1}]}]},o.c([Object(i.Input)(),o.f("design:type",Object)],t.prototype,"options",void 0),t=o.c([Object(i.Component)({selector:"zc-other-charts",template:e("8DY1"),styles:[e("U6Uy")]}),o.f("design:paramtypes",[])],t)}(),r=e("bY52");e.d(n,"ZcOtherChartsModule",function(){return p});var p=function(){function t(){}return t=o.c([Object(i.NgModule)({declarations:[a],imports:[s.CommonModule,r.a],exports:[a]})],t)}()},U6Uy:function(t,n){t.exports=""}}]);