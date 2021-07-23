import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { About } from "./utils/namespace";

export default props => {

  const dispatch = useDispatch();
  const aboutList = useSelector((state) => state[About].aboutList);

  useEffect(() => {
    console.log('正在运行客户端代码');
    if (typeof window !== "undefined" && dispatch && !aboutList?.length) {
      dispatch({ type: About + "/list" });
    }
  }, []);

  return <h1>Hello {props.name}!</h1>;
};