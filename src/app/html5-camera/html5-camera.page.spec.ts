import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Html5CameraPage } from './html5-camera.page';

describe('Html5CameraPage', () => {
  let component: Html5CameraPage;
  let fixture: ComponentFixture<Html5CameraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Html5CameraPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Html5CameraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
