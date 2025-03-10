import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner';
import { ThemeService } from './core/services/theme.service';
import { ResponsiveHelperComponent } from './shared/components/responsive-helper/responsive-helper.component';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, NgxSonnerToaster],
  providers: [
    provideEchartsCore({ echarts }),
  ]
})
export class AppComponent {
  title = 'AI Sales Admin Panel';

  constructor(public themeService: ThemeService) {}
}
