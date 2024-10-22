import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperarconPage } from './recuperarcon.page';

describe('RecuperarconPage', () => {
  let component: RecuperarconPage;
  let fixture: ComponentFixture<RecuperarconPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperarconPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
