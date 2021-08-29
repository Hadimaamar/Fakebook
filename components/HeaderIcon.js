const HeaderIcon = ({ Icon, active }) => {
  return (
    <div
      className="cursor-pointer md:px-10  md:hover:bg-grey-100 rounded-xl
    active:border-b-2 active:border-blue-500 "
    >
      <Icon
        className={`h-5 text-gray-500 text-center sm:h-7 mx-auto group-hover:text-blue-500
        ${active && "text-blue-500"}`}
      />
    </div>
  );
};

export default HeaderIcon;
