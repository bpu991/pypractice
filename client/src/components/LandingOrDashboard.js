import React from 'react';
import { useSelector } from 'react-redux';

import Landing from './Landing'
import Dashboard from './Dashboard'


const LandingOrDashboard = () => {
    const loggedOut = useSelector(state => !state.authentication.user)
    const Component = (loggedOut) ? Landing : Dashboard;
    return (
        <Component />
    )
}
export default LandingOrDashboard;
