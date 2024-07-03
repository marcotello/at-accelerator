import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideshowCardComponent } from './slideshow-card.component';

describe('SlideshowCardComponent', () => {
  let component: SlideshowCardComponent;
  let fixture: ComponentFixture<SlideshowCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideshowCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SlideshowCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
