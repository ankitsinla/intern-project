import '../App.css';
import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

class Form extends Component {
    constructor(props){
        super(props)
        this.state = {
            buyerPan:'',
            sellerPan:'',
            amt:0,
            pmtStatus:false
        }
    }

    handleSelect=(e)=>{
        console.log(e);
        if(e==='true'){
            this.setState({pmtStatus:true})
        }else{
            this.setState({pmtStatus:false})
        }
    }

    render(){
        return(
            <form className="form form-inline" 
                onSubmit={(e) => {
                    e.preventDefault()
                    this.props.createInvoice(this.state.buyerPan,this.state.sellerPan,this.state.amt,this.state.pmtStatus)
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
                                <input
                                    type="text"
                                    onChange={(event) => {
                                        const val = this.seller.value.toString()
                                        this.setState({
                                            sellerPan: val
                                        })
                                    }}
                                    ref={(input) => { this.seller = input }}
                                    className="form-control form-control-lg"
                                    placeholder="Enter seller Pan"/>
                                <input
                                    type="number"
                                    onChange={(event) => {
                                        const val = this.amt.value.toString()
                                        this.setState({
                                            amt: val
                                        })
                                    }}
                                    ref={(input) => { this.amt = input }}
                                    className="form-control form-control-lg"
                                    placeholder="Enter amount"/>
                                   <DropdownButton
                                        alignRight
                                        title="Dropdown right"
                                        id="dropdown-menu-align-right"
                                        onSelect={this.handleSelect}
                                            >
                                        <Dropdown.Item eventKey="true">Paid</Dropdown.Item>
                                        <Dropdown.Item eventKey="false">Un Paid</Dropdown.Item>
                                        
                                        <Dropdown.Divider />
                                    </DropdownButton>
                                    <button type="submit" className="btn btn-primary mb-2">Submit</button>
                            </div>
                        </div>
                    </div>
            </form>
        )
    }
}

export default Form