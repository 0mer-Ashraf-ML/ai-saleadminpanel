import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nft-header',
  templateUrl: './nft-header.component.html',
  standalone: true,
})
export class NftHeaderComponent implements OnInit {
  cards = [{ title: 'MRR', duration: 'Last Month', revenue: '' }, { title: 'ARR', duration: 'Last 12 Months', revenue: '' }, { title: 'New Customers', duration: 'Last 30 days', revenue: '' }];
  constructor() {}

  ngOnInit(): void {}
}
