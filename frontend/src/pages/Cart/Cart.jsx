import React, { useContext } from 'react'
import "./Cart.css"
import {StoreContext} from '../../context/storeContext'
import {useNavigate} from "react-router-dom"
// Note: We need to ensure 'token' is pulled from the store for the security check
const Cart=()=>{

    const {cartItems,food_list,removeFromCart,getTotalCartAmount,url,token} = useContext(StoreContext) 
    
    const navigate= useNavigate();

    // ----------------------------------------------------
    // FIX: Function to handle checkout button click
    // ----------------------------------------------------
    const handleCheckout = () => {
        // 1. Check if the user is logged in (if a token exists)
        if (!token) {
            // If NOT logged in, redirect them to the login/signup route
            navigate('/login'); 
        } else {
            // 2. If logged in and the cart has items, proceed to the order page
            navigate('/order');
        }
    };
    
    // Good UX: If cart is empty, show a message instead of a big empty table.
    if (getTotalCartAmount() === 0) {
        return (
            <div className="cart-empty-message" style={{textAlign: 'center', margin: '100px 0'}}>
                <h2 style={{color: '#505050'}}>Your cart is currently empty.</h2>
                <button 
                    onClick={() => navigate('/')}
                    style={{backgroundColor: '#5d3891', padding: '10px 20px', marginTop: '20px'}}>
                    Return to Menu
                </button>
            </div>
        );
    }
    
    return (
        <div className='cart'> 
            <div className='cart-tems'>
                <div className='cart-items-title'>
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br/>
                <hr/>
                {food_list.map((item,index)=>{
                    if(cartItems[item._id]>0)
                    {
                        return(
                            <div key={item._id} >
                                <div className='cart-items-title cart-items-item'>
                                    <img src={url+"/images/"+item.image} alt="Food Item"/>
                                    <p>{item.name}</p>
                                    <p>Rs {item.price}</p>
                                    <p>{cartItems[item._id]}</p>
                                    <p>Rs {item.price*cartItems[item._id]}</p>
                                    <p onClick={()=>removeFromCart(item._id)} className='cross'>X</p>
                                </div>
                                <hr/>
                            </div>
                        )
                    }
                    return null;
                })}
            </div>
            <div className='cart-bottom'>
                <div className='cart-total'>
                    <h2>Cart Totals</h2>
                    <div>
                        <div className='cart-total-details'>
                            <p>Subtotal</p>
                            <p> Rs {getTotalCartAmount()}</p>
                        </div>
                        <hr/>
                        <div className='cart-total-details'>
                            <p>Delivery Fees</p>
                            <p> Rs {getTotalCartAmount()===0?0:2}</p>
                        </div>
                        <hr/>
                        <div className='cart-total-details'>
                            <b>Total</b>
                            <b> Rs { getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
                        </div>
                    </div>
                    {/* FIX: The button calls the secure handleCheckout function */}
                    <button onClick={handleCheckout}>PROCEED TO CHECKOUT </button>
                </div>
                <div className='cart-promocode'>
                    <div>
                        <p> If you have a promocode , Enter it here</p>
                        <div className='cart-promocode-input'>
                            <input type='text' placeholder='promocode'/>
                            <button> Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
