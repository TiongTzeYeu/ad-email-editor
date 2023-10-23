import { Box } from "@mui/material";
import React, { useState } from "react";
import {
  getCamelCasedAttributes,
  objectToCSS
} from "@/lib/util/get-camel-cased-attr";
import ButtonPreview from "@/components/email-editor/preview-items/button.preview";
import TextPreview from "@/components/email-editor/preview-items/text.preview";
import HoverInfo from "@/lib/ui/hover-info";
import useEmailDataStore from "@/store/email";

interface ITextPreview {
  section: any;
  index: number;
  path: string;
}

const defaultStyle = {
  // border: "1px dashed grey",
  position: "relative",
  "&:hover": {
    outline: "2px dashed white"
  },
  backgroundRepeat: "no-repeat !important",
  backgroundPosition: "center center",
  backgroundSize: "cover !important",
  verticalAlign: "top",
  bgcolor: "yellow"
};

const activeStyle = {
  ...defaultStyle,
  outline: "2px dashed white"
};

const HeroPreview = ({ section, index, path }: ITextPreview) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const { setActiveNode } = useEmailDataStore();

  const loadHtmlElements = (pSection: any, tindex: number) => {
    switch (pSection.tagName) {
      case "mj-button": {
        return (
          <ButtonPreview
            section={pSection}
            textIndex={tindex}
            index={index}
            key={index}
            path={`${path}.children.${tindex}`}
          />
        );
      }

      case "mj-text": {
        return (
          <TextPreview
            section={pSection}
            index={index}
            textIndex={tindex}
            key={index}
            path={`${path}.children.${tindex}`}
          />
        );
      }

      default:
        break;
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    setActiveNode(null);
    setActiveNode({
      section,
      path,
      sectionIndex: index
    });

    setIsActive(true);
  };

  const onMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    setIsHovered(true);
    event.stopPropagation();
  };

  const onMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
    setIsHovered(false);
    event.stopPropagation();
  };

  const children = section.children;

  return (
    <Box
      id="hero-preview"
      sx={{
        ...(isActive ? activeStyle : defaultStyle),
        ...objectToCSS(getCamelCasedAttributes(section.attributes))
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={handleClick}
    >
      {children &&
        children.map((element: any, index: number) => {
          return loadHtmlElements(element, index);
        })}
      {(isHovered || isActive) && <HoverInfo section={section} path={path} />}
    </Box>
  );
};
export default HeroPreview;