// typed components
// AboutLH, ControlPanel, ControlPanelDemo, employeeID, EndpointsList, Hero, 

// typed pages

export interface LHData {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  performanceMetrics: {};
  accessibilityMetrics?: {};
  bestPracticesMetrics?: {};
  seoMetrics?: {};
};

export interface LHOptions {
  logLevel: string;
  output: string;
  onlyCategories: string[];
  port: number;
};

export interface MainLCOptions {
  borderWidth: number;
  responsive: boolean;
  maintainAspectRatio: boolean;
  chart: {
    width: string;
    height: string;
  };
  plugins: {
    legend: {
      position: string;
    };
    title: {
      text: string;
    };
  };
  scales: {
    y: {
      type: string;
      min: number;
      max: number;
    };
  };
};

export interface LCDatasets {
  label: string;
  data: number | number[];
  borderColor: string;
  backgroundColor: string;
  pointHoverBackgroundColor: string;
  pointHoverBorderWidth: number;
  pointHoverRadius: number;
  fill: boolean;
  tension: number;
};

export interface ChartData {
  labels: String[];
  datasets: LCDatasets[] 
};

