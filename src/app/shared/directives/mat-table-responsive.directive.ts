import {
  AfterViewInit,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  Renderer2
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, combineLatest, map, Subject } from 'rxjs';

@Directive({
  selector: '[galdoMatTableResponsive]',
  standalone: true
})
export class MatTableResponsiveDirective implements AfterViewInit {

  private table = inject(ElementRef);
  private renderer = inject(Renderer2);
  private destroyRef = inject(DestroyRef)
  private thead!: HTMLTableSectionElement | null;
  private tbody!: HTMLTableSectionElement | null;
  private theadChanged$ = new BehaviorSubject(true);
  private tbodyChanged$ = new Subject<boolean>();

  private theadObserver;
  private tbodyObserver;

  constructor() {
    if (typeof MutationObserver !== "undefined") {
      this.theadObserver = new MutationObserver(() => this.theadChanged$.next(true));
      this.tbodyObserver = new MutationObserver(() => this.tbodyChanged$.next(true));
    }
  }

  ngAfterViewInit() {
    this.thead = this.table.nativeElement.querySelector("thead");
    this.tbody = this.table.nativeElement.querySelector("tbody");

    this.theadObserver?.observe(this.thead!, { characterData: true, subtree: true });
    this.tbodyObserver?.observe(this.tbody!, { childList: true });

    combineLatest([this.theadChanged$, this.tbodyChanged$])
      .pipe(
        map(() => {
          const headRow = this.thead?.rows.item(0);
          const bodyRows = this.tbody?.rows;
          if (!headRow || !bodyRows) {
            return [[], []] as [string[], HTMLTableCellElement[][]];
          }
          const columnNames = Array.from(headRow.children).map(headerCell => headerCell.textContent || '');
          const rows = Array.from(bodyRows).map(row => Array.from(row.children));

          return [columnNames, rows] as [string[], HTMLTableCellElement[][]];
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(([columnNames, bodyRows]) => {
        Array.from(bodyRows).forEach(rowCells =>
          rowCells.forEach((cell: any) => {
            this.renderer.setAttribute(
              cell,
              'mat-column-name',
              `${columnNames[cell.cellIndex]}`.trim() || ''
            );
          })
        );
      });
  }

}
