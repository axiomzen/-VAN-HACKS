import React, { Component, Fragment } from 'react';
import {
  Filter,
  List,
  Edit,
  Create,
  Datagrid,
  ReferenceField,
  TextField,
  DateInput,
  EditButton,
  DisabledInput,
  LongTextInput,
  ReferenceInput,
  SelectInput,
  SelectField,
  SimpleForm,
  TextInput,
  Toolbar,
  SaveButton,
  ImageField,
  ImageInput,
  BooleanInput,
  FileInput,
  FileField,
  TabbedShowLayout,
  Tab
} from 'react-admin';
import axios from 'axios';

import ApprovalStatusField from './ApprovalStatusField';

export const ClientList = props => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField label="First" source="fname" />
        <TextField label="Last" source="lname" />
        <TextField source="email" />
        <TextField source="phone" />
        <TextField source="agent" />
        <ImageField label="Photo" source="image.src" title="image.title" />
        <ApprovalStatusField source="approval_status" />
        <EditButton basePath="/clients" />
      </Datagrid>
    </List>
  );
};

const PostCreateToolbar = props => (
  <Toolbar {...props}>
    <SaveButton label="Submit" submitOnEnter={false} redirect="/confirmation" />
  </Toolbar>
);

export class ClientCreate extends Component {
  state = {
    additionalFields: [],
    activeTab: 1
  };

  async componentDidMount() {
    const response = await axios.get(
      'http://localhost:4000/api/referrals_form_inputs?order=id.desc'
    );
    const { data } = response;
    this.setState({
      additionalFields: data
    });
  }

  switchTabs(id) {
    this.setState({
      activeTab: id
    });
  }

  render() {
    return (
      <Create {...this.props}>
        <SimpleForm toolbar={<PostCreateToolbar />}>
          <h4>Submit New Referral</h4>
          <div className="ClientTabs">
            <div
              className={`ClientTab
              ${this.state.activeTab === 1 && 'ClientTab--selected'}`}
              onClick={() => this.switchTabs(1)}
            >
              MAIN INFORMATION
            </div>
            <div
              className={`ClientTab
              ${this.state.activeTab === 2 && 'ClientTab--selected'}`}
              onClick={() => this.switchTabs(2)}
            >
              ADDITIONAL INFORMATION
            </div>
          </div>
          {form(this.state, false)}
        </SimpleForm>
      </Create>
    );
  }
}

export class ClientEdit extends Component {
  state = {
    additionalFields: [],
    activeTab: 1
  };

  async componentDidMount() {
    const response = await axios.get(
      'http://localhost:4000/api/referrals_form_inputs?order=id.desc'
    );
    const { data } = response;
    this.setState({
      additionalFields: data
    });
  }

  switchTabs(id) {
    this.setState({
      activeTab: id
    });
  }

  render() {
    return (
      <Edit {...this.props}>
        <SimpleForm>
          <h4>{`Referral #${this.props.id}`}</h4>
          <div className="ClientTabs">
            <div
              className={`ClientTab
              ${this.state.activeTab === 1 && 'ClientTab--selected'}`}
              onClick={() => this.switchTabs(1)}
            >
              MAIN INFORMATION
            </div>
            <div
              className={`ClientTab
              ${this.state.activeTab === 2 && 'ClientTab--selected'}`}
              onClick={() => this.switchTabs(2)}
            >
              ADDITIONAL INFORMATION
            </div>
          </div>
          {form(this.state, true)}
        </SimpleForm>
      </Edit>
    );
  }
}

function form(state, showApprovalStatus) {
  if (state.activeTab === 1) {
    return [
      <TextInput source="fname" label="First Name" defaultValue="Linda" />,
      <TextInput source="lname" label="Last Name" defaultValue="Johnson" />,
      showApprovalStatus && (
        <SelectInput
          source="approval_status"
          choices={[
            { id: 'Pending', name: 'Pending' },
            { id: 'Approved', name: 'Approved' },
            { id: 'Rejected', name: 'Rejected' }
          ]}
        />
      ),
      <TextInput source="agency_id" label="Agency" defaultValue="1" />,
      <TextInput
        source="email"
        label="Email"
        defaultValue="l.johnson.@gmail.com"
      />,
      <TextInput
        source="phone"
        label="Phone Number"
        defaultValue="555-345-2323"
      />,
      <TextInput
        source="agent"
        label="Reference Agency"
        defaultValue="B.C.M.A"
      />,
      <ImageInput source="image" label="Related pictures" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
    ];
  }
  return state.additionalFields.map(field => {
    const { name, id, type } = field;
    const source = `custom_info.${id}`;
    switch (type.trim()) {
      case 'LongTextInput':
        return <LongTextInput label={name} key={source} source={source} />;
      case 'FileInput':
        return (
          <FileInput source={source} label={name} key={source}>
            <FileField source="src" title="title" />
          </FileInput>
        );
      case 'BooleanInput':
        return <BooleanInput label={name} key={source} source={source} />;
      case 'TextInput':
      default:
        return <TextInput label={name} key={source} source={source} />;
    }
  });
}
