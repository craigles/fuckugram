import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule  } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { InsultCardComponent } from './insult-card.component';

describe('InsultCardComponent', () => {
  let component: InsultCardComponent;
  let fixture: ComponentFixture<InsultCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsultCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsultCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
