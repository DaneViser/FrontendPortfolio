import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pathfinder } from './pathfinder';

describe('Pathfinder', () => {
  let component: Pathfinder;
  let fixture: ComponentFixture<Pathfinder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pathfinder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pathfinder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
