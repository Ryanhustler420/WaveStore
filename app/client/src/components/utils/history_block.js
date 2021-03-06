import React from 'react';
// import moment from 'moment';

const UserHistoryBlock = (props) => {

    const renderBlocks = () => (
        props.products ? 
            props.products.map((product, i) => (
                <tr key={i}>
                    {/* <td>{moment(product.dateOfPurchse).format("MM-DD-YYYY")}</td> */}
                    <td>{product.porder}</td>
                    <td>{product.brand.name} {product.name}</td>
                    <td>Rs.{product.price}</td>
                    <td>{product.quantity}</td>
                </tr>
            ))
        :null
    ) 

  return (
    <div className="history_block">
        <table>
            <thead>
                <tr>
                    {/* <th>Date of purchase</th> */}
                    <th>Purchase order</th>
                    <th>Product</th>
                    <th>Price paid</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                {renderBlocks()}
            </tbody>
        </table>
    </div>
  )
}

export default UserHistoryBlock
