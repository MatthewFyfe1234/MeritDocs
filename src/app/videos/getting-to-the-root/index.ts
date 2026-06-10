import type { VideoConfig } from '../../types';
import logo from '../../assets/Logo_secondary.webp';
import { scene as theButton } from './scenes/01-the-button';
import { scene as typical } from './scenes/02-typical';
import { scene as buttonValue } from './scenes/03-button-value';
import { scene as productManager } from './scenes/04-jon';
import { scene as theSplit } from './scenes/05-the-split';
import { scene as inTheFactory } from './scenes/06-in-the-factory';
import { scene as onTheLorry } from './scenes/07-on-the-lorry';
import { scene as dave } from './scenes/08-dave';
import { scene as siteCascade } from './scenes/09-site-cascade';
import { scene as fullPicture } from './scenes/10-full-picture';
import { scene as coldBridging } from './scenes/cold-bridging';
import { scene as carbonSummary } from './scenes/11-carbon-summary';
import { scene as theNumbers } from './scenes/11-nobody-knew';
import { scene as merit } from './scenes/12-merit';
import { scene as lowCarbon } from './scenes/13-low-carbon';

export const video: VideoConfig = {
  title: 'From the Acorn',
  exportFilename: 'From-the-Acorn.mp4',
  logo: { src: logo, corner: 'br', size: 52, opacity: 0.7, padding: 40 },
  scenes: [
    theButton,
    typical,
    buttonValue,
    productManager,
    theSplit,
    inTheFactory,
    onTheLorry,
    dave,
    siteCascade,
    fullPicture,
    coldBridging,
    carbonSummary,
    theNumbers,
    lowCarbon,
    merit,
  ],
};
