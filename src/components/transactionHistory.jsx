import React, { Component } from "react";
import { Link } from "react-router-dom";
import buyService from "../apiServices/buyService";

class TransactionHistory extends Component {
  state = { transactions: [] };

  async componentDidMount() {
    const transactions = await buyService.getTransactionHistory();
    console.log(transactions);
    this.setState({ transactions });
  }
  
  render() {
    if(this.state.transactions.length === 0) {
      return (
        <div className="showTransactionHistory">
          <h3>No transactions made so far</h3>
        </div>
      );
    }

    return (
      <div id="showTransactionHistory">
        <h3>Transaction History</h3>
        {this.state.transactions.map(transaction => {
          return (
            <div id="transactionList" key={transaction._id}>
              <p>Transaction No. {transaction._id}</p>
              <p>Books:</p>
              <div id="booksInTransaction">
                {transaction.books.map((book) => {
                  return (
                    <p style={{ fontWeight: "bold" }}>{book.bookId.name}</p>
                  );
                })}
              </div>
              <p>Total Price: ${transaction.totalAmount}</p>
              <p>Transaction Date: {transaction.transactionDate}</p>
              <p>Delivery Type: {transaction.deliveryType}</p>
              <p>Payment Method: {transaction.paymentMethod}</p>
              <Link to={"/reportTransaction/" + transaction._id}>
                <button className="btn btn-danger">
                  Report this transaction
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}

export default TransactionHistory;
