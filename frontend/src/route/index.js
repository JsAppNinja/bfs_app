import PropTypes from 'prop-types';
import React from 'react';
import { Switch } from "react-router-dom";

import AboutUsComponent from '../pages/AboutUs'
import DashboardComponent from '../pages/Dashboard';
import ConstructionTypeComponent from '../pages/ConstructionType';
import AccoladesComponent from '../pages/Accolades';
import LeaderShipComponent from '../pages/Leadership';
import CommunityComponent from '../pages/Community';
import GreenWorksComponent from '../pages/GreenWorks';
import CodeStandardComponent from '../pages/CodeStandards';
import NewsPressComponent from '../pages/NewsPress';
import FormsLibraryComponent from '../pages/FormsLibrary';
import ManufacturingComponent from '../pages/Manufacturing';
import InstalledServiceComponent from '../pages/InstalledService';
import DistributionComponent from '../pages/Distribution';
import CareerComponent from '../pages/Career';
import JobAreaComponent from '../pages/JobAreas';
import WhyBuilderComponent from '../pages/WhyBuilder';
import StoreLocatore from "../pages/LocationStoreLocator";
import DetailsLocationsComponent from "../pages/DetailsLoactions";
import ContactUsComponent from "../pages/ContactUs";
import SitemapComponent from "../pages/SiteMap";
import BfsTermsComponent from "../pages/BfsTerms";
import AppliedRoute from "./AppliedRouting";
import Example from "../pages/Slidercarousel";

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
