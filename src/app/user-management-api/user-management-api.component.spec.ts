import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementApiComponent } from './user-management-api.component';

describe('UserManagementApiComponent', () => {
  let component: UserManagementApiComponent;
  let fixture: ComponentFixture<UserManagementApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserManagementApiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserManagementApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
