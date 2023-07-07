interface Props {
  text: string;
}

const User: React.FC<Props> = ({ text }) => (
  <div className="flex items-center gap-3">
    <div className="w-11 h-11 flex justify-center items-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42"
        viewBox="0 0 42 42" fill="none">
        <circle cx="21" cy="21" r="21" fill="#D9D9D9"/>
      </svg>
    </div>
    <div className="font-bold text-lg leading-6">{text}</div>
  </div>
);

export default User;
