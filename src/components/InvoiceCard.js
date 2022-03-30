import '../App.css';
import React, {Component} from 'react';

class InvoiceCard extends Component {

    constructor(props){
        super(props);
        this.state = {
            product : props.product
        }
    };

    render(){
        return(
            <div>
                <div className="card seller-card" >
                    <div className="card-body">
                        <h5 className="card-title">Invoice No-{this.props.invNo}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">buyerPan : {this.props.data.BuyerPan}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">Seller Pan : {this.props.data.SellerPan}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">Amount : {this.props.data.Amount}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">Payment Status : {this.props.data.PaymentStatus.toString()}</h6>
                        <button onClick={()=>this.props.pmtsts(this.props.invNo,this.props.data.BuyerPan)}>change Payment Sts</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default InvoiceCard