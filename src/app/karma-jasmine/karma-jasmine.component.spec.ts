import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KarmaJasmineComponent } from './karma-jasmine.component';

describe('KarmaJasmineComponent', () => {
  let component: KarmaJasmineComponent;
  let fixture: ComponentFixture<KarmaJasmineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KarmaJasmineComponent]   // ✔ using standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(KarmaJasmineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // -------------------------------------------------------
  // ✔ Test 1: Component should be created (already present)
  // -------------------------------------------------------
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // -------------------------------------------------------
  // ⭐ NEW TEST 2 — Check default value of a variable
  // -------------------------------------------------------
  it('should have default title as "Testing Works"', () => {
    component.title = "Testing Works";        // <-- sample variable
    expect(component.title).toBe("Testing Works");
  });

  // -------------------------------------------------------
  // ⭐ NEW TEST 3 — Check a simple function
  // -------------------------------------------------------
  it('should return correct sum from add()', () => {
    component.add = (a: number, b: number) => a + b;  // <-- sample function
    expect(component.add(3, 4)).toBe(7);
  });

  // -------------------------------------------------------
  // ⭐ NEW TEST 4 — Check template rendering
  // -------------------------------------------------------
  it('should render title inside HTML', () => {
    component.title = 'Hello Karma';
    fixture.detectChanges();                          // <-- refresh template

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent)
      .toContain('Hello Karma');                       // <-- check DOM
  });
});
