import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROLES_ENUM } from '../enums';

export default function DataTable({ labelNames = [], dataList = [] }) {
  const navigate = useNavigate();
  return (
    <div className="data-table">
      <div className="data-table__header">
        <ul className="data-table__inner-header text-style__base text-style__base--medium">
          {
            labelNames.map((label, i) => {
              return (
                <li key={i}>
                  { label }
                </li>
              );
            })
          }
        </ul>
      </div>
      <ul className="data-table__rows text-style__base text-style--gray">
        {
          dataList.map(({ email = "", name = "", role = ""}, i) => {
            return (
              <li key={i} onClick={() => navigate(`user/${email}`)} tabIndex="0">
                  <ul>
                    <li>
                      <input type="checkbox" onClick={(e) => e.stopPropagation()} />
                    </li>
                    <li>
                      { email }
                    </li>
                    <li>
                      { name }
                    </li>
                    <li>
                      { ROLES_ENUM[role] }
                    </li>
                  </ul>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}