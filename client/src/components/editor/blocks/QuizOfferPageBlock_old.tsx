export { default } from '@/components/pages/QuizOfferPageComponent';

interface QuizOfferPageBlockProps {
  block: {
    id: string;
    type: string;
    properties: {
      title?: string;
      description?: string;
      price?: string;
      originalPrice?: string;
      discount?: string;
      benefits?: string[];
      ctaText?: string;
      urgencyText?: string;
      backgroundColor?: string;
      textColor?: string;
    };
  };
  isSelected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const QuizOfferPageBlock: React.FC<QuizOfferPageBlockProps> = ({
  block,
  isSelected = false,
  onClick,
  disabled = false,
  className
}) => {
  const {
    title = 'Oferta Especial',
    description = 'Consultoria personalizada baseada no seu resultado',
    price = 'R$ 97',
    originalPrice = 'R$ 197',
    discount = '50% OFF',
    benefits = [],
    ctaText = 'Quero Minha Consultoria',
    urgencyText = 'Oferta válida apenas hoje!',
    backgroundColor = '#ffffff',
    textColor = '#432818'
  } = block.properties;

  return (
    <div
      className={cn(
        'relative w-full min-h-[600px] p-8 rounded-lg border-2 border-dashed',
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white',
        'cursor-pointer hover:border-gray-400 transition-colors',
        className
      )}
      onClick={onClick}
      style={{ backgroundColor, color: textColor }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <Badge variant="destructive" className="mb-4">
          {discount}
        </Badge>

        {/* Main Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: textColor }}>
          {title}
        </h1>

        {/* Description */}
        <p className="text-lg mb-8 opacity-80" style={{ color: textColor }}>
          {description}
        </p>

        {/* Price Section */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-8 mb-8">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="text-2xl text-gray-500 line-through">
                {originalPrice}
              </span>
              <span className="text-4xl md:text-5xl font-bold text-green-600">
                {price}
              </span>
            </div>
            
            <p className="text-sm text-red-600 font-semibold">
              {urgencyText}
            </p>
          </div>

          {/* Benefits */}
          {benefits.length > 0 && (
            <div className="text-left max-w-2xl mx-auto mb-6">
              <h3 className="text-xl font-semibold mb-4 text-center" style={{ color: textColor }}>
                O que você vai receber:
              </h3>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-3 text-xl">✓</span>
                    <span className="text-lg" style={{ color: textColor }}>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <Button
          size="lg"
          className="text-xl px-12 py-4 bg-green-600 hover:bg-green-700 text-white font-bold"
          disabled={disabled}
        >
          {ctaText}
        </Button>

        {/* Guarantee */}
        <div className="mt-8 text-center">
          <div className="text-4xl mb-2">🛡️</div>
          <p className="text-sm opacity-70" style={{ color: textColor }}>
            Garantia de 30 dias ou seu dinheiro de volta
          </p>
        </div>
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
          Página de Oferta
        </div>
      )}
    </div>
  );
};

export default QuizOfferPageBlock;