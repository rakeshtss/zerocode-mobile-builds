(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{Ok1F:function(n,o){n.exports=""},dGI6:function(n,o,i){"use strict";i.r(o);var t=i("D57K"),e=i("LoAr"),r=i("WT9V"),s=i("SHvt"),c=function(){function n(n){this.modalService=n,this.inlineForm=!1}return n.prototype.ngAfterViewInit=function(){zc[this.options.id]=this},n.prototype.ngOnInit=function(){this.inlineFormOptions=JSON.parse(JSON.stringify(this.options)),this.inlineFormOptions.id=this.options.id+"_ref"},n.prototype.open=function(n){var o=this;void 0===n&&(n="modal"),"inline"===n?(this.inlineForm=!1,setTimeout(function(){o.inlineForm=!0},0)):this.modal=this.modalService.open(this.zcFormModal,{size:"lg",centered:!0})},n.prototype.close=function(n){void 0===n&&(n="inline"),console.log("type",n),this.modal?this.modal.dismiss():this.inlineForm=!1},t.c([Object(e.Input)(),t.f("design:type",Object)],n.prototype,"options",void 0),t.c([Object(e.ViewChild)("zcFormModal"),t.f("design:type",Object)],n.prototype,"zcFormModal",void 0),n=t.c([Object(e.Component)({selector:"zc-form-modal",template:i("w38s"),styles:[i("Ok1F")]}),t.f("design:paramtypes",[s.e])],n)}(),l=i("k/eh");i.d(o,"ZcFormModalModule",function(){return d});var d=function(){function n(){}return n=t.c([Object(e.NgModule)({imports:[r.CommonModule,s.g,l.b],declarations:[c],exports:[c]})],n)}()},w38s:function(n,o){n.exports='<ng-container *ngIf="inlineForm">\r\n  <zc-com-render\r\n    type="form"\r\n    [options]="inlineFormOptions"\r\n    [showHideWidget]="true"\r\n  ></zc-com-render>\r\n</ng-container>\r\n\r\n<ng-template #zcFormModal let-c="close" let-d="dismiss">\r\n  \x3c!--\r\n    <div class="modal-header">\r\n      <h4 class="modal-title" id="modal-basic-title">{{inlineFormOptions.title}}</h4>\r\n\r\n    </div>\r\n  --\x3e\r\n  <button type="button" class="close" aria-label="Close" (click)="modal.dismiss(\'Cross click\')">\r\n    <span aria-hidden="true">&times;</span>\r\n  </button>\r\n  <div class="modal-body">\r\n    <zc-com-render\r\n      type="form"\r\n      [options]="inlineFormOptions"\r\n      [showHideWidget]="true"\r\n    ></zc-com-render>\r\n  </div>\r\n</ng-template>\r\n'}}]);