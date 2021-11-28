import React, { useState } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import { ROLES_ENUM } from '../enums';

export default function UserDetail({userEmail, user}) {
  const [email, setEmail] = useState(userEmail);
  const [role, setRole] = useState((user && user.role) || '');

  const handleRadioChange = (e) => { 
    setRole(e.target.value);
  }

  return (
    <div className="user-detail">
      <Header title={userEmail} rightElement={<Button>save</Button>}/>
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