(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{"/qBQ":function(t,e){t.exports='<zc-com-render\n  *ngIf="!isLoggedIn"\n  type="form"\n  [options]="formOptions"\n  (componentReady)="componentReady($event)"\n></zc-com-render>\n<ng-template #LoginSessionModal let-c="close" let-d="dismiss">\n  <div class="modal-header">\n    <h4 class="modal-title" id="modal-basic-title">Logged In Sessions</h4>\n    \x3c!-- <button\n      type="button"\n      class="close"\n      title="Close"\n      aria-label="Close"\n      (click)="modal.close()"\n    >\n      <span aria-hidden="true">&times;</span>\n    </button> --\x3e\n  </div>\n  <div class="modal-body">\n    <a class="check-all" (click)="checkAllSessions()">Check All</a>\n    <div class="col-12 zc-login-sessions" *ngFor="let session of oldSessions;let i = index;">\n      <p-checkbox name="check_seession_{{i}}" value="true" [(ngModel)]="session.checked" binary="true"></p-checkbox>\n      \x3c!-- <input type="checkbox" [(ngModel)]="session.checked" />  --\x3e\n      last accessed on :\n      {{ session.last_accessed_on | date }} os : {{ session.os }} ip :\n      {{ session.ip }} browser : {{ session.browser }}\n    </div>\n  </div>\n  <div class="modal-footer">\n    <button\n      type="button"\n      [disabled]="checkDisabled()"\n      class="btn btn-sm btn-primary"\n      (click)="okSesssion()"\n    >\n      Remove and Continue\n    </button>\n    <button\n      type="button"\n      class="btn btn-sm btn-danger"\n      (click)="modal.close(\'Cross click\')"\n    >\n      Skip\n    </button>\n  </div>\n</ng-template>\n'},"1add":function(t,e,n){"use strict";n.d(e,"a",function(){return u});var i=n("D57K"),s=n("gfA4"),o=n("jWm5"),r=n("leiK"),c=n("Lh+r");function u(t){return function(e){return e.lift(new a(t))}}var a=function(){function t(t){this.durationSelector=t}return t.prototype.call=function(t,e){return e.subscribe(new l(t,this.durationSelector))},t}(),l=function(t){function e(e,n){var i=t.call(this,e)||this;return i.durationSelector=n,i.hasValue=!1,i}return i.d(e,t),e.prototype._next=function(t){if(this.value=t,this.hasValue=!0,!this.throttled){var e=Object(s.a)(this.durationSelector)(t);if(e===o.a)this.destination.error(o.a.e);else{var n=Object(c.a)(this,e);!n||n.closed?this.clearThrottle():this.add(this.throttled=n)}}},e.prototype.clearThrottle=function(){var t=this.value,e=this.hasValue,n=this.throttled;n&&(this.remove(n),this.throttled=null,n.unsubscribe()),e&&(this.value=null,this.hasValue=!1,this.destination.next(t))},e.prototype.notifyNext=function(t,e,n,i){this.clearThrottle()},e.prototype.notifyComplete=function(){this.clearThrottle()},e}(r.a)},AqJ0:function(t,e,n){"use strict";n.d(e,"a",function(){return s});var i=n("Zl8a");function s(t,e,n){return void 0===t&&(t=Number.POSITIVE_INFINITY),void 0===e&&(e=Number.POSITIVE_INFINITY),function(s){return s.lift(function(t,e,n){var s,o,r=0,c=!1,u=!1;return function(a){r++,s&&!c||(c=!1,s=new i.a(t,e,n),o=a.subscribe({next:function(t){s.next(t)},error:function(t){c=!0,s.error(t)},complete:function(){u=!0,s.complete()}}));var l=s.subscribe(this);return function(){r--,l.unsubscribe(),o&&0===r&&u&&o.unsubscribe()}}}(t,e,n))}}},DLoY:function(t,e,n){"use strict";n.r(e);var i=n("D57K"),s=n("LoAr"),o=n("981U"),r=n("05nE"),c=function(){function t(t){this.http=t}return t.prototype.verifyLogin=function(t,e){return this.http.post(e,t)},t.prototype.getUserDetail=function(t){return this.http.get(t)},t.prototype.checkSession=function(){return this.http.get("checkSession")},t.prototype.removeOldServerSession=function(t){return void 0===t&&(t={}),this.http.post("inValidate",t)},t=i.c([Object(s.Injectable)(),i.f("design:paramtypes",[r.c])],t)}(),u=n("SHvt"),a=function(){function t(t,e,n,i,s,o){this.router=t,this.actionService=e,this.modalService=n,this.ls=i,this.wls=s,this.appConfigService=o,this.submitted=!1,this.fpSubmitted=!1,this.isLoggedIn=!1,this.isForgotPassword=!1,this.credentials={},this.user={},this.oldSessions=[]}return t.prototype.ngOnInit=function(){this.formOptions=JSON.parse(JSON.stringify(this.options)),this.formOptions.id=this.options.id+"_form",this.ls.getItem("credentials")&&(this.formOptions.params=this.ls.getItem("credentials",!0)),zc[this.options.id]=this,this.user=this.ls.getItem("user",!0),this.user?this.user.redirectUrl&&""!==this.user.redirectUrl&&this.router.navigate(["/"+this.user.redirectUrl]):this.isLoggedIn=!1},t.prototype.componentReady=function(t){var e=this;try{setTimeout(function(){console.log("componentReady"),zc[e.options.id].form=zc[e.formOptions.id].form,zc[e.options.id].formlyOptions=zc[e.formOptions.id].formlyOptions,zc[e.options.id].model=zc[e.formOptions.id].model},10)}catch(n){console.log("error",n)}},t.prototype.submit=function(){return this.ls.removeItem("user"),zc[this.formOptions.id].model},t.prototype.login=function(t){var e=this;t.success?(zc[this.options.id].model.rememberMe?this.ls.setItem("credentials",zc[this.options.id].model,!0):this.ls.removeItem("credentials"),this.ls.setItem("user",t.data,!0),"AlertForMultiple"===this.appConfigService.settings.login_mode&&t.data&&t.data.oldSessions&&t.data.oldSessions.length>0?(this.oldSessions=JSON.parse(JSON.stringify(t.data.oldSessions)),this.modal=this.modalService.open(this.LoginSessionModal,{size:"lg",centered:!0,backdrop:"static",windowClass:"login-session-modal"}),this.modal.result.then(function(n){e.navigateUrl(t)})):this.navigateUrl(t)):this.errorMsg=t.message},t.prototype.okSesssion=function(){var t=this.oldSessions.filter(function(t){return t.checked});this.wls.removeOldServerSession({oldSessions:t}).subscribe(function(t){}),this.modal.close()},t.prototype.cancelSession=function(){},t.prototype.checkAllSessions=function(){this.oldSessions.map(function(t){t.checked=!0})},t.prototype.checkDisabled=function(){return!(this.oldSessions.filter(function(t){return t.checked}).length>0)},t.prototype.logout=function(){this.ls.removeItem("credentials"),this.ls.removeItem("user"),this.isLoggedIn=!1},t.prototype.navigateUrl=function(t){this.options.events&&this.options.events.onSuccess&&this.actions(this.options.events.onSuccess,t.data),!1!==this.options.redirectUrl&&(""!==t.data.redirectUrl?this.router.navigate(["/"+t.data.redirectUrl]):this.isLoggedIn=!0)},t.prototype.actions=function(t,e){var n=this;t&&t.forEach(function(t){n.actionService.action(t,e)})},i.c([Object(s.Input)(),i.f("design:type",Object)],t.prototype,"options",void 0),i.c([Object(s.ViewChild)("LoginSessionModal"),i.f("design:type",Object)],t.prototype,"LoginSessionModal",void 0),t=i.c([Object(s.Component)({selector:"zc-login",template:n("/qBQ")}),i.f("design:paramtypes",[o.Router,r.a,u.e,r.i,c,r.b])],t)}(),l=n("IfiR"),d=n("eQXH");n.d(e,"ZcWidgetLoginModule",function(){return h});var h=function(){function t(){}return t=i.c([Object(s.NgModule)({imports:[d.a,l.FormsModule,l.ReactiveFormsModule],declarations:[a],providers:[c],exports:[a]})],t)}()},QagP:function(t,e,n){"use strict";n.d(e,"a",function(){return o});var i=n("D57K"),s=n("DwTn");function o(){return function(t){return t.lift(new r)}}var r=function(){function t(){}return t.prototype.call=function(t,e){return e.subscribe(new c(t))},t}(),c=function(t){function e(e){var n=t.call(this,e)||this;return n.hasPrev=!1,n}return i.d(e,t),e.prototype._next=function(t){this.hasPrev?this.destination.next([this.prev,t]):this.hasPrev=!0,this.prev=t},e}(s.a)},QzdH:function(t,e,n){"use strict";n.d(e,"a",function(){return r});var i=n("diMa"),s=n("1add"),o=n("0cIN");function r(t,e){return void 0===e&&(e=i.a),Object(s.a)(function(){return Object(o.a)(t,e)})}},"R+ki":function(t,e,n){"use strict";n.d(e,"a",function(){return r});var i=n("D57K"),s=n("DwTn"),o=n("diMa");function r(t,e){return void 0===e&&(e=o.a),function(n){return n.lift(new c(t,e))}}var c=function(){function t(t,e){this.dueTime=t,this.scheduler=e}return t.prototype.call=function(t,e){return e.subscribe(new u(t,this.dueTime,this.scheduler))},t}(),u=function(t){function e(e,n,i){var s=t.call(this,e)||this;return s.dueTime=n,s.scheduler=i,s.debouncedSubscription=null,s.lastValue=null,s.hasValue=!1,s}return i.d(e,t),e.prototype._next=function(t){this.clearDebounce(),this.lastValue=t,this.hasValue=!0,this.add(this.debouncedSubscription=this.scheduler.schedule(a,this.dueTime,this))},e.prototype._complete=function(){this.debouncedNext(),this.destination.complete()},e.prototype.debouncedNext=function(){if(this.clearDebounce(),this.hasValue){var t=this.lastValue;this.lastValue=null,this.hasValue=!1,this.destination.next(t)}},e.prototype.clearDebounce=function(){var t=this.debouncedSubscription;null!==t&&(this.remove(t),t.unsubscribe(),this.debouncedSubscription=null)},e}(s.a);function a(t){t.debouncedNext()}}}]);