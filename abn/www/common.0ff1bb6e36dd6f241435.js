(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{"7++q":function(t,i,n){"use strict";n.r(i);var o=n("D57K"),e=n("LoAr"),s=n("WT9V"),r=n("DUHm"),a=n("SHvt"),c=n("981U"),p=n("vtXP"),d=n("05nE"),u=function(){function t(t,i,n,o,e){this.ws=t,this.actionsSerive=i,this.modalService=n,this.route=o,this.cache=e,this.actionList=[],this.history=[]}return t.prototype.ngOnInit=function(){var t=this;this.actionList=[];var i={uid:this.route.snapshot.params.uid,entity:this.options.entity},n=this.route.snapshot.queryParams;"true"===n.currentStage&&this.ws.getWorkflow("workflow/getActions","post",i).subscribe(function(i){t.actionList=i.actions});var o={entity:this.options.entity,uid:this.route.snapshot.params.uid};this.historyList$=this.ws.getHistoryByStageGroup(o).pipe(Object(p.a)(function(t){var i=t.findIndex(function(t){return t.stage.code===n.stage});return-1===i?t:t.slice(i)}))},t.prototype.ngAfterViewInit=function(){zc[this.options.id]=this},t.prototype.reload=function(){this.ngOnInit()},t.prototype.performAction=function(t){var i=this;if(this.cache.clearCache(),this.currentAction=t,zc.params=o.a({},zc.params,{action:t}),this.pageInfo=null,"action"===t.type)this.actionsSerive.action(t.action,{});else{var n=t.page;n=-1!==n.indexOf("/")?"page/"+n:"page/_/_/"+n,this.ws.getActionPageInfo(n).subscribe(function(t){t.instructions.definition&&t.instructions.definition.widgets&&(i.pageInfo=t.instructions.definition.widgets,i.modal=i.modalService.open(i.zcFormModal,{size:"lg",centered:!0,windowClass:"zc-action-modal"}))})}},t.prototype.loadHistory=function(){var t={entity:this.options.entity,uid:this.route.snapshot.params.uid};this.historyList$=this.ws.getHistory(t)},t.prototype.close=function(){this.modal&&this.modal.dismiss()},t.prototype.ngOnDestroy=function(){this.modal&&this.modal.dismiss()},o.c([Object(e.Input)(),o.f("design:type",Object)],t.prototype,"options",void 0),o.c([Object(e.ViewChild)("zcFormModal"),o.f("design:type",Object)],t.prototype,"zcFormModal",void 0),t=o.c([Object(e.Component)({selector:"zc-workflow",template:n("yORG"),styles:[n("VuVh")]}),o.f("design:paramtypes",[r.a,d.a,a.e,c.ActivatedRoute,d.g])],t)}(),l=n("k/eh");n.d(i,"ZcWorkflowModule",function(){return f});var f=function(){function t(){}return t=o.c([Object(e.NgModule)({imports:[s.CommonModule,l.b],declarations:[u],exports:[u],providers:[r.a]})],t)}()},DUHm:function(t,i,n){"use strict";n.d(i,"a",function(){return a});var o=n("D57K"),e=n("LoAr"),s=n("05nE"),r=n("vtXP"),a=function(){function t(t){this.http=t}return t.prototype.getWorkflow=function(t,i,n){return"post"===i?this.http.post(t,n).pipe(Object(r.a)(function(t){return t.data})):this.http.get(t,{params:n}).pipe(Object(r.a)(function(t){return t.data}))},t.prototype.getActionPageInfo=function(t){return this.http.get(t).pipe(Object(r.a)(function(t){return t.data}))},t.prototype.getHistoryByStageGroup=function(t){return this.http.post("workflow/getHistory",t).pipe(Object(r.a)(function(t){for(var i=t.data.listData.rows,n=[],o=function(t){var o=i[t],e=n.find(function(t){return o.from.stage.code===t.stage.code});if(e)e.history.push(o);else if(o.from.stage.code){var s={stage:o.from.stage,history:[]};s.history.push(o),n.push(s)}},e=0;e<i.length;e++)o(e);return n}))},t.prototype.getHistory=function(t){return this.http.post("workflow/getHistory",t).pipe(Object(r.a)(function(t){return t.data.listData.rows}))},t=o.c([Object(e.Injectable)(),o.f("design:paramtypes",[s.c])],t)}()},VuVh:function(t,i){t.exports=""},j3C3:function(t,i,n){"use strict";n.d(i,"a",function(){return r});var o=n("D57K"),e=n("LoAr"),s=n("05nE"),r=function(){function t(t){this.apiKey=t.settings.googleMapKey,this.libraries=["places"]}return t=o.c([Object(e.Injectable)(),o.f("design:paramtypes",[s.b])],t)}()},pnHo:function(t,i,n){"use strict";n("F6v2"),n("gAiz");var o=n("Qgf8");n("cjWd"),n("Uh16");n.d(i,"a",function(){return o.ZcFormModule})},yORG:function(t,i){t.exports='<div class="zc-widget-workflow" *ngIf="actionList && actionList.length >0">\n  <div class="workflow-head" *ngIf="options.title">\n    <span>{{options.title}}</span>\n  </div>\n  <div class="workflow-body">\n    <div class="workflow-action-btn" *ngFor=\'let action of actionList; let inx = index;\'>\n      <button type="button" (click)="performAction(action)" class="btn btn-default"\n        [ngStyle]="{\'backgroundColor\': action.bg_color,\'color\':action.text_color}">\n        <i *ngIf="action.icon" [ngClass]="action.icon"></i>\n        <label>{{action.name}}</label>\n      </button>\n    </div>\n  </div>\n</div>\n\x3c!-- <div class="zc-workflow-history">\n  <div class="group-container" *ngFor="let groupItem of historyList$ | async;let index=index">\n    <h4 class="m-2">{{groupItem.stage?.name}}</h4>\n    <div class="item hr bg-white p-2 mb-2" *ngFor="let item of groupItem.history;let index=index">\n      <div>{{item.from?.stage?.name}} : Workflow</div>\n      <label>{{item.from?.user?.first_name}}</label> <strong> {{item.from?.action?.action}}</strong> To Credit\n      <label>{{item.to?.user?.first_name}}</label> On {{item?.received_date_time | date}}\n    </div>\n  </div>\n</div> --\x3e\n\n<ng-template #zcFormModal let-c="close" let-d="dismiss">\n  <div class="modal-header">\n    <h4 class="modal-title" id="modal-basic-title">{{currentAction.name}}</h4>\n    <i class="btn icon-close" (click)="d();"></i>\n  </div>\n  <div class="modal-body">\n    <zc-page-render [options]="{ widgets: pageInfo }"></zc-page-render>\n  </div>\n</ng-template>'}}]);