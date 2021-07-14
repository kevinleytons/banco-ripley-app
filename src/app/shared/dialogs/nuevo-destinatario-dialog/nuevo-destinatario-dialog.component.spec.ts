import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoDestinatarioDialogComponent } from './nuevo-destinatario-dialog.component';

describe('NuevoDestinatarioDialogComponent', () => {
  let component: NuevoDestinatarioDialogComponent;
  let fixture: ComponentFixture<NuevoDestinatarioDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoDestinatarioDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoDestinatarioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
