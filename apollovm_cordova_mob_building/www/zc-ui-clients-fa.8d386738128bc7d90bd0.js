(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{"3oAn":function(t,e,n){"use strict";n.r(e);var s=n("D57K"),i=n("LoAr"),a=n("eQXH"),o=n("05nE"),r=n("981U"),c=n("GiBk"),u=n("Jg5f"),g=function(){function t(t){this.http=t,this.currentStage={}}return t.prototype.getStageList=function(t,e,n,s,i){var a=this;return void 0===s&&(s=!1),void 0===i&&(i="post"),this.http.request(i,t,e).pipe(Object(u.a)(function(t){var e=[];if(t&&t.data&&t.data.stageWidget&&t.data.stageWidget.config&&t.data.stageWidget.config.stages){var i=t.data.stageWidget.config.stages;a.currentStage=t.data.stage;var o=t.data.status;if(i&&s)if(a.currentStage)for(var r=function(t){var s=i[t];if(n){var r=n.find(function(t){return t.stage.code===s.info.code});r&&r.history&&r.history[0]&&(s.historyInfo=r.history[0])}s.info.index=t+1,s.info.code===a.currentStage.code?(s.status=o,s.activeStatus=!0,e.push(s)):e.push(s)},c=0;c<i.length;c++)r(c);else e.push(i[0]);else e=i}return e}))},t.prototype.getStageMetaData=function(t,e){return this.http.post(t,e)},t=s.c([Object(i.Injectable)({providedIn:"root"}),s.f("design:paramtypes",[o.c])],t)}(),l=function(){function t(t,e,n,s,i,a,o,r,c){this.http=t,this.actionService=e,this.unsavedDataAlertService=n,this.faStageService=s,this.httpCache=i,this.ls=a,this.appConfig=o,this.route=r,this.router=c,this.stageList=[],this.menuList=[],this.currentStageIndex=0,this.enableReview=!1,this.isCurrentStage=!1,this.stageIndex=0,this.addClassToPreview=!1}return t.prototype.ngOnInit=function(){var t=this;this.route.params.subscribe(function(e){t.params=e}),this.getStageList(),this.getStageMetaData()},t.prototype.ngAfterViewInit=function(){this.options.id&&(zc[this.options.id]=this)},t.prototype.paramsSubscribe=function(){var t=this;this.paramsSubscribe$=this.route.queryParams.subscribe(function(e){if(t.queryPrams=e,t.queryPrams.page&&t.loadPage(t.queryPrams.page),t.queryPrams.stage){t.stageIndex=t.menuList.findIndex(function(t){return!0===t.activeStatus});var n=t.menuList.findIndex(function(e){return e.info.code===t.queryPrams.stage});if(-1!==n&&(t.menuList[n].show=!0),console.log("this.menuList[stageIndex]",t.menuList[n]),t.menuList[n].sections&&t.menuList[n].sections.length){var s=t.menuList[n].sections[t.menuList[n].sections.length-1].subSections.find(function(e){return e.info.page===t.queryPrams.page});s&&(t.currentStage=t.menuList[n],t.currentStage.activeStatus?t.isCurrentStage=!0:t.isCurrentStage=!1,t.onSubSectionSelect(t.menuList[n],s))}}t.currentStageIndex=t.getCurrentIndex()})},t.prototype.getStageList=function(){var t=this;this.stageList=[];var e=this.route.snapshot.params,n=this.route.snapshot.queryParams,i=this.actionService.getParams(this.options.api.params,e);i.offline={api:this.options.api.url,type:"select"};var a=this.options.api.method?this.options.api.method:"post";this.faStageService.getStageList(this.options.api.url,i,null,this.options.isWorkflow,a).subscribe(function(e){if(e){t.menuList=e,console.log("resStages",e);var i=!0;if(e.forEach(function(e){if(e.activeStatus){var n={info:e.info,status:e.status};zc.params=s.a({},zc.params,{activeStage:n})}e.sections.forEach(function(n){n.subSections.forEach(function(s){var a={};a.stage=e.info.code,a.section=n.info.code,a.subSection=s.info.code,a.page=s.info.page,a.data=s,i&&t.stageList.push(a)})}),e.activeStatus&&(i=!1)}),t.paramsSubscribe(),!n.stage&&t.stageList.length>0){var a=t.stageList[0].page,o=t.stageList[0].stage;if(t.faStageService.currentStage&&t.faStageService.currentStage.code){o=t.faStageService.currentStage.code;var r=t.stageList.filter(function(t){return t.stage===o});r[0]&&(a=r[0].page)}t.navigateUrl(a,o)}}})},t.prototype.getStageMetaData=function(){var t=this,e=this.route.snapshot.params,n={};n.uid=e.uid,n.entity="appraisal";this.faStageService.getStageMetaData("stage-widget/api/downloadData",n).subscribe(function(e){var n=t.appConfig.settings.apiUrl+t.appConfig.settings.client;if(e&&e.data){var s=e.data.pageMeta,i=t.ls.getItem("GET_APIS",!0);i||(i=[]),Object.keys(s).length>0&&(Object.keys(s).forEach(function(t){var e={data:{}};e.url=n+"/page/_/_/"+t,e.data.code=t,e.data.instructions=s[t].setting,e.data.label=t;var a=i.findIndex(function(t){return t.url===e.url});-1!==a?i[a]=e:i.push(e)}),t.ls.setItem("GET_APIS",i,!0));var a=e.data.apiMeta,o=t.ls.getItem("LIST_APIS",!0);o||(o=[]);var r=t.ls.getItem("SELECT_APIS",!0);r||(r=[]);Object.keys(a).length>0&&(Object.keys(a).forEach(function(t){if(1|a[t].success){var e={},s=n+"/"+t;if(s=s.toLowerCase(),e.data={},e.url=n+"/"+t,e.url=s,"/"===e.url.charAt(e.url.length-1)&&(e.url=e.url.substring(0,e.url.length-1)),e.data=a[t].data,e.data.data&&(e.data=e.data.data),e.data.rows){e.response={},e.response.body={},e.response.body.data={},e.response.body.data.listData=e.data;var i=o.findIndex(function(t){return t.url===e.url});-1!==i?o[i]=e:o.push(e)}else{var c=r.findIndex(function(t){return t.url===e.url&&t.data.uid===e.data.uid});-1!==c?r[c].params||(r[c]=e):r.push(e)}}}),t.ls.setItem("LIST_APIS",o,!0),t.ls.setItem("SELECT_APIS",r,!0))}})},t.prototype.loadPage=function(t){var e=this,n=new c.HttpHeaders;this.httpCache.clearCache(),n=n.append("page",this.queryPrams.page),this.pageInfo=null;var s=t;s=-1!==s.indexOf("/")?"page/"+s:"page/_/_/"+s,this.http.get(s).subscribe(function(t){if(t.data.instructions.definition&&t.data.instructions.definition&&(t.data.instructions.definition.widgets&&(e.pageInfo=t.data.instructions.definition.widgets),t.data.instructions.definition.onLoad&&t.data.instructions.definition.onLoad.actions)){var n=t.data.instructions.definition.onLoad.actions;n.length>0&&n.forEach(function(t){e.actionService.action(t)})}}),this.setCurrentStage()},t.prototype.next=function(){var t=this;this.unsavedDataAlertService.alertMsg().then(function(e){if(e){var n=t.getCurrentIndex(),s=t.stageList[n+1].page,i=t.stageList[n+1].stage;t.navigateUrl(s,i)}})},t.prototype.previous=function(){var t=this;this.unsavedDataAlertService.alertMsg().then(function(e){var n=t.getCurrentIndex();if(e&&0!==n){var s=t.stageList[n-1].page,i=t.stageList[n-1].stage;t.navigateUrl(s,i)}})},t.prototype.setCurrentStage=function(){var t,e={name:"stageWidget",meta:this.stageList[this.getCurrentIndex()]},n=JSON.parse(JSON.stringify(e));n&&n.meta&&n.meta.data&&(t=n.meta.data,delete n.meta.data),zc.params=s.a({},zc.params,{currentStage:n,currentStageMetaData:t})},t.prototype.getCurrentIndex=function(){var t=this;return this.stageList.indexOf(this.stageList.find(function(e){return e.stage===t.queryPrams.stage&&e.page===t.queryPrams.page}))},t.prototype.navigateUrl=function(t,e){this.router.navigate([],{queryParams:{page:t,stage:e}})},t.prototype.ngOnDestroy=function(){this.paramsSubscribe$&&this.paramsSubscribe$.unsubscribe()},t.prototype.onSubSectionSelect=function(t,e){var n=!0;this.enableReview=!1,t.sections.forEach(function(t){t.subSections&&t.subSections.length&&t.subSections.forEach(function(t){"Submit"!==t.meta.action&&(n=!1)})});t.sections[t.sections.length-1].subSections[t.sections[t.sections.length-1].subSections.length-1];n&&(this.enableReview=!0)},t.prototype.getCurrentStage=function(t,e){return!(e&&e.meta&&e.meta.action)&&(e&&e.info&&e.info.page===this.queryPrams.page&&t&&t.info&&t.info.code===this.queryPrams.stage)},t.prototype.openSubSectionForm=function(t,e,n){n?alert("Sorry, you do not currently have permission to see this page."):(this.onSubSectionSelect(e,t),this.router.navigate([],{queryParams:{page:t.info.page,stage:e.info.code},relativeTo:this.route.parent})),document.body.classList.contains("stage-menu-open")&&document.body.classList.remove("stage-menu-open")},t.prototype.openStageMenu=function(){document.body.classList.contains("stage-menu-open")?document.body.classList.remove("stage-menu-open"):document.body.classList.add("stage-menu-open"),window.innerWidth<=767&&document.body.classList.contains("stage-menu-open")&&document.body.classList.remove("show-menu")},t.prototype.onWindowScroll=function(t){0==window.pageYOffset?this.addClassToPreview=!1:this.addClassToPreview=!0},t.prototype.reloadMenu=function(){this.getStageList()},s.c([Object(i.Input)(),s.f("design:type",Object)],t.prototype,"options",void 0),s.c([Object(i.ViewChild)("zcPreviewBtn"),s.f("design:type",i.ElementRef)],t.prototype,"zcPreviewBtn",void 0),s.c([Object(i.HostListener)("window:scroll",["$event"]),s.f("design:type",Function),s.f("design:paramtypes",[Object]),s.f("design:returntype",void 0)],t.prototype,"onWindowScroll",null),t=s.c([Object(i.Component)({selector:"zc-fa-stage-widget",template:n("EjJO"),styles:[n("yPin")]}),s.f("design:paramtypes",[o.c,o.a,o.l,g,o.g,o.i,o.b,r.ActivatedRoute,r.Router])],t)}();n.d(e,"FaStageWidgetModule",function(){return d});var d=function(){function t(){}return t=s.c([Object(i.NgModule)({declarations:[l],imports:[a.a],exports:[l]})],t)}()},EjJO:function(t,e){t.exports='<div *ngIf="stageList.length > 0" class="qlana-stage-next-previous text-right" [ngClass]="addClassToPreview? \'btn-zc-preview\': \'\'">\n  \n  <button *ngIf="enableReview" class="btn btn-success btn-sm mr-2 tss-preview"\n    [routerLink]="[options.reviewUrl,params.uid]"\n    [queryParams]="{stage: currentStage.info.code,currentStage:isCurrentStage}">\n    {{options.reviewTitle || \'Preview\'}}\n  </button>\n  <ng-container *ngIf="stageList.length !== 1">\n    <button class="btn btn-primary btn-sm" [disabled]="currentStageIndex === 0" (click)="previous()">\n      <i class="icon-chevron-left"></i>\n    </button>\n    <button class="btn btn-primary btn-sm ml-2" [disabled]="currentStageIndex >= stageList.length - 1" (click)="next()">\n      <i class="icon-chevron-right"></i>\n    </button>\n  </ng-container>\n\n</div>\n<div *ngIf="pageInfo" class="stage-container zc-widget-stage-form row no-gutters">\n  <div class="stage-menu">\n    <a class="stage-menu-icon" (click)="openStageMenu()"><i class="icon-angle-double-right"></i></a>\n    <div class="stage-list col-lg-4 ">\n      <ng-container *ngFor="let stage of menuList; let inx = index">\n        <div class="list-view-str">\n          <div class="list-header-title" [ngClass]="(stageIndex<inx)?\'enabled\':\'disabled\'"\n            (click)="stage.show =! stage.show" style="cursor: pointer;">\n            <span class="sequence-no"><span class="icon-angle-double-right"></span></span>\n            <span class="title-text">{{ stage?.info?.title }}</span>\n            <span class="plus-minus" [ngClass]="(stage.show)?\'icon-minus pull-right\':\'icon-plus-1 pull-right\'"></span>\n          </div>\n          <ul class="stage-subsection clearfix" *ngIf="stage.show">\n            <li *ngFor="let section of stage.sections; let sectionIndex = index"\n              [ngClass]="(stageIndex<inx)?\'enabled\':\'disabled\'">\n              <div class="list-str">\n                <a *ngFor="let subsection of section.subSections; let subsectionIndex = index" class="list-data"\n                  [ngClass]="{\n                    \'draft-active\':\n                      subsection &&\n                      subsection.meta &&\n                      subsection.meta.action === \'Draft\',\n                    \'submit-active\':\n                      subsection &&\n                      subsection.meta &&\n                      subsection.meta.action === \'Submit\',\n                      \'active\':queryPrams && (subsection.info.page === queryPrams.page && queryPrams.stage === stage.info.code)\n                  }" (click)="openSubSectionForm(subsection, stage, (stageIndex<inx))">\n\n                  <div class="list-text">\n                    \x3c!-- <h5>{{ subsection.info.title }}</h5> --\x3e\n\n                    <span class="sub-title-text" [title]="subsection.info.title">{{ subsection.info.title }}</span>\n                    <span *ngIf="getCurrentStage(stage, subsection)" class="icon-ellipsis-h pull-right"></span>\n                    <span *ngIf="subsection && subsection.meta && subsection.meta.action === \'Submit\'" style="color:green !important"\n                      class="icon-check-circle pull-right"></span>\n                    <span *ngIf="subsection && subsection.meta && subsection.meta.action === \'Draft\'" style="color:orange !important"\n                      class="icon-check-circle pull-right"></span>\n                  </div>\n                </a>\n              </div>\n            </li>\n          </ul>\n        </div>\n      </ng-container>\n    </div>\n  </div>\n  <div class="col sub-page">\n    <zc-page-render [options]="{ widgets: pageInfo }"></zc-page-render>\n  </div>\n</div>\n'},"R+ki":function(t,e,n){"use strict";n.d(e,"a",function(){return o});var s=n("D57K"),i=n("DwTn"),a=n("diMa");function o(t,e){return void 0===e&&(e=a.a),function(n){return n.lift(new r(t,e))}}var r=function(){function t(t,e){this.dueTime=t,this.scheduler=e}return t.prototype.call=function(t,e){return e.subscribe(new c(t,this.dueTime,this.scheduler))},t}(),c=function(t){function e(e,n,s){var i=t.call(this,e)||this;return i.dueTime=n,i.scheduler=s,i.debouncedSubscription=null,i.lastValue=null,i.hasValue=!1,i}return s.d(e,t),e.prototype._next=function(t){this.clearDebounce(),this.lastValue=t,this.hasValue=!0,this.add(this.debouncedSubscription=this.scheduler.schedule(u,this.dueTime,this))},e.prototype._complete=function(){this.debouncedNext(),this.destination.complete()},e.prototype.debouncedNext=function(){if(this.clearDebounce(),this.hasValue){var t=this.lastValue;this.lastValue=null,this.hasValue=!1,this.destination.next(t)}},e.prototype.clearDebounce=function(){var t=this.debouncedSubscription;null!==t&&(this.remove(t),t.unsubscribe(),this.debouncedSubscription=null)},e}(i.a);function u(t){t.debouncedNext()}},yPin:function(t,e){t.exports=".stage-container .stage-menu .list-view-str .stage-subsection a.active {\n  color: white; }\n\n.stage-menu-open.hide-menu .stage-list, .stage-menu-open.hide-menu .stage-list {\n  -webkit-transform: translateX(100%) !important;\n  transform: translateX(100%) !important;\n  left: -155px; }\n\n/* .hide-menu .stage-list {\n  left: 50px;\n  transition: left 0.3s;\n  -webkit-overflow-scrolling: touch;\n} */\n"}}]);