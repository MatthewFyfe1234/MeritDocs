import agriculture from '/images/industries/Agriculture.webp';
import construction from '/images/industries/Construction.webp';
import disasterManagement from '/images/industries/DisasterManagement.webp';
import healthcare from '/images/industries/Healthcare.webp';
import mining from '/images/industries/Mining.webp';
import professionalServices from '/images/industries/ProfessionalServices.webp';
import publicSector from '/images/industries/PublicSector.webp';
import manufacturing from '/images/industries/Manufacturing.webp';

export const useCasesSections = [
  { id: 'Manufacturing',                    sectionKey: 'manufacturing',                   image: manufacturing },
  { id: 'Construction',                     sectionKey: 'construction',                    image: construction },
  { id: 'Healthcare',                       sectionKey: 'healthcare',                      image: healthcare },
  { id: 'Disaster Management',              sectionKey: 'disasterManagement',              image: disasterManagement },
  { id: 'Mining and Resources',             sectionKey: 'miningAndResources',              image: mining },
  { id: 'Agriculture',                      sectionKey: 'agriculture',                     image: agriculture },
  { id: 'Public Infrastructure',            sectionKey: 'publicInfrastructure',            image: publicSector },
  { id: 'Consulting/Professional Services', sectionKey: 'consultingProfessionalServices',  image: professionalServices },
];
