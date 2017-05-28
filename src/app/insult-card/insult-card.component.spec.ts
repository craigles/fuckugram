import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule  } from '@angular/router/testing';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HttpModule } from '@angular/http';
import { InsultCardComponent } from './insult-card.component';

describe('InsultCardComponent', () => {
  let component: InsultCardComponent;
  let fixture: ComponentFixture<InsultCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule, ActivatedRoute ],
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
