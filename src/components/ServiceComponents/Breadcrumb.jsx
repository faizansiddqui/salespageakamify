import React from "react";
import "./Breadcrumb.css";

const Breadcrumb = () => {
  return (
    <nav className="breadcrumb">
      <a href="/">Home</a> &gt; <a href="/categories">Categories</a> &gt;{" "}
      <span>Web Development</span>
    </nav>
  );
};

export default Breadcrumb;
