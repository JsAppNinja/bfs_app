import PropTypes from 'prop-types';
import React from 'react';
import AboutUsComponent from './components/AboutUs'
import DashboardComponent from './components/Dashboard';
import ConstructionTypeComponent from './components/ConstructionType';
import AccoladesComponent from './components/Accolades';
import LeaderShipComponent from './components/Leadership';
import CommunityComponent from './components/Community';
import GreenWorksComponent from './components/GreenWorks';
import CodeStandardComponent from './components/CodeStandards';
import NewsPressComponent from './components/NewsPress';
import FormsLibraryComponent from './components/FormsLibrary';
import ManufacturingComponent from './components/Manufacturing';
import InstalledServiceComponent from './components/InstalledService';
import DistributionComponent from './components/Distribution';
import CareerComponent from './components/Career';
import JobAreaComponent from './components/JobAreas';
import WhyBuilderComponent from './components/WhyBuilder';
import StoreLocatore from "./components/LocationStoreLocator";
import DetailsLocationsComponent from "./components/DetailsLoactions";
import ContactUsComponent from "./components/ContactUs";
import SitemapComponent from "./components/SiteMap";
import BfsTermsComponent from "./components/BfsTerms";
import { Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRouting";
import Example from "./components/Slidercarousel";
import InvesterComponent from "./components/Investers";
import QuarterlyEarningComponent from "./components/QuarterlyEarning";
import AnnualReportComponent from "./components/AnnualReport";
import InvesterHomeComponent from "./components/InvestorHome";
import InvestorsNewsComponent from "./components/InvestorsNews";
import GovernanceComponent from "./components/Governance";
import Invester2Component from "./components/Investers2";
import InvestorsEventsComponent from "./components/InvestorsEvents";
import FinancialInformation from "./components/FinancialInformation";
import FinancialInformation2 from "./components/FinancialInformation2";
import SecFillingComponent from "./components/SecFillings";
import StockInfoComponent from './components/StockInformation';
import AnalystCoverageComponent from './components/AnalystCoverage';
import InvestmentCalculatorComponent from './components/InvestmentCalculator';
import HistoricStockLookupComponent from './components/HistoricStockLookup';
import InvestorsEmailAlertComponent from './components/InvestorsEmailAlert';
import InvestorsContactUsComponent from './components/InvestorsContactUs';
import BoardOfDirectorsComponent from './components/BoardOfDirectors';
import CommiteesComponent from './components/Commitees';
import ContactTheBoardComponent from './components/ContactTheBoard';
import ManagementComponent from './components/Management';
import FaqComponent from './components/faq';

//defining routes
const Route = ({ childProps }) =>
    <Switch>
        <AppliedRoute exact path="/" component={DashboardComponent} props={childProps} />
        <AppliedRoute exact path="/about-us" component={AboutUsComponent} props={childProps} />
        <AppliedRoute exact path="/construction-type" component={ConstructionTypeComponent} props={childProps} />
        <AppliedRoute exact path="/accolades" component={AccoladesComponent} props={childProps} />
        <AppliedRoute exact path="/leadership" component={LeaderShipComponent} props={childProps} />
        <AppliedRoute exact path="/community" component={CommunityComponent} props={childProps} />
        <AppliedRoute exact path="/green-works" component={GreenWorksComponent} props={childProps} />
        <AppliedRoute exact path="/code-standards" component={CodeStandardComponent} props={childProps} />
        <AppliedRoute exact path="/news-press" component={NewsPressComponent} props={childProps} />
        <AppliedRoute exact path="/forms-library" component={FormsLibraryComponent} props={childProps} />
        <AppliedRoute exact path="/manufacturing" component={ManufacturingComponent} props={childProps} />
        <AppliedRoute exact path="/installed-services" component={InstalledServiceComponent} props={childProps} />
        <AppliedRoute exact path="/distribution" component={DistributionComponent} props={childProps} />
        <AppliedRoute exact path="/careers" component={CareerComponent} props={childProps} />
        <AppliedRoute exact path="/job-areas" component={JobAreaComponent} props={childProps} />
        <AppliedRoute exact path="/why-builders" component={WhyBuilderComponent} props={childProps} />
        <AppliedRoute exact path="/locations" component={StoreLocatore} props={childProps} />
        <AppliedRoute exact path="/location_:name" component={DetailsLocationsComponent} props={childProps} >
        </AppliedRoute>
        <AppliedRoute exact path="/contact-us" component={ContactUsComponent} props={childProps} />
        <AppliedRoute exact path="/site-map" component={SitemapComponent} props={childProps} />
        <AppliedRoute exact path="/bfs-terms" component={BfsTermsComponent} props={childProps} />
        <AppliedRoute exact path="/carouselexample" component={Example} props={childProps} />
        <AppliedRoute exact path="/investorhome" component={InvesterHomeComponent} props={childProps} />
        <AppliedRoute exact path="/leaderships" component={InvesterComponent} props={childProps} />
        <AppliedRoute exact path="/quarterlyearning" component={QuarterlyEarningComponent} props={childProps} />
        <AppliedRoute exact path="/annualreport" component={AnnualReportComponent} props={childProps} />
        <AppliedRoute exact path="/news" component={InvestorsNewsComponent} props={childProps} />
        <AppliedRoute exact path="/governance" component={GovernanceComponent} props={childProps} />
        {/* <AppliedRoute exact path="/investors_:subpage" component={InvesterHomeComponent} props={childProps} /> */}
        <AppliedRoute exact path="/investors2" component={Invester2Component} props={childProps} />
        <AppliedRoute exact path="/events" component={InvestorsEventsComponent} props={childProps} />
        <AppliedRoute exact path="/financial-info" component={FinancialInformation} props={childProps} />
        <AppliedRoute exact path="/sec-filings" component={SecFillingComponent} props={childProps} />
        <AppliedRoute exact path="/financial-info2" component={FinancialInformation2} props={childProps} />
        <AppliedRoute exact path="/stock-info" component={StockInfoComponent} props={childProps} />
        <AppliedRoute exact path="/analyst-coverage" component={AnalystCoverageComponent} props={childProps} />
        <AppliedRoute exact path="/investment-calculator" component={InvestmentCalculatorComponent} props={childProps} />
        <AppliedRoute exact path="/historic-stock-lookup" component={HistoricStockLookupComponent} props={childProps} />
        <AppliedRoute exact path="/contact" component={InvestorsContactUsComponent} props={childProps} />
        <AppliedRoute exact path="/email-alert" component={InvestorsEmailAlertComponent} props={childProps} />

        <AppliedRoute exact path="/board-of-directors" component={BoardOfDirectorsComponent} props={childProps} />
        <AppliedRoute exact path="/commitees" component={CommiteesComponent} props={childProps} />
        <AppliedRoute exact path="/contact-board" component={ContactTheBoardComponent} props={childProps} />
        <AppliedRoute exact path="/management" component={ManagementComponent} props={childProps} />
        <AppliedRoute exact path="/faq" component={FaqComponent} props={childProps} />

        
        <AppliedRoute exact path="*" component={DashboardComponent} props={childProps} />
    </Switch>

Route.propTypes = {
    childProps: PropTypes.any
};

export default Route
