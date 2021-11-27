import React, { Component } from "react";


export default function Home() {
  return (
    <div className="home-component">
      <header className="header-component">
        <h1 className="text-style__title text-style--black">
          Users
        </h1>

        <button className="button button__delete">
          <p className="text-style__base">
            Delete
          </p>
        </button>
      </header>
    </div>
  )
}
