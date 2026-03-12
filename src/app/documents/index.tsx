import { FolderFrontCover } from './presentation-folder/FolderFrontCover';
import { FolderBackCover } from './presentation-folder/FolderBackCover';
import { FolderInsideLeft } from './presentation-folder/FolderInsideLeft';
import { FolderInsideRight } from './presentation-folder/FolderInsideRight';
import { BusinessCardFront } from './business-card/BusinessCardFront';
import { BusinessCardBack } from './business-card/BusinessCardBack';
import { FlyerFront } from './flyer/FlyerFront';
import { FlyerBack } from './flyer/FlyerBack';

export const presentationFolder = {
  title: 'Merit OI: Presentation Folder',
  exportFilename: 'Merit-OI-Presentation-Folder.pdf',
  trimWidthMm: 222,
  trimHeightMm: 310,
  bleedMm: 3,
  pages: [
    <FolderFrontCover key="front" />,
    <FolderBackCover key="back" />,
    <FolderInsideLeft key="inside-left" />,
    <FolderInsideRight key="inside-right" />,
  ],
};

export const businessCard = {
  title: 'Merit OI: Business Card — Umar Abubakar',
  exportFilename: 'Merit-OI-BusinessCard-Umar.pdf',
  trimWidthMm: 85,
  trimHeightMm: 55,
  bleedMm: 2,
  pages: [
    <BusinessCardFront key="front" />,
    <BusinessCardBack key="back" />,
  ],
};

export const flyer = {
  title: 'Merit OI: Flyer',
  exportFilename: 'Merit-OI-Flyer.pdf',
  trimWidthMm: 210,
  trimHeightMm: 297,
  bleedMm: 3,
  pages: [
    <FlyerFront key="front" />,
    <FlyerBack key="back" />,
  ],
};
