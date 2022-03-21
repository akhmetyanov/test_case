import { DOCUMENT } from '@angular/common';
import {
  Component, Input, OnInit, Output, EventEmitter, Inject, ViewChild, ElementRef,
  AfterViewChecked, OnDestroy, ChangeDetectionStrategy
} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { fromEvent, takeUntil, delay } from 'rxjs';
import { CreateEvent, MoveEvent, MoveType } from 'src/app/services/actions/actions';
import { FileStructure } from 'src/app/services/file-structure/file-structure.service';
import { PopupDataProducerService } from 'src/app/services/popup/popup-data-producer.service';
import { PopupService } from 'src/app/services/popup/popup.service';
import { Action, PopUpData } from 'src/app/services/popup/popup-entities';
import { MoveActionsHandlerService } from 'src/app/services/actions/move-actions-handler.service';

@Component({
  selector: 'app-folder-content-items',
  templateUrl: './folder-content-items.component.html',
  styleUrls: ['./folder-content-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FolderContentItemsComponent implements OnInit, AfterViewChecked, OnDestroy {
  countOfColumns: number = 4
  @Input() data: FileStructure[] = []

  @ViewChild('header') header$: ElementRef | undefined
  @ViewChild('body') body$: ElementRef | undefined

  // name - colName, numbes - column width]
  colWidth: { [name: string]: number } = {}

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private cookieService: CookieService,
    private popupService: PopupService,
    private popuDataProducerService: PopupDataProducerService,
    private moveActionHadler: MoveActionsHandlerService
  ) { }

  ngOnInit(): void {
    // this.initWidths(false)
  }

  ngAfterViewChecked(): void {
    // this.addEventListenners()
  }

  initWidths(save: boolean) {

    for (let i = 0; i < this.countOfColumns; i++) {
      let colId = 'col' + i

      if (save) {
        this.cookieService.set('folder-content-col-width-' + colId, this.colWidth[colId].toString())
      } else {
        let w = Number(this.cookieService.get('folder-content-col-width-' + colId))
        w = w == 0 ? 150 : w
        this.colWidth[colId] = w
      }
    }
  }

  ngOnDestroy(): void {
    // this.initWidths(true)
  }

  addEventListenners() {
    let mouseUpOnHeader = fromEvent<MouseEvent>(this.header$?.nativeElement, 'mousedown')
    let mouseMove = fromEvent<MouseEvent>(this.document, 'mousemove')
    let mouseUpOnDocument = fromEvent<MouseEvent>(this.document, 'mouseup')

    let action = mouseMove.pipe(delay(50), takeUntil(mouseUpOnDocument))

    mouseUpOnHeader.subscribe(e => {
      this.initXPos = e.clientX
      this.initColId = (e.target as HTMLElement).id
      action.subscribe(this.headerColMove.bind(this))
    })
  }

  initXPos: number = 0
  initColId: string = ''
  headerColMove(event: MouseEvent) {
    // console.log(this.colWidth[this.initColId], this.initColId)
    if (this.initColId == '') { return }
    let diff = event.clientX - this.initXPos
    this.colWidth[this.initColId] = this.colWidth[this.initColId] + diff
    this.initXPos = event.clientX
  }

  onDblClickToUp() {
    this.moveActionHadler.handle(new MoveEvent(MoveType.up))
  }

  onDblClickToItem(item: FileStructure) {
    this.moveActionHadler.handle(new MoveEvent(MoveType.down, item.id))
  }

  onContextMenu(event: MouseEvent, fs: FileStructure) {
    event.preventDefault()
    this.popupService.toVisible(event.clientY, event.clientX, this.popuDataProducerService.forClickOnFolderContentItem(fs))
  }

}
