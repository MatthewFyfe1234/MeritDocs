import { useTranslation } from 'react-i18next';

// @mui components
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material';

// Components
import Intro from './components/Intro';
import DetailCardContainer from './components/DetailCardContainer';
import ContextSection from './components/ContextSection';
import FullWidthSection from './components/FullWidthSection';

// Images
import Culture from '/images/ethics/Culture.webp';
import ESG from '/images/ethics/ESG.webp';
import EthicsHeader from '/images/ethics/EthicsHeader.webp';
import Integrity from '/images/ethics/Integrity.webp';
import Recognition from '/images/ethics/Recognition.webp';
import Transparency from '/images/ethics/Transparency.webp';
import Arrows from '/images/ethics/Arrows.svg';

const cardImages = [
  { image: Transparency, cardKey: 'transparency' },
  { image: Recognition,  cardKey: 'recognition' },
  { image: Integrity,    cardKey: 'integrity' }
];

const Ethics = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const cards = cardImages.map(c => ({
    ...c,
    ...t(`ethics.operationalEthics.cards.${c.cardKey}`, { returnObjects: true })
  }));

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default }}>
      <Intro
        title={t('ethics.intro.title')}
        content={t('ethics.intro.content', { returnObjects: true })}
        backgroundImage={EthicsHeader}/>
      <Box
        id="Operational Ethics"
        className="tracked-section"
        sx={{
          py: { xs: 4, md: 6, lg: 8 },
          backgroundColor: theme.palette.background.default,
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
          px: { xs: 2, sm: 4, md: 6, lg: 6 },
          alignItems: 'center',
          textAlign: 'center',
        }}>
        <Typography variant="h5" sx={{ fontWeight: 500 }} gutterBottom>
          {t('ethics.operationalEthics.subtitle')}
        </Typography>
        <DetailCardContainer
          cards={cards}
          colour='rgba(137, 207, 240, 0.15)'
          textColour="rgba(0, 0, 0, 0.8)"
          size="large"/>
      </Box>
      <FullWidthSection
        id="ESG"
        title={t('ethics.esg.title')}
        content={t('ethics.esg.content', { returnObjects: true })}
        image={ESG}/>
      <FullWidthSection
        id="Cultural Integrity"
        title={t('ethics.culturalIntegrity.title')}
        content={t('ethics.culturalIntegrity.content', { returnObjects: true })}
        image={Culture}
        reverse={true}/>
      <Box
        sx={{
          height: { xs: '50px', md: '100px' },
          width: '100%',
        }}>

      </Box>
      <ContextSection
        id="Compliance to Competitive Advantage"
        title={t('ethics.compliance.title')}
        content={t('ethics.compliance.content', { returnObjects: true })}
        image={
          <Box
            component="img"
            src={Arrows}
            alt="From Compliance to Competitive Advantage"
            sx={{
              width: '45%',
              objectFit: 'contain',
              filter: 'brightness(0) saturate(100%)', // black
              opacity: 0.08,
              background: 'transparent',
              mixBlendMode: 'multiply'
            }}/>
        }
        hasGap/>
    </Box>
  );
}

export default Ethics;
