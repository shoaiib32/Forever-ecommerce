import React, { useState } from "react";


const Filters = ({ title, filterNames = [], handleFilter }) => {
  return (
    <div>
      <div className="border border-gray-300 pl-5 py-3 mt-6">
        <h1 className="mb-2">{title}</h1>
        <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
          {filterNames &&
            filterNames.map((name, i) => (
              <p key={i} className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={name}
                  onChange={handleFilter}
                />
                {name}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
