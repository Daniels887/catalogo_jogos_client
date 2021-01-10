import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/add" component={New} />
            <Route path="/edit/:id" component={Edit} />
        </Switch>
    )
}
