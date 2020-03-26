import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/logon'; //Importando o componente Logon
import Register from './pages/register'; // importando o register
import Profile from './pages/profile'; // importando o profile
import NewIncident from './pages/newIncident'; // importando o profile





export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile} />
                <Route path="/incidents/new" component={NewIncident} />

            </Switch>
        </BrowserRouter>
    );
};

//Switch: vai garantir que apenas uma rota será excecutada por momento (opcional)