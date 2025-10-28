import { inject, Injectable } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";
import { TranslateService } from "@ngx-translate/core";
import { Subject } from "rxjs";

@Injectable()
export class CustomPaginatorAdapter implements MatPaginatorIntl {
  protected readonly translateService = inject(TranslateService);
  public changes = new Subject<void>();

  public firstPageLabel: string = '';
  public itemsPerPageLabel: string = '';
  public lastPageLabel: string = '';
  public nextPageLabel: string = '';
  public previousPageLabel: string = '';

  constructor() {
    this.translateService
      .onLangChange
      .subscribe(() => {
        this.firstPageLabel = this.translateService.instant(`basic.paginator.firstPageLabel`);
        this.itemsPerPageLabel = this.translateService.instant(`basic.paginator.itemsPerPageLabel`);
        this.lastPageLabel = this.translateService.instant(`basic.paginator.lastPageLabel`);
        this.nextPageLabel = this.translateService.instant(`basic.paginator.nextPageLabel`);
        this.previousPageLabel = this.translateService.instant(`basic.paginator.previousPageLabel`);
        this.changes.next();
      });
  }

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return this.translateService.instant('basic.paginator.pageRangeLabel', { page: 1, totalPages: 1, length });
    }
    const totalPages = Math.ceil(length / pageSize);
    return this.translateService.instant('basic.paginator.pageRangeLabel', { page: page + 1, totalPages, length });
  }

}