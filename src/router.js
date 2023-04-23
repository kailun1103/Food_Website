import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './page/home';
import About from './page/others/About';
import Explore from './page/others/Explore';
import IndexSection from './page/components/IndexSection';

const Router = () => {
    return <div>
        <BrowserRouter>
            <IndexSection />
            <Switch>
                <Route path='/home'>
                    <Home />
                </Route>
                <Route path='/about'>
                    <About />
                </Route>
                <Route path='/explore'>
                    <Explore />
                </Route>
            </Switch>
        </BrowserRouter>

    </div>
}

export default Router;