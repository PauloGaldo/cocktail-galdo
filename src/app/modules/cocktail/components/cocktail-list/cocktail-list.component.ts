import { AfterViewInit, Component, inject, OnInit, signal, viewChild, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CocktailService } from '../../services/cocktail.service';

@Component({
  selector: 'galdo-cocktail-list',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './cocktail-list.component.html',
  styleUrl: './cocktail-list.component.scss',
})
export class CocktailListComponent implements OnInit, AfterViewInit {
  protected readonly paginator = viewChild.required(MatPaginator);
  protected readonly cocktailService = inject(CocktailService);
  public dataSource: WritableSignal<MatTableDataSource<any>> = signal(new MatTableDataSource<any>([]));
  public displayedColumns: WritableSignal<string[]> = signal(['id', 'image', 'name', 'category', 'type', 'ingredientsQuantity', 'modifiedDate']);
  public cocktails: WritableSignal<any> = signal([]);

  ngOnInit(): void {
    this.onSearch();
  }

  ngAfterViewInit(): void {
    this.dataSource().paginator = this.paginator();
  }

  protected onSearch(): void {
    this.cocktailService.getCocktailsByFilters({
      f: 'a'
    })
      .subscribe((data: any) => {
        console.log(data);

        this.cocktails.set(data.drinks || []);
        this.dataSource().data = this.cocktails();
      });
  }

}
