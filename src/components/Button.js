import React from 'react';

export default function Button({ children, buttonType = "primary", type = "submit", ...props}) {
  return (
    <button className={`button button__${buttonType}`} type={type} {...props}>
      <p className="text-style__base">
        { children }
      </p>
    </button>
  )
}