import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailIngredientsDialogComponent } from './cocktail-ingredients-dialog.component';

describe('CocktailIngredientsDialogComponent', () => {
  let component: CocktailIngredientsDialogComponent;
  let fixture: ComponentFixture<CocktailIngredientsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CocktailIngredientsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CocktailIngredientsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
