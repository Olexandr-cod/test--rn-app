import {RegularFont, BoldFont} from '../styles/fontFamily';

export const getBodyFontByFontWeight = (fontWeight: string): string => {
  switch (fontWeight) {
    case '400':
      return RegularFont;
    case '600':
      return BoldFont;
    default:
      return RegularFont;
  }
};
