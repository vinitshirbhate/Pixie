import React, { useRef } from "react";
import Dimensions from "./settings/Dimensions";
import Text from "./settings/Text";
import Color from "./settings/Color";
import Export from "./settings/Export";
import { RightSidebarProps } from "@/types/type";
import { modifyShape } from "@/lib/shapes";

const RightSidebar = ({
  elementAtrributes,
  setElementAttributes,
  fabricRef,
  isEditingRef,
  activeObjectRef,
  syncShapeInStorage,
}: RightSidebarProps) => {
  const colorInputRef = useRef(null);
  const strokeInputRef = useRef(null);

  const handleInputChange = (property: string, value: string) => {
    if (!isEditingRef.current) isEditingRef.current = true;

    setElementAttributes((prev) => ({
      ...prev,
      [property]: value,
    }));

    modifyShape({
      canvas: fabricRef.current as fabric.Canvas,
      property,
      value,
      activeObjectRef,
      syncShapeInStorage,
    });
  };

  return (
    <section className=" flex flex-col border-t bg-primary-black border-primary-grey-200 text-primary-grey-300 min-w-[227] sticky right-0 h-full max-sm:hidden select-none ">
      <h3 className="px-5 pt-4 text-xs uppercase">Design</h3>
      <span className=" text-xs text-primary-grey-300 mt-3 px-5 border-b border-primary-grey-200 pb-4 w-64">
        Design, collaborate, and innovate seamlessly—Canvas is yours
      </span>
      <Dimensions
        width={elementAtrributes.width}
        height={elementAtrributes.height}
        isEditingRef={isEditingRef}
        handleInputChange={handleInputChange}
      />
      <Text
        fontFamily={elementAtrributes.fontFamily}
        fontSize={elementAtrributes.fontSize}
        fontWeight={elementAtrributes.fontWeight}
        handleInputChange={handleInputChange}
      />
      <Color
        inputRef={colorInputRef}
        attribute={elementAtrributes.fill}
        placeholder="color"
        attributeType="fill"
        handleInputChange={handleInputChange}
      />
      <Color
        inputRef={strokeInputRef}
        attribute={elementAtrributes.stroke}
        placeholder="stroke"
        attributeType="stroke"
        handleInputChange={handleInputChange}
      />
      <Export />
    </section>
  );
};

export default RightSidebar;
