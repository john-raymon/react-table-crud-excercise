import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import { ROLES_ENUM } from '../enums';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const UPDATE_USER = gql`
  mutation updateUser($email: ID!, $newAttributes: UserAttributesInput!) {
    updateUser(email: $email, newAttributes: $newAttributes)  {
      email
      role
    }
  }
`;

export default function UserDetail({userEmail, user}) {
  const [email, setEmail] = useState(userEmail);
  const [role, setRole] = useState((user && user.role) || '');

  const [updateUser, { loading, error, data }] = useMutation(UPDATE_USER);

  const handleRadioChange = (e) => { 
    setRole(e.target.value);
  }
  
  const onSubmit = (e) => {
    updateUser({ variables: { email, newAttributes: { name: user.name, role } } });
  }

  return (
    <div className="user-detail">
      <Header title={userEmail} rightElement={<Button onClick={onSubmit}>save</Button>}/>
      <div className="user-detail__inputs-container">
        <div>
          <label id="name" className="text-style__base text-style__base--medium text-style--gray">Name</label>
          <input for="name" className="text-style__base text-style--gray" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <div className="user-detail__radio-group">
            {
              Object.entries(ROLES_ENUM).map(([key, value]) => (
                <div key={key} onClick={(e) => handleRadioChange(e)}> 
                  <input type="radio" id={key} name="role" value={key} checked={role === key} />
                  <label className="text-style__base text-style--gray" htmlFor={key} >{value}</label>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};