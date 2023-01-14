import React from "react";
import { FlexboxGrid } from "rsuite";
import sticker_machine from "../../assets/images/sticker_machine.png";

function Logo() {
  return (
    <div>
      <FlexboxGrid justify="center">
        <img src={sticker_machine} alt="Logo1" width="200" height="300" />
      </FlexboxGrid>
    </div>
  );
}

export default Logo;
