import React, { useEffect, useState } from "react";
import { Table } from "antd";
// import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  AllUsers,
  UserActive,
  UpdateUserActive,
} from "../redux/features/user/UserSlice";

const AllUser = () => {
  // const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  // const [active, setActive] = useState("");

  const handleChange = (e, userId) => {
    const newActive = e.target.value;

    console.log(newActive);
    // Now, you can dispatch the UserActive action with the payload
    dispatch(UserActive({ id: userId, data: { active: newActive } }));
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleChangeUpdate = (e, userId) => {
    console.log(userId)
    const newActive = e.target.value;

    console.log(newActive);
    // Now, you can dispatch the UserActive action with the payload
    dispatch(UpdateUserActive({ id: userId, data: { superrole: newActive } }));
    // setTimeout(() => {
    //   window.location.reload();
    // }, 1000);
  };

  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Active",
      dataIndex: "active",
      render: (text, record) => (
        <select
          style={{ width: "100%" }}
          onChange={(e) => handleChange(e, record.key)} // Pass the user ID as an argument
          value={record.active} // Set the initial selected value from the record
        >
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
      ),
    },
    {
      title: "Super Role",
      dataIndex: "superrole",
      render: (text, record) => (
        <>
        {console.log(record)}
          <select
          style={{ width: "100%" }}
          onChange={(e) => handleChangeUpdate(e, record.key)} // Pass the user ID as an argument
          value={record?.superrole} // Set the initial selected value from the record
        >
          <option value="superadmin">superadmin</option>
          <option value="superuser">superuser</option>
        </select>
        </>
      
      ),
    },
  ];

  useEffect(() => {
    dispatch(AllUsers());
  }, []);

  const alldata = useSelector((state) => state?.auth?.allUser?.data);
  // console.log(alldata);

  const data1 = [];
  for (let i = 0; i < alldata?.length; i++) {
    data1.push({
      key: alldata[i]?._id,
      name: alldata[i]?.username,
      email: alldata[i]?.email,
      phone: alldata[i]?.phone,
      role: alldata[i]?.role,
      active: alldata[i]?.active.toString(),
      superrole: alldata[i]?.superrole
    });
  }

  // console.log("data1", data1);

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data1}
        style={{ textAlign: "center" }}
      />
    </div>
  );
};

export default AllUser;
