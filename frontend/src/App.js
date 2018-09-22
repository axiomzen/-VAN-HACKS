import React from 'react';
import { Admin, Resource } from 'react-admin';
import postgrestProvider from './postgrestProvider';
import createAuthClient from './authClient';
import { ClientList, ClientCreate, ClientEdit } from './clients';
import {
  ShoppingListsList,
  ShoppingListsCreate,
  ShoppingListsEdit
} from './shoppingLists';
import {
  ReferralsFormFieldsList,
  ReferralsFormFieldsCreate,
  ReferralsFormFieldsEdit
} from './referralsFormFields';
import httpClient from './httpClient';
import customRoutes from './customRoutes';

import './App.css';

const dataProvider = postgrestProvider('/api', httpClient);
const authProvider = createAuthClient('/api');
const App = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    customRoutes={customRoutes}
  >
    <Resource
      name="clients"
      list={ClientList}
      create={ClientCreate}
      edit={ClientEdit}
    />
    <Resource
        options={{ label: 'Referral form inputs' }}
        name="referralFormInputs"
        list={ReferralsFormFieldsList}
        create={ReferralsFormFieldsCreate}
        edit={ReferralsFormFieldsEdit}
    />
    <Resource
      options={{ label: 'Shopping lists' }}
      name="shopping_list_items"
      list={ShoppingListsList}
      create={ShoppingListsCreate}
      edit={ShoppingListsEdit}
    />
  </Admin>
);

export default App;
