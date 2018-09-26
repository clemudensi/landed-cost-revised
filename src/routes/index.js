import Loadable from 'react-loadable';
import {MyLoadingComponent} from '../components/loadingComponent'

const AsyncDashboard = Loadable({
    loader: () => import('../views/Dashboard'),
    loading: MyLoadingComponent
});
const AsyncLandedCost = Loadable({
    loader: () => import('../views/LandedCostPage/LandedCost'),
    loading: MyLoadingComponent
});

let indexRoute = [
    {path: '/dashboard', name: 'Dashboard', component: AsyncDashboard },
    {path: '/landedcost', name: 'LandedCost', component: AsyncLandedCost },
];

export default indexRoute