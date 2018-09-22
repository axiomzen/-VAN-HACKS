import React from 'react';
import {
  Filter,
  List,
  Edit,
  Create,
  Datagrid,
  ReferenceField,
  TextField,
  EditButton,
  DisabledInput,
  LongTextInput,
  NumberInput,
  SimpleForm,
  TextInput,
  Toolbar,
  SaveButton,
  ImageField,
  ImageInput,
} from 'react-admin';

export const ClientList = props => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="fname" />
      <TextField source="lname" />
      <TextField source="client_id" />
      <ImageField source="image.src" title="image.title" />
      <EditButton basePath="/client" />
    </Datagrid>
  </List>
);

const PostCreateToolbar = props => (
  <Toolbar {...props}>
    {/* <SaveButton
            label="post.action.save_and_show"
            redirect="show"
            submitOnEnter={true}
        /> */}
    <SaveButton label="Submit" submitOnEnter={false} />
  </Toolbar>
);

const redirect = (basePath, id, data) => `/confirmation/${data.id}`;

export const ClientCreate = props => (
  <Create {...props}>
    <SimpleForm toolbar={<PostCreateToolbar />} redirect={redirect}>
      <h4>Submit New Referral</h4>
      <TextInput source="fname" label="First Name" />
      <TextInput source="lname" label="Last Name" />
      <TextInput source="email" label="Email" />
      <TextInput source="phone" label="Phone Number" />
      <TextInput source="agency_id" label="Phone Number" />
      {/* <TextInput source="photo" label="Photo (url)" /> */}
      <ImageInput source="image" label="Related pictures" accept="image/*">
          <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Create>
);

export const ClientEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <LongTextInput source="fname" />
      <LongTextInput source="lname" />
      <LongTextInput source="agency_id" label="Phone Number" />
    </SimpleForm>
  </Edit>
);
