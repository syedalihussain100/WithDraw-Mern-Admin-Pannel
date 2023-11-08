import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
// import HomeStyle from "./Home.module.css";
import { getPayment } from "../redux/features/payment/PaymentSlice";
import { Link } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Trxid",
    dataIndex: "trxid",
  },
  {
    title: "Sender",
    dataIndex: "sender",
  },
  {
    title: "Image",
    dataIndex: "image",
    render: (image) => (
      <img
        src={image}
        alt="Payment"
        style={{ maxWidth: "60px", borderRadius: "50%" }}
      />
    ),
  },
  {
    title: "Phone",
    dataIndex: "phone",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "User Name",
    dataIndex: "username",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const PaymentData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPayment());
  }, []);

  const alldata = useSelector((state) => state?.payment?.payment);
  const { isLoading } = useSelector((state) => state?.payment);
  console.log(alldata);

  const data1 = [];
  for (let i = 0; i < alldata?.length; i++) {
    data1.push({
      key: alldata[i]?._id,
      trxid: alldata[i]?.trxid,
      sender: alldata[i]?.sender,
      image: alldata[i]?.images[0]?.url,
      phone: alldata[i]?.user?.phone,
      email: alldata[i]?.user?.email,
      username: alldata[i]?.user?.username,
      action: (
        <>
          <Link
            className=" fs-3 text-danger"
            to={`/admin/payment/${alldata[i]?._id}`}
          >
            <button>Get Data</button>
          </Link>
        </>
      ),
    });
  }

  return (
    <div>
      {isLoading ? (
        <Spinner display="flex" justifyContent="center" alignItems="center" margin="auto"/>
      ) : (
        <Table
          columns={columns}
          dataSource={data1}
          style={{ textAlign: "center" }}
        />
      )}
    </div>
  );
};

export default PaymentData;
