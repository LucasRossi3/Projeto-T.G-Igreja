import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObreirosComponent } from './obreiros.component';

describe('ObreirosComponent', () => {
  let component: ObreirosComponent;
  let fixture: ComponentFixture<ObreirosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObreirosComponent]
    });
    fixture = TestBed.createComponent(ObreirosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
