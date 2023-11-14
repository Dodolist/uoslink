import React, { useEffect } from 'react';
import { InputBox, RowInputWrap, InputList, InputItem, SelectedText, ArrowIcon } from './style';
import InputWrap from '../../Input';
import Modal from '../../Modal';
import { ButtonWrap } from '../style';
import Button from '../../Buttons';
import InputArrowIcon from '../../../images/input-arrow-icon.svg';

const collegeList = [
  {
    list_id: 'econo01',
    college_name: '정경대학',
    major_list: [
      {
        cate_id: '000100002',
        major_name: '행정학과',
      },
      {
        cate_id: '000010055',
        major_name: '국제관계학과',
      },
      {
        cate_id: '000010057',
        major_name: '경제학부',
      },
      {
        cate_id: '000010072',
        major_name: '사회복지학과',
      },
      {
        cate_id: '000010074',
        major_name: '세무학과',
      },
    ]
  },
  {
    list_id: '20008N2',
    college_name: '경영대학',
    major_list: [
      {
        cate_id: '20008N2',
        major_name: '경영학부',
      },
    ]
  },
  {
    list_id: '20013DA1',
    college_name: '공과대학',
    major_list: [
      {
        cate_id: '000010058',
        major_name: '전자전기컴퓨터공학부',
      },
      {
        cate_id: '000010059',
        major_name: '화학공학과',
      },
      {
        cate_id: '000010060',
        major_name: '기계정보공학과',
      },
      {
        cate_id: '000010061',
        major_name: '신소재공학과',
      },
      {
        cate_id: '000010382',
        major_name: '토목공학과',
      },
      {
        cate_id: '000010383',
        major_name: '컴퓨터과학부',
      },
      {
        cate_id: '000010085',
        major_name: '인공지능학과',
      }
    ]
  },
  {
    list_id: 'human01',
    college_name: '인문대학',
    major_list: [
      {
        cate_id: '000010067',
        major_name: '영어영문학과',
      },
      {
        cate_id: '000010068',
        major_name: '국어국문학과',
      },
      {
        cate_id: '000010069',
        major_name: '국사학과',
      },
      {
        cate_id: '000010070',
        major_name: '철학과',
      },
      {
        cate_id: '000011580',
        major_name: '중국어문화학과',
      }
    ]
  },
  {
    list_id: 'scien01',
    college_name: '자연과학대학',
    major_list: [
      {
        cate_id: '000010064',
        major_name: '수학과',
      },
      {
        cate_id: '000010063',
        major_name: '통계학과',
      },
      {
        cate_id: '000010065',
        major_name: '물리학과',
      },
      {
        cate_id: '000010066',
        major_name: '생명과학과',
      },
      {
        cate_id: '000010062',
        major_name: '환경원예학과',
      },
      {
        cate_id: '000010086',
        major_name: '융합응용화학과',
      }
    ],
  },
  {
    list_id: 'urbansciences01',
    college_name: '도시과학대학',
    major_list: [
      {
        cate_id: '000010071',
        major_name: '도시행정학과',
      },
      {
        cate_id: '000010386',
        major_name: '도시공학과',
      },
      {
        cate_id: '000010073',
        major_name: '도시사회학과',
      },
      {
        cate_id: '000010385',
        major_name: '건축학부 & 건축공학',
      },
      {
        cate_id: '000010078',
        major_name: '환경공학부',
      },
      {
        cate_id: '000010075',
        major_name: '공간정보공학과',
      }
    ],
  },
  {
    list_id: 'artandsport01',
    college_name: '예술체육대학',
    major_list: [
      {
        cate_id: '000010079',
        major_name: '음악학과',
      },
      {
        cate_id: '000010080',
        major_name: '산업디자인학과',
      },
      {
        cate_id: '000010081',
        major_name: '환경조각학과',
      },
      {
        cate_id: '000010082',
        major_name: '스포츠과학과',
      }
    ],
  },
  {
    list_id: 'clacds01',
    college_name: '자유융합대학',
    major_list: [
      {
        cate_id: '000013020',
        major_name: '자유전공학부',
      },
      {
        cate_id: '000013030',
        major_name: '융합전공학부',
      }
    ],
  },
];

const MajorInputModal = ({ isModalOpen, title, subtitle, closeModal, handleConfirm }) => {
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [college, setCollege] = React.useState('');
  const [major, setMajor] = React.useState('');
  const [isOpenList, setOpenList] = React.useState('');

  useEffect(() => {
    if(college && major) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [college, major]);

  useEffect(() => {
    setMajor('');
  }, [college]);

  const openList = (id) => {
    if(id === 'major' && !college) {
      return;
    }
    if(id === isOpenList) {
      setOpenList('');
      return;
    }
    setOpenList(id);
  }

  const saveCollegeAndMajor = () => {
    if(!college || !major) return;
    const college_id = collegeList.find((item) => item.college_name === college).list_id;
    const major_id = collegeList.find((item) => item.college_name === college).major_list.find((item) => item.major_name === major).cate_id;
    const academicInfo = {
      college_id,
      major_id,
    };
    localStorage.setItem('academicInfo', JSON.stringify(academicInfo));
    handleCloseModal();
    handleConfirm();
  }

  const handleCloseModal = () => {
    closeModal();
    setCollege('');
    setMajor('');
  }

  const selectCollege = (collegeName) => {
    setCollege(collegeName);
    setOpenList('');
  }

  const selectMajor = (majorName) => {
    setMajor(majorName);
    setOpenList('');
  }


  return (
    <Modal
      isOpen={isModalOpen}
      title={"학과 선택"}
      subtitle={"소속되어 있는 학과를 선택해 주세요."}
    >
      <RowInputWrap>
        <InputWrap label={'대학'}>
          <InputBox onClick={() => openList('college')}>
            <SelectedText>{college}</SelectedText>
            <ArrowIcon src={InputArrowIcon} selected={isOpenList === 'college'} />
          </InputBox>
          <InputList
            isOpen={isOpenList === 'college'}
            ItemNumber={collegeList.length}
          >
            {collegeList.map((collegeItem) => (
              <InputItem
                key={collegeItem.list_id}
                onClick={() => selectCollege(collegeItem.college_name)}
                selected={collegeItem.college_name === college}
              >
                {collegeItem.college_name}
              </InputItem>
            ))}
          </InputList>
        </InputWrap>
        <InputWrap label={'학과'}>
          <InputBox onClick={() => openList('major')} disabled={college === ''}>
            <SelectedText>{major}</SelectedText>
            <ArrowIcon src={InputArrowIcon} selected={isOpenList === 'major'} />
          </InputBox>
          <InputList
            isOpen={isOpenList === 'major'}
            ItemNumber={college === '' ? 0 : collegeList.find((item) => item.college_name === college).major_list.length}
          >
            {collegeList.map((collegeItem) => (
                collegeItem.major_list.map((majorItem) => {
                if (collegeItem.college_name === college) {
                  return (
                    <InputItem
                      key={majorItem.cate_id}
                      onClick={() => selectMajor(majorItem.major_name)}
                      selected={majorItem.major_name === major}
                    >
                      {majorItem.major_name}
                    </InputItem>
                  );
                }
                return null; // If the college name doesn't match, return null or omit
              })
            ))}
          </InputList>
        </InputWrap>
      </RowInputWrap>
      <ButtonWrap>
        <Button onClick={handleCloseModal}>취소</Button>
        <Button
          color={"blue"}
          type={isDisabled ? "disabled" : "active"}
          onClick={saveCollegeAndMajor}
        >
          확인
        </Button>
      </ButtonWrap>
    </Modal>
  );
};
export default MajorInputModal;
