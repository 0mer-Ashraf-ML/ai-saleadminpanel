import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner';
import { ThemeService } from './core/services/theme.service';
import { provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { CommonService } from './modules/layout/services/common.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, NgxSonnerToaster],
  providers: [provideEchartsCore({ echarts })],
})
export class AppComponent {
  title = 'SellersGPT';

  constructor(public themeService: ThemeService, private commonSrv: CommonService) {}
  async ngOnInit() {
    await this.commonSrv.getConfig();
  }
}
