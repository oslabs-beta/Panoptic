// components
// AboutLH, ControlPanel, ControlPanelDemo, employeeID, EndpointsList, Hero, LHGauge, LineChart, LoadingSpinner, MainLineChartRE, Nav, Sidenav, UsingApp, UsingMetrics, wrightDetails, wrightDetailsDemo

// pages 
// _app, dashboard, demo, docs, Index, Login, manager, repoEndpoints, signup

// backend
// all, createUser, githubLogin, lighthouse, lighthouseDemo, login, [user], [getUser], github, loginModel, dbConnect, parseCookies, passport-github-auth

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

export interface LHGaugeOptions {
  responsive: boolean;
  maintainAspectRatio: boolean;
  plugins: {
    legend: {
      display: boolean;
    };
    title: {
      display: boolean;
      text: string;
      font: {
        size: number;
      };
      color: string;
      padding: {
        top: number;
        bottom:number;
      };
    };
  };
};

export interface LCDatasets {
  label: string;
  data: number | number[];
  borderColor?: string;
  backgroundColor: string | string[];
  pointHoverBackgroundColor?: string;
  pointHoverBorderWidth?: number;
  pointHoverRadius?: number;
  fill?: boolean;
  tension?: number;
  borderAlign?: string;
};

export interface ChartData {
  labels: String[];
  datasets: LCDatasets[] 
};

export interface ChartieDatasets {
  label?: String;
  data: Number[];
  backgroundColor: String[];
  borderAlign?: String;
};

export interface ChartieData {
  datasets: ChartieDatasets[];
  labels: String[];
};

export interface ChartieOptions {
  plugins: {
    legend: {
      display: Boolean;
    };
  };
};

export interface CreateUser {
  username: string;
  password: string;
  endpoints: any;
};

export interface MongoUser {
  _id?: number;
  username: string;
  password: string;
  endpoints?: any;
  github?: any;
};

export interface DBOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
};