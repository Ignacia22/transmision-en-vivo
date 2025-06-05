import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStreamsComponent } from './admin-streams.component';

describe('AdminStreamsComponent', () => {
  let component: AdminStreamsComponent;
  let fixture: ComponentFixture<AdminStreamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminStreamsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminStreamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
