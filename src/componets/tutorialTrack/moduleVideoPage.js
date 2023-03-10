import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Nav from "../nav";
import './videoplayer.css';


const ModuleVideoPage = () => {

  const location = useLocation();

  const moduleNumber = location.state.moduleNumber;
  const portfolioSlug = location.state.portfolioSlug;
  const [datav, setDatav] = useState([]);
  const [toggle, setToggle] = useState("1");

  useEffect(() => {
    getVideo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getVideo = async () => {
    const response = await fetch(
      `https://ed-tech-service-backend.onrender.com/edcourse/getmodule/${portfolioSlug}/${moduleNumber}`,
      {
        method: "GET",
      }
    );
    const json = await response.json();
    setDatav(json);
  };

  const arr = datav.videos;
  const pdf = datav.pdf;

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }
  const onClickUrl = (url) => {
    return () => openInNewTab(url)
  }

  return (
    <>
      <Nav />
      <h2 className="text-capitalize">{datav.moduleName}</h2>
      {arr && arr.map((item) => {
        return (
          <>
            <div onContextMenu={(e) => e.preventDefault()} className="container" key={item._id}>
              <section className="main-video shadow-sm p-3 bg-white mb-5 rounded hover-shadow">
                <h4 className="text-capitalize text-center" onClick={() => setToggle(item._id)}>{item.videoTitle.slice(0,item.videoTitle.length-4)} </h4>

                {toggle === item._id ? (
                  <>
                  </>
                ) : null}
              </section>

              <section className="video-playlist">
                {toggle === item._id ? (
                  <>
                    <video onContextMenu={(e) => e.preventDefault()}
                      width="100%"
                      height="100%"
                      src={item.videoLink}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      controls
                      controlsList="nodownload"
                    ></video>
                  </>
                ) : null}
              </section>
            </div>

            {pdf &&
              pdf.map((item) => {
                return (
                  <div key={item._id}>
                    <h2 style={{ cursor: 'pointer' }} onClick={onClickUrl(item.pdfLink)}>{item.pdfName}</h2>
                  </div>
                );
              })}
          </>
        );
      })}
    </>
  );
}
export default ModuleVideoPage;