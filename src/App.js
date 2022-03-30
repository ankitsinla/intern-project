import './App.css';
import React, {Component} from 'react';
import Web3 from 'web3';
import Invoice from './abis/Invoice.json';
import Form from './components/Form';
import BuyerInvoice from './components/BuyerInvoice';
import InvoiceCard from './components/InvoiceCard';


class App extends Component {
  async componentWillMount(){
    await this.loadWeb3()
    await this.loadBlockChainData()
  }

  async loadWeb3(){
    if(window.ethereum){
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3){
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else{
      window.alert('Non ethereum browser detected. You should consider trying metamask!g')
    }
  }

  async loadBlockChainData(){
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({account: accounts[0]})

    const networkId = await web3.eth.net.getId()
    const networkData = Invoice.networks[networkId]
    
    if(networkData){
      const invoice = new web3.eth.Contract(Invoice.abi, networkData.address)
      this.setState({invoice})
    }else{
      window.alert('NewContract contract not deployed on selected network!')
    }
  }

  createInvoice = async (buyerpan, sellerpan, amt, pmtstatus) =>{
    await this.state.invoice.methods.generateInvoice(buyerpan,sellerpan,amt,pmtstatus).send({from:this.state.account})
    .on('receipt',(res)=>{
      console.log(res.events.InvoiceGenerated.returnValues)
    })
  }

  getBuyerInvoice = async (buyerpan) => {
    console.log(buyerpan)
    await this.state.invoice.methods.getBuyerInvoices(buyerpan).call({from:this.state.account})
    .then((res) => {
      this.setState({buyerInvData:res[0],buyerInvList:res[1]})
      console.log(res[0])
      this.showInvoices()
    })
  }

  showInvoices = () =>{
    this.setState({showInvoices:true})
  }

  changePaymentStatus = async (invNo,buyerpan) => {
    await this.state.invoice.methods.updatePmtStatus(invNo).call({from:this.state.account})
    .then(res => {
      console.log(res)
      this.getBuyerInvoice(buyerpan)
    }) 
  }

  constructor(props){
    super(props)
    this.state = {
      account:'',
      invoice:[],
      buyerInvData:[],
      buyerInvList:[],
      showInvoices:false
    }
  }
  
  render(){
    let buyerInv = this.state.buyerInvData.map((inv,ind) => {
       return (<InvoiceCard data={inv} key={ind} invNo={this.state.buyerInvList[ind]} pmtsts={this.changePaymentStatus}/>)
    })
    return (
      <div className="App">
      <h2>intern</h2>
      
        <div class="container">
            <div class="row">
              <div class="col-sm">
                <div class="wrapper">
                <Form createInvoice={this.createInvoice}/>
                </div>
              </div>
              <div class="col-sm">
                <BuyerInvoice getInvoices = {this.getBuyerInvoice}/>
              </div>
              <div class="col-sm">
                {buyerInv}
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
