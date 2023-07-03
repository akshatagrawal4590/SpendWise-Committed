import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout.js";
import "../resources/transactions.css";
import AddEditTransaction from "../components/AddEditTransaction.js";
import axios from "axios";
import { Select, Table, message } from "antd";
import Spinner from "../components/Spinner.js";
import moment from "moment";
import { DatePicker, Space } from 'antd';
import {UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined} from "@ant-design/icons";
import Analytics from "../components/Analytics.js";

function Home() {
    const { RangePicker } = DatePicker;
    const [showAddEditTransactionModal, setShowAddEditTransactionModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [transactionData, setTransactionData] = useState([]);
    const [frequency, setFrequency] = useState("7");
    const [selectedRange, setSelectedRange] = useState([]);
    const [type, setType] = useState("all");
    const [viewType, setViewType] = useState("table");
    const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
    const getTransactions = async function() 
    {
        try 
        {
            const user = JSON.parse(localStorage.getItem("spendwise-user"));
            const response = await axios.post("/api/transactions/get-all-transactions", {userId: user._id, frequency, ...(frequency === "custom" && {selectedRange}), type});
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

    const deleteTransaction = async function(record)
    {
        try 
        {
            await axios.post("/api/transactions/delete-transaction", {transactionId: record._id});
            message.success("Transaction deleted successfully");
            getTransactions();
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
    }, [frequency, selectedRange, type]);

    const columns = [
        {
            title: "Date",
            dataIndex: "date",
            render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>
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
        {
            title: "Type",
            dataIndex: "type"
        },
        {
            title: "Action",
            dataIndex: "action",
            render: function(text, record) {
                return (
                    <div>
                        <EditOutlined onClick={function() {
                            setSelectedItemForEdit(record);
                            setShowAddEditTransactionModal(true);
                        }}/>
                        <DeleteOutlined className="mx-3" onClick={function() {
                            deleteTransaction(record);
                        }}/>
                    </div>
                );
            }
        }
    ];

    return (
        <DefaultLayout>
            {loading && <Spinner />}
            <div className="filter d-flex justify-content-between align-items-center">
                <div className="d-flex">
                    <div className="d-flex flex-column">
                        <h6>Select Frequency</h6>
                        <Select value={frequency} onChange={(value) => setFrequency(value)}>
                            <Select.Option value="7">Last 1 Week</Select.Option>
                            <Select.Option value="30">Last 1 Month</Select.Option>
                            <Select.Option value="365">Last 1 Year</Select.Option>
                            <Select.Option value="custom">Custom Range</Select.Option>
                        </Select>
                        {frequency === "custom" && (
                            <div className="mt-2">
                                <RangePicker style={{fontFamily: "Montserrat, sans-serif"}} value={selectedRange} onChange={(values) => setSelectedRange(values)} />
                            </div>
                        )}
                    </div>
                    <div className="d-flex flex-column mx-5">
                        <h6>Select Type</h6>
                        <Select value={type} onChange={(value) => setType(value)}>
                            <Select.Option value="all">All</Select.Option>
                            <Select.Option value="income">Income</Select.Option>
                            <Select.Option value="expense">Expense</Select.Option>
                        </Select>
                    </div>
                </div>
                <div className="d-flex">
                    <div>
                        <div className="view-switch mx-5">
                            <UnorderedListOutlined className={`mx-3 ${viewType === "table" ? "active-icon" : "inactive-icon"}`} onClick={() => setViewType("table")} />
                            <AreaChartOutlined className={`${viewType === "analytics" ? "active-icon" : "inactive-icon"}`} onClick={() => setViewType("analytics")} />
                        </div>
                    </div>
                    <button className="primary" onClick={() => setShowAddEditTransactionModal(true)}>ADD NEW</button>
                </div>
            </div>
            <div className="table-analytics">
                {viewType === "table" ? <div className="table">
                    <Table style={{fontFamily: "Montserrat, sans-serif"}} columns={columns} dataSource={transactionData} />
                </div> : <Analytics transactions={transactionData} />}
                
            </div>
            {showAddEditTransactionModal && <AddEditTransaction showAddEditTransactionModal={showAddEditTransactionModal} setShowAddEditTransactionModal={setShowAddEditTransactionModal} getTransactions={getTransactions} selectedItemForEdit={selectedItemForEdit} setSelectedItemForEdit={setSelectedItemForEdit} />}
        </DefaultLayout>
    );
}

export default Home;