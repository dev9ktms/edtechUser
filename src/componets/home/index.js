import React, { useState, useEffect} from "react";
// import Record_home from "./record_home.json";
import "./home.css";
import Nav from "../nav";






function Index() {

  const [datav, setDatav] = useState([]);

  const getVideo = async () => {
    const response = await fetch(
      `https://ed-tech-service-backend.onrender.com/homevideo/gethomevideo`,
      {
        method: "GET",
      }
    );
    const json = await response.json();
    setDatav(json);
  };

  useEffect(() => {
    getVideo();
  }, []);

  console.log("==> ", datav)

  const Record_home = datav;
  return (
    <>
    <Nav/>
      <div className="home">
        {Record_home &&
          Record_home.map((record) => {
            return (
              <span className="home-body" key={record.id}>
                <video
                  width="100%"
                  height="100%"
                  src={record.videoLink}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  controls
                  controlsList="nodownload"
                ></video>
              </span>
            );
          })}
      </div>
    </>
  );
}

export default Index;
