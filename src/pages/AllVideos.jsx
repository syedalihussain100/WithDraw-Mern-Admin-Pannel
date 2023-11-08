import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getvideos,
  deletevideoId,
} from "../redux/features/payment/PaymentSlice";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../utils/CustomModal";

const AllVideos = () => {
  const [open, setOpen] = useState(false);
  const [videoId, setvideoId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setvideoId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Video URL",
      dataIndex: "video",
    },

    {
      title: "CheckVideo",
      dataIndex: "CheckVideo",
    },

    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getvideos());
  }, [dispatch]);

  const data = useSelector((state) => state?.payment?.videos?.data);
  console.log(data);

  const data1 = [];
  for (let i = 0; i < data?.length; i++) {
    data1.push({
      key: data[i]?._id,
      video: (
        <p style={{ color: "red", cursor: "pointer" }}>
          {data[i]?.video[0]?.url}
        </p>
      ),
      CheckVideo: (
        <>
          <Link to={`/getvideo/${data[i]?._id}`}>
            <button>Get Video</button>
          </Link>
        </>
      ),
      action: (
        <AiFillDelete
          style={{ fontSize: "1.5rem", cursor: "pointer" }}
          onClick={() => showModal(data[i]._id)}
        />
      ),
    });
  }

  const deleteBrand = (e) => {
    dispatch(deletevideoId(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getvideos());
    }, 200);
  };

  return (
    <div>
      <div>
        <Table
          columns={columns}
          dataSource={data1}
          style={{ textAlign: "center" }}
        />
      </div>

      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBrand(videoId);
        }}
        title="Are you sure you want to delete this video?"
      />
    </div>
  );
};

export default AllVideos;
