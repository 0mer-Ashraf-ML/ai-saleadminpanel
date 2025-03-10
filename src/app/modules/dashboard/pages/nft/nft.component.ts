import { Component, OnInit } from '@angular/core';
import { NftAuctionsTableComponent } from '../../components/nft/nft-auctions-table/nft-auctions-table.component';
import { NftChartCardComponent } from '../../components/nft/nft-chart-card/nft-chart-card.component';
import { NftDualCardComponent } from '../../components/nft/nft-dual-card/nft-dual-card.component';
import { NftHeaderComponent } from '../../components/nft/nft-header/nft-header.component';
import { NftSingleCardComponent } from '../../components/nft/nft-single-card/nft-single-card.component';
import { Nft } from '../../models/nft';

@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  imports: [
    NftHeaderComponent,
    NftDualCardComponent,
  ],
})
export class NftComponent implements OnInit {
  nft: Array<Nft>;

  constructor() {
    this.nft = [
      {
        id: 34356771,
        title: 'MRR',
        creator: 'Jhon Doe',
        instant_price: 4.2,
        price: 10000,
        ending_in: '$100,000',
        last_bid: 0.12,
        duration: 'Last Month',
        image: './assets/images/img-02.jpg',
        avatar: './assets/avatars/avt-01.jpg',
      },
      {
        id: 34356771,
        title: 'ARR',
        creator: 'Jhon Doe',
        instant_price: 4.2,
        price: 10000,
        ending_in: '$100,000',
        last_bid: 0.12,
        duration: 'Last 12 Month',
        image: './assets/images/img-02.jpg',
        avatar: './assets/avatars/avt-01.jpg',
      },
      {
        id: 34356771,
        title: 'New Customers',
        creator: 'Jhon Doe',
        instant_price: 4.2,
        price: 10000,
        ending_in: '$100,000',
        last_bid: 0.12,
        duration: 'Last 30 Days',
        image: './assets/images/img-02.jpg',
        avatar: './assets/avatars/avt-01.jpg',
      },
      {
        id: 34356771,
        title: 'All Customers',
        creator: 'Jhon Doe',
        instant_price: 4.2,
        price: 10000,
        ending_in: '$100,000',
        last_bid: 0.12,
        duration: 'Till Today',
        image: './assets/images/img-02.jpg',
        avatar: './assets/avatars/avt-01.jpg',
      },
      
    ];
  }

  ngOnInit(): void {}
}
