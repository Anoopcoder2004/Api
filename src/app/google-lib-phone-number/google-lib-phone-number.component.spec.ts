import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleLibPhoneNumberComponent } from './google-lib-phone-number.component';

describe('GoogleLibPhoneNumberComponent', () => {
  let component: GoogleLibPhoneNumberComponent;
  let fixture: ComponentFixture<GoogleLibPhoneNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleLibPhoneNumberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleLibPhoneNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
