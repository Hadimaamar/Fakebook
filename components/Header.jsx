import React from "react";
import Image from "next/image";
import {
  BellIcon,
  ChatIcon,
  ChevronDoubleDownIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import {
  FlagIcon,
  PlayIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import HeaderIcon from "./HeaderIcon";
import { session, signOut, useSession } from "next-auth/client";

const Header = () => {
  const [session] = useSession();

  return (
    <div className="  sticky top-0 z-50 items-center p-2 flex lg:px-5 shadow-md  ">
      {/* Left */}
      <div className="flex items-center ">
        <Image
          src="https://links.papareact.com/5me"
          width={40}
          height={40}
          layout="fixed"
        />
      </div>
      <div className="flex items-center rounded-full bg-gray-100 p-2">
        <SearchIcon className="h-6 text-gray-600 " />
        <input
          type="text"
          className="hidden md:inline-flex ml-2 bg-transparent outline-none placeholder-gray100"
          placeholder="Search Fakebook"
        />
      </div>

      {/* Center */}
      <div className="flex justify-center flex-grow  ">
        <div className="flex space-x-6 ">
          <HeaderIcon Icon={HomeIcon} active={true} />
          <HeaderIcon Icon={FlagIcon} />
          <HeaderIcon Icon={PlayIcon} />
          <HeaderIcon Icon={ShoppingCartIcon} />
          <HeaderIcon Icon={UserGroupIcon} />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center justify-end ">
        {/* Profile pic  */}
        <Image
          onClick={signOut}
          className="rounded-full cursor-pointer"
          src={session.user.image}
          width={40}
          height={40}
          layout="fixed"
        />
        <p className=" whitespace-nowrap font-semibold pr-3 ">
          {session.user.name}
        </p>
        <ViewGridIcon className="icon" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <ChevronDoubleDownIcon className="icon" />
      </div>
    </div>
  );
};

export default Header;
