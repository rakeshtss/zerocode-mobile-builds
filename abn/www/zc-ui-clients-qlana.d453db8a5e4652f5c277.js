(window.webpackJsonp=window.webpackJsonp||[]).push([[19,58],{"/oWr":function(t,e){t.exports=""},"3Zpb":function(t,e,i){"use strict";i.r(e);var s=i("D57K"),a=i("LoAr"),n=i("05nE"),o=i("981U"),r=i("GiBk"),c=i("Jg5f"),u=function(){function t(t){this.http=t,this.currentStage={}}return t.prototype.getStageList=function(t,e,i,s){var a=this;return void 0===s&&(s=!1),this.http.post(t,e).pipe(Object(c.a)(function(t){var e=[];if(t&&t.data&&t.data.stageWidget&&t.data.stageWidget.config&&t.data.stageWidget.config.stages){var n=t.data.stageWidget.config.stages;a.currentStage=t.data.stage;var o=t.data.status;if(n&&s){if(a.currentStage)for(var r=function(s){var r=n[s];if(i){var c=i.find(function(t){return t.stage.code===r.info.code});c&&c.history&&c.history[0]&&(r.historyInfo=c.history[0])}if(r.info.index=s+1,r.info.code===a.currentStage.code){if(r.status=o,r.activeStatus=!0,e.push(r),!t.data.stageWidget.config.considerWorkflow)return"break"}else e.push(r)},c=0;c<n.length;c++){if("break"===r(c))break}else e.push(n[0]);e.reverse()}else e=n}return e}))},t.prototype.getFaStageList=function(t,e,i,s){var a=this;return void 0===s&&(s=!1),this.http.post(t,e).pipe(Object(c.a)(function(t){var e=[];if(t&&t.data&&t.data.stageWidget&&t.data.stageWidget.config&&t.data.stageWidget.config.stages){var n=t.data.stageWidget.config.stages;a.currentStage=t.data.stage;var o=t.data.status;if(n&&s)if(a.currentStage)for(var r=function(t){var s=n[t];if(i){var r=i.find(function(t){return t.stage.code===s.info.code});r&&r.history&&r.history[0]&&(s.historyInfo=r.history[0])}s.info.index=t+1,s.info.code===a.currentStage.code?(s.status=o,s.activeStatus=!0,e.push(s)):e.push(s)},c=0;c<n.length;c++)r(c);else e.push(n[0]);else e=n}return e}))},t.prototype.getCurrentStage=function(){return this.currentStage},t=s.c([Object(a.Injectable)({providedIn:"root"}),s.f("design:paramtypes",[n.c])],t)}(),g=function(){function t(t,e,i,s,a,n,o){this.http=t,this.actionService=e,this.unsavedDataAlertService=i,this.qlanaStageService=s,this.httpCache=a,this.route=n,this.router=o,this.stageList=[],this.currentStageIndex=0}return t.prototype.ngOnInit=function(){this.getStageList()},t.prototype.paramsSubscribe=function(){var t=this;this.paramsSubscribe$=this.route.queryParams.subscribe(function(e){t.queryPrams=e,t.queryPrams.page&&t.loadPage(t.queryPrams.page),t.currentStageIndex=t.getCurrentIndex()})},t.prototype.getStageList=function(){var t=this;this.stageList=[];var e=this.route.snapshot.params,i=(this.route.snapshot.queryParams,this.actionService.getParams(this.options.api.params,e));this.qlanaStageService.getStageList(this.options.api.url,i,null,this.options.isWorkflow).subscribe(function(e){e&&(e.forEach(function(e){if(console.log("stagedd",e),e.activeStatus){var i={info:e.info,status:e.status};zc.params=s.a({},zc.params,{activeStage:i})}e.sections.forEach(function(i){i.subSections.forEach(function(s){var a={};a.stage=e.info.code,a.section=i.info.code,a.subSection=s.info.code,a.page=s.info.page,a.data=s,t.stageList.push(a)})})}),t.paramsSubscribe())})},t.prototype.loadPage=function(t){var e=this,i=new r.HttpHeaders;this.httpCache.clearCache(),i=i.append("page",this.queryPrams.page),this.pageInfo=null;var s=t;s=-1!==s.indexOf("/")?"page/"+s:"page/_/_/"+s,this.http.get(s).subscribe(function(t){if(t.data.instructions.definition&&t.data.instructions.definition&&(t.data.instructions.definition.widgets&&(e.pageInfo=t.data.instructions.definition.widgets),t.data.instructions.definition.onLoad&&t.data.instructions.definition.onLoad.actions)){var i=t.data.instructions.definition.onLoad.actions;i.length>0&&i.forEach(function(t){e.actionService.action(t)})}},function(t){}),this.setCurrentStage()},t.prototype.next=function(){var t=this;this.unsavedDataAlertService.alertMsg().then(function(e){if(e){var i=t.getCurrentIndex(),s=t.stageList[i+1].page,a=t.stageList[i+1].stage;t.navigateUrl(s,a)}})},t.prototype.previous=function(){var t=this;this.unsavedDataAlertService.alertMsg().then(function(e){var i=t.getCurrentIndex();if(e&&0!==i){var s=t.stageList[i-1].page,a=t.stageList[i-1].stage;t.navigateUrl(s,a)}})},t.prototype.setCurrentStage=function(){var t={name:"stageWidget",meta:this.stageList[this.getCurrentIndex()]},e=JSON.parse(JSON.stringify(t)),i=e.meta.data;delete e.meta.data,zc.params=s.a({},zc.params,{currentStage:e,currentStageMetaData:i})},t.prototype.getCurrentIndex=function(){var t=this;return this.stageList.indexOf(this.stageList.find(function(e){return e.stage===t.queryPrams.stage&&e.page===t.queryPrams.page}))},t.prototype.navigateUrl=function(t,e){this.router.navigate([],{queryParams:{page:t,stage:e}})},t.prototype.ngOnDestroy=function(){this.paramsSubscribe$&&this.paramsSubscribe$.unsubscribe()},s.c([Object(a.Input)(),s.f("design:type",Object)],t.prototype,"options",void 0),t=s.c([Object(a.Component)({selector:"zc-qlana-stage-view",template:i("MAkz"),styles:[i("/oWr")]}),s.f("design:paramtypes",[n.c,n.a,n.l,u,n.g,o.ActivatedRoute,o.Router])],t)}(),p=i("DUHm"),d=i("G2Mx"),f=function(){function t(t,e,i,s,a,n){this.http=t,this.actionService=e,this.qlanaStageService=i,this.zcWorkflowHistory=s,this.router=a,this.route=n,this.showStage=!1}return t.prototype.ngOnInit=function(){this.showStage=!1,this.params=this.route.snapshot.params,this.getStageList()},t.prototype.timeTakenDays=function(t){var e=this.qlanaStageService.getCurrentStage(),i="",s="";(i=t.created?new Date(t.created):new Date).setHours(0,0,0,0),(s=t.last_modified&&e.code!==t.code?new Date(t.last_modified):new Date).setHours(0,0,0,0);var a=Math.abs(s.getTime()-i.getTime());return Math.ceil(a/864e5)},t.prototype.getStageList=function(){var t=this,e=this.actionService.getParams(this.options.api.params,this.params);if(console.log("this.options.isWorkflow --\x3e",this.options.isWorkflow),this.options.isWorkflow){this.showStage=!0;var i={entity:this.options.entity,uid:this.route.snapshot.params.uid};this.zcWorkflowHistory.getHistoryByStageGroup(i).subscribe(function(i){console.log("historyList",i),console.log("this.options.api.url",t.options.api.url),t.stageList$=t.qlanaStageService.getStageList(t.options.api.url,e,i,!0).pipe(Object(d.a)(1),Object(c.a)(function(t){return t}))}),console.log("this.stageList$ --\x3e",this.stageList$)}else this.stageList$=this.qlanaStageService.getStageList(this.options.api.url,e).pipe(Object(d.a)(1),Object(c.a)(function(e){return console.log("stage",e),e.length>1&&(t.showStage=!0),e}));console.log("this.stageList$",this.stageList$)},t.prototype.ngOnDestroy=function(){},s.c([Object(a.Input)(),s.f("design:type",Object)],t.prototype,"options",void 0),t=s.c([Object(a.Component)({selector:"zc-qlana-stage-list",template:i("Lv0o"),styles:[i("jNf5")]}),s.f("design:paramtypes",[n.c,n.a,u,p.a,o.Router,o.ActivatedRoute])],t)}(),l=i("7++q"),h=i("eQXH");i.d(e,"ClientsQlanaModule",function(){return v});var v=function(){function t(){}return t=s.c([Object(a.NgModule)({imports:[h.a,l.ZcWorkflowModule],declarations:[g,f],exports:[g,f]})],t)}()},Lv0o:function(t,e){t.exports='<div class="list-view-main">\n  <div class="list-view-str"> </div>\n</div>\n<div class="list-view-main">\n\n  <ng-container *ngFor=\'let stage of stageList$ | async;let inx=index;\'>\n    <div *ngIf="showStage"   class="list-bgheader-view mt-3" [ngStyle]="{\'background-color\':stage.info.primaryColor? stage.info.primaryColor : \'#5e74b0\'}">\n      <div class="list-header-view list-icon-view">\n        <h3> <span class="num-count">{{stage.info.index || inx+1}}</span>\n          <div class="list-header-title">\n            <span>{{stage?.info?.title}}</span>\n            \x3c!-- <p class="mb0 pl35 ml5 text-capitalize f10 font-italic" *ngIf="stage.historyInfo"><span>Initiated by relationship\n                Officer Test on </span><span>Apr 25, 2019</span> </p> --\x3e\n          </div>\n        </h3>\n        <ul class="">\n          <li *ngIf="stage?.historyInfo">\n            <div class="status-btn"><label>Status</label>\n              <p><button class="btn btn-sm btn-success">{{stage?.historyInfo?.to?.status?.name || stage?.historyInfo?.from?.status?.name}}</button></p>\n            </div>\n          </li>\n          <li>\n            <a [routerLink]="[ options.reviewUrl || \'/qlana/project/project-complete-view\',params.uid]"\n              [queryParams]="{stage: stage.info.code,currentStage:(stage.activeStatus)?\'true\':\'false\'}" class="icon-eye"></a>\n            \x3c!-- <a  [routerLink]="[\'/qlana/project/project-complete-view\']"  [queryParams]="{stage: stage.info.code}" class="icon-eye"></a></li> --\x3e\n        </ul>\n      </div>\n      <div class="list-bottomheader-view">\n        <p *ngIf="stage?.historyInfo">Last\n          updated by {{stage?.historyInfo?.from?.user?.first_name}} on {{stage?.historyInfo?.received_date_time | date}}\n        </p>\n        <p>Time Taken: {{timeTakenDays(stage.info)}} Days</p>\n      </div>\n    </div>\n    <div class="list-view-str">\n      <ul class="clearfix">\n        <li *ngFor=\'let section of stage.sections\'>\n          <div class="list-str">\n            <h4>\n              {{section.info.title}}\n            </h4>\n            \x3c!-- href="/#/qlana/{{moduleType}}/{{moduleType}}-stage-view/{{params.uid}}?page={{subsection.code}}&pageName={{subsection.name}}" --\x3e\n            <a [routerLink]="[\'/\'+options.page.url,params.uid]"\n              [queryParams]="{page: subsection.info.page,stage:stage.info.code}"\n              *ngFor=\'let subsection of section.subSections\' class="list-data white-bg"\n              [ngClass]="{\'draft-active\': (subsection && subsection.meta && subsection.meta.action===\'Draft\'),\'submit-active\': (subsection && subsection.meta && subsection.meta.action===\'Submit\')}">\n              <div class="list-img"> <i [ngClass]="subsection.info.icon"></i> </div>\n              <div class="list-text">\n                <h5>{{subsection.info.title}}</h5>\n                <span *ngIf="subsection?.meta?.modified_user?.name">{{subsection?.meta?.modified_user?.name}} -\n                  {{subsection?.meta?.modified_time | date:\'MMM d, y\'}}</span>\n                  <span *ngIf="!subsection?.meta?.modified_user?.name">&nbsp;</span>\n              </div>\n            </a>\n          </div>\n        </li>\n      </ul>\n\n    </div>\n  </ng-container>\n\n\n</div>'},MAkz:function(t,e){t.exports='<div *ngIf="stageList.length > 0" class="qlana-stage-next-previous text-right">\n  <button class="btn btn-primary btn-sm"  [disabled]=\'currentStageIndex===0\'  (click)="previous()"><i\n      class="icon-angle-left"></i></button>\n  <button class="btn btn-primary btn-sm ml-2"  [disabled]="currentStageIndex >= stageList.length-1" (click)="next()"><i\n      class="icon-angle-right"></i></button>\n</div>\n<div *ngIf="pageInfo">\n  <zc-page-render [options]="{ widgets: pageInfo }"></zc-page-render>\n</div>'},YfSF:function(t,e,i){"use strict";var s=i("Jg5f");i.d(e,"a",function(){return s.a})},jNf5:function(t,e){t.exports=""},vtXP:function(t,e,i){"use strict";var s=i("YfSF");i.d(e,"a",function(){return s.a})}}]);