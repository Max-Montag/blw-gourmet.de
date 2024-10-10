import React from "react";
import {
  TbFridge,
  TbMeat,
  TbMeatOff,
  TbChefHat,
  TbCookie,
} from "react-icons/tb";
import { PiOven, PiBread } from "react-icons/pi";
import {
  FaRegSnowflake,
  FaRegCalendarCheck,
  FaCookieBite,
  FaBabyCarriage,
  FaSeedling,
  FaEgg,
} from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { IoHandLeftOutline, IoFastFoodOutline } from "react-icons/io5";
import { GiCookingPot, GiForkKnifeSpoon } from "react-icons/gi";
import { LuVegan, LuClock7, LuClock9, LuClock12, LuBaby } from "react-icons/lu";

const icons: { [key: string]: JSX.Element } = {
  fingerfood: <IoHandLeftOutline />,
  vegan: <LuVegan />,
  vegetarisch: <TbMeatOff />,
  fleisch: <TbMeat />,
  ab_beikostreife: <LuBaby />,
  jahr: <FaRegCalendarCheck />,
  monat: <FaRegCalendarCheck />,
  snack: <FaCookieBite />,
  frühstück: <LuClock9 />,
  mittagessen: <LuClock12 />,
  abendessen: <LuClock7 />,
  proteinreich: <FaEgg />,
  einfach: <GiCookingPot />,
  wenige_zutaten: <TbCookie />,
  tiefkühlgeeignet: <FaRegSnowflake />,
  babygerecht: <FaBabyCarriage />,
  pfannengericht: <IoFastFoodOutline />,
  drei_tage_im_kühlschrank: <TbFridge />,
  süß: <TbCookie />,
  zuckerfrei: <FaSeedling />,
  backen: <PiOven />,
  brot: <PiBread />,
  ab_9_monaten: <FaBabyCarriage />,
  schnell: <GiForkKnifeSpoon />,
  herzhaft: <TbChefHat />,
  familienessen: <FaHome />,
  ofengericht: <PiOven />,
  default: <LuBaby />,
};

export const getIconForCategory = (category: string): JSX.Element => {
  const icon =
    icons[category.toLowerCase().replace(/\s+/g, "_") as keyof typeof icons];
  return icon || icons.default;
};

interface IconTextProps {
  text: string;
}

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
