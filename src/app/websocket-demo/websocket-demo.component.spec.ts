import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsocketDemoComponent } from './websocket-demo.component';

describe('WebsocketDemoComponent', () => {
  let component: WebsocketDemoComponent;
  let fixture: ComponentFixture<WebsocketDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebsocketDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebsocketDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
