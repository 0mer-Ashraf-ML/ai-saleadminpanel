import { Component, OnDestroy, OnInit, effect } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ThemeService } from 'src/app/core/services/theme.service';
import { ChartOptions } from '../../../../../shared/models/chart-options';

@Component({
  selector: '[nft-chart-card]',
  templateUrl: './nft-chart-card.component.html',
  imports: [AngularSvgIconModule, NgApexchartsModule],
})
export class NftChartCardComponent implements OnInit, OnDestroy {
  public chartOptions: Partial<ChartOptions>;

  constructor(private themeService: ThemeService) {
    // White as the base color (will be updated by theme effect).
    let baseColor = '#FFFFFF';

    // Hardcode categories for 6 months in Chinese.
    const categories: string[] = ['Car', 'Bike', 'Cycle', 'Train', 'Bus', 'Ship'];

    // Sample data for two series (本期 vs. 同期).
    const dataCurrent = [10, 30, 45, 60, 80, 100];
    const dataPrevious = [15, 0, 10, 50, 30, 10];

    this.chartOptions = {
      series: [
        {
          name: 'March',
          data: dataCurrent,
        },
        {
          name: 'February',
          data: dataPrevious,
        },
      ],
      chart: {
        fontFamily: 'inherit',
        type: 'area',
        height: 300,
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: false, // set to true if you want a compact sparkline look
        },
      },
      title: {
        text: 'Revenue',
        align: 'center',
        style: {
          fontSize: '16px',
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0.2,
          stops: [15, 120, 100],
        },
      },
      stroke: {
        curve: 'smooth',
        show: true,
        width: 3,
        colors: [baseColor, baseColor], // two series => two entries (updated by effect below)
      },
      xaxis: {
        categories: categories,
        labels: {
          show: true,
          rotate: -45,
        },
        crosshairs: {
          position: 'front',
          stroke: {
            color: baseColor,
            width: 1,
            dashArray: 4,
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      tooltip: {
        theme: 'light',
        y: {
          formatter: (val: number) => `${val} ¥`,
        },
      },
      colors: [baseColor, baseColor], // two series => two entries
      legend: {
        position: 'top',
        horizontalAlign: 'right',
      },
    };

    // Reactive effect to update chart colors based on the current theme
    effect(() => {
      const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary');

      // Update tooltip theme
      this.chartOptions.tooltip = {
        theme: this.themeService.theme().mode,
      };

      // Update colors for both series
      this.chartOptions.colors = [primaryColor, `${primaryColor}CC`]; // second color can be a variant
      if (this.chartOptions.stroke) {
        this.chartOptions.stroke.colors = [primaryColor, primaryColor];
      }
      if (this.chartOptions.xaxis?.crosshairs?.stroke) {
        this.chartOptions.xaxis.crosshairs.stroke.color = primaryColor;
      }
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
