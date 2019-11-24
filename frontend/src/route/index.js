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
  
        <AppliedRoute exact path="*" component={DashboardComponent} props={childProps} />
    </Switch>

Route.propTypes = {
    childProps: PropTypes.any
};

export default Route
