import { Component, Input, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-chart',
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent implements AfterViewInit{
  @ViewChild('chartContainer') chartContainer!: ElementRef; // Reference to the chart container
  @Input() chartData: any; // Input for chart data
  @Input() chartOptions: any; // Input for custom chart options

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const chartId = 'admin-chart-' + Math.random().toString(36).substring(2, 9);
    this.renderer.setAttribute(this.chartContainer.nativeElement, 'id', chartId);
    this.renderChart(chartId);
  }

  renderChart(chartId: string): void {
    const chartDom = document.getElementById(chartId);
    if (!chartDom) {
      console.error('Chart container not found for ID:', chartId);
      return;
    }

    const myChart = echarts.init(chartDom);

    // Use the provided chart options or fallback to default options
    const option = this.chartOptions || {
      legend: {
        data: ['Parameter 1', 'Parameter 2']
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Parameter 1',
          data: this.chartData?.parameter1 || [200, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          areaStyle: {}
        },
        {
          name: 'Parameter 2',
          data: this.chartData?.parameter2 || [150, 800, 850, 900, 1200, 1250, 1300],
          type: 'line',
          areaStyle: {}
        }
      ]
    };

    myChart.setOption(option);
  }
}
