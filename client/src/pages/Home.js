import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout.js";
import "../resources/transactions.css";
import FormItem from "antd/es/form/FormItem/index.js";
import AddEditTransaction from "../components/AddEditTransaction.js";
import axios from "axios";
import { Table, message } from "antd";
import Spinner from "../components/Spinner.js";
import moment from "moment";

function Home() {
    const [showAddEditTransactionModal, setShowAddEditTransactionModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [transactionData, setTransactionData] = useState([]);
    const getTransactions = async function() 
    {
        try 
        {
            const user = JSON.parse(localStorage.getItem("spendwise-user"));
            const response = await axios.post("/api/transactions/get-all-transactions", {userId: user._id});
            setTransactionData(response.data);
        } 
        catch (error) 
        {
            message.error("Something went wrong");    
        } 
        finally
        {
            setLoading(false);
        }
    }

    useEffect(function() {
        getTransactions();
    }, []);

    const columns = [
        {
            title: "Date",
            dataIndex: "date"
        },
        {
            title: "Amount(INR)",
            dataIndex: "amount"
        },
        {
            title: "Category",
            dataIndex: "category"
        },
        {
            title: "Reference",
            dataIndex: "reference"
        },
    ];

    return (
        <DefaultLayout>
            {loading && <Spinner />}
            <div className="filter d-flex justify-content-between aligh-items-center">
                <div>

                </div>
                <div>
                    <button className="primary" onClick={() => setShowAddEditTransactionModal(true)}>ADD NEW</button>
                </div>
            </div>
            <div className="table-analytics">
                <div className="table">
                    <Table style={{fontFamily: "Montserrat, sans-serif"}} columns={columns} dataSource={transactionData} />
                </div>
            </div>
            {showAddEditTransactionModal && <AddEditTransaction showAddEditTransactionModal={showAddEditTransactionModal} setShowAddEditTransactionModal={setShowAddEditTransactionModal} getTransactions={getTransactions}/>}
        </DefaultLayout>
    );
}

export default Home;