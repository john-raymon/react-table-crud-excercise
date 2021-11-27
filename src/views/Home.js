import React from "react";
import Header from '../components/Header';
import Button from '../components/Button';
import DataTable from '../components/DataTable';

export default function Home({ users = []}) {
  return (
    <div className="home-component">
      <Header 
        rightElement={
          <Button buttonType="delete" disabled={true}>Delete</Button>
        } 
        title="Users" 
      />
      <DataTable labelNames={["email", "name", "role"]} dataList={users} />
    </div>
  )
}
