import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasRegistrarComponent } from './categorias-registrar.component';

describe('CategoriasRegistrarComponent', () => {
  let component: CategoriasRegistrarComponent;
  let fixture: ComponentFixture<CategoriasRegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriasRegistrarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriasRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
