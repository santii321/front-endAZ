import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteFacturacionComponent } from './componente-facturacion.component';

describe('ComponenteFacturacionComponent', () => {
  let component: ComponenteFacturacionComponent;
  let fixture: ComponentFixture<ComponenteFacturacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponenteFacturacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteFacturacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
