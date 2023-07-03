import React from 'react';
import "../resources/analytics.css";
import { Progress, Space } from 'antd';

function Analytics({transactions}) 
{
    const totalTransactions = transactions.length;
    const totalIncomeTransactions = transactions.filter(function(transaction) {
        return transaction.type === "income";
    });
    const totalExpenseTransactions = transactions.filter(function(transaction) {
        return transaction.type === "expense";
    });
    const totalIncomeTransactionsPercentage = (totalIncomeTransactions.length / totalTransactions) * 100;
    const totalExpenseTransactionsPercentage = (totalExpenseTransactions.length / totalTransactions) * 100;
    const totalTurnover = transactions.reduce(function(acc, transaction) {
        return acc + transaction.amount;
    }, 0);
    const totalIncomeTurnover = totalIncomeTransactions.reduce(function(acc, transaction) {
        return acc + transaction.amount;
    }, 0);
    const totalExpenseTurnover = totalExpenseTransactions.reduce(function(acc, transaction) {
        return acc + transaction.amount;
    }, 0);
    const totalIncomeTurnoverPercentage = (totalIncomeTurnover / totalTurnover) * 100;
    const totalExpenseTurnoverPercentage = (totalExpenseTurnover / totalTurnover) * 100;

    const categories = ["salary", "freelance", "friend-family", "entertainment", "travel", "sports", "health", "food", "education", "tax", "shopping", "investment"];

    return (
        <div className="analytics">
            <div className="row mb-4">
                <div className="col-md-4 mt-3">
                    <div className="transactions-count">
                        <h4>Total Transactions : {totalTransactions}</h4>
                        <hr></hr>
                        <h5>Income : {totalIncomeTransactions.length}</h5>
                        <h5>Expense : {totalExpenseTransactions.length}</h5>
                        <div className="progress-bar">
                            <Space wrap>
                                <Progress className="mx-5" strokeColor="#5DD64F" type='circle' percent={totalIncomeTransactionsPercentage.toFixed(0)} />
                                <Progress className="" strokeColor="#FB0A0A" type='circle' percent={totalExpenseTransactionsPercentage.toFixed(0)} />
                            </Space>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mt-3">
                    <div className="transactions-count">
                        <h4>Total Turnover : {totalTurnover}</h4>
                        <hr></hr>
                        <h5>Income : {totalIncomeTurnover}</h5>
                        <h5>Expense : {totalExpenseTurnover}</h5>
                        <div className="progress-bar">
                            <Space wrap>
                                <Progress className="mx-5" strokeColor="#5DD64F" type='circle' percent={totalIncomeTurnoverPercentage.toFixed(0)} />
                                <Progress className="" strokeColor="#FB0A0A" type='circle' percent={totalExpenseTurnoverPercentage.toFixed(0)} />
                            </Space>
                        </div>
                    </div>
                </div>
            </div>
            <hr></hr>
            <div className="row mt-4">
                <div className="col-md-6">
                    <div className="category-analysis">
                        <h4>Total Income - Categorywise</h4>
                        {categories.map(function(category) {
                            const amount = totalIncomeTransactions.filter(function(transaction) {
                                return transaction.category === category;
                            }).reduce(function(acc, transaction) {
                                return acc + transaction.amount;
                            }, 0);
                            return (
                                amount > 0 && <div className="category-card"> 
                                    <h5>{category}</h5>
                                    <Progress strokeColor="#5DD64F" percent={((amount / totalIncomeTurnover) * 100).toFixed(1)}></Progress>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="category-analysis">
                        <h4>Total Expense - Categorywise</h4>
                        {categories.map(function(category) {
                            const amount = totalExpenseTransactions.filter(function(transaction) {
                                return transaction.category === category;
                            }).reduce(function(acc, transaction) {
                                return acc + transaction.amount;
                            }, 0);
                            return (
                                amount > 0 && <div className="category-card"> 
                                    <h5>{category}</h5>
                                    <Progress strokeColor="#FB0A0A" percent={((amount / totalExpenseTurnover) * 100).toFixed(1)}></Progress>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Analytics;