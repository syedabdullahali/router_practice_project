import { Fragment } from 'react'
import classes from  './Layout.module.css'
import MainNavigation from './MainNavigation'

function Layout(props){


return <Fragment>
    <MainNavigation/>
    <main className={classes.main}>
        {props.children}
    </main>
</Fragment>

}

export default Layout