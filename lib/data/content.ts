import { defaultLocale, localize, t, type Locale, type Localized } from '@/lib/i18n'

export type ProcessStageId = 'requirements' | 'design' | 'manufacturing' | 'delivery'

type ProcessStageRecord = {
  id: ProcessStageId
  title: Localized
  description: Localized
  outcome: Localized
}

const processStageRecords: ProcessStageRecord[] = [
  {
    id: 'requirements',
    title: t('Requirements Alignment'),
    description: t(
      'The process or product requirement, the site constraints and the requested scope are confirmed with your team.',
    ),
    outcome: t('Agreed scope'),
  },
  {
    id: 'design',
    title: t('Engineering Design'),
    description: t(
      'Station, fixture and equipment design is developed from the agreed requirement and reviewed against your inputs.',
    ),
    outcome: t('Reviewed design'),
  },
  {
    id: 'manufacturing',
    title: t('Manufacturing & Assembly'),
    description: t(
      'Components are machined and the equipment is assembled in the workshop to the reviewed design.',
    ),
    outcome: t('Built equipment'),
  },
  {
    id: 'delivery',
    title: t('Delivery Collaboration'),
    description: t(
      'Handover details and delivery logistics are coordinated with the people on your project.',
    ),
    outcome: t('Coordinated handover'),
  },
]

export type ProcessStage = {
  id: ProcessStageId
  step: string
  title: string
  description: string
  outcome: string
}

export async function getProcessStages(locale: Locale = defaultLocale): Promise<ProcessStage[]> {
  return processStageRecords.map((record, index) => ({
    id: record.id,
    step: String(index + 1).padStart(2, '0'),
    title: localize(record.title, locale),
    description: localize(record.description, locale),
    outcome: localize(record.outcome, locale),
  }))
}

type CollaborationInputRecord = {
  id: string
  title: Localized
  description: Localized
  items: Localized<string[]>
}

const collaborationInputRecords: CollaborationInputRecord[] = [
  {
    id: 'requirement',
    title: t('Process or product requirement'),
    description: t('What the equipment has to do, and for which part.'),
    items: {
      en: [
        'Part drawings or 3D models',
        'The process steps the equipment supports',
        'Any existing line or equipment it connects to',
      ],
    },
  },
  {
    id: 'site',
    title: t('Site constraints'),
    description: t('Where the equipment will stand and what limits it.'),
    items: {
      en: ['Available floor area and layout', 'Utilities and interfaces at the site', 'Access and handling limits'],
    },
  },
  {
    id: 'scope',
    title: t('Requested scope'),
    description: t('Which part of the project you want Kingsen to take on.'),
    items: {
      en: [
        'Production line, fixtures and turntables, or standard workstations',
        'Design, customization, manufacturing, or a combination',
        'Quantity or set count, if known',
      ],
    },
  },
]

export type CollaborationInput = {
  id: string
  step: string
  title: string
  description: string
  items: string[]
}

export async function getCollaborationInputs(locale: Locale = defaultLocale): Promise<CollaborationInput[]> {
  return collaborationInputRecords.map((record, index) => ({
    id: record.id,
    step: String(index + 1).padStart(2, '0'),
    title: localize(record.title, locale),
    description: localize(record.description, locale),
    items: localize(record.items, locale),
  }))
}

export const offerScope: Localized<string[]> = {
  en: [
    'Automotive production and assembly-line projects',
    'Fixtures and turntables',
    'Standard workstations',
    'Design, customization and manufacturing for project requirements',
  ],
}

export const inquiryInterests: Localized<{ value: string; label: string }[]> = {
  en: [
    { value: 'assembly-lines', label: 'Production & assembly lines' },
    { value: 'fixtures-turntables', label: 'Fixtures & turntables' },
    { value: 'standard-workstations', label: 'Standard workstations' },
    { value: 'custom-project', label: 'Design, customization & manufacturing' },
    { value: 'other', label: 'Other / not sure yet' },
  ],
}

export const faqs: Localized<{ question: string; answer: string }[]> = {
  en: [
    {
      question: 'What should I include in a first inquiry?',
      answer:
        'The process or product requirement, the site constraints and the scope you want. Drawings, 3D models or photos of the current setup help, but a short description is enough to start the conversation.',
    },
    {
      question: 'Can I ask about a single fixture or workstation?',
      answer:
        'Yes. Fixtures and turntables and standard workstations are offered on their own, as well as being part of full production lines.',
    },
    {
      question: 'Do you design to my drawings or help define the requirement?',
      answer:
        'Share whatever you have: drawings, models, or a process description. Design, customization and manufacturing are all part of the offer, and the scope is confirmed with you.',
    },
    {
      question: 'Where is the company located?',
      answer:
        'Kingsen is operated by Taicang Qingzheng Automation Equipment Co., Ltd., at No. 123 Beihai Road, Taicang, Suzhou, Jiangsu, China.',
    },
  ],
}
