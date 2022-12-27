(window.webpackJsonp=window.webpackJsonp||[]).push([[68],{G66B:function(t,e){t.exports='<form [formGroup]="form" [ngSwitch]="options.properties.displayStyle">\r\n  <mat-vertical-stepper (selectionChange)="selectionChange($event)" *ngSwitchCase="\'vertical\'"\r\n    [linear]="options.properties.isLinear" #stepper>\r\n    <mat-step *ngFor="let tab of options.steps; let index = index; let last = last">\r\n      <ng-template matStepLabel>{{ tab.title }}\r\n        <div class="tab-description" *ngIf="tab.description">\r\n          {{ tab.description }}\r\n        </div>\r\n      </ng-template>\r\n      <div class="col-lg-12">\r\n        <zc-form [options]="{\r\n            fields: tab.fields,\r\n            id: options.id + \'_step_form_\' + index,\r\n            mode: \'view\'\r\n          }" [formlyOptions]="formlyOptions[index]" [form]="form.at(index)" [model]="model">\r\n        </zc-form>\r\n      </div>\r\n      <div class="col-12 step-actions" *ngIf="options.properties.hideNavigator !== true">\r\n        <button *ngIf="index !== 0" class="btn btn-secondary" type="button" (click)="previous()">\r\n          Back\r\n        </button>\r\n        <button *ngIf="!last" class="btn btn-primary ml-1" type="button" (click)="next()">\r\n          Next\r\n        </button>\r\n      </div>\r\n    </mat-step>\r\n  </mat-vertical-stepper>\r\n  <mat-tab-group *ngSwitchCase="\'tab\'" [selectedIndex]="selectedTabIndex"\r\n    (selectedIndexChange)="selectedTabIndex = $event">\r\n    <mat-tab *ngFor="let step of steps; let index = index; let last = last" [label]="step.title"\r\n      [disabled]="index !== 0 && step.disabled">\r\n      \x3c!-- <ng-template matTabContent> --\x3e\r\n      <div class="col-lg-12 tab-container">\r\n        <zc-form [options]="{\r\n            fields: step.fields,\r\n            id: options.id + \'_step_form_\' + step.id\r\n          }" [formlyOptions]="formlyOptions[step.id]" [form]="form.at(step.id)" [model]="model">\r\n        </zc-form>\r\n      </div>\r\n      \x3c!-- </ng-template> --\x3e\r\n    </mat-tab>\r\n  </mat-tab-group>\r\n  <mat-horizontal-stepper (selectionChange)="selectionChange($event)" *ngSwitchDefault\r\n    [linear]="options.properties.isLinear" #stepper>\r\n    <ng-container *ngIf="showForm">\r\n      <ng-container *ngFor="let step of steps; let index = index; let last = last">\r\n        <mat-step  [completed]="false" [stepControl]="form.at(step.id)">\r\n          <ng-template matStepLabel>\r\n            <div class="zc-stepper-header" [ngClass]="{\'step-active\':index==selectedTabIndex,\'step-success\':step.valid,\'step-error\':step.invalid}">\r\n              <span class="zc-step-header-title">\r\n              <span class="tab-title" *ngIf="step.title">{{ step.title }}</span>\r\n              <span class="tab-icon" *ngIf="step.icon" [ngClass]="step.icon" matTooltip="{{step.title}}"\r\n                matTooltipPosition="right"></span>\r\n\r\n              <div class="tab-description" *ngIf="step.description">\r\n                {{ step.description }}\r\n              </div>\r\n             </span>\r\n            </div>\r\n          </ng-template>\r\n          <div class="col-lg-12"  [ngClass]="(step.showForm)?\'d-block\':\'d-none\'">\r\n            <zc-form [options]="{\r\n                fields: step.fields,\r\n                id: options.id + \'_step_form_\' + step.id,\r\n                mode: formMode\r\n              }" [formlyOptions]="formlyOptions[step.id]" [form]="form.at(step.id)" [model]="model">\r\n            </zc-form>\r\n          </div>\r\n          <div class="col-12 step-actions" *ngIf="options.properties.hideNavigator !== true">\r\n            <button *ngIf="index !== 0" class="btn btn-secondary" type="button" (click)="previous()">\r\n              Back\r\n            </button>\r\n            <button *ngIf="!last" class="btn btn-primary ml-1" type="button" (click)="next()">\r\n              Next\r\n            </button>\r\n          </div>\r\n        </mat-step>\r\n      </ng-container>\r\n    </ng-container>\r\n  </mat-horizontal-stepper>\r\n</form>\r\n'},vTer:function(t,e,i){"use strict";i.r(e);var o=i("D57K"),s=i("LoAr"),n={properties:{displayStyle:"horizontal",isLinear:!0,hideNavigator:!1},steps:[]},r=i("IfiR"),p=i("Cwp2"),a=i("05nE"),l=function(){function t(t,e){this.actionService=t,this.http=e,this.showForm=!1,this.showNavigator=!0,this.model={},this.formMode="edit",this.selectedTabIndex=0}return t.prototype.ngOnInit=function(){var t=this;if(this.options=o.a({},n,this.options),this.options.mode&&(this.formMode=this.options.mode),this.options.properties=o.a({},n.properties,this.options.properties),this.form=new r.FormArray(this.options.steps.map(function(){return new r.FormGroup({})})),this.steps=this.options.steps.map(function(t,e){return t.id=e,t}),this.formlyOptions=this.options.steps.map(function(){return{formState:{submitted:!1}}}),this.checkConditions(),this.showForm=!0,this.options.uid&&(this.model.uid=this.options.uid),this.options.params&&(this.model=o.a({},this.model,this.options.params)),this.options.model&&(this.model=o.a({},this.model,this.options.model)),this.model.uid||this.options.properties&&this.options.properties.preFillApi&&!this.options.properties.preFillApi.params){var e={};this.options.properties&&this.options.properties.preFillApi&&(this.options.properties.preFillApi.params&&(e=this.actionService.getParams(this.options.properties.preFillApi.params,this.model)),this.showForm=!1,this.http.request(this.options.properties.preFillApi.method,this.options.properties.preFillApi.url,e).subscribe(function(e){e.data&&Object.keys(e.data).length>0&&(t.model=e.data),t.showForm=!0}))}this.form.valueChanges.subscribe(function(e){if(t.checkConditions(),"tab"===t.options.properties.displayStyle&&t.options.properties.isLinear){var i=!0;t.steps.map(function(e,o){return e.disabled=!0,0===o?e.disabled=!1:i&&(t.form.at(t.steps[o-1].id).valid?e.disabled=!1:i=!1),e})}}),this.tabPrefillApi(this.selectedTabIndex)},t.prototype.ngAfterViewInit=function(){zc[this.options.id]=this},t.prototype.next=function(){var t,e=this;t="tab"===this.options.properties.displayStyle?this.selectedTabIndex:this.stepper.selectedIndex;var i=this.steps[t].id,o=this.options.steps[t];o.nextAction&&this.actionService.action(o.nextAction,{step:o}),o.nextActions&&o.nextActions.forEach(function(t){e.actionService.action(t,{step:o})}),this.formlyOptions[i].formState.submitted=!0,this.form.at(i).invalid&&(this.focusOnField(this.form.controls[i].controls),this.steps[t].invalid=!0,this.steps[t].valid=!1),!this.form.at(i).valid&&this.options.properties.isLinear||(this.steps[t].valid=!0,this.steps[t].invalid=!1,"tab"===this.options.properties.displayStyle?this.selectedTabIndex++:this.stepper.next())},t.prototype.previous=function(){"tab"===this.options.properties.displayStyle?this.selectedTabIndex--:this.stepper.previous()},t.prototype.selectionChange=function(t){console.log("event",t.selectedIndex),this.selectedTabIndex=t.selectedIndex,this.tabPrefillApi(t.selectedIndex)},t.prototype.tabPrefillApi=function(t){var e=this,i=this.options.steps[t];i.showForm=!0;if(i.conditions&&i.conditions.preFillApi&&a.p.evalFun(i.conditions.preFillApi,{model:this.model,item:this.model},!0)&&i.preFillApi.url){var o={};i.preFillApi&&(i.preFillApi.params&&(o=this.actionService.getParams(i.preFillApi.params,this.model)),i.showForm=!1,this.http.request(i.preFillApi.method,i.preFillApi.url,o).subscribe(function(t){t.data&&Object.keys(t.data).length>0&&Object.assign(e.model,t.data),i.showForm=!0}))}},t.prototype.goto=function(t){},t.prototype.checkConditions=function(){var t=this;this.steps=this.options.steps.filter(function(e,i){var o=!1;if(e.conditions&&e.conditions.hidden)try{var s=new Function("model","return "+t.appendFormModel(e.conditions.hidden))(t.model);s?(t.form.controls[e.id]=new r.FormGroup({}),o=s):o=!1}catch(n){o=!0,t.form.controls[e.id]=new r.FormGroup({})}if(!o)return e})},t.prototype.appendFormModel=function(t){return t=(t=(t=t.replace(/\$/g,"model.")).replace(/\[/g,"['")).replace(/\]/g,"']")},t.prototype.submit=function(t){return this.formlyOptions.forEach(function(t){t.formState.submitted=!0}),this.model},t.prototype.focusOnField=function(t){try{for(var e=0;e<Object.keys(t).length;e++){var i=Object.keys(t),o=t[i[e]];if(o.controls)this.focusOnField(o.controls);else if(o.invalid)return document.getElementById(i[e]).focus(),!1}}catch(s){console.log("error",s)}},t.prototype.reset=function(){var t=this.steps[this.stepper.selectedIndex].id;this.formlyOptions[t].formState.submitted=!1,this.model={},this.formlyOptions[t].resetModel()},t.prototype.resetModel=function(t){var e=this;t.data&&Object.keys(t.data).forEach(function(i){var o=e.getFormFieldByName(e.form.controls,i);o?o.setValue(t.data[i]):e.model[i]=t.data[i]})},t.prototype.getFormFieldByName=function(t,e){var i=Object.keys(t),o=i.indexOf(e);if(-1!==o)return t[i[o]];for(var s=null,n=0;n<i.length;n++){var r=t[i[n]];if(r.controls&&(s=this.getFormFieldByName(r.controls,e)))break}return s},o.c([Object(s.Input)(),o.f("design:type",Object)],t.prototype,"options",void 0),o.c([Object(s.ViewChild)("stepper"),o.f("design:type",p.a)],t.prototype,"stepper",void 0),t=o.c([Object(s.Component)({selector:"zc-step-form",template:i("G66B"),styles:[i("y4Ij")]}),o.f("design:paramtypes",[a.a,a.c])],t)}(),d=function(){function t(){}return t.prototype.transform=function(t,e){return console.log("args",e),t},t=o.c([Object(s.Pipe)({name:"stepPipe"})],t)}(),c=i("eQXH"),m=i("pnHo");i.d(e,"ZcStepFormModule",function(){return h});var h=function(){function t(){}return t=o.c([Object(s.NgModule)({imports:[c.a,m.a],declarations:[l,d],exports:[l]})],t)}()},y4Ij:function(t,e){t.exports=".step-error {\n  background-color: red; }\n\n.step-success {\n  background-color: green; }\n"}}]);