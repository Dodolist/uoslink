import React, { useState, useEffect } from 'react';
import { SideBarContainer, ShortCutList, ShortCutWrap, ShortCutIconWrap, ShortCutIcon, ShortCutLabel, AddButtonWrap, AddButton } from './style';
import addIcon from '../../images/add-icon.svg';
import modifyIcon from '../../images/modify-icon.svg';
import InputModal from '../InputModal';
import BlackScreen from '../BlackScreen';

const SideBar = ({ isSideBarOpen }) => {
  const [sites, setSites] = useState([]);
  const [hoveredShortCut, setHoveredShortCut] = useState(null);
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const [modifiedSite, setModifiedSite] = useState(null);

  useEffect(() => {
    const siteArray = JSON.parse(localStorage.getItem('sites'));
    if (siteArray === null) {
      localStorage.setItem('sites', JSON.stringify([]));
      return;
    }
    setSites(siteArray);
  }, []);

  const addSite = (site) => {
    const sites = JSON.parse(localStorage.getItem('sites'));
    if (sites === null) {
      localStorage.setItem('sites', JSON.stringify([site]));
    } else {
      sites.push(site);
      localStorage.setItem('sites', JSON.stringify(sites));
    }
    setSites(JSON.parse(localStorage.getItem('sites')));
    closeInputModal();
  };

  const modifySite = (site) => {
    const sites = JSON.parse(localStorage.getItem('sites'));
    const index = sites.findIndex((site) => site.name === modifiedSite.name);
    sites[index] = site;
    localStorage.setItem('sites', JSON.stringify(sites));
    setSites(JSON.parse(localStorage.getItem('sites')));
    closeInputModal();
  };

  const deleteSite = (site) => {
    const sites = JSON.parse(localStorage.getItem('sites'));
    const index = sites.findIndex((site) => site.name === modifiedSite.name);
    sites.splice(index, 1);
    localStorage.setItem('sites', JSON.stringify(sites));
    setSites(JSON.parse(localStorage.getItem('sites')));
    closeInputModal();
  };

  const openInputModal = () => {
    setIsInputModalOpen(true);
    setIsModified(false);
  };

  const closeInputModal = () => {
    setIsInputModalOpen(false);
    if (isModified) {
      setIsModified(false);
      setHoveredShortCut(null);
    }
  };

  const clickShortCutLabel = (e) => {
    openInputModal();
    setIsModified(true);
    setModifiedSite(sites.find((site) => site.name === e.target.innerText));
  };

  const onMouseLeaveShortCut = (e) => {
    if (!isModified) {
      setHoveredShortCut(null);
    }
  };

  return (
    <div>
      <BlackScreen isOpen={isInputModalOpen}/>
      <InputModal
        isModified={isModified}
        isInputModalOpen={isInputModalOpen}
        closeInputModal={closeInputModal}
        addSite={addSite}
        modifySite={modifySite}
        deleteSite={deleteSite}
        loadName={isModified ? hoveredShortCut : ''}
        loadUrl={isModified ? sites.find((site) => site.name === hoveredShortCut).link : ''}
      />
      <SideBarContainer isOpen={isSideBarOpen}>
        <ShortCutList>
          {sites.map((site) => (
            <ShortCutWrap
              onMouseEnter={() => setHoveredShortCut(site.name)}
              onMouseLeave={() => onMouseLeaveShortCut()}
            >
              <ShortCutIconWrap
                key={site.link}
                href={site.link}
              >
                <ShortCutIcon src={`${site.link}/favicon.ico`} />
              </ShortCutIconWrap>
              <ShortCutLabel onClick={clickShortCutLabel} isHovered={site.name === hoveredShortCut}>
                {site.name}
                <img src={modifyIcon} />
              </ShortCutLabel>
            </ShortCutWrap>
          ))}
        </ShortCutList>
        <AddButtonWrap onClick={openInputModal}>
          <AddButton src={addIcon} />
        </AddButtonWrap>
      </SideBarContainer>
    </div>
  );
};

export default SideBar;
