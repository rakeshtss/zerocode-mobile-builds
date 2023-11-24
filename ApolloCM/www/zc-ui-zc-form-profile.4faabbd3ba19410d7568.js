(window.webpackJsonp=window.webpackJsonp||[]).push([[49],{EtXx:function(e,n){e.exports='<div class="image-container">\r\n\r\n  <div [ngClass]="to.displayStyle">\r\n    <ng-container *ngIf="to.mode !== \'view\'">\r\n      <div class="custom-file" *ngIf="!showLoader && ((formControl.value && formControl.value.length === 0) ||\r\n      (formControl.value &&  formControl.value.length === 1 && formControl.value[0].deleted))">\r\n        <span class="input-icon"></span>\r\n        <input type="button" *ngIf="uploadType === \'base64\' && uploadOption" #fileInputCamera class="custom-file-input" />\r\n        <input type="file" *ngIf="uploadType !== \'base64\'" [multiple]="to.multiple" (change)="fileChangeEvent($event)" #fileInput (click)="fileInput.value = null" class="custom-file-input" />\r\n        <label class="custom-file-label" for="customFile">\r\n          {{ to.placeholder || \'Select file or Drop here\' }}\r\n        </label>\r\n      </div>\r\n      <div *ngIf="showCroppedImage">\r\n        <img [src]="croppedImage" />\r\n        <div class="profile-actions">\r\n          <a *ngIf="to.mode !== \'view\' && showCroppedImage && croppedImage!=\'\'" class="icon-trash text-danger" (click)="deleteCroppedImage()">\r\n          </a>\r\n        </div>\r\n      </div>\r\n\r\n\r\n\r\n      <div class="image-description">\r\n        <span class="image-allowedtype" *ngIf="allowedtype && allowedtype !== 0 && allowedtype !== \'\'">\r\n          <sub>Allowed Types: <span style="color: #009a00">{{ allowedtype.toUpperCase() }}</span></sub>\r\n        </span>\r\n        <span class="image-maxsize" *ngIf="maxSize" class="max-file-size">\r\n          <sub>\r\n            <span>Maximum file size: </span>\r\n            <span style="color: #009a00">\r\n              <b>{{ maxSize }}</b> MB\r\n            </span>\r\n          </sub>\r\n        </span>\r\n        <span class="image-allowedtype" *ngIf="to?.messages?.dimenesion">\r\n          <sub>Dimension: <span style="color: #009a00">{{ to?.messages?.dimenesion }}</span>\r\n          </sub>\r\n        </span>\r\n\r\n      </div>\r\n    </ng-container>\r\n\r\n  </div>\r\n</div>\r\n\r\n\r\n<ng-template #openImageCropped let-c="close" let-d="dismiss" class="json-modal">\r\n  <div class="modal-header">\r\n    <h4 class="modal-title" id="modal-basic-title" style="visibility:hidden;"> Crop Image</h4>\r\n    <button type="button" class="close" aria-label="Close" (click)="d(\'Cross click\')">\r\n      <span aria-hidden="true">&times;</span>\r\n    </button>\r\n  </div>\r\n  <div class="modal-body zc-cropper-image">\r\n\r\n    <div class="error-detail-model">\r\n      <image-cropper [imageChangedEvent]="imageChangedEvent" [maintainAspectRatio]="maintainAspectRatio" [aspectRatio]="4 / 3" format="png" (imageCropped)="imageCropped($event)" (imageLoaded)="imageLoaded()" (cropperReady)="cropperReady()" (loadImageFailed)="loadImageFailed()">\r\n      </image-cropper>\r\n    </div>\r\n  </div>\r\n\r\n\r\n  <div class="modal-footer" style="display:block;text-align:center;">\r\n    <button type="button" class="btn btn-primary" (click)="getCroppedImage(d)"> Update</button>\r\n    \x3c!-- <button  type="button"  class="btn btn-primary"(click)="uploadFile(d)"> Update</button> --\x3e\r\n  </div>\r\n</ng-template>\r\n'},TFG2:function(e,n){e.exports=".custom-file {\n  height: auto;\n  padding: 10px;\n  border: 1px solid #e0e0e0;\n  border-radius: 4px; }\n\n.custom-file-input {\n  height: calc(3.25rem + 2px); }\n\n.custom-file-label {\n  top: 10px;\n  right: 10px;\n  left: 10px;\n  height: calc(3.25rem + 2px);\n  line-height: 3 !important;\n  background-color: #f9f9f9;\n  border: 1px dashed #ced4da;\n  border-radius: 0.25rem;\n  text-align: center;\n  color: #747474;\n  font-weight: 600; }\n\n.custom-file:hover .custom-file-label {\n  border-color: #007bff; }\n\n.custom-file-label::after {\n  content: 'Upload' !important;\n  display: none; }\n\n.upload-files-list {\n  max-height: 200px;\n  overflow: auto; }\n\n.upload-files-list ul {\n  list-style: none;\n  margin: 0;\n  padding: 0; }\n\n.upload-files-list ul li {\n  padding: 10px;\n  background-color: #e8ebee;\n  margin-top: 5px;\n  border-radius: 5px; }\n\n.upload-files-list ul li a {\n  color: #797979;\n  float: right;\n  cursor: pointer;\n  font-size: 18px;\n  margin-top: -1px;\n  padding-left: 10px; }\n\n.image-view-widget .image-view-list {\n  display: flex;\n  flex-wrap: wrap;\n  overflow-x: auto; }\n\n.image-view-widget .image-view-list li {\n  flex: 0 0 auto;\n  padding-right: 7px; }\n\n.modal-header {\n  background-color: #fff;\n  padding: 1rem !important;\n  border: 0;\n  -webkit-animation-name: header;\n          animation-name: header;\n  -webkit-animation-duration: 0.3s;\n          animation-duration: 0.3s; }\n\n.modal-header .modal-title {\n  font-size: 20px;\n  font-weight: bold;\n  font-weight: 500;\n  color: #363642 !important; }\n\n.modal-header .close {\n  cursor: pointer;\n  padding: 20px 1rem 12px; }\n\n.zc-cropper-image .cropper {\n  top: 0px !important;\n  height: 100% !important; }\n\n.custom-file .custom-file-input {\n  cursor: pointer;\n  min-height: 111px; }\n\n.custom-file .custom-file-label {\n  background-color: transparent !important;\n  height: calc(100% - 20px);\n  line-height: 3;\n  border-radius: 30px; }\n\n.custom-file {\n  background-image: url(/assets/images/default-profile.png);\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center;\n  min-height: 130px;\n  width: 130px;\n  border-radius: 40px; }\n"},sbwy:function(e,n,t){"use strict";t.r(n);var o=t("D57K"),i=t("LoAr"),a=t("WT9V"),r=t("qLF1"),p=t("SHvt"),l=t("05nE"),s=t("GiBk"),d=t("fESl"),c=function(){function e(e,n,t){this.modalService=e,this.http=n,this.appConfigService=t,this.showLoader=!1,this.trigger=new d.a,this.imageChangedEvent="",this.croppedImage="",this.allowedtype="",this.uploadType="binary",this.uploadOption=!0,this.uploadFiles=[],this.showCroppedImage=!1}return e.prototype.ngOnInit=function(){console.log("image",this.showCroppedImage),!1!==this.to.maintainAspectRatio&&(this.to.maintainAspectRatio=!0),null!=this.formControl.value[0]&&(this.showCroppedImage=!0,this.croppedImage=this.formControl.value[0].fullPath,console.log(this.croppedImage))},e.prototype.fileChangeEvent=function(e){this.showCroppedImage=!1,this.imageChangedEvent=e,this.modalService.open(this.openImageCropped,{size:"lg",centered:!0,backdrop:"static",windowClass:"page-create-modal"})},e.prototype.getCroppedImage=function(e){this.showCroppedImage=!0,this.uploadFile(),e()},e.prototype.deleteCroppedImage=function(){this.croppedImage="",this.showCroppedImage=!1,this.formControl.setValue([])},e.prototype.imageCropped=function(e){this.croppedImage=e.base64},e.prototype.imageLoaded=function(){},e.prototype.cropperReady=function(){},e.prototype.loadImageFailed=function(){},e.prototype.uploadFile=function(){var e=this;this.showLoader=!0;var n=this.appConfigService.settings.fileServer;this.postFile(n+"uploadBase64").subscribe(function(n){try{e.showLoader=!1,e.formControl.setValue(n.data)}catch(t){console.log("error",t)}},function(n){e.showLoader=!1})},e.prototype.postFile=function(e){var n=new FormData;return n.append("file",this.croppedImage),this.http.post(e,n)},o.c([Object(i.ViewChild)("openImageCropped"),o.f("design:type",Object)],e.prototype,"openImageCropped",void 0),o.c([Object(i.Input)(),o.f("design:type",Object)],e.prototype,"formControl",void 0),o.c([Object(i.Input)(),o.f("design:type",Object)],e.prototype,"to",void 0),o.c([Object(i.Input)(),o.f("design:type",Object)],e.prototype,"model",void 0),o.c([Object(i.Input)(),o.f("design:type",Object)],e.prototype,"field",void 0),o.c([Object(i.Input)(),o.f("design:type",Object)],e.prototype,"form",void 0),o.c([Object(i.Input)(),o.f("design:type",Object)],e.prototype,"formState",void 0),e=o.c([Object(i.Component)({selector:"zc-profile",template:t("EtXx"),styles:[t("TFG2")]}),o.f("design:paramtypes",[p.e,s.HttpClient,l.b])],e)}();t.d(n,"ZcProfilePicModule",function(){return m});var m=function(){function e(){}return e=o.c([Object(i.NgModule)({declarations:[c],imports:[a.CommonModule,r.b],entryComponents:[c]})],e)}()}}]);