export { HeaderBlock } from './HeaderBlock';
export { TextBlock } from './TextBlock';
export { ImageBlock } from './ImageBlock';
export { ButtonBlock } from './ButtonBlock';
export { SpacerBlock } from './SpacerBlock';
export { ResultHeaderBlock } from './ResultHeaderBlock';
export { ResultDescriptionBlock } from './ResultDescriptionBlock';
export { ProductOfferBlock } from './ProductOfferBlock';
export { UrgencyTimerBlock } from './UrgencyTimerBlock';
export { FAQSectionBlock } from './FAQSectionBlock';
export { TestimonialsBlock } from './TestimonialsBlock';
export { GuaranteeBlock } from './GuaranteeBlock';
export { VideoPlayerBlock } from './VideoPlayerBlock';
export { InlineEditableText } from './InlineEditableText';
export { BlockRenderer } from './BlockRenderer';

// Novos blocos UI/Avançados - usando export default
export { default as AlertBlock } from './AlertBlock';
export { default as ArgumentsBlock } from './ArgumentsBlock';
export { default as AudioBlock } from './AudioBlock';
export { default as CarouselBlock } from './CarouselBlock';
export { default as LoaderBlock } from './LoaderBlock';
export { default as CompareBlock } from './CompareBlock';
export { default as ConfettiBlock } from './ConfettiBlock';
export { default as QuoteBlock } from './QuoteBlock';
export { default as FormInputBlock } from './FormInputBlock';
export { default as ChartAreaBlock } from './ChartAreaBlock';
export { default as ChartLevelBlock } from './ChartLevelBlock';
export { default as ListBlock } from './ListBlock';
export { default as MarqueeBlock } from './MarqueeBlock';
export { default as OptionsGridBlock } from './OptionsGridBlock';
export { default as ScriptBlock } from './ScriptBlock';
export { default as TermsBlock } from './TermsBlock';

// Blocos especiais das etapas 20 e 21
export { default as ResultPageBlock } from './ResultPageBlock';
export { default as QuizOfferPageBlock } from './QuizOfferPageBlock';

// Quiz-specific blocks
export { default as QuizIntroBlock } from '../../blocks/quiz/QuizIntroBlock';
export { default as QuizQuestionBlock } from './QuizQuestionBlock';
export { default as StrategicQuestionBlock } from './StrategicQuestionBlock';
export { default as QuizTransitionBlock } from './QuizTransitionBlock';

export type { BlockData } from './BlockRenderer';
