// QuantityControl.js
import React from "react";

const QuantityControl = ({ quantity, onIncrease, onDecrease }) => (
    <div className="quantity-control">
        <button className="quantity-btn minus" onClick={onDecrease}>
            {quantity === 1 ? <i className="fa fa-trash" /> : <i className="fa fa-minus" />}
        </button>
        <span className="quantity-value">{quantity}</span>
        <button className="quantity-btn plus" onClick={onIncrease}>
            <i className="fa fa-plus" />
        </button>
    </div>
);

export default QuantityControl;
