/* global chrome */
import axios from "axios";
import React, { useState, useEffect } from "react";
import { ServiceNoticeWrap, TailIconWrap, ServiceNoticeText } from "./style";
import tailIcon from "../../images/tail-icon.svg";
import serviceNoticeIcon from "../../images/service-notice-icon.svg";

const ServiceNotice = () => {
  const [isShow, setIsShow] = useState(false);
  const [serviceNotice, setServiceNotice] = useState("");

  useEffect(() => {
    let url;
    try {
      url =
        "https://www.iflab.run/api/check/version/" +
        chrome.runtime.getManifest().version;
    } catch (error) {
      url = "https://www.iflab.run/api/check/version/0.9.9.3";
    }
    setTimeout(() => {
      axios
        .get(url)
        .then((response) => {
          if (response.status === 200) {
            setIsShow(false);
          } else {
            setIsShow(true);
            setTimeout(() => {
              setIsShow(false);
            }, 10000);
          }
        })
        .catch((error) => {
          if (error.response.status === 300) {
            setServiceNotice(error.response.data);
            setIsShow(true);
            setTimeout(() => {
              setIsShow(false);
            }, 10000);
          } else if (error.response.status) {
            setIsShow(true);
            setTimeout(() => {
              setIsShow(false);
            }, 10000);
          }
        });
    }, 3000);
  }, []);

  function clickServiceNotice() {
    setTimeout(() => {
      setIsShow(false);
    }, 200);
  }

  return (
    <ServiceNoticeWrap isShow={isShow} onClick={clickServiceNotice}>
      <TailIconWrap src={tailIcon} />
      <ServiceNoticeText type="blue" isShow={isShow}>
        <img src={serviceNoticeIcon} />
        공지
      </ServiceNoticeText>
      <ServiceNoticeText isShow={isShow}>
        {serviceNotice ? (
          serviceNotice
        ) : (
          <div>
            <b>새로운 버전</b>이 업데이트 되었어요! 크롬을 재시작 하면 업데이트
            됩니다.
          </div>
        )}
      </ServiceNoticeText>
    </ServiceNoticeWrap>
  );
};

export default ServiceNotice;
