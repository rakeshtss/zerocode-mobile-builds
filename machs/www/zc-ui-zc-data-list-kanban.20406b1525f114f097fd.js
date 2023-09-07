(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{d3Tp:function(n,t){n.exports='<div class="kanban-widget-header">\r\n  <div>\r\n    <input type="search" class="form-control" name="globalFilter" [(ngModel)]="globalFilter" (keyup)="loadmore(\'search\')" placeholder="Search" />\r\n  </div>\r\n</div>\r\n<div class="row kanban-widget" *ngIf="showGrid">\r\n  <div class="ui-g-nopad col kanban-column" *ngFor="let grid of kanbanGrids; let inxG = index">\r\n    <div class="drop-column" pDroppable="items" (onDrop)="drop($event, inxG)">\r\n      <h4>\r\n        <span>{{ grid.name }}</span>\r\n      </h4>\r\n      <div class="drag-column search-results" infiniteScroll (scrolled)="onScroll(grid)" [scrollWindow]="false">\r\n        <div *ngIf="grid.items.length === 0" class="ui-helper-clearfix drop-box">\r\n          <span>No record found</span>\r\n        </div>\r\n        <ul class="kanban-column-list" *ngIf="grid.items.length !== 0">\r\n          <li *ngFor="let item of grid.items; let inxT = index" class="ui-helper-clearfix solid" [ngClass]="{ \'ui-highlight-item\': draggedItem }" pDraggable="items" (onDragStart)="dragStart($event, item, inxG, inxT)" (onDragEnd)="dragEnd($event)" (click)="redirectPage(item.uid)">\r\n            <div class="card" *ngIf="options.properties.cardTemplate" [ngClass]="options.properties.styling.row.cssClass" [ngStyle]="options.properties.styling.row.cssStyle">\r\n              <ng-template dynamic-template [template]="options.properties.cardTemplate" [context]="{ row: item }"></ng-template>\r\n            </div>\r\n            <div *ngIf="!options.properties.cardTemplate">\r\n              <ng-container *ngFor="let col of options.cols">\r\n                <div class="column-info profile" [ngClass]="col.style">\r\n                  <div class="profile-info">\r\n                    <label>{{ col.label }}</label>\r\n                    <a class="row-col-link" *ngIf="\r\n                        options?.rowSelect &&\r\n                        col.field == options.rowSelect.column\r\n                      ">\r\n                      \x3c!-- <zc-display-value-format\r\n                        [item]="item"\r\n                        [key]="col.name"\r\n                        [col]="col"\r\n                        [style]="col.displayStyle"\r\n                      ></zc-display-value-format> --\x3e\r\n                    </a>\r\n                    <span class="row-col-value" *ngIf="\r\n                        !options?.rowSelect ||\r\n                        col.field != options.rowSelect.column\r\n                      ">\r\n                      \x3c!-- <zc-display-value-format\r\n                        [item]="item"\r\n                        [key]="col.name"\r\n                        [col]="col"\r\n                        [style]="col.displayStyle"\r\n                      ></zc-display-value-format> --\x3e\r\n                    </span>\r\n                  </div>\r\n                </div>\r\n              </ng-container>\r\n            </div>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>'},fpry:function(n,t){n.exports=".drop-box {\n  border: 1px solid #ccc;\n  margin: 5px;\n  padding: 5px;\n  background-color: #edf3f2;\n  border-radius: 6px;\n  cursor: pointer;\n  min-height: 84;\n  text-align: center;\n  justify-content: center; }\n\n.kanban-widget-header {\n  margin-bottom: 10px; }\n\n.kanban-widget {\n  flex-wrap: initial;\n  overflow-x: auto; }\n\n.kanban-widget .kanban-column {\n    padding-right: 10px;\n    min-width: 275px;\n    max-width: 275px; }\n\n.kanban-widget .kanban-column .drop-column {\n      background-color: #f5f5f5;\n      border: 1px solid #eaeaea; }\n\n.kanban-widget .kanban-column .drop-column > h4 {\n        border-bottom: 1px solid #eaeaea;\n        padding: 10px 5px;\n        margin: 0;\n        display: flex;\n        align-items: center;\n        justify-content: space-between; }\n\n.kanban-widget .kanban-column .drop-column .drag-column {\n        padding: 8px;\n        height: calc(100vh - 350px);\n        overflow-y: auto; }\n\n.kanban-widget .kanban-column .drop-column .drag-column .drop-box {\n          border: 1px solid #ccc;\n          padding: 5px;\n          background-color: #edf3f2;\n          border-radius: 6px;\n          cursor: pointer;\n          text-align: center;\n          display: flex;\n          min-height: 100vh;\n          margin: 0;\n          align-items: center; }\n\n.kanban-widget .kanban-column .drop-column .drag-column .kanban-column-list {\n          margin: 0;\n          padding: 0;\n          list-style: none;\n          font-size: 14px; }\n\n.kanban-widget .kanban-column .drop-column .drag-column .kanban-column-list li.solid {\n            border: 1px solid #ccc;\n            margin-bottom: 5px;\n            background-color: #fff;\n            cursor: pointer;\n            display: flex;\n            flex-direction: column; }\n\n.kanban-widget .kanban-column .drop-column .drag-column .kanban-column-list li.solid .profile {\n              display: flex;\n              align-items: center; }\n\n.kanban-widget .kanban-column .drop-column .drag-column .kanban-column-list li.solid .profile .profile-image {\n                padding: 5px; }\n\n.kanban-widget .kanban-column .drop-column .drag-column .kanban-column-list li.solid .profile .profile-info {\n                display: flex;\n                flex-direction: column;\n                padding-left: 5px; }\n\n.kanban-widget .kanban-column .drop-column .drag-column .kanban-column-list li.solid .profile .profile-info label {\n                  color: #6c757d; }\n\n.kanban-widget .kanban-column .drop-column .drag-column .kanban-column-list li.solid .profile .profile-info .row-col-link {\n                  color: #0072bc;\n                  font-weight: 600;\n                  font-size: 14px;\n                  word-break: break-word; }\n\n.kanban-widget .kanban-column .drop-column .drag-column .kanban-column-list li.solid .profile .profile-info .row-col-value {\n                  color: #000;\n                  font-size: 12px; }\n\n.kanban-widget .kanban-column .drop-column .drag-column .kanban-column-list li.solid .status {\n              color: #ffffff;\n              font-size: 10px; }\n\n.kanban-widget .kanban-column .drop-column .drag-column .kanban-column-list li.solid .status span {\n                padding: 0 10px;\n                border-radius: 5px;\n                margin: 5px 0; }\n\n.kanban-widget .kanban-column .drop-column .drag-column .kanban-column-list li.solid .status span.high {\n                  background-color: #ff0000; }\n\n.kanban-widget .kanban-column .drop-column .drag-column .kanban-column-list li.solid .status span.medium {\n                  background-color: #0072bc; }\n\n.kanban-widget .kanban-column .drop-column .drag-column .kanban-column-list li.solid .status span.low {\n                  background-color: #00a651; }\n\n.kanban-widget .kanban-column .drop-column .drag-column .kanban-column-list li.solid .unique-code {\n              margin: 5px 0; }\n\n.kanban-widget .kanban-column .drop-column .drag-column .kanban-column-list li.solid .display-image {\n              position: relative;\n              border: 1px solid #ccc; }\n\n.kanban-widget .kanban-column .drop-column .drag-column .kanban-column-list li.solid .display-image span {\n                position: absolute;\n                top: 10px;\n                right: 10px; }\n\n.kanban-widget .kanban-column .drop-column .drag-column .kanban-column-list li.solid .column-info {\n              display: flex;\n              flex-direction: row;\n              align-items: center;\n              justify-content: space-between;\n              font-size: 12px;\n              padding: 5px; }\n\n.kanban-widget .kanban-column .drop-column .drag-column .kanban-column-list li.solid .column-info span {\n                display: flex;\n                align-items: center; }\n\n.kanban-widget .kanban-column .drop-column .drag-column .kanban-column-list li.solid .column-info span i {\n                  font-size: 18px;\n                  padding-right: 3px; }\n\n.kanban-widget .kanban-column .drop-column .drag-column .kanban-column-list li.solid:hover {\n              border-color: #247da5;\n              background-color: #e8ecee; }\n\n.new-stage {\n  display: flex;\n  flex-direction: column; }\n\n.load-more {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 10px; }\n\n.load-more button {\n    align-items: center;\n    display: flex; }\n\n.load-more button i {\n      padding-right: 10px; }\n\n.search-results {\n  height: calc(100vh - 350px);\n  overflow: scroll; }\n"},gTEv:function(n,t,o){"use strict";o.r(t);var e=o("D57K"),i=o("LoAr"),r=o("C1+p"),l=function(){function n(n){this.zcDataListService=n,this.kanbanGrids=[],this.kanbanGridsList=[],this.stages=[],this.allItems=[],this.showGrid=!1,this.rows=10,this.page=1,this.globalFilter="",this.kanbanCols=[]}return n.prototype.ngOnInit=function(){this.getColsList()},n.prototype.getColsList=function(){var n=this;this.zcDataListService.getDataList(this.options.properties.kanban.dataSource,{}).subscribe(function(t){n.kanbanGrids=t,n.kanbanGridsList=t,n.formatKanbanGrid(),n.getDataList("")})},n.prototype.formatKanbanGrid=function(){var n=this;this.kanbanGrids&&this.kanbanGrids.length>0&&this.kanbanGrids.forEach(function(t){t.items=[],t.page=1,n.stages.push(t)})},n.prototype.getDataList=function(n){var t=this;this.zcDataListService.getDataList(this.options.properties.dataSource,{}).subscribe(function(n){n&&(t.dataList=n.data.listData.rows,t.dataList&&t.dataList.forEach(function(n){t.allItems=t.allItems.concat([n]),t.kanbanGrids?t.kanbanGrids.forEach(function(o){t.getItemValue(t.options.properties.kanban.field,n)===o.uid&&o.items.push(n)}):t.kanbanGrids=t.allItems}),t.showGrid=!0)})},n.prototype.loadmore=function(n){this.page+=1,n&&(this.page=1,this.allItems=[],this.stages=[],this.formatKanbanGrid()),this.getDataList("")},n.prototype.onScroll=function(n){},n.prototype.getItemValue=function(n,t){return new Function("item","return "+("item."+n)+" ; ")(t)},n.prototype.dragStart=function(n,t,o,e){this.dragGridIndex=o,this.dragItemIndex=e,this.draggedItem=t},n.prototype.drop=function(n,t){var o=this,e=!1,i=!0,r=this.options.properties.kanban;r.dropConfirmation.needConfirmation&&(e=r.dropConfirmation.needConfirmation),e&&(i=confirm(r.dropConfirmation.confirmMsg)),i&&(this.droppedGridIndex=t,this.dragGridIndex!==this.droppedGridIndex&&this.draggedItem&&(this.kanbanGrids[this.dragGridIndex].items.splice(this.dragItemIndex,1),this.kanbanGridsList.forEach(function(n){n.uid===o.draggedItem[o.options.properties.kanban.field]&&o.draggedItem.push(n)}),this.kanbanGrids[this.droppedGridIndex].items.push(this.draggedItem),this.draggedItem=null))},n.prototype.dragEnd=function(n){this.draggedItem=null},n.prototype.redirectPage=function(n){},e.c([Object(i.Input)(),e.f("design:type",Object)],n.prototype,"options",void 0),e.c([Object(i.Input)(),e.f("design:type",Object)],n.prototype,"dataList",void 0),n=e.c([Object(i.Component)({selector:"zc-data-list-kanban",template:o("d3Tp"),styles:[o("fpry")]}),e.f("design:paramtypes",[r.a])],n)}(),a=o("eQXH"),s=o("IfiR"),c=o("pN2L"),d=o("iUUs"),p=o("4HYP"),u=o("Jg5f"),f=o("U3QC"),g=o("z5yO"),m=o("uncu");function h(n,t,o,e){var i=window&&!!window.document&&window.document.documentElement,r=i&&t?window:o;if(n&&!(r=n&&i&&"string"==typeof n?function(n,t,o){return(o?window.document:t).querySelector(n)}(n,o.nativeElement,e):n))throw new Error("ngx-infinite-scroll {resolveContainerElement()}: selector for");return r}function b(n){return n&&!n.firstChange}var w={clientHeight:"clientHeight",offsetHeight:"offsetHeight",scrollHeight:"scrollHeight",pageYOffset:"pageYOffset",offsetTop:"offsetTop",scrollTop:"scrollTop",top:"top"},y={clientHeight:"clientWidth",offsetHeight:"offsetWidth",scrollHeight:"scrollWidth",pageYOffset:"pageXOffset",offsetTop:"offsetLeft",scrollTop:"scrollLeft",top:"left"},k=function(){function n(n){void 0===n&&(n=!0),this.vertical=n,this.propsMap=n?w:y}return n.prototype.clientHeightKey=function(){return this.propsMap.clientHeight},n.prototype.offsetHeightKey=function(){return this.propsMap.offsetHeight},n.prototype.scrollHeightKey=function(){return this.propsMap.scrollHeight},n.prototype.pageYOffsetKey=function(){return this.propsMap.pageYOffset},n.prototype.offsetTopKey=function(){return this.propsMap.offsetTop},n.prototype.scrollTopKey=function(){return this.propsMap.scrollTop},n.prototype.topKey=function(){return this.propsMap.top},n}();function x(n){var t=n.windowElement;return function(n,t){var o=n.isWindow||t&&!t.nativeElement?t:t.nativeElement;return Object.assign({},n,{container:o})}({axis:n.axis,isWindow:v(t)},t)}function v(n){return["Window","global"].some(function(t){return Object.prototype.toString.call(n).includes(t)})}function S(n,t){return n?t.document.documentElement:null}function D(n,t){var o,e,i,r,l,a,s=(e=(o=t).container,i=o.isWindow,r=I(o.axis),l=r.offsetHeightKey,a=r.clientHeightKey,T(e,i,l,a));return t.isWindow?function(n,t,o){var e=o.axis,i=o.container,r=o.isWindow,l=I(e),a=l.offsetHeightKey,s=l.clientHeightKey,c=n+O(S(r,i),e,r),d=T(t.nativeElement,r,a,s),p=function(n,t,o){var e=t.topKey();if(!n.getBoundingClientRect)return;return n.getBoundingClientRect()[e]+O(n,t,o)}(t.nativeElement,e,r)+d;return{height:n,scrolled:c,totalToScroll:p}}(s,n,t):function(n,t,o){var e=o.axis,i=o.container,r=i[e.scrollTopKey()],l=i[e.scrollHeightKey()];return{height:n,scrolled:r,totalToScroll:l}}(s,0,t)}function I(n){return{offsetHeightKey:n.offsetHeightKey(),clientHeightKey:n.clientHeightKey()}}function T(n,t,o,e){if(isNaN(n[o])){var i=S(t,n);return i?i[e]:0}return n[o]}function O(n,t,o){var e=t.pageYOffsetKey(),i=t.scrollTopKey(),r=t.offsetTopKey();return isNaN(window[e])?S(o,n)[i]:n.ownerDocument?n.ownerDocument.defaultView[e]:n[r]}function C(n,t,o){var e,i;if(n.totalToScroll<=0)return!1;var r=n.height+n.scrolled;if(o)e=(n.totalToScroll-r)/n.totalToScroll,i=t.down/10;else{var l=n.scrolled+(n.totalToScroll-r);e=n.scrolled/l,i=t.up/10}return e<=i}function G(n){var t=n.scrollContainer,o=n.scrollWindow,e=n.element,i=n.fromRoot,r=x({axis:new k(!n.horizontal),windowElement:h(t,o,e,i)}),l={lastScrollPosition:0,lastTotalToScroll:0,totalToScroll:D(e,r).totalToScroll,triggered:{down:0,up:0}},a={container:r.container,throttle:n.throttle},s={up:n.upDistance,down:n.downDistance};return function(n){var t=Object(d.a)(n.container,"scroll");n.throttle&&(t=t.pipe(Object(m.a)(n.throttle)));return t}(a).pipe(Object(p.a)(function(){return Object(c.a)(D(e,r))}),Object(u.a)(function(n){return function(n,t,o){var e=function(n,t,o){var e=function(n,t){return n<t.scrolled}(n,t);return{fire:C(t,o,e),scrollDown:e}}(n,t,o),i=e.scrollDown,r=e.fire;return{scrollDown:i,fire:r,stats:t}}(l.lastScrollPosition,n,s)}),Object(f.a)(function(n){var t=n.stats;n.scrollDown;return function(n,t,o){!function(n,t){t.lastScrollPosition=n}(t,n),function(n,t){t.lastTotalToScroll!==n&&(t.lastTotalToScroll=t.totalToScroll,t.totalToScroll=n)}(o,n)}(l,t.scrolled,t.totalToScroll)}),Object(g.a)(function(t){var o,e,i,r=t.fire,a=t.scrollDown,s=t.stats.totalToScroll;return o=n.alwaysCallback,e=r,i=function(n,t,o){return o?t.triggered.down===n:t.triggered.up===n}(s,l,a),(o||e)&&!i}),Object(f.a)(function(n){var t=n.scrollDown;!function(n,t,o,e){e?t.triggered.down=n:t.triggered.up=n}(n.stats.totalToScroll,l,0,t)}),Object(u.a)(H))}var E={DOWN:"[NGX_ISE] DOWN",UP:"[NGX_ISE] UP"};function H(n){var t=n.scrollDown,o=n.stats.scrolled;return{type:t?E.DOWN:E.UP,payload:{currentScrollPosition:o}}}var K=function(){function n(n,t){this.element=n,this.zone=t,this.scrolled=new i.EventEmitter,this.scrolledUp=new i.EventEmitter,this.infiniteScrollDistance=2,this.infiniteScrollUpDistance=1.5,this.infiniteScrollThrottle=150,this.infiniteScrollDisabled=!1,this.infiniteScrollContainer=null,this.scrollWindow=!0,this.immediateCheck=!1,this.horizontal=!1,this.alwaysCallback=!1,this.fromRoot=!1}return n.prototype.ngAfterViewInit=function(){this.infiniteScrollDisabled||this.setup()},n.prototype.ngOnChanges=function(n){var t=n.infiniteScrollContainer,o=n.infiniteScrollDisabled,e=n.infiniteScrollDistance,i=b(t),r=b(o),l=b(e),a=!r&&!this.infiniteScrollDisabled||r&&!o.currentValue||l;(i||r||l)&&(this.destroyScroller(),a&&this.setup())},n.prototype.setup=function(){var n=this;"undefined"!=typeof window&&this.zone.runOutsideAngular(function(){n.disposeScroller=G({fromRoot:n.fromRoot,alwaysCallback:n.alwaysCallback,disable:n.infiniteScrollDisabled,downDistance:n.infiniteScrollDistance,element:n.element,horizontal:n.horizontal,scrollContainer:n.infiniteScrollContainer,scrollWindow:n.scrollWindow,throttle:n.infiniteScrollThrottle,upDistance:n.infiniteScrollUpDistance}).subscribe(function(t){return n.zone.run(function(){return n.handleOnScroll(t)})})})},n.prototype.handleOnScroll=function(n){var t=n.type,o=n.payload;switch(t){case E.DOWN:return this.scrolled.emit(o);case E.UP:return this.scrolledUp.emit(o);default:return}},n.prototype.ngOnDestroy=function(){this.destroyScroller()},n.prototype.destroyScroller=function(){this.disposeScroller&&this.disposeScroller.unsubscribe()},n}();K.decorators=[{type:i.Directive,args:[{selector:"[infiniteScroll], [infinite-scroll], [data-infinite-scroll]"}]}],K.ctorParameters=function(){return[{type:i.ElementRef},{type:i.NgZone}]},K.propDecorators={scrolled:[{type:i.Output}],scrolledUp:[{type:i.Output}],infiniteScrollDistance:[{type:i.Input}],infiniteScrollUpDistance:[{type:i.Input}],infiniteScrollThrottle:[{type:i.Input}],infiniteScrollDisabled:[{type:i.Input}],infiniteScrollContainer:[{type:i.Input}],scrollWindow:[{type:i.Input}],immediateCheck:[{type:i.Input}],horizontal:[{type:i.Input}],alwaysCallback:[{type:i.Input}],fromRoot:[{type:i.Input}]};var z=function(){return function(){}}();z.decorators=[{type:i.NgModule,args:[{declarations:[K],exports:[K],imports:[],providers:[]}]}],o.d(t,"ZcDataListKanbanModule",function(){return L});var L=function(){function n(){}return n=e.c([Object(i.NgModule)({imports:[s.FormsModule,a.a,z],declarations:[l],exports:[l],providers:[r.a]})],n)}()}}]);