import {
  ToastContainer,
  ToastIcon,
  ToastText,
  ToastWrapper,
  Progress,
} from "./style.js";

const Toast = ({ toastState, type, icon, toastOption, copyClick }) => {
  return (
    <ToastContainer
      $toastState={toastState}
      type={type}
      $toastOption={toastOption}
    >
      <ToastWrapper type={type}>
        <ToastIcon src={icon} />
        <ToastText>
          {type === "copy" && "링크가 복사되었습니다."}
          {type === "bookmarkup" && "북마크에 저장되었습니다."}
          {type === "bookmarkdown" && "북마크가 해제되었습니다."}
        </ToastText>
      </ToastWrapper>
      {type === "copy" && (
        <Progress key={copyClick} $runAnimation={toastState} />
      )}
    </ToastContainer>
  );
};
export default Toast;
