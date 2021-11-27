import React from 'react';

export default function DataTable({ labelNames = [], dataList = [] }) {
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
          dataList.map(({ email = "", name = "", role = ""}) => {
            return (
              <li>
                <ul>
                  <li>
                    <input type="checkbox" />
                  </li>
                  <li>
                    { email }
                  </li>
                  <li>
                    { name }
                  </li>
                  <li>
                    { role }
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