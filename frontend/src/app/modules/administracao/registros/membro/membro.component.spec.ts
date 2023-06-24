import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MembroComponent } from './membro.component';

describe('MembroComponent', () => {
  let component: MembroComponent;
  let fixture: ComponentFixture<MembroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembroComponent]
    });
    fixture = TestBed.createComponent(MembroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
