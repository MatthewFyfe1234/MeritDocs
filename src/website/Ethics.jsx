
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

const cards = [
  {
    title: 'Transparency and Accountability',
    description: `Merit makes actions and decisions traceable, helping organisations uphold ethical standards through clear 
                  governance, process visibility, and structured oversight across every level of the business.`,
    image: Transparency
  },
  {
    title: 'Fair Recognition and Reward',
    description: `By linking contribution to outcomes, Merit enables you to base recognition on real impact by promoting fairness, 
                  reducing bias, and supporting a culture where effort is seen and valued.`,
    image: Recognition
  },
  {
    title: 'System Integrity & Trust',
    description: `Merit provides a reliable operational framework that removes ambiguity, enforces consistency, and builds trust 
                  in how work is measured, decisions are made, and progress is evaluated.`,
    image: Integrity
  }
];

const Ethics = () => {
  const theme = useTheme();

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default }}>
      <Intro
        title="Ethics & Impact"
        content={[`When your system can identify merit by any measure, fairness and sustainability stop being aspirations. They 
                   become natural byproducts of better business decisions.`,
                  `Merit helps organizations reduce waste, eliminate bias, and recognize what truly drives outcomes.`,
                  ` `,
                  ` `,
                  `Don’t chase ethical outcomes. Make them inevitable.`]}
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
        <Typography variant="h5" fontWeight={500} gutterBottom>
          You decide what matters, Merit helps you optimise for it
        </Typography>
        <DetailCardContainer
          cards={cards}
          colour='rgba(137, 207, 240, 0.15)'
          textColour="rgba(0, 0, 0, 0.8)"
          size="large"/>
      </Box>
      <FullWidthSection
        id="ESG"
        title="Supporting Your ESG Goals"
        content={[`Merit actively supports ESG goals by helping organizations operate more responsibly, transparently, and 
                   efficiently.`,
                  `Merit enables the reduction of waste through better resource planning, promotes fairness through merit-based
                   recognition, and strengthens governance with traceable, structured workflows.`,
                  `By turning execution into insight, Merit enables measurable progress across environmental, social, and governance
                   objectives, embedding accountability into daily operations and making it easier for organizations to align ethical
                   ambition with practical action.`]}
        image={ESG}/>
      <FullWidthSection
        id="Cultural Integrity"
        title="Helping You Build a Culture of Integrity"
        content={[`By embedding performance visibility into everyday workflows, it ensures contribution is seen, effort is valued,
                   and recognition is earned.`,
                  `Leaders gain insight into what drives progress, while teams operate with clarity, trust, and shared 
                   accountability.`,
                  `The result is a more inclusive, transparent, and merit-based culture, one where excellence isn’t just enabled, 
                   it’s encouraged by design.`]}
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
        title="From Compliance to Competitive Advantage"
        content={[`Ethical performance shouldn’t be an aspiration or an afterthought, it should be the natural output of how a 
                   business runs. Merit makes this possible by embedding ethical alignment into the fabric of everyday operations.`,
                  `When performance is measured objectively and value is surfaced systemically, fairness becomes consistent, 
                   accountability is automatic, and better outcomes follow. The result? A culture that doesn't just look ethical, 
                   but operates ethically, by design. And that’s not just good governance, it’s a strategic edge.`]}
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
