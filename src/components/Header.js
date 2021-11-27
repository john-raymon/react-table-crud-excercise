import React from 'react';

export default function Header({ rightElement, title, className}) {
  return (
    <header className={`header-component ${className}`}>
      <h1 className="text-style__title text-style--black">
        { title }
      </h1>

      { rightElement }
    </header>
  )
}