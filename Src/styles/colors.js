// export const PRIMARY = '#0080ff';
// export const BLACK = '#243040';

import { TENANT_ID } from "../config/TenantConfig.js";
import { dynamicConfig } from "../config/dynamicConfig";

export const WHITE = "#FFFFFF";
export const DESCRIPTION_COLOR = "gray";
export const DROPDOWNBACKGROUD = "#ddd";

export const THEME_DARK_COLOR =
  dynamicConfig[TENANT_ID]?.Colors?.THEME_DARK_COLOR;
export const PRIMARY = dynamicConfig[TENANT_ID]?.Colors?.PRIMARY;
export const FONT_COLOR = dynamicConfig[TENANT_ID]?.Colors?.FONT_COLOR;
export const BUTTON_FONT_COLOR =
  dynamicConfig[TENANT_ID]?.Colors?.BUTTON_FONT_COLOR;

// ACTIONS
export const SUCCESS = "#3adb76";
export const WARNING = "#ffae00";
export const ALERT = "red";

// GRAYSCALE
export const GRAY_LIGHT = "lightgray";
export const GRAY_MEDIUM = "#cacaca";
export const GRAY_DARK = "#8a8a8a";

export const autoCompleteBox = {
  width: 200,
  textAlign: "center",
  display: "inline-table",
};

export const lightFont = {
  fontFamily: "Roboto-Light"
};
export const regularFont = {
  fontFamily: "Roboto-Regular"
};
export const mediumFont = {
  fontFamily: "Roboto-Medium"
};
export const boldFont = {
  fontFamily: "Roboto-Bold"
};
