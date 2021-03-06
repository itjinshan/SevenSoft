import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import Authserver from '../authserver';


class WatchList extends Component {
    constructor(){
        super()
        this.state ={
            item:[],
            onSale:[],
            notOnSale:[]
        }
        this.Auth = new Authserver()
        this.handleAddtoCart = this.handleAddtoCart.bind(this)
    }

    componentWillMount(){
        if (this.Auth.loggedIn()) {
            var username = this.Auth.getUserName()
           axios.get(`/api/getAllWatchList?username=${username}`)
                .then(res=>{
                    const items = Object.values(res.data);
                    const onSaleItem = [];
                    const notOnSaleItem = [];
                    this.setState({item:res.data})
                    items.forEach(item=>{
                        item.discount < 1 ? 
                        onSaleItem.push(item) :
                        notOnSaleItem.push(item)
                    })
                    this.setState({onSale:onSaleItem,notOnSale:notOnSaleItem})
                })
        }
    }

    handleAddtoCart(stuff){
        var quantityInCart = this.state.quantityInCart
        var item = {
            itemid: stuff.itemid,
            name: stuff.name,
            price: stuff.price,
            discount: stuff.discount,
            avgStars:stuff.avgstars,
            nrates:stuff.nrates
         }
         if(localStorage.getItem('cart') !== null) {
           var cartString = localStorage.getItem('cart')
           var cart = JSON.parse(cartString)
           if(cart[stuff.itemid]){
             item.quantityInCart = cart[stuff.itemid].quantityInCart +1
         }else{
            // quantityInCart += 1
             item.quantityInCart = 1;
         }    
           cart[stuff.itemid] = item
           localStorage.setItem('cart', JSON.stringify(cart))
           this.setState({quantityInCart: quantityInCart})
            } else {
           var cart = {}
           item.quantityInCart = ++quantityInCart
           cart[stuff.itemid] = item
           localStorage.setItem('cart', JSON.stringify(cart))
           this.setState({quantityInCart: quantityInCart})
       }
    }


    render() {
        return (
        <div className = "container-fluid" style={{minHeight:window.innerHeight-245, fontFamily:'Lucida Handwriting'}}>
        {this.state.item.length > 0 ?
        <div style={{marginTop:80,marginBottom:60}}>
        <div className="row">
       <h1 style={{fontFamily:'Lucida Handwriting',marginLeft:30}}>On Sales Item</h1>
        {this.state.onSale.length > 0 ?
        <div className="w-100" style={{marginTop:10,marginLeft:30}}>
         {this.state.onSale.map(items =>{
          return(
            <div key={items.itemNo} className='rounded float-left' style={{margin:'10px',border:'1px solid #C2C2C2'}}>
                <div className='card' style={{width:'20rem', height:'28rem'}} >
                    <Link to={`/aisle/${items.aisle}/${items.name}`}>
                    <img className='card-img-top' style={{width:'100%',height:'100%'}} src={`/images/aisle/${items.name}.png`} alt='Card cap'></img>
                    </Link>
                    <div className='card-body col-sm'>
                    <Link to={`/aisle/${items.aisle}/${items.name}`}>
                    <p className='card-title' style={{textAlign:'center',color:'#708090', marginTop:'20px'}}><b style={{fontFamily:'Lucida Handwriting', fontSize:30}}>{items.name}</b></p>
                    </Link>
                    </div>
                    
                    {items.discount !== 1 ?
                    <div style = {{position: 'relative', textAlign:'center', marginBottom:'23px', fontFamily:'Lucida Handwriting'}}>
                    <p className='card-text' style={{textAlign:'center',textDecorationLine:'line-through', fontSize: 20, color:'grey', display:'inline'}}>${items.price}</p>
                    <p className='card-text' style={{textAlign:'center',color:'red',fontStyle:'bold', display:'inline', fontSize: 30}}>${(items.price * items.discount).toFixed(2)}</p>
                    </div>
                    :
                    <div style={{marginBottom:'24px'}}>
                    <p className='card-text' style={{textAlign:'center', fontSize: 30, fontStyle:'bold'}}>${(items.price * items.discount).toFixed(2)}</p>
                    </div>
                    }
                    
                    <button onClick={()=>this.handleAddtoCart(items)} className='btn btn-info' style={{position:'relative', marginBottom:'0px'}} >Add to cart  <i className="fas fa-cart-plus"></i></button>
                </div>
            </div> 
             )})}
            </div>
        : 
        <div className="w-100" style={{marginTop:20,fontFamily:'Lucida Handwriting',marginLeft:30,marginBottom:30}}>
            Sorry, nothing in your list is on sale.
        </div> }
        </div>
        <div className="row">
        <h1 style={{fontFamily:'Lucida Handwriting',marginLeft:30, marginTop:'2%'}}>Rest Of Your WatchList</h1>
        {this.state.notOnSale.length === 0 && this.state.onSale.length > 0 ? 
        <div className="w-100" style={{marginTop:20}}>
           <h1 style={{fontFamily:'Lucida Handwriting',marginLeft:30}}>Congrats, everything in you list is on sales!!!!</h1>
        </div> 
        :
         <div className="w-100 " style={{marginTop:10,marginLeft:30}}>
             {this.state.notOnSale.map(items =>{
            return(
            <div key={items.itemNo} className='rounded float-left' style={{margin:'10px',border:'1px solid #C2C2C2'}}>
                <div className='card' style={{width:'20rem', height:'28rem'}} >
                    <Link to={`/aisle/${items.aisle}/${items.name}`}>
                    <img className='card-img-top' style={{width:'318px',height:'212.28px'}} src={`/images/aisle/${items.name}.png`} alt='Card cap'></img>
                    </Link>
                    <div className='card-body col-sm'>
                    <Link to={`/aisle/${items.aisle}/${items.name}`}>
                    <p className='card-title' style={{textAlign:'center',color:'#708090', marginTop:'20px'}}><b style={{fontSize:30}}>{items.name}</b></p>
                    </Link>
                    </div>
                    
                    {items.discount !== 1 ?
                    <div style = {{position: 'relative', textAlign:'center', marginBottom:'23px'}}>
                    <p className='card-text' style={{textAlign:'center',textDecorationLine:'line-through', fontSize: 20, color:'grey', display:'inline'}}>${(items.price).toFixed(2)}</p>
                    <p className='card-text' style={{textAlign:'center',color:'red',fontStyle:'bold', display:'inline', fontSize: 30}}>${(items.price * items.discount).toFixed(2)}</p>
                    </div>
                    :
                    <div style={{marginBottom:'24px'}}>
                    <p className='card-text' style={{textAlign:'center', fontSize: 30, fontStyle:'bold'}}>${(items.price * items.discount).toFixed(2)}</p>
                    </div>
                    }
                    
                    <button onClick={()=>this.handleAddtoCart(items)} className='btn btn-info' style={{position:'relative', marginBottom:'0px'}} >Add to cart  <i className="fas fa-cart-plus"></i></button>
                </div>
            </div> 
             )})}
         </div>
        }
        </div> 
        </div>: 
        <div>
        <div className="row" style={{marginLeft:'18%', marginTop:'10%'}}>
            <div className="col" style={{maxWidth:'200px'}}>
                <img className="float-right" style={{width:'240%'}} src="/images/home/404.png" alt="No search results"></img>
            </div>
            <div className="col">
                
                <h1 style={{fontSize:50, marginTop:'7%'}}>Oooops... Nothing here yet!</h1>
                <h1 style={{fontSize:30}}>
                Checkout our great products and come back later.
            </h1>
            </div>
            
            </div>
        </div>}
       </div>
        );
            
    }
}

export default WatchList;