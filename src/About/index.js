import React, { useEffect, useState, useLayoutEffect } from "react";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { About as namespace } from "../utils/namespace";
import { fetchData } from "../slice/about";
import { loadData } from "../utils/helpers";
import styles from "./index.css";

function About(props) {
  const dispatch = useDispatch();
  const aboutList = useSelector((state) => state[namespace].aboutList);

  useEffect(() => {
    console.log('aboutList__', aboutList);
    if (typeof window !== "undefined" && dispatch && !aboutList?.length) {
      dispatch({ type: namespace + "/list" });
    }
  }, []);

  console.log("aboutList", aboutList);
  return (
    <ul>
      <h2>This is About Page2</h2>
      <Button type="primary">Antd Button</Button>
      {aboutList?.map((it) => (
        <li key={it.id} className={styles["red"]}>
          {it.title} <span>completed: {it.completed ? "true" : "false"}</span>
        </li>
      ))}
    </ul>
  );
}

About.getInitialProps = async (store) => {
  let result;
  if (store) {
    result = await loadData("todos");
    store.dispatch(fetchData(result));
  }
  return Promise.resolve(result);
};

// class About extends React.Component {
//   constructor(props) {
//     super(props);
//     if (props.staticContext && props.staticContext.data) {
//       this.state = {
//         data: props.staticContext.data
//       };
//     } else {
//       this.state = {
//         data: []
//       };
//     }
//   }
//   componentDidMount() {
//     setTimeout(() => {
//       console.log('window.__ROUTE_DATA__', window.__ROUTE_DATA__);
//       if (typeof window !== "undefined" && window.__ROUTE_DATA__) {
//         this.setState({data: window.__ROUTE_DATA__});
//         delete window.__ROUTE_DATA__;
//       } else {
//         loadData("todos").then((data) => {
//           this.setState({data});
//         });
//       }
//       console.log('first update render time: ', Date.now());
//     });
//   }
//   render() {
//     const {data} = this.state;
//     return (
//       <div>
//       <h2>This is About Page2</h2>
//       {data?.map((it) => (
//         <li key={it.id}>
//           {it.title} completed: {it.completed ? "true" : "false"}
//         </li>
//       ))}
//     </div>
//     );
//   }
// }

export default About;
