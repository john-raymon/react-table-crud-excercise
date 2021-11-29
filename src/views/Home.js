import React, { useEffect, useState } from "react";
import Header from '../components/Header';
import Button from '../components/Button';
import DataTable from '../components/DataTable';
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const DELETE_USERS = gql`
  mutation deleteUsers($emails: [ID]!) {
    deleteUsers(emails: $emails)
  }
`;

export default function Home({ users = [], refetchAllUsersQuery}) {
  const [checkboxMap, setCheckboxMap] = useState(new Map());

  const [deleteUsers, { loading, data, error }] = useMutation(DELETE_USERS);

  const handleDelete = () => {
    // since all of the checkboxes that were unchecked were deleted from
    // the map, we don't need to filter out any entries, 
    // instead we can just get all the keys (emails) from the map
    // and safely delete them all
    const emails = Array.from(checkboxMap.keys());
    deleteUsers({ variables: { emails } });
  }

  useEffect(() => {
    if (!loading && !error && (data && data.deleteUsers)) {
      // if we successfully deleted users, we need to clear the checkboxMap & refetch the all users query
      refetchAllUsersQuery();
      setCheckboxMap(new Map());
    }
  }, [loading, data, error])

  const updateCheckboxMap = (email, checked) => {
    function updateAndReturnNewMap(prevMap) {
      if (checked) {
        return new Map(prevMap.set(email, checked))
      } else {
        prevMap.delete(email);
        return new Map(prevMap);
      }
    }
    setCheckboxMap(previousCheckboxMap => updateAndReturnNewMap(previousCheckboxMap));
  }

  return (
    <div className="home-component">
      <Header 
        rightElement={
          <Button onClick={handleDelete} buttonType="delete" disabled={!(checkboxMap.size > 0)}>Delete</Button>
        } 
        title="Users" 
      />
      <DataTable labelNames={["email", "name", "role"]} dataList={users} checkboxMap={checkboxMap} updateCheckbox={updateCheckboxMap} />
    </div>
  )
}
