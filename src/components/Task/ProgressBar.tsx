interface Props {
  progress: number;
}

const ProgressBar = ({ progress }: Props) => {
  const getProgressColor = (progress: number) => {
    if (progress < 30) {
      return "red-primary";
    } else if (progress < 50) {
      return "orange-primary";
    } else if (progress < 70) {
      return "yellow-primary";
    } else {
      return "green-secondary";
    }
  };
  return (
    <div className="w-6 bg-gray-primary rounded-full flex justify-between items-center">
      <div
        className={`${getProgressColor(
          progress
        )} w-full min-h-full rounded-full bg-${getProgressColor(progress)}`}
      >
        =_=
      </div>
      <h3 className="ml-3">{progress}%</h3>
    </div>
  );
};

export default ProgressBar;
