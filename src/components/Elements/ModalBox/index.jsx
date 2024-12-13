import { Player } from "@lottiefiles/react-lottie-player";

const ModalBox = (props) => {
  const {
    primaryAction,
    secondaryAction,
    primaryActionText,
    secondaryActionText,
    title,
    primaryStyle,
    secondaryStyle,
    description,
    animation,
    isSecondaryAction = true,
    isPrimaryAction = true,
    isAnimation = false,
  } = props;
  return (
    <dialog className="modal" open>
      <div className="modal-box border h-fit p-10 bg-white rounded-lg bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-65">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">
          {isAnimation && (
            <Player
              src={`/animations/${animation}`}
              className="player w-40"
              loop
              speed={1.5}
              autoplay
            />
          )}

          {description}
        </p>
        <div className="modal-action">
          {isPrimaryAction && (
            <button
              className={`${primaryStyle} border text-sm p-3 font-poppinsMedium rounded-md border-primary text-primary hover:bg-black hover:border-black hover:text-white`}
              onClick={primaryAction}
            >
              {primaryActionText}
            </button>
          )}

          {isSecondaryAction && (
            <button
              className={`${secondaryStyle}text-sm p-3 font-poppinsMedium rounded-md bg-primary text-white hover:bg-black`}
              onClick={secondaryAction}
            >
              {secondaryActionText}
            </button>
          )}
        </div>
      </div>
    </dialog>
  );
};

export default ModalBox;
