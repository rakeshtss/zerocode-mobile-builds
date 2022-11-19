(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{KmUk:function(e,t){e.exports=".time-snapshot {\n  position: absolute;\n  top: 50px;\n  left: 250px;\n  font-size: 120px;\n  font-weight: bold; }\n\n.custom-file {\n  height: auto;\n  padding: 10px;\n  border: 1px solid #e0e0e0;\n  border-radius: 4px; }\n\n.custom-file-input {\n  height: calc(3.25rem + 2px); }\n\n.custom-file-label {\n  top: 10px;\n  right: 10px;\n  left: 10px;\n  height: calc(3.25rem + 2px);\n  line-height: 3 !important;\n  background-color: #f9f9f9;\n  border: 1px dashed #ced4da;\n  border-radius: 0.25rem;\n  text-align: center;\n  color: #747474;\n  font-weight: 600; }\n\n.custom-file:hover .custom-file-label {\n  border-color: #007bff; }\n\n.custom-file-label::after {\n  content: 'Upload' !important;\n  display: none; }\n\n.upload-files-list {\n  max-height: 200px;\n  overflow: auto; }\n\n.upload-files-list ul {\n  list-style: none;\n  margin: 0;\n  padding: 0; }\n\n.upload-files-list ul li {\n  padding: 10px;\n  background-color: #e8ebee;\n  margin-top: 5px;\n  border-radius: 5px; }\n\n.upload-files-list ul li a {\n  color: #797979;\n  float: right;\n  cursor: pointer;\n  font-size: 18px;\n  margin-top: -1px;\n  padding-left: 10px; }\n\n.image-view-widget .image-view-list {\n  display: flex;\n  flex-wrap: wrap;\n  overflow-x: auto; }\n\n.image-view-widget .image-view-list li {\n  flex: 0 0 auto;\n  padding-right: 7px; }\n\n.modal-header {\n  background-color: #fff;\n  padding: 1rem !important;\n  border: 0;\n  -webkit-animation-name: header;\n          animation-name: header;\n  -webkit-animation-duration: 0.3s;\n          animation-duration: 0.3s; }\n\n.modal-header .modal-title {\n  font-size: 20px;\n  font-weight: bold;\n  font-weight: 500;\n  color: #363642 !important; }\n\n.modal-header .close {\n  cursor: pointer;\n  padding: 20px 1rem 12px; }\n\n.zc-cropper-image .cropper {\n  top: 0px !important;\n  height: 100% !important; }\n\n.no-img .custom-file .custom-file-input {\n  cursor: pointer;\n  min-height: 230px; }\n\n.no-img .custom-file .custom-file-label {\n  background-color: transparent !important;\n  height: calc(100% - 20px);\n  line-height: 3;\n  border-radius: 30px; }\n\n.no-img .custom-file {\n  background-image: url('default-profile.6f0c501bd66bd84a5382.png');\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center;\n  min-height: 250px;\n  width: 250px;\n  border-radius: 40px; }\n\n.no-img .custom-file.webcam {\n  background-image: url('web-cam.077130ffa7289a17ab0c.png') !important;\n  background-color: #e8ebee; }\n"},hzhN:function(e,t){e.exports='\x3c!-- <div class="web-cam-container" [ngClass]="to.cssContainer">\n  <div [ngStyle]="to.styleContainer" class="camera-view" *ngIf="!webcamImage">\n    <ng-container *ngIf="appConfigService.settings.platform==\'web\'" >\n      <webcam [trigger]="triggerObservable" (imageCapture)="handleImage($event)"></webcam>\n      <p class="time-snapshot">{{seconds}}</p>\n    </ng-container>\n  </div>\n  <div  class="camera-snapshot" *ngIf="webcamImage">\n    <img [src]="webcamImage.imageAsDataUrl"/>\n  </div>\n  <div class="camera-actions">\n    <button *ngIf="showSnapBtn && !webcamImage" class="btn btn-primary snapshotBtn" (click)="triggerSnapshot();"> Take A Snapshot</button>\n    <button *ngIf="webcamImage" class="btn btn-primary snapshotBtn" (click)="reTake();"> Retake</button>\n  </div>\n</div> --\x3e\n\n\n\n<div class="image-container no-img">\n\n  <div>\n    <ng-container> \n      <div class="custom-file webcam"  *ngIf="!showWebCam"> \n         <span class="input-icon "></span>\n        \n        <input type="text" (click)="openWebCam()"  class="custom-file-input" />\n        <label class="custom-file-label" for="customFile">\n          {{ \'Click here to open web cam\' }}\n        </label>\n           \n      </div>\n     \n\n      \x3c!--- For web cam add open --\x3e\n      \n      <div class="camera-view" *ngIf="showWebCam && !webcamImage">\n        <webcam [trigger]="triggerObservable" (imageCapture)="handleImage($event)"></webcam>\n        <p class="time-snapshot">{{seconds}}</p>\n      </div>\n\n    \n  \n\n      \x3c!-- For not multiple open--\x3e\n      <div class="camera-snapshot" *ngIf="showWebCam && !to.multiple && webcamImage">\n         <img [src]="webcamImage.imageAsDataUrl"/> \n      \n     </div>\n      \x3c!-- For not multiple close--\x3e\n          \n      <div class="camera-actions">\n        <button *ngIf="showSnapBtn && showWebCam" class="btn btn-primary snapshotBtn" (click)="triggerSnapshot();"> Take A Snapshot</button>\n        <button *ngIf="webcamImage" class="btn btn-primary snapshotBtn" (click)="reTake();"> {{buttonTitle}}</button>\n        \n      </div> \n      \x3c!-- For web cam add close--\x3e\n     \n\n      <div class="upload-files-list" *ngIf="showWebCam && to.multiple">\n        <ul>\n          <ng-container *ngFor="let app of webcamImageArray; let inx = index">\n              <li>\n                <span>\n                    <img [src]="app.imageAsDataUrl" style="width: 100px;"/> \n                    <a class="icon-trash" (click)="deleteSnapShot(inx, app)"></a>             \n                </span>\n              </li>\n          </ng-container>\n        </ul>\n      </div>\n   \n    </ng-container>\n\n  </div>\n</div>\n\n\n\n'},mjW1:function(e,t,i){"use strict";i.r(t);var n=i("D57K"),a=i("LoAr"),o=i("WT9V"),r=i("fESl"),s=i("05nE"),c=i("GiBk"),p=function(){function e(e,t){this.appConfigService=e,this.http=t,this.trigger=new r.a,this.showWebCam=!1,this.webcamImageArray=[],this.uploadFiles=[],this.showSnapBtn=!0,this.showLoader=!1,this.webcamImage=null}return e.prototype.ngOnInit=function(){console.log("to",this.to),null==this.to.triggerSnapshot&&(this.to.triggerSnapshot=!0)},e.prototype.triggerSnapshot=function(){var e=this;this.showSnapBtn=!1,this.seconds=3,"web"==this.appConfigService.settings.platform&&(this.to.triggerSnapshot?setTimeout(function(){e.seconds=2,setTimeout(function(){e.seconds=1,setTimeout(function(){e.trigger.next(),e.seconds=null},2e3)},2e3)},2e3):(this.trigger.next(),this.seconds=null)),"mobile"==this.appConfigService.settings.platform&&this.cordovaMobile()},e.prototype.cordovaMobile=function(){var e={quality:50,destinationType:Camera.DestinationType.DATA_URL};navigator.camera.getPicture(function(e){this.webcamImage={imageAsDataUrl:"data:image/jpeg;base64,"+e},this.cameraOnSuccess(this.webcamImage.imageAsDataUrl)},function(e){console.debug("Unable to obtain picture: "+e,"app")},e)},e.prototype.handleImage=function(e){var t=this;this.webcamImage=e,this.to.multiple&&(this.buttonTitle="Take Another Snap",this.webcamImageArray.push(e),this.webcamImageArray.forEach(function(e){t.cameraOnSuccess(e.imageAsDataUrl)})),this.to.multiple||(this.webcamImage=e,this.buttonTitle="Retake Snap",this.cameraOnSuccess(this.webcamImage))},e.prototype.deleteSnapShot=function(e){var t=e._imageAsDataUrl,i=this.webcamImageArray.map(function(e){return e._imageAsDataUrl}).indexOf(t);this.webcamImageArray.splice(i,1)},e.prototype.openWebCam=function(){this.showWebCam=!0},Object.defineProperty(e.prototype,"triggerObservable",{get:function(){return this.trigger.asObservable()},enumerable:!0,configurable:!0}),e.prototype.cameraOnSuccess=function(e){this.uploadFiles=[],this.uploadFiles.push(e),this.uploadFile()},e.prototype.uploadFile=function(){var e=this;this.showLoader=!0;var t=this.appConfigService.settings.fileServer;this.postFile(t+"uploadBase64").subscribe(function(t){try{if(e.showLoader=!1,e.formControl.value&&e.to.multiple)e.formControl.setValue(e.formControl.value.concat(t.data));else if(e.formControl.value&&e.formControl.value.length>0&&e.formControl.value[0].saved){var i=[];e.formControl.value[0]&&(e.formControl.value[0].deleted=!0),i.push(e.formControl.value[0]),i.push.apply(i,t.data),e.formControl.setValue(i)}else e.formControl.setValue(t.data);e.onChange(e.formControl.value)}catch(n){console.log("error",n)}},function(t){e.showLoader=!1})},e.prototype.onChange=function(e){this.field.templateOptions.onchange&&this.field.templateOptions.onchange(this.field,e)},e.prototype.postFile=function(e){var t=new FormData;return t.append("file",this.uploadFiles[0]),this.http.post(e,t)},e.prototype.reTake=function(){this.webcamImage=null,this.formControl.setValue(null),this.showSnapBtn=!0},n.c([Object(a.Input)(),n.f("design:type",Object)],e.prototype,"formControl",void 0),n.c([Object(a.Input)(),n.f("design:type",Object)],e.prototype,"to",void 0),n.c([Object(a.Input)(),n.f("design:type",Object)],e.prototype,"field",void 0),n.c([Object(a.Input)(),n.f("design:type",Object)],e.prototype,"form",void 0),n.c([Object(a.Input)(),n.f("design:type",Object)],e.prototype,"model",void 0),n.c([Object(a.Input)(),n.f("design:type",Object)],e.prototype,"formState",void 0),e=n.c([Object(a.Component)({selector:"zc-web-cam",template:i("hzhN"),styles:[i("KmUk")]}),n.f("design:paramtypes",[s.b,c.HttpClient])],e)}(),l=i("IfiR"),g=i("HnWI"),d=function(){function e(e,t,i){this._mimeType=null,this._imageAsBase64=null,this._imageAsDataUrl=null,this._imageData=null,this._mimeType=t,this._imageAsDataUrl=e,this._imageData=i}return e.getDataFromDataUrl=function(e,t){return e.replace("data:"+t+";base64,","")},Object.defineProperty(e.prototype,"imageAsBase64",{get:function(){return this._imageAsBase64?this._imageAsBase64:this._imageAsBase64=e.getDataFromDataUrl(this._imageAsDataUrl,this._mimeType)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"imageAsDataUrl",{get:function(){return this._imageAsDataUrl},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"imageData",{get:function(){return this._imageData},enumerable:!0,configurable:!0}),e}(),u=function(){function e(){}return e.getAvailableVideoInputs=function(){return navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices?new Promise(function(e,t){navigator.mediaDevices.enumerateDevices().then(function(t){e(t.filter(function(e){return"videoinput"===e.kind}))}).catch(function(e){t(e.message||e)})}):Promise.reject("enumerateDevices() not supported.")},e}(),m=[function(){function e(){this.width=640,this.height=480,this.videoOptions=t.DEFAULT_VIDEO_OPTIONS,this.allowCameraSwitch=!0,this.captureImageData=!1,this.imageType=t.DEFAULT_IMAGE_TYPE,this.imageQuality=t.DEFAULT_IMAGE_QUALITY,this.imageCapture=new a.EventEmitter,this.initError=new a.EventEmitter,this.imageClick=new a.EventEmitter,this.cameraSwitched=new a.EventEmitter,this.availableVideoInputs=[],this.videoInitialized=!1,this.activeVideoInputIndex=-1,this.mediaStream=null,this.activeVideoSettings=null}var t;return t=e,Object.defineProperty(e.prototype,"trigger",{set:function(e){var t=this;this.triggerSubscription&&this.triggerSubscription.unsubscribe(),this.triggerSubscription=e.subscribe(function(){t.takeSnapshot()})},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"switchCamera",{set:function(e){var t=this;this.switchCameraSubscription&&this.switchCameraSubscription.unsubscribe(),this.switchCameraSubscription=e.subscribe(function(e){"string"==typeof e?t.switchToVideoInput(e):t.rotateVideoInput(!1!==e)})},enumerable:!0,configurable:!0}),e.getMediaConstraintsForDevice=function(e,t){var i=t||this.DEFAULT_VIDEO_OPTIONS;return e&&(i.deviceId={exact:e}),i},e.getDeviceIdFromMediaStreamTrack=function(e){if(e.getSettings&&e.getSettings()&&e.getSettings().deviceId)return e.getSettings().deviceId;if(e.getConstraints&&e.getConstraints()&&e.getConstraints().deviceId){var i=e.getConstraints().deviceId;return t.getValueFromConstrainDOMString(i)}},e.getFacingModeFromMediaStreamTrack=function(e){if(e){if(e.getSettings&&e.getSettings()&&e.getSettings().facingMode)return e.getSettings().facingMode;if(e.getConstraints&&e.getConstraints()&&e.getConstraints().facingMode){var i=e.getConstraints().facingMode;return t.getValueFromConstrainDOMString(i)}}},e.isUserFacing=function(e){var i=t.getFacingModeFromMediaStreamTrack(e);return!!i&&"user"===i.toLowerCase()},e.getValueFromConstrainDOMString=function(e){if(e){if(e instanceof String)return String(e);if(Array.isArray(e)&&Array(e).length>0)return String(e[0]);if("object"==typeof e){if(e.exact)return String(e.exact);if(e.ideal)return String(e.ideal)}}return null},e.prototype.ngAfterViewInit=function(){var e=this;this.detectAvailableDevices().then(function(){e.switchToVideoInput(null)}).catch(function(t){e.initError.next({message:t}),e.switchToVideoInput(null)})},e.prototype.ngOnDestroy=function(){this.stopMediaTracks(),this.unsubscribeFromSubscriptions()},e.prototype.takeSnapshot=function(){var e=this.nativeVideoElement,i={width:this.width,height:this.height};e.videoWidth&&(i.width=e.videoWidth,i.height=e.videoHeight);var n=this.canvas.nativeElement;n.width=i.width,n.height=i.height;var a=n.getContext("2d");a.drawImage(e,0,0);var o=this.imageType?this.imageType:t.DEFAULT_IMAGE_TYPE,r=this.imageQuality?this.imageQuality:t.DEFAULT_IMAGE_QUALITY,s=n.toDataURL(o,r),c=null;this.captureImageData&&(c=a.getImageData(0,0,n.width,n.height)),this.imageCapture.next(new d(s,o,c))},e.prototype.rotateVideoInput=function(e){if(this.availableVideoInputs&&this.availableVideoInputs.length>1){var t=e?1:this.availableVideoInputs.length-1,i=(this.activeVideoInputIndex+t)%this.availableVideoInputs.length;this.switchToVideoInput(this.availableVideoInputs[i].deviceId)}},e.prototype.switchToVideoInput=function(e){this.videoInitialized=!1,this.stopMediaTracks(),this.initWebcam(e,this.videoOptions)},e.prototype.videoResize=function(){},Object.defineProperty(e.prototype,"videoWidth",{get:function(){var e=this.getVideoAspectRatio();return Math.min(this.width,this.height*e)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"videoHeight",{get:function(){var e=this.getVideoAspectRatio();return Math.min(this.height,this.width/e)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"videoStyleClasses",{get:function(){var e="";return this.isMirrorImage()&&(e+="mirrored "),e.trim()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"nativeVideoElement",{get:function(){return this.video.nativeElement},enumerable:!0,configurable:!0}),e.prototype.getVideoAspectRatio=function(){var e=this.nativeVideoElement;return e.videoWidth&&e.videoWidth>0&&e.videoHeight&&e.videoHeight>0?e.videoWidth/e.videoHeight:this.width/this.height},e.prototype.initWebcam=function(e,i){var n=this,a=this.nativeVideoElement;if(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia){var o=t.getMediaConstraintsForDevice(e,i);navigator.mediaDevices.getUserMedia({video:o}).then(function(e){n.mediaStream=e,a.srcObject=e,a.play(),n.activeVideoSettings=e.getVideoTracks()[0].getSettings();var i=t.getDeviceIdFromMediaStreamTrack(e.getVideoTracks()[0]);n.cameraSwitched.next(i),n.detectAvailableDevices().then(function(){n.activeVideoInputIndex=i?n.availableVideoInputs.findIndex(function(e){return e.deviceId===i}):-1,n.videoInitialized=!0}).catch(function(){n.activeVideoInputIndex=-1,n.videoInitialized=!0})}).catch(function(e){n.initError.next({message:e.message,mediaStreamError:e})})}else this.initError.next({message:"Cannot read UserMedia from MediaDevices."})},e.prototype.getActiveVideoTrack=function(){return this.mediaStream?this.mediaStream.getVideoTracks()[0]:null},e.prototype.isMirrorImage=function(){if(!this.getActiveVideoTrack())return!1;var e="auto";switch(this.mirrorImage&&("string"==typeof this.mirrorImage?e=String(this.mirrorImage).toLowerCase():this.mirrorImage.x&&(e=this.mirrorImage.x.toLowerCase())),e){case"always":return!0;case"never":return!1}return t.isUserFacing(this.getActiveVideoTrack())},e.prototype.stopMediaTracks=function(){this.mediaStream&&this.mediaStream.getTracks&&this.mediaStream.getTracks().forEach(function(e){return e.stop()})},e.prototype.unsubscribeFromSubscriptions=function(){this.triggerSubscription&&this.triggerSubscription.unsubscribe(),this.switchCameraSubscription&&this.switchCameraSubscription.unsubscribe()},e.prototype.detectAvailableDevices=function(){var e=this;return new Promise(function(t,i){u.getAvailableVideoInputs().then(function(i){e.availableVideoInputs=i,t(i)}).catch(function(t){e.availableVideoInputs=[],i(t)})})},e.DEFAULT_VIDEO_OPTIONS={facingMode:"environment"},e.DEFAULT_IMAGE_TYPE="image/jpeg",e.DEFAULT_IMAGE_QUALITY=.92,Object(n.c)([Object(a.Input)(),Object(n.f)("design:type",Number)],e.prototype,"width",void 0),Object(n.c)([Object(a.Input)(),Object(n.f)("design:type",Number)],e.prototype,"height",void 0),Object(n.c)([Object(a.Input)(),Object(n.f)("design:type",Object)],e.prototype,"videoOptions",void 0),Object(n.c)([Object(a.Input)(),Object(n.f)("design:type",Boolean)],e.prototype,"allowCameraSwitch",void 0),Object(n.c)([Object(a.Input)(),Object(n.f)("design:type",Object)],e.prototype,"mirrorImage",void 0),Object(n.c)([Object(a.Input)(),Object(n.f)("design:type",Boolean)],e.prototype,"captureImageData",void 0),Object(n.c)([Object(a.Input)(),Object(n.f)("design:type",String)],e.prototype,"imageType",void 0),Object(n.c)([Object(a.Input)(),Object(n.f)("design:type",Number)],e.prototype,"imageQuality",void 0),Object(n.c)([Object(a.Output)(),Object(n.f)("design:type",a.EventEmitter)],e.prototype,"imageCapture",void 0),Object(n.c)([Object(a.Output)(),Object(n.f)("design:type",a.EventEmitter)],e.prototype,"initError",void 0),Object(n.c)([Object(a.Output)(),Object(n.f)("design:type",a.EventEmitter)],e.prototype,"imageClick",void 0),Object(n.c)([Object(a.Output)(),Object(n.f)("design:type",a.EventEmitter)],e.prototype,"cameraSwitched",void 0),Object(n.c)([Object(a.ViewChild)("video",{static:!0}),Object(n.f)("design:type",Object)],e.prototype,"video",void 0),Object(n.c)([Object(a.ViewChild)("canvas",{static:!0}),Object(n.f)("design:type",Object)],e.prototype,"canvas",void 0),Object(n.c)([Object(a.Input)(),Object(n.f)("design:type",g.a),Object(n.f)("design:paramtypes",[g.a])],e.prototype,"trigger",null),Object(n.c)([Object(a.Input)(),Object(n.f)("design:type",g.a),Object(n.f)("design:paramtypes",[g.a])],e.prototype,"switchCamera",null),e=t=Object(n.c)([Object(a.Component)({selector:"webcam",template:'<div class="webcam-wrapper" (click)="imageClick.next();">\r\n  <video #video [width]="videoWidth" [height]="videoHeight" [class]="videoStyleClasses" autoplay muted playsinline (resize)="videoResize()"></video>\r\n  <div class="camera-switch" *ngIf="allowCameraSwitch && availableVideoInputs.length > 1 && videoInitialized" (click)="rotateVideoInput(true)"></div>\r\n  <canvas #canvas [width]="width" [height]="height"></canvas>\r\n</div>\r\n',styles:[".webcam-wrapper{display:inline-block;position:relative;line-height:0}.webcam-wrapper video.mirrored{transform:scale(-1,1)}.webcam-wrapper canvas{display:none}.webcam-wrapper .camera-switch{background-color:rgba(0,0,0,.1);background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAE9UlEQVR42u2aT2hdRRTGf+cRQqghSqihdBFDkRISK2KDfzDWxHaRQHEhaINKqa1gKQhd6EZLN+IidCH+Q0oWIkVRC21BQxXRitVaSbKoJSGtYGoK2tQ/tU1jY5v0c5F54Xl7b/KSO/PyEt+3e5f75p7zzZwzZ74zUEIJJfyfYaEGllQGVAGZlENdBy6Z2cSiYFTSKkkfS/pH/nBF0kFJdUW9AiRVASeAukD8DgNrzOySrwEzng18KaDzALXuG8W3AiStAvqBisBRNg40mtlPxbYCOgvgPO4bncWW+JpVeDQXRQhIygDfA00F5r0XuNfMrgclQFI98DDQCNQA5ZFXqoCWBVp8XwHRHeEqcN7loy/NbHBesyqpQ1KfFj/6nC+ZvFaApFrgPaCZpYVvgCfNbDiRAElNwGFg+RIt/X8H2s2s9wYCJDUAR4HqJX7++RN40MwGpgmQVAH0AQ2BPz4AHHPl8nBOAqtyFWQjsA6oL4Ada81sPDv7uwImod8kvSJp9RyS8O2SXnb/DYVd2Y9VSroQ4ANXJO2WVJmixqh0kzMWwL4LkiqRtDnA4D1zmfE8j9g9AezcnAHaPcfXdbfdnPZ2Yps6+DwAvO/Z1naTdApY7Xng48BDZnY1MpMVQBuw3iXc5Tnb0wBwBPjUzP6eoezuArZ6svM0geJLkvZEYnl3nkntoqROSbckSW2Suj3ZOIangc7GPJuUtNGdFIfmMeavktoSSKiW9LMPw30Q8JqkekmjCbOZRhuclLQjgYSNxUBAj6RyZ9ATgUJpUtJTCSR8vpAEXHAyWK5BXYFIGHOlepSAloUk4NEYgyoknQhEwhFJ0e8h6VSaQeerCb5uZgdi9utxYBNwOUD93hIVXswM4INCi6K9wAszFC2DwLOBDjHbYp59karIUnRdzYy/3ClqVklaUhfwTICj7K25OqA7a4wWagVsm4Me/xzwg2cCqqONFzO7DPxSCAJi436GUBgHHguQD2oTlJ55oSzP9ybccsttSJw1szdjFOSnI/8dTCGZHwcORp4Nx7y3B1iZ8/sm4MW8/Euxg5wIsS/HaAp3zeP4/G7obRDXI4jiTIA22H7Xdc7X+S3A5lC7QBQ357aq3VAjCeSkwUfAJrfvz+R8A9ADLAtZB+TinpjC5JMA+//jwPZZnF8G7J+L8z4IWB/zbG+gIujVWfLBW/NStVMmqaG4POJRsIjix7h8IGnLQuoBbQki5sVAJHyYm7YkNaRRtXwQ8G1cHpX0iKRrgUjYno17Sf0LrQhJUkdCeHWkVITGJI0k1QeS3ikGSUzOyJUJJNznYneuOCnpTldcxa2kP3xJYqOeSDjqZG8ShJLnE8TTuMS6Iyu1BW7djZqkfo9N0QOuYJmYQddfB7RG+gLTNzqAY9FrL+5/nwEbvDdJJe3zzOrhNP3AWRqmk55t3ZcBuj3b2gb0Sbrbo/NNzk7fFzu7s/E5EiC+rrmeQU0Kx2skvRFoOx2ZzlmSdgbsw49JetvtBpk8nM64d/cGbNtJ0s7cGyJlwHeEv+t3nqnLSgPAUOSGyG3AHUxdzqoJbEcvcL+ZTeTeEapzJKxgaeOcc/7Mf06D7kFrguS0VDAMtGadv+E47DT9tcChJej8ISfpD+abgTe45uOkFi8mnQ+JBVQ+d4VXuOptjavcyot8pq86mfwk8LWZnaOEEkoooYQSSojDv8AhQNeGfe0jAAAAAElFTkSuQmCC);background-repeat:no-repeat;border-radius:5px;position:absolute;right:13px;top:10px;height:48px;width:48px;background-size:80%;cursor:pointer;background-position:center;transition:background-color .2s}.webcam-wrapper .camera-switch:hover{background-color:rgba(0,0,0,.18)}"]})],e)}()],h=function(){function e(){}return e=Object(n.c)([Object(a.NgModule)({imports:[o.CommonModule],declarations:[m],exports:[m]})],e)}();i.d(t,"ZcWebCamModule",function(){return b});var b=function(){function e(){}return e=n.c([Object(a.NgModule)({declarations:[p],imports:[o.CommonModule,l.FormsModule,h],entryComponents:[p]})],e)}()}}]);