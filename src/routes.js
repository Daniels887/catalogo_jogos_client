import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';


export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/add" component={New} />
        </Switch>
    )
}
