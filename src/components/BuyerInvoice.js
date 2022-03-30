import '../App.css';
import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

class BuyerInvoice extends Component {
    constructor(props){
        super(props)
        this.state = {
            buyerPan:''
        }
    }


    render(){
        return(
            <form className="form form-inline" 
                onSubmit={(e) => {
                    e.preventDefault()
                    this.props.getInvoices(this.state.buyerPan)
                }}>
                    <div className="card text-center home-card">
                        <div className="card-body">
                            <h5 className="card-title">New Invoice details</h5>
                            <div className="form-group mx-sm-3 mb-2">
                                <input
                                    type="text"
                                    onChange={(event) => {
                                        const val = this.buyer.value.toString()
                                        this.setState({
                                            buyerPan: val
                                        })
                                    }}
                                    ref={(input) => { this.buyer = input }}
                                    className="form-control form-control-lg"
                                    placeholder="Enter buyer Pan"/>
                                
                                <button type="submit" className="btn btn-primary mb-2">Submit</button>
                            </div>
                        </div>
                    </div>
            </form>
        )
    }
}

export default BuyerInvoice;