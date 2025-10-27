import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailCategoryDialogComponent } from './cocktail-category-dialog.component';

describe('CocktailCategoryDialogComponent', () => {
  let component: CocktailCategoryDialogComponent;
  let fixture: ComponentFixture<CocktailCategoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CocktailCategoryDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CocktailCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
