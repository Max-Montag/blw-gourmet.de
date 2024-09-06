import React from "react";
import { TbFridge } from "react-icons/tb";
import { FaRegSnowflake } from "react-icons/fa";
import { FaRegCalendarCheck, FaCookieBite } from "react-icons/fa6";
import { IoHandLeftOutline } from "react-icons/io5";
import { LuVegan } from "react-icons/lu";
import { TbMeat, TbMeatOff } from "react-icons/tb";
import { LuClock7, LuClock9, LuClock12 } from "react-icons/lu";

interface IconTextProps {
  text: string;
}

const icons: { [key: string]: JSX.Element } = {
  kühlschrank: <TbFridge />,
  gefrier: <FaRegSnowflake />,
  tiefkühl: <FaRegSnowflake />,
  fingerfood: <IoHandLeftOutline />,
  vegan: <LuVegan />,
  vegetarisch: <TbMeatOff />,
  fleisch: <TbMeat />,
  beikostreife: <FaRegCalendarCheck />,
  jahr: <FaRegCalendarCheck />,
  monat: <FaRegCalendarCheck />,
  snack: <FaCookieBite />,
  frühstück: <LuClock9 />,
  mittagessen: <LuClock12 />,
  abendessen: <LuClock7 />,
};

const IconText: React.FC<IconTextProps> = ({ text }) => {
  const matchedIcon = Object.keys(icons).find((key) =>
    text.toLowerCase().includes(key),
  );

  return (
    <div className="flex flex-row items-center justify-center">
      <span>{text}</span>
      {matchedIcon && <span className="ml-1">{icons[matchedIcon]}</span>}
    </div>
  );
};

export default IconText;
