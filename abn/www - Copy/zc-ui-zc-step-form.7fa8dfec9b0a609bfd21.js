(window.webpackJsonp=window.webpackJsonp||[]).push([[54],{G66B:function(t,e){t.exports='<form [formGroup]="form" [ngSwitch]="options.properties.displayStyle">\r\n  <mat-vertical-stepper (selectionChange)="selectionChange($event)"  *ngSwitchCase="\'vertical\'" [linear]="options.properties.isLinear" #stepper>\r\n    <mat-step *ngFor="let tab of options.steps; let index = index; let last = last">\r\n      <ng-template matStepLabel>{{ tab.title }}\r\n        <div class="tab-description" *ngIf="tab.description">\r\n          {{ tab.description }}\r\n        </div>\r\n      </ng-template>\r\n      <div class="col-lg-12">\r\n        <zc-form [options]="{\r\n            fields: tab.fields,\r\n            id: options.id + \'_step_form_\' + index,\r\n            mode: \'view\'\r\n          }" [formlyOptions]="formlyOptions[index]" [form]="form.at(index)" [model]="model">\r\n        </zc-form>\r\n      </div>\r\n      <div class="col-12 step-actions" *ngIf="options.properties.hideNavigator !== true">\r\n        <button *ngIf="index !== 0" class="btn btn-secondary" type="button" (click)="previous()">\r\n          Back\r\n        </button>\r\n        <button *ngIf="!last" class="btn btn-primary ml-1" type="button" (click)="next()">\r\n          Next\r\n        </button>\r\n      </div>\r\n    </mat-step>\r\n  </mat-vertical-stepper>\r\n  <mat-tab-group *ngSwitchCase="\'tab\'" [selectedIndex]="selectedTabIndex"\r\n    (selectedIndexChange)="selectedTabIndex = $event">\r\n    <mat-tab *ngFor="let step of steps; let index = index; let last = last" [label]="step.title"\r\n      [disabled]="index !== 0 && step.disabled">\r\n      \x3c!-- <ng-template matTabContent> --\x3e\r\n      <div class="col-lg-12 tab-container">\r\n        <zc-form [options]="{\r\n            fields: step.fields,\r\n            id: options.id + \'_step_form_\' + step.id\r\n          }" [formlyOptions]="formlyOptions[step.id]" [form]="form.at(step.id)" [model]="model">\r\n        </zc-form>\r\n      </div>\r\n      \x3c!-- </ng-template> --\x3e\r\n    </mat-tab>\r\n  </mat-tab-group>\r\n  <mat-horizontal-stepper (selectionChange)="selectionChange($event)" *ngSwitchDefault [linear]="options.properties.isLinear" #stepper>\r\n    <ng-container *ngIf="showForm">\r\n      <ng-container *ngFor="let step of steps; let index = index; let last = last">\r\n        <mat-step [completed]="false" [stepControl]="form.at(step.id)">\r\n          <ng-template matStepLabel>\r\n            <span class="tab-title" *ngIf="step.title">{{ step.title }}</span>\r\n            <span class="tab-icon" *ngIf="step.icon" [ngClass]="step.icon" matTooltip="{{step.title}}" matTooltipPosition="right"></span>\r\n\r\n            <div class="tab-description" *ngIf="step.description">\r\n              {{ step.description }}\r\n            </div>\r\n          </ng-template>\r\n          <div class="col-lg-12" *ngIf="step.showForm">\r\n            <zc-form [options]="{\r\n                fields: step.fields,\r\n                id: options.id + \'_step_form_\' + step.id,\r\n                mode: formMode\r\n              }" [formlyOptions]="formlyOptions[step.id]" [form]="form.at(step.id)" [model]="model">\r\n            </zc-form>\r\n          </div>\r\n          <div class="col-12 step-actions" *ngIf="options.properties.hideNavigator !== true">\r\n            <button *ngIf="index !== 0" class="btn btn-secondary" type="button" (click)="previous()">\r\n              Back\r\n            </button>\r\n            <button *ngIf="!last" class="btn btn-primary ml-1" type="button" (click)="next()">\r\n              Next\r\n            </button>\r\n          </div>\r\n        </mat-step>\r\n      </ng-container>\r\n    </ng-container>\r\n  </mat-horizontal-stepper>\r\n</form>\r\n'},vTer:function(t,e,o){"use strict";o.r(e);var i=o("D57K"),n=o("LoAr"),s={properties:{displayStyle:"horizontal",isLinear:!0,hideNavigator:!1},steps:[]},r=o("IfiR"),p=o("Cwp2"),a=o("05nE"),l=function(){function t(t,e){this.actionService=t,this.http=e,this.showForm=!1,this.showNavigator=!0,this.model={},this.formMode="edit",this.selectedTabIndex=0}return t.prototype.ngOnInit=function(){var t=this;if(this.options=i.a({},s,this.options),this.options.mode&&(this.formMode=this.options.mode),this.options.properties=i.a({},s.properties,this.options.properties),this.form=new r.FormArray(this.options.steps.map(function(){return new r.FormGroup({})})),this.steps=this.options.steps.map(function(t,e){return t.id=e,t}),this.formlyOptions=this.options.steps.map(function(){return{formState:{submitted:!1}}}),this.checkConditions(),this.showForm=!0,this.options.uid&&(this.model.uid=this.options.uid),this.options.params&&(this.model=i.a({},this.model,this.options.params)),this.options.model&&(this.model=i.a({},this.model,this.options.model)),this.model.uid||this.options.properties&&this.options.properties.preFillApi&&!this.options.properties.preFillApi.params){var e={};this.options.properties&&this.options.properties.preFillApi&&(this.options.properties.preFillApi.params&&(e=this.actionService.getParams(this.options.properties.preFillApi.params,this.model)),this.showForm=!1,this.http.request(this.options.properties.preFillApi.method,this.options.properties.preFillApi.url,e).subscribe(function(e){e.data&&Object.keys(e.data).length>0&&(t.model=e.data),t.showForm=!0}))}this.form.valueChanges.subscribe(function(e){if(t.checkConditions(),"tab"===t.options.properties.displayStyle&&t.options.properties.isLinear){var o=!0;t.steps.map(function(e,i){return e.disabled=!0,0===i?e.disabled=!1:o&&(t.form.at(t.steps[i-1].id).valid?e.disabled=!1:o=!1),e})}}),this.tabPrefillApi(this.selectedTabIndex)},t.prototype.ngAfterViewInit=function(){zc[this.options.id]=this},t.prototype.next=function(){var t;t="tab"===this.options.properties.displayStyle?this.selectedTabIndex:this.stepper.selectedIndex;var e=this.steps[t].id;this.formlyOptions[e].formState.submitted=!0,this.form.at(e).invalid,!this.form.at(e).valid&&this.options.properties.isLinear||("tab"===this.options.properties.displayStyle?this.selectedTabIndex++:this.stepper.next())},t.prototype.previous=function(){"tab"===this.options.properties.displayStyle?this.selectedTabIndex--:this.stepper.previous()},t.prototype.selectionChange=function(t){console.log("event",t.selectedIndex),this.tabPrefillApi(t.selectedIndex)},t.prototype.tabPrefillApi=function(t){var e=this,o=this.options.steps[t];o.showForm=!0;if(o.conditions&&o.conditions.preFillApi&&a.o.evalFun(o.conditions.preFillApi,{model:this.model,item:this.model},!0)&&o.preFillApi.url){var i={};o.preFillApi&&(o.preFillApi.params&&(i=this.actionService.getParams(o.preFillApi.params,this.model)),o.showForm=!1,this.http.request(o.preFillApi.method,o.preFillApi.url,i).subscribe(function(t){t.data&&Object.keys(t.data).length>0&&Object.assign(e.model,t.data),o.showForm=!0}))}},t.prototype.goto=function(t){},t.prototype.checkConditions=function(){var t=this;this.steps=this.options.steps.filter(function(e,o){var i=!1;if(e.conditions&&e.conditions.hidden)try{var n=new Function("model","return "+t.appendFormModel(e.conditions.hidden))(t.model);n?(t.form.controls[e.id]=new r.FormGroup({}),i=n):i=!1}catch(s){i=!0,t.form.controls[e.id]=new r.FormGroup({})}if(!i)return e})},t.prototype.appendFormModel=function(t){return t=(t=(t=t.replace(/\$/g,"model.")).replace(/\[/g,"['")).replace(/\]/g,"']")},t.prototype.submit=function(t){return this.formlyOptions.forEach(function(t){t.formState.submitted=!0}),this.model},t.prototype.focusOnField=function(t){try{for(var e=0;e<Object.keys(t).length;e++){var o=Object.keys(t),i=t[o[e]];if(i.controls)this.focusOnField(i.controls);else if(i.invalid)return document.getElementById(o[e]).focus(),!1}}catch(n){console.log("error",n)}},t.prototype.reset=function(){var t=this.steps[this.stepper.selectedIndex].id;this.formlyOptions[t].formState.submitted=!1,this.model={},this.formlyOptions[t].resetModel()},t.prototype.resetModel=function(t){var e=this;t.data&&Object.keys(t.data).forEach(function(o){var i=e.getFormFieldByName(e.form.controls,o);i?i.setValue(t.data[o]):e.model[o]=t.data[o]})},t.prototype.getFormFieldByName=function(t,e){var o=Object.keys(t),i=o.indexOf(e);if(-1!==i)return t[o[i]];for(var n=null,s=0;s<o.length;s++){var r=t[o[s]];if(r.controls&&(n=this.getFormFieldByName(r.controls,e)))break}return n},i.c([Object(n.Input)(),i.f("design:type",Object)],t.prototype,"options",void 0),i.c([Object(n.ViewChild)("stepper"),i.f("design:type",p.a)],t.prototype,"stepper",void 0),t=i.c([Object(n.Component)({selector:"zc-step-form",template:o("G66B"),styles:[o("y4Ij")]}),i.f("design:paramtypes",[a.a,a.c])],t)}(),d=function(){function t(){}return t.prototype.transform=function(t,e){return console.log("args",e),t},t=i.c([Object(n.Pipe)({name:"stepPipe"})],t)}(),c=o("eQXH"),m=o("pnHo");o.d(e,"ZcStepFormModule",function(){return h});var h=function(){function t(){}return t=i.c([Object(n.NgModule)({imports:[c.a,m.a],declarations:[l,d],exports:[l]})],t)}()},y4Ij:function(t,e){t.exports=""}}]);