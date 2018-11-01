import React from 'react';
import CartItemList from './Cart_Item_list'

const CartItem =(props)=> {
    const items = props.items.map((item) => {
        return (
            <CartItemList item={item} key={item.itemid}/>
        )
      });
        if(props.items.length === 0) {
            return(
            <div>
              <div style={{textAlign: 'center', marginTop: '25%'}}>
                <h3>No Items</h3>
              </div>
            </div>
            )
          } else {
            return(
            <div>
              {items}
            </div>
            )
          }
        
}

export default CartItem;