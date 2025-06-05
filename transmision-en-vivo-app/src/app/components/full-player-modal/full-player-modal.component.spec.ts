import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullPlayerModalComponent } from './full-player-modal.component';

describe('FullPlayerModalComponent', () => {
  let component: FullPlayerModalComponent;
  let fixture: ComponentFixture<FullPlayerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullPlayerModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullPlayerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
