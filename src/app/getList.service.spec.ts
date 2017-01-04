/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GetListService } from './getList.service';

describe('Service: GetList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetListService]
    });
  });

  it('should ...', inject([GetListService], (service: GetListService) => {
    expect(service).toBeTruthy();
  }));
});