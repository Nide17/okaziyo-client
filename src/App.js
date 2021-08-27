import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
// Make sure to place css after bootstrap
import './App.css';
import 'font-awesome/css/font-awesome.css'

// Starter
import Header from './components/header/Header';
import Main from './Main';
import Placeholder from './components/others/Placeholder';
import Contact from './components/others/Contact';
import About from './components/others/About';
import ViewedJob from './components/slicks/jobs/ViewedJob'
import ViewedScholarship from './components/slicks/scholarships/ViewedScholarship'

// Footer
import Footer from './components/Footer';
import Disclaimer from './components/others/Disclaimer';
import Privacy from './components/others/Privacy';
import Terms from './components/others/Terms';
import AllMultiJobs from './components/others/AllMultiJobs';
import ViewMultiJobs from './components/others/ViewMultiJobs';
import JobsArchives from './components/others/JobsArchives';

// Categories
import Categories from './components/categories/Categories';
import ItemsByCategory from './components/categories/ItemsByCategory'
import ItemsBySubCategory from './components/categories/ItemsBySubCategory'
import JobsByCategory from './components/categories/JobsByCategory'
import JobsBySubCategory from './components/categories/JobsBySubCategory'
import ScholarshipsByCategory from './components/categories/ScholarshipsByCategory'
import ScholarshipsBySubCategory from './components/categories/ScholarshipsBySubCategory'

// Auth
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import Subscribe from './components/auth/Subscribe';
import Unsubscribe from './components/auth/Unsubscribe';

// Dashboard
import Homepage from './components/dashboard/homepage/Homepage';
import ViewCategory from './components/dashboard/categories/ViewCategory';
import Multijobs from './components/dashboard/multijobs/Multijobs';
import CreateMultiJobs from './components/dashboard/multijobs/CreateMultiJobs';
import Editmultijobs from './components/dashboard/multijobs/Editmultijobs';
import CreateJob from './components/dashboard/categories/CreateJob';
import EditJob from './components/dashboard/categories/EditJob';
import CreateScholarship from './components/dashboard/categories/CreateScholarship';
import EditScholarship from './components/dashboard/categories/EditScholarship';
import SellItem from './components/dashboard/categories/SellItem'
import VisitorHomepage from './components/dashboard/homepage/VisitorHomepage'

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// REDUX
import store from './redux/store'
import { loadUser } from './redux/auth/auth.actions'
import { getCategories } from './redux/categories/categories.actions'
import MoreItems from './components/items/MoreItems';
import OneItem from './components/items/OneItem';

const App = ({ categories, getCategories }) => {

  useEffect(() => {
    store.dispatch(loadUser())
    getCategories()
  }, [getCategories]);

  return (
    <div className="App">

      <Router>

        <Header categories={categories} />
        <Categories categories={categories} />

        <Switch>

          {/* Starter */}
          <Route exact path="/" render={() => <Main categories={categories} />} />
          <Route exact path="/all-items" component={MoreItems} />
          <Route exact path="/view-item/:itemId" component={OneItem} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/about" component={About} />
          <Route exact path="/slickJob/:jobSlug" render={() => <ViewedJob categories={categories} />} />
          <Route exact path="/slickScholarship/:scholarshipSlug" render={() => <ViewedScholarship categories={categories} />} />

          {/* footer */}
          <Route exact path="/privacy" component={Privacy} />
          <Route exact path="/disclaimer" component={Disclaimer} />
          <Route exact path="/terms" component={Terms} />
          <Route exact path="/all-multijobs" component={AllMultiJobs} />
          <Route exact path="/view-multijobs/:multijobsId" component={ViewMultiJobs} />
          <Route exact path="/jobs/archives" render={() => <JobsArchives categories={categories} />} />
          {/* <Route exact path="/feat-brands" component={Placeholder} /> */}
          {/* <Route exact path="/hot-deals" component={Placeholder} /> */}

          {/* auth */}
          <Route exact path="/register" component={Register} />
          <Route exact path="/unsubscribe" component={Unsubscribe} />
          <Route exact path="/subscribe" component={Subscribe} />
          <Route exact path="/reset-password" component={ResetPassword} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/login" component={Login} />

          {/* Categories */}
          <Route exact path="/electronics/:categoryId" component={ItemsByCategory} />
          <Route exact path="/electronics/computers/:subCategoryId" component={ItemsBySubCategory} />
          <Route exact path="/electronics/phones/:subCategoryId" component={ItemsBySubCategory} />
          <Route exact path="/electronics/printers/:subCategoryId" component={ItemsBySubCategory} />
          <Route exact path="/electronics/others/:subCategoryId" component={ItemsBySubCategory} />

          <Route exact path="/fashion/:categoryId" component={ItemsByCategory} />
          <Route exact path="/fashion/clothes/:subCategoryId" component={ItemsBySubCategory} />
          <Route exact path="/fashion/shoes/:subCategoryId" component={ItemsBySubCategory} />
          <Route exact path="/fashion/others/:subCategoryId" component={ItemsBySubCategory} />

          <Route exact path="/furniture/:categoryId" component={ItemsByCategory} />
          <Route exact path="/furniture/beds/:subCategoryId" component={ItemsBySubCategory} />
          <Route exact path="/furniture/chairs/:subCategoryId" component={ItemsBySubCategory} />
          <Route exact path="/furniture/tables/:subCategoryId" component={ItemsBySubCategory} />
          <Route exact path="/furniture/others/:subCategoryId" component={ItemsBySubCategory} />

          <Route exact path="/transport/:categoryId" component={ItemsByCategory} />
          <Route exact path="/transport/cars/:subCategoryId" component={ItemsBySubCategory} />
          <Route exact path="/transport/motorcycles/:subCategoryId" component={ItemsBySubCategory} />
          <Route exact path="/transport/bicycles/:subCategoryId" component={ItemsBySubCategory} />
          <Route exact path="/transport/others/:subCategoryId" component={ItemsBySubCategory} />

          <Route exact path="/real/:categoryId" component={ItemsByCategory} />
          <Route exact path="/real/plots/:subCategoryId" component={ItemsBySubCategory} />
          <Route exact path="/real/houses/:subCategoryId" component={ItemsBySubCategory} />
          <Route exact path="/real/others/:subCategoryId" component={ItemsBySubCategory} />

          <Route exact path="/scholarships/:categoryId" render={() => <ScholarshipsByCategory categories={categories} />} />
          <Route exact path="/scholarships/undergraduate/:subCategoryId" render={() => <ScholarshipsBySubCategory categories={categories} />} />
          <Route exact path="/scholarships/masters/:subCategoryId" render={() => <ScholarshipsBySubCategory categories={categories} />} />
          <Route exact path="/scholarships/phd/:subCategoryId" render={() => <ScholarshipsBySubCategory categories={categories} />} />
          <Route exact path="/scholarships/others/:subCategoryId" render={() => <ScholarshipsBySubCategory categories={categories} />} /> 
          
          <Route exact path="/jobs/:categoryId" render={() => <JobsByCategory categories={categories} />} />
          <Route exact path="/jobs/full/:subCategoryId" render={() => <JobsBySubCategory categories={categories} />} />
          <Route exact path="/jobs/part/:subCategoryId" render={() => <JobsBySubCategory categories={categories} />} />
          <Route exact path="/jobs/internships/:subCategoryId" render={() => <JobsBySubCategory categories={categories} />} />
          <Route exact path="/jobs/others/:subCategoryId" render={() => <JobsBySubCategory categories={categories} />} />

          <Route exact path="/others/:categoryId" component={ItemsByCategory} />
          <Route exact path="/others/tenders/:subCategoryId" component={ItemsBySubCategory} />
          <Route exact path="/others/rents/:subCategoryId" component={ItemsBySubCategory} />
          <Route exact path="/others/others/:subCategoryId" component={ItemsBySubCategory} />

          {/* Dashboard */}
          <Route exact path="/dashboard" render={() => <Homepage categories={categories} />} />
          <Route exact path="/dashboard/multi-jobs" render={() => <Multijobs categories={categories}/>} />
          <Route exact path="/dashboard/create-multijobs" render={() => <CreateMultiJobs categories={categories} />} />
          <Route exact path="/dashboard/edit-multijobs/:multijobsId" render={() => <Editmultijobs />} />
          <Route exact path="/dashboard/view-category/:categoryId" render={() => <ViewCategory categories={categories} />} />
          <Route exact path="/dashboard/create-job/:subCategoryId" render={() => <CreateJob categories={categories} />} />
          <Route exact path="/dashboard/edit-job/:jobId" render={() => <EditJob categories={categories} />} />
          <Route exact path="/dashboard/create-scholarship/:subCategoryId" render={() => <CreateScholarship categories={categories} />} />
          <Route exact path="/dashboard/edit-scholarship/:scholarshipId" render={() => <EditScholarship categories={categories} />} />
          <Route exact path="/sell-now" render={() => <VisitorHomepage categories={categories} />} />
          <Route exact path="/sell-now/:categoryId" render={() => <SellItem categories={categories} />} />

          {/* <Route path="/ads.txt">
              google.com, pub-8918850949540829, DIRECT, f08c47fec0942fa0
            </Route> */}

          {/* <Route path="/slickItem" component={Placeholder} /> */}
          <Route path="*">
            <Placeholder />
          </Route>

        </Switch>
        <Footer />

      </Router>

    </div>
  );
}

const mapStateToProps = state => ({
  categories: state.categoriesReducer
})

export default connect(mapStateToProps, { getCategories })(App);