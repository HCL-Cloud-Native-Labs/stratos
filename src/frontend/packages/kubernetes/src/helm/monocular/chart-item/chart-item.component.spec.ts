import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { createBasicStoreModule } from '../../../../../store/testing/public-api';
import { ChartsService } from '../shared/services/charts.service';
import { ConfigService } from '../shared/services/config.service';
import { ChartItemComponent } from './chart-item.component';


describe('Component: ChartItem', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        createBasicStoreModule()
      ],
      declarations: [ChartItemComponent],
      providers: [
        HttpClient,
        ConfigService,
        ChartsService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
              },
              queryParams: {}
            },
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  it('should create an instance', () => {
    const component = TestBed.createComponent(ChartItemComponent);
    expect(component).toBeTruthy();
  });
});
