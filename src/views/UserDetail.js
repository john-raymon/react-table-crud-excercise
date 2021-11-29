import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import { ROLES_ENUM } from '../enums';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { 
  useParams,
  Navigate,
} from 'react-router-dom';

const UPDATE_USER = gql`
  mutation updateUser($email: ID!, $newAttributes: UserAttributesInput!) {
    updateUser(email: $email, newAttributes: $newAttributes)  {
      email
      role
    }
  }
`;

function UserDetail({userEmail, user, refetchAllUsersQuery}) {
  const [role, setRole] = useState((user && user.role) || '');
  const [name, setName] = useState((user && user.name) || '');
  
  const [updateUser, { loading, error, data }] = useMutation(UPDATE_USER);

  useEffect(() => {
    // refetch the all users query after a successful update
    if (!loading && !error && (data && data.updateUser)) {
      refetchAllUsersQuery();
    }
  }, [data, loading, error]);

  const handleRadioChange = (e) => { 
    setRole(e.target.value);
  }
  
  const onSubmit = (e) => {
    updateUser({ variables: { email: userEmail, newAttributes: { name, role } } });
  }

  return (
    <div className="user-detail">
      <Header title={userEmail} rightElement={<Button onClick={onSubmit} disabled={!!loading}>{loading ? 'Saving...' : 'Save'}</Button>}/>
      <div className="user-detail__inputs-container">
        <div>
          <label id="name" className="text-style__base text-style__base--medium text-style--gray">Name</label>
          <input htmlFor="name" className="text-style__base text-style--gray" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <div className="user-detail__radio-group">
            {
              Object.entries(ROLES_ENUM).map(([key, value]) => (
                <div key={key} onClick={(e) => handleRadioChange(e)}> 
                  {
                    /*
                      Since we're capturing the click events from the label & radio inputs,
                      on the parent div when it bubbles up, I used defaultChecked to
                      stop React from throwing an error of a missing onChange handler.
                    */
                  }
                  <input type="radio" id={key} name="role" value={key} defaultChecked={role === key} />
                  <label className="text-style__base text-style--gray" htmlFor={key}>{value}</label>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default function WrappedUserDetail({ usersById, refetchAllUsersQuery}) {
  const { userEmail } = useParams();
  const [loading, setLoading] = useState(true);

  if (usersById === null) {
    return <p>Loading...</p>;
  }

  if (usersById[userEmail] === undefined) {
    return <Navigate replace to="/" />;
  }

  return (
    <UserDetail userEmail={userEmail} user={usersById[userEmail]} refetchAllUsersQuery={refetchAllUsersQuery} />
  ) 
}