import React from 'react'
import { makeStyles, Tab, Tabs, Toolbar } from '@material-ui/core'
import { Link, useLocation } from 'react-router-dom'

import logo from '../logo-trimmed_transparent-background.png';
import { AppRoute } from '../routes';

const useStyles = makeStyles({
    logoLink: {
        paddingInlineEnd: 12,
        paddingBlock: 6
    },
    navTab: {
        textTransform: 'none',
        fontWeight: 800
    }
})

type NavTabDefinition = {
    route: AppRoute,
    label: string,
}

const NAV_TABS: NavTabDefinition[] = [
    { route: AppRoute.DASHBOARD, label: 'Dashboard' },
    { route: AppRoute.SHIPMENTS, label: 'Shipments' }
]

export const Navbar: React.FC = () => {
    const classes = useStyles()
    const location = useLocation()
    const tabIndex = NAV_TABS.findIndex(tab => tab.route === location.pathname)

    return <Toolbar>
        <Link to={AppRoute.DASHBOARD} className={classes.logoLink}>
            <img alt="Logixboard Logo" src={logo} style={{
                height: '100%',
                maxWidth: 145,
                objectFit: 'contain',
            }} />
        </Link>
        <Tabs value={tabIndex} indicatorColor="primary">
            {NAV_TABS.map((tab, index) =>
                <Tab key={index} className={classes.navTab} component={Link} to={tab.route} label={tab.label} />
            )}
        </Tabs>
    </Toolbar>
}
