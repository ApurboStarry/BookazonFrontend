import React, { Component } from "react";
import buyService from "../apiServices/buyService";

class TransactionHistory extends Component {
  state = { transactions: [] };

  async componentDidMount() {
    const transactions = await buyService.getTransactionHistory();
    console.log(transactions);
    this.setState({ transactions });
  }
  
  render() {
    return (
      <div id="showTransactionHistory">
        <h3>Transaction History</h3>
        {this.state.transactions.map(transaction => {
          return (
            <div id="transactionList" key={transaction._id}>
              <p>Order No. {transaction._id}</p>
              <p>Books:</p>
              <div id="booksInTransaction">
                {transaction.books.map(book => {
                  return (
                    <p>{book.bookId.name}</p>
                  )
                })}
              </div>
              <p>Total Price: ${transaction.totalAmount}</p>
              <p>Transaction Date: {transaction.transactionDate}</p>
              <p>Delivery Type: {transaction.deliveryType}</p>
              <p>Payment Method: {transaction.paymentMethod}</p>
            </div>
          )
        })}
      </div>
    );
  }
}

export default TransactionHistory;
