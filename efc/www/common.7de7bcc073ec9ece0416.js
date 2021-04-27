(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{"7++q":function(t,o,n){"use strict";n.r(o);var i=n("D57K"),e=n("LoAr"),r=n("WT9V"),s=n("DUHm"),a=n("SHvt"),c=n("981U"),p=n("vtXP"),d=n("05nE"),u=function(){function t(t,o,n,i){this.ws=t,this.modalService=o,this.route=n,this.cache=i,this.actionList=[],this.history=[]}return t.prototype.ngOnInit=function(){var t=this;this.actionList=[];var o={uid:this.route.snapshot.params.uid,entity:this.options.entity},n=this.route.snapshot.queryParams;"true"===n.currentStage&&this.ws.getWorkflow("workflow/getActions","post",o).subscribe(function(o){t.actionList=o.actions});var i={entity:this.options.entity,uid:this.route.snapshot.params.uid};this.historyList$=this.ws.getHistoryByStageGroup(i).pipe(Object(p.a)(function(t){var o=t.findIndex(function(t){return t.stage.code===n.stage});return-1===o?t:t.slice(o)}))},t.prototype.ngAfterViewInit=function(){zc[this.options.id]=this},t.prototype.reload=function(){this.ngOnInit()},t.prototype.performAction=function(t){var o=this;this.cache.clearCache(),this.currentAction=t,zc.params=i.a({},zc.params,{action:t}),this.pageInfo=null,this.ws.getActionPageInfo("page/_/_/"+t.page).subscribe(function(t){t.instructions.definition&&t.instructions.definition.widgets&&(o.pageInfo=t.instructions.definition.widgets,o.modal=o.modalService.open(o.zcFormModal,{size:"lg",centered:!0,windowClass:"zc-action-modal"}))})},t.prototype.loadHistory=function(){var t={entity:this.options.entity,uid:this.route.snapshot.params.uid};this.historyList$=this.ws.getHistory(t)},t.prototype.close=function(){this.modal&&this.modal.dismiss()},t.prototype.ngOnDestroy=function(){this.modal&&this.modal.dismiss()},i.c([Object(e.Input)(),i.f("design:type",Object)],t.prototype,"options",void 0),i.c([Object(e.ViewChild)("zcFormModal"),i.f("design:type",Object)],t.prototype,"zcFormModal",void 0),t=i.c([Object(e.Component)({selector:"zc-workflow",template:n("yORG"),styles:[n("VuVh")]}),i.f("design:paramtypes",[s.a,a.e,c.ActivatedRoute,d.g])],t)}(),l=n("k/eh");n.d(o,"ZcWorkflowModule",function(){return f});var f=function(){function t(){}return t=i.c([Object(e.NgModule)({imports:[r.CommonModule,l.b],declarations:[u],exports:[u],providers:[s.a]})],t)}()},DUHm:function(t,o,n){"use strict";n.d(o,"a",function(){return a});var i=n("D57K"),e=n("LoAr"),r=n("05nE"),s=n("vtXP"),a=function(){function t(t){this.http=t}return t.prototype.getWorkflow=function(t,o,n){return"post"===o?this.http.post(t,n).pipe(Object(s.a)(function(t){return t.data})):this.http.get(t,{params:n}).pipe(Object(s.a)(function(t){return t.data}))},t.prototype.getActionPageInfo=function(t){return this.http.get(t).pipe(Object(s.a)(function(t){return t.data}))},t.prototype.getHistoryByStageGroup=function(t){return this.http.post("workflow/getHistory",t).pipe(Object(s.a)(function(t){for(var o=t.data.listData.rows,n=[],i=function(t){var i=o[t],e=n.find(function(t){return i.from.stage.code===t.stage.code});if(e)e.history.push(i);else if(i.from.stage.code){var r={stage:i.from.stage,history:[]};r.history.push(i),n.push(r)}},e=0;e<o.length;e++)i(e);return n}))},t.prototype.getHistory=function(t){return this.http.post("workflow/getHistory",t).pipe(Object(s.a)(function(t){return t.data.listData.rows}))},t=i.c([Object(e.Injectable)(),i.f("design:paramtypes",[r.c])],t)}()},VuVh:function(t,o){t.exports=""},j3C3:function(t,o,n){"use strict";n.d(o,"a",function(){return s});var i=n("D57K"),e=n("LoAr"),r=n("05nE"),s=function(){function t(t){this.apiKey=t.settings.googleMapKey,this.libraries=["places"]}return t=i.c([Object(e.Injectable)(),i.f("design:paramtypes",[r.b])],t)}()},pnHo:function(t,o,n){"use strict";n("F6v2"),n("gAiz");var i=n("Qgf8");n("cjWd"),n("Uh16");n.d(o,"a",function(){return i.ZcFormModule})},yORG:function(t,o){t.exports='<div class="zc-widget-workflow" *ngIf="actionList && actionList.length >0">\r\n  <div class="workflow-head" *ngIf="options.title">\r\n    <span>{{options.title}}</span>\r\n  </div>\r\n  <div class="workflow-body">\r\n    <div class="workflow-action-btn" *ngFor=\'let action of actionList; let inx = index;\'>\r\n      <button type="button" (click)="performAction(action)" class="btn btn-default"\r\n        [ngStyle]="{\'backgroundColor\': action.bg_color,\'color\':action.text_color}">\r\n        <i *ngIf="action.icon" [ngClass]="action.icon"></i>\r\n        <label>{{action.name}}</label>\r\n      </button>\r\n    </div>\r\n  </div>\r\n</div>\r\n\x3c!-- <div class="zc-workflow-history">\r\n  <div class="group-container" *ngFor="let groupItem of historyList$ | async;let index=index">\r\n    <h4 class="m-2">{{groupItem.stage?.name}}</h4>\r\n    <div class="item hr bg-white p-2 mb-2" *ngFor="let item of groupItem.history;let index=index">\r\n      <div>{{item.from?.stage?.name}} : Workflow</div>\r\n      <label>{{item.from?.user?.first_name}}</label> <strong> {{item.from?.action?.action}}</strong> To Credit\r\n      <label>{{item.to?.user?.first_name}}</label> On {{item?.received_date_time | date}}\r\n    </div>\r\n  </div>\r\n</div> --\x3e\r\n\r\n<ng-template #zcFormModal let-c="close" let-d="dismiss">\r\n  <div class="modal-header">\r\n    <h4 class="modal-title" id="modal-basic-title">{{currentAction.name}}</h4>\r\n    <i class="btn icon-close" (click)="d();"></i>\r\n  </div>\r\n  <div class="modal-body">\r\n    <zc-page-render [options]="{ widgets: pageInfo }"></zc-page-render>\r\n  </div>\r\n</ng-template>'}}]);