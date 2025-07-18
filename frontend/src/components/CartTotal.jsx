import React, { useContext } from "react";

import SectionTitle from "./SectionTitle";

const CartTotal = () => {

  return (
    <div className="w-full">
      <div className="text-2xl">
        <SectionTitle title={"CART"} subtitle={"TOTALS"} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            Total
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee:</p>
          <p>
          delivery fee
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Total</p>
          <b>
            total amount
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
