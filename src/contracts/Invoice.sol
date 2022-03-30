// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

pragma experimental ABIEncoderV2;

contract Invoice {
    uint public invoiceNo = 0; 

    struct Data{
        string BuyerPan;
        string SellerPan;
        int64 Amount;
        uint Time ;
        bool PaymentStatus;
    }

    mapping(uint => Data) public InvoiceData;
    mapping(string => uint[]) private BuyerInvoices;
    

    event InvoiceGenerated(
        string BuyerPan,
        string SellerPan,
        int64 Amount,
        bool PaymentStatus
    );

    function generateInvoice(string calldata _buyerPan, string calldata _sellerPan, int64 _amt, bool _pmtStatus) external{
        require(bytes(_buyerPan).length > 0,"Invalid buyer PAN");
        require(bytes(_sellerPan).length > 0,"Invalid seller PAN");
        require(_amt >= 0 ,"Invalid Amount");

        invoiceNo++;
        InvoiceData[invoiceNo] = Data(_buyerPan,_sellerPan,_amt,block.timestamp,_pmtStatus);
        BuyerInvoices[_buyerPan].push(invoiceNo);
        emit InvoiceGenerated(
            _buyerPan,
            _sellerPan,
            _amt,
            _pmtStatus
        );
    }

    function checkPmtStatus(uint _invoiceNo) external view returns(bool) {
        require(_invoiceNo > 0 && _invoiceNo <= invoiceNo ,"Invalid Invoice No.");
        return InvoiceData[_invoiceNo].PaymentStatus;
    }

    function updatePmtStatus(uint _invoiceNo) external{
        require(_invoiceNo > 0 && _invoiceNo <= invoiceNo ,"Invalid Invoice No.");
        Data memory invoiceData = InvoiceData[_invoiceNo];
        InvoiceData[_invoiceNo].PaymentStatus = !invoiceData.PaymentStatus;
    }

    function getBuyerInvoices(string calldata _buyerPan) external view returns(Data[] memory , uint[] memory){
        require(bytes(_buyerPan).length > 0,"Invalid buyer PAN");
        uint[] memory inv = BuyerInvoices[_buyerPan];
        Data[] memory invData = new Data[](inv.length);
        for(uint i=0;i<inv.length;i++){
            invData[i] = InvoiceData[inv[i]];
        }
        return (invData,inv);
    }


}