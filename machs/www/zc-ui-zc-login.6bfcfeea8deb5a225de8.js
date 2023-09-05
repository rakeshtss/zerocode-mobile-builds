(window.webpackJsonp=window.webpackJsonp||[]).push([[58],{"/qBQ":function(t,e){t.exports='<zc-com-render\n  *ngIf="!isLoggedIn"\n  type="form"\n  [options]="formOptions"\n  (componentReady)="componentReady($event)"\n></zc-com-render>\n<ng-template #LoginSessionModal let-c="close" let-d="dismiss">\n  <div class="modal-header">\n    <h4 class="modal-title" id="modal-basic-title">Logged In Sessions</h4>\n    \x3c!-- <button\n      type="button"\n      class="close"\n      title="Close"\n      aria-label="Close"\n      (click)="modal.close()"\n    >\n      <span aria-hidden="true">&times;</span>\n    </button> --\x3e\n  </div>\n  <div class="modal-body">\n    <a class="check-all" (click)="checkAllSessions()">Check All</a>\n    <div class="col-12 zc-login-sessions" *ngFor="let session of oldSessions;let i = index;">\n      <p-checkbox name="check_seession_{{i}}" value="true" [(ngModel)]="session.checked" binary="true"></p-checkbox>\n      \x3c!-- <input type="checkbox" [(ngModel)]="session.checked" />  --\x3e\n      last accessed on :\n      {{ session.last_accessed_on | date }} os : {{ session.os }} ip :\n      {{ session.ip }} browser : {{ session.browser }}\n    </div>\n  </div>\n  <div class="modal-footer">\n    <button\n      type="button"\n      [disabled]="checkDisabled()"\n      class="btn btn-sm btn-primary"\n      (click)="okSesssion()"\n    >\n      Remove and Continue\n    </button>\n    <button\n      type="button"\n      class="btn btn-sm btn-danger"\n      (click)="modal.close(\'Cross click\')"\n    >\n      Skip\n    </button>\n  </div>\n</ng-template>\n'},DLoY:function(t,e,s){"use strict";s.r(e);var i=s("D57K"),n=s("LoAr"),o=s("981U"),r=s("05nE"),c=function(){function t(t){this.http=t}return t.prototype.verifyLogin=function(t,e){return this.http.post(e,t)},t.prototype.getUserDetail=function(t){return this.http.get(t)},t.prototype.checkSession=function(){return this.http.get("checkSession")},t.prototype.removeOldServerSession=function(t){return void 0===t&&(t={}),this.http.post("inValidate",t)},t=i.c([Object(n.Injectable)(),i.f("design:paramtypes",[r.c])],t)}(),l=s("SHvt"),a=function(){function t(t,e,s,i,n,o){this.router=t,this.actionService=e,this.modalService=s,this.ls=i,this.wls=n,this.appConfigService=o,this.submitted=!1,this.fpSubmitted=!1,this.isLoggedIn=!1,this.isForgotPassword=!1,this.credentials={},this.user={},this.oldSessions=[]}return t.prototype.ngOnInit=function(){this.formOptions=JSON.parse(JSON.stringify(this.options)),this.formOptions.id=this.options.id+"_form",this.ls.getItem("credentials")&&(this.formOptions.params=this.ls.getItem("credentials",!0)),zc[this.options.id]=this,this.user=this.ls.getItem("user",!0),this.user?this.user.redirectUrl&&""!==this.user.redirectUrl&&this.router.navigate(["/"+this.user.redirectUrl]):this.isLoggedIn=!1},t.prototype.componentReady=function(t){var e=this;try{setTimeout(function(){console.log("componentReady"),zc[e.options.id].form=zc[e.formOptions.id].form,zc[e.options.id].formlyOptions=zc[e.formOptions.id].formlyOptions,zc[e.options.id].model=zc[e.formOptions.id].model},10)}catch(s){console.log("error",s)}},t.prototype.submit=function(){return this.ls.removeItem("user"),zc[this.formOptions.id].model},t.prototype.login=function(t){var e=this;t.success?(zc[this.options.id].model.rememberMe?this.ls.setItem("credentials",zc[this.options.id].model,!0):this.ls.removeItem("credentials"),this.ls.setItem("user",t.data,!0),"AlertForMultiple"===this.appConfigService.settings.login_mode&&t.data&&t.data.oldSessions&&t.data.oldSessions.length>0?(this.oldSessions=JSON.parse(JSON.stringify(t.data.oldSessions)),this.modal=this.modalService.open(this.LoginSessionModal,{size:"lg",centered:!0,backdrop:"static",windowClass:"login-session-modal"}),this.modal.result.then(function(s){e.navigateUrl(t)})):this.navigateUrl(t)):this.errorMsg=t.message},t.prototype.okSesssion=function(){var t=this.oldSessions.filter(function(t){return t.checked});this.wls.removeOldServerSession({oldSessions:t}).subscribe(function(t){}),this.modal.close()},t.prototype.cancelSession=function(){},t.prototype.checkAllSessions=function(){this.oldSessions.map(function(t){t.checked=!0})},t.prototype.checkDisabled=function(){return!(this.oldSessions.filter(function(t){return t.checked}).length>0)},t.prototype.logout=function(){this.ls.removeItem("credentials"),this.ls.removeItem("user"),this.isLoggedIn=!1},t.prototype.navigateUrl=function(t){this.options.events&&this.options.events.onSuccess&&this.actions(this.options.events.onSuccess,t.data),zc.queryParams.zcRedirectUrl?this.router.navigateByUrl(zc.queryParams.zcRedirectUrl):!1!==this.options.redirectUrl&&(""!==t.data.redirectUrl?this.router.navigate(["/"+t.data.redirectUrl]):this.isLoggedIn=!0)},t.prototype.actions=function(t,e){var s=this;t&&t.forEach(function(t){s.actionService.action(t,e)})},i.c([Object(n.Input)(),i.f("design:type",Object)],t.prototype,"options",void 0),i.c([Object(n.ViewChild)("LoginSessionModal"),i.f("design:type",Object)],t.prototype,"LoginSessionModal",void 0),t=i.c([Object(n.Component)({selector:"zc-login",template:s("/qBQ")}),i.f("design:paramtypes",[o.Router,r.a,l.e,r.i,c,r.b])],t)}(),d=s("IfiR"),u=s("eQXH");s.d(e,"ZcWidgetLoginModule",function(){return h});var h=function(){function t(){}return t=i.c([Object(n.NgModule)({imports:[u.a,d.FormsModule,d.ReactiveFormsModule],declarations:[a],providers:[c],exports:[a]})],t)}()},"R+ki":function(t,e,s){"use strict";s.d(e,"a",function(){return r});var i=s("D57K"),n=s("DwTn"),o=s("diMa");function r(t,e){return void 0===e&&(e=o.a),function(s){return s.lift(new c(t,e))}}var c=function(){function t(t,e){this.dueTime=t,this.scheduler=e}return t.prototype.call=function(t,e){return e.subscribe(new l(t,this.dueTime,this.scheduler))},t}(),l=function(t){function e(e,s,i){var n=t.call(this,e)||this;return n.dueTime=s,n.scheduler=i,n.debouncedSubscription=null,n.lastValue=null,n.hasValue=!1,n}return i.d(e,t),e.prototype._next=function(t){this.clearDebounce(),this.lastValue=t,this.hasValue=!0,this.add(this.debouncedSubscription=this.scheduler.schedule(a,this.dueTime,this))},e.prototype._complete=function(){this.debouncedNext(),this.destination.complete()},e.prototype.debouncedNext=function(){if(this.clearDebounce(),this.hasValue){var t=this.lastValue;this.lastValue=null,this.hasValue=!1,this.destination.next(t)}},e.prototype.clearDebounce=function(){var t=this.debouncedSubscription;null!==t&&(this.remove(t),t.unsubscribe(),this.debouncedSubscription=null)},e}(n.a);function a(t){t.debouncedNext()}}}]);