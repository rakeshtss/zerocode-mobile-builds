(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{A9km:function(n,e,i){"use strict";i.r(e);var o=i("D57K"),t=i("LoAr"),s=i("WT9V"),a=function(){function n(){}return n.prototype.ngOnInit=function(){this.options.chartType||(this.options.chartType="line"),this.setChartData(this.options.chartType),console.log("options",this.options)},n.prototype.setChartData=function(n){switch(n){case"line":this.options.title=this.options.title?this.options.title:"Line Chart",this.getChartJSON();break;case"polar":this.options.title=this.options.title?this.options.title:"Polar Chart",this.options.rangeFillOpacity=.15,this.getChartJSON();break;case"area":this.options.title=this.options.title?this.options.title:"Area Chart",this.getChartJSON();break;case"area-stacked":this.options.title=this.options.title?this.options.title:"Stacked Area Chart",this.getChartJSON();break;case"area-normalized":this.options.title=this.options.title?this.options.title:"Normalized Area Chart",this.getChartJSON();break;default:this.options.title=this.options.title?this.options.title:"Line Chart",this.getChartJSON()}},n.prototype.getChartJSON=function(){this.options.data=[],this.options.chartData&&this.options.chartData.length&&(this.options.data=this.options.chartData),this.options.data.length||(this.options.data=[{name:"Niue",series:[{value:4986,name:"2016-09-17T16:49:21.894Z"},{value:4729,name:"2016-09-19T02:05:51.907Z"},{value:4942,name:"2016-09-19T17:20:58.215Z"},{value:6305,name:"2016-09-18T06:26:55.552Z"},{value:3241,name:"2016-09-18T14:51:45.198Z"}]},{name:"Saint Pierre and Miquelon",series:[{value:5106,name:"2016-09-17T16:49:21.894Z"},{value:4810,name:"2016-09-19T02:05:51.907Z"},{value:5809,name:"2016-09-19T17:20:58.215Z"},{value:3261,name:"2016-09-18T06:26:55.552Z"},{value:4066,name:"2016-09-18T14:51:45.198Z"}]},{name:"Peru",series:[{value:6666,name:"2016-09-17T16:49:21.894Z"},{value:3831,name:"2016-09-19T02:05:51.907Z"},{value:2606,name:"2016-09-19T17:20:58.215Z"},{value:6318,name:"2016-09-18T06:26:55.552Z"},{value:5566,name:"2016-09-18T14:51:45.198Z"}]},{name:"Uruguay",series:[{value:5436,name:"2016-09-17T16:49:21.894Z"},{value:4334,name:"2016-09-19T02:05:51.907Z"},{value:6496,name:"2016-09-19T17:20:58.215Z"},{value:4960,name:"2016-09-18T06:26:55.552Z"},{value:2600,name:"2016-09-18T14:51:45.198Z"}]},{name:"Greece",series:[{value:6848,name:"2016-09-17T16:49:21.894Z"},{value:5710,name:"2016-09-19T02:05:51.907Z"},{value:2378,name:"2016-09-19T17:20:58.215Z"},{value:4414,name:"2016-09-18T06:26:55.552Z"},{value:6991,name:"2016-09-18T14:51:45.198Z"}]}])},n.prototype.onLegendLabelClick=function(n){console.log("onLegendLabelClick",n)},n.prototype.select=function(n){console.log("select",n)},n.prototype.dblclick=function(n){console.log("dblclick",n)},o.c([Object(t.Input)(),o.f("design:type",Object)],n.prototype,"options",void 0),n=o.c([Object(t.Component)({selector:"zc-line-area-chart",template:i("ORxs"),styles:[i("E1w2")]}),o.f("design:paramtypes",[])],n)}(),l=i("bY52");i.d(e,"ZcLineAreaChartModule",function(){return p});var p=function(){function n(){}return n=o.c([Object(t.NgModule)({declarations:[a],imports:[s.CommonModule,l.a],exports:[a]})],n)}()},E1w2:function(n,e){n.exports=""},ORxs:function(n,e){n.exports='<div *ngIf="options.displayTitle" class="zc-widget-header-title">\n  <h2 *ngIf="options.title">{{options.title}}</h2>\n  <span class="description" *ngIf="options.description">{{options.description}}</span>\n</div>\n<ngx-charts-line-chart\n  *ngIf="options.chartType === \'line\'"\n  [view]="options.view"\n  class="chart-container"\n  [results]="options.data"\n  [scheme]="options.colorScheme"\n\n  [animations]="options.animations"\n  [legend]="options.showLegend"\n  [legendTitle]="options.legendTitle"\n  [legendPosition]="options.legendPosition"\n  [gradient]="options.gradient"\n  [xAxis]="options.showXAxis"\n  [yAxis]="options.showYAxis"\n  [showXAxisLabel]="options.showXAxisLabel"\n  [showYAxisLabel]="options.showYAxisLabel"\n  [xAxisLabel]="options.xAxisLabel"\n  [yAxisLabel]="options.yAxisLabel"\n  [autoScale]="options.autoScale"\n  [xScaleMin]="options.xScaleMin"\n  [xScaleMax]="options.xScaleMax"\n  [yScaleMin]="options.yScaleMin"\n  [yScaleMax]="options.yScaleMax"\n  [timeline]="options.timeline"\n  [showGridLines]="options.showGridLines"\n  [rangeFillOpacity]="options.rangeFillOpacity"\n  [roundDomains]="options.roundDomains"\n  [tooltipDisabled]="options.tooltipDisabled"\n  (dblclick)="dblclick($event)"\n  (legendLabelClick)="onLegendLabelClick($event)"\n  (select)="select($event)">\n</ngx-charts-line-chart>\n\n<ngx-charts-polar-chart\n  *ngIf="options.chartType === \'polar\'"\n  [view]="options.view"\n  class="chart-container"\n  [scheme]="options.colorScheme"\n  [results]="options.data"\n  [animations]="options.animations"\n  [legend]="options.showLegend"\n  [legendTitle]="options.legendTitle"\n  [legendPosition]="options.legendPosition"\n  [gradient]="options.gradient"\n  [xAxis]="options.showXAxis"\n  [yAxis]="options.showYAxis"\n  [showXAxisLabel]="options.showXAxisLabel"\n  [showYAxisLabel]="options.showYAxisLabel"\n  [xAxisLabel]="options.xAxisLabel"\n  [yAxisLabel]="options.yAxisLabel"\n  [autoScale]="options.autoScale"\n  [showGridLines]="options.showGridLines"\n  [rangeFillOpacity]="options.rangeFillOpacity"\n  [roundDomains]="options.roundDomains"\n  [tooltipDisabled]="options.tooltipDisabled"\n  [showSeriesOnHover]="options.showSeriesOnHover"\n  (legendLabelClick)="onLegendLabelClick($event)"\n  (select)="select($event)">\n</ngx-charts-polar-chart>\n\n<ngx-charts-area-chart\n  *ngIf="options.chartType === \'area\'"\n  class="chart-container"\n  [view]="options.view"\n  [results]="options.data"\n  [scheme]="options.colorScheme"\n  [legendPosition]="options.legendPosition"\n  [animations]="options.animations"\n  [legend]="options.showLegend"\n  [legendTitle]="options.legendTitle"\n  [gradient]="options.gradient"\n  [xAxis]="options.showXAxis"\n  [yAxis]="options.showYAxis"\n  [showXAxisLabel]="options.showXAxisLabel"\n  [showYAxisLabel]="options.showYAxisLabel"\n  [xAxisLabel]="options.xAxisLabel"\n  [yAxisLabel]="options.yAxisLabel"\n  [autoScale]="options.autoScale"\n  [xScaleMin]="options.xScaleMin"\n  [xScaleMax]="options.xScaleMax"\n  [yScaleMin]="options.yScaleMin"\n  [yScaleMax]="options.yScaleMax"\n  [timeline]="options.timeline"\n  [showGridLines]="options.showGridLines"\n  [tooltipDisabled]="options.tooltipDisabled"\n  (dblclick)="dblclick($event)"\n  (legendLabelClick)="onLegendLabelClick($event)"\n  (select)="select($event)">\n</ngx-charts-area-chart>\n\n<ngx-charts-area-chart-stacked\n  *ngIf="options.chartType === \'area-stacked\'"\n  class="chart-container"\n  [view]="options.view"\n  [results]="options.data"\n  [scheme]="options.colorScheme"\n  [animations]="options.animations"\n  [legend]="options.showLegend"\n  [legendTitle]="options.legendTitle"\n  [legendPosition]="options.legendPosition"\n  [gradient]="options.gradient"\n  [xAxis]="options.showXAxis"\n  [yAxis]="options.showYAxis"\n  [showXAxisLabel]="options.showXAxisLabel"\n  [showYAxisLabel]="options.showYAxisLabel"\n  [xAxisLabel]="options.xAxisLabel"\n  [yAxisLabel]="options.yAxisLabel"\n  [timeline]="options.timeline"\n  [xScaleMin]="options.xScaleMin"\n  [xScaleMax]="options.xScaleMax"\n  [yScaleMin]="options.yScaleMin"\n  [yScaleMax]="options.yScaleMax"\n  [showGridLines]="options.showGridLines"\n  [tooltipDisabled]="options.tooltipDisabled"\n  (dblclick)="dblclick($event)"\n  (legendLabelClick)="onLegendLabelClick($event)"\n  (select)="select($event)">\n</ngx-charts-area-chart-stacked>\n\n<ngx-charts-area-chart-normalized\n  *ngIf="options.chartType === \'area-normalized\'"\n  class="chart-container"\n  [view]="options.view"\n  [scheme]="options.colorScheme"\n  [results]="options.data"\n  [animations]="options.animations"\n  [legend]="options.showLegend"\n  [legendTitle]="options.legendTitle"\n  [legendPosition]="options.legendPosition"\n  [gradient]="options.gradient"\n  [xAxis]="options.showXAxis"\n  [yAxis]="options.showYAxis"\n  [showXAxisLabel]="options.showXAxisLabel"\n  [showYAxisLabel]="options.showYAxisLabel"\n  [xAxisLabel]="options.xAxisLabel"\n  [yAxisLabel]="options.yAxisLabel"\n  [timeline]="options.timeline"\n  [showGridLines]="options.showGridLines"\n  [tooltipDisabled]="options.tooltipDisabled"\n  (dblclick)="dblclick($event)"\n  (legendLabelClick)="onLegendLabelClick($event)"\n  (select)="select($event)">\n</ngx-charts-area-chart-normalized>\n'}}]);