import i18n from '@/i18n/config.js';

import deDE from './de-DE.json';
import enGB from './en-GB.json';
import enUS from './en-US.json';
import esES from './es-ES.json';
import esMX from './es-MX.json';
import frFR from './fr-FR.json';
import haNG from './ha-NG.json';
import hiIN from './hi-IN.json';
import igNG from './ig-NG.json';
import itIT from './it-IT.json';
import jaJP from './ja-JP.json';
import koKR from './ko-KR.json';
import nlNL from './nl-NL.json';
import ptBR from './pt-BR.json';
import ruRU from './ru-RU.json';
import swKE from './sw-KE.json';
import trTR from './tr-TR.json';
import yoNG from './yo-NG.json';
import zhCN from './zh-CN.json';
import zhHK from './zh-HK.json';

const bundles = {
  'de-DE': deDE,
  'en-GB': enGB,
  'en-US': enUS,
  'es-ES': esES,
  'es-MX': esMX,
  'fr-FR': frFR,
  'ha-NG': haNG,
  'hi-IN': hiIN,
  'ig-NG': igNG,
  'it-IT': itIT,
  'ja-JP': jaJP,
  'ko-KR': koKR,
  'nl-NL': nlNL,
  'pt-BR': ptBR,
  'ru-RU': ruRU,
  'sw-KE': swKE,
  'tr-TR': trTR,
  'yo-NG': yoNG,
  'zh-CN': zhCN,
  'zh-HK': zhHK,
};

// Merge website translations into the shared translation namespace.
// deep: true preserves existing main-app keys; overwrite: false avoids stomping them.
Object.entries(bundles).forEach(([lang, bundle]) => {
  i18n.addResourceBundle(lang, 'translation', bundle, true, false);
});
