import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ObreiroComponent } from './obreiros.component';

describe('ObreiroComponent', () => {
  let component: ObreiroComponent;
  let fixture: ComponentFixture<ObreiroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObreiroComponent]
    });
    fixture = TestBed.createComponent(ObreiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
