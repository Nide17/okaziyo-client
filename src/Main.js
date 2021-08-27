import Process from './components/Process';
import BrowseItems from './components/items/BrowseItems';
import Money from './components/Money';
import JobsSlick from './components/slicks/jobs/JobsSlick';
import ScholarshipsSlick from './components/slicks/scholarships/ScholarshipsSlick';

const Main = ({ categories }) => {
    return (
        <>
            <JobsSlick categories={categories} />
            <Process />
            <BrowseItems />
            <Money />
            <ScholarshipsSlick categories={categories} />
        </>
    );
}

export default Main;
