# 🎯 ESTRATÉGIA WYSIWYG CORRIGIDA - BASEADA NO FUNIL REAL

## ✅ VOCÊ ESTÁ CORRETO!

As renderizações devem ser **100% baseadas no funil real** (`/quiz`, `/resultado`, `/quiz-descubra-seu-estilo`), não no Simple Editor!

---

## 🔍 ANÁLISE DOS COMPONENTES REAIS DO FUNIL

### **1. QuizIntro (Página de Introdução Real)**

#### **Estrutura Real:**
```tsx
// Componente principal: /components/QuizIntro.tsx
<main className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-b from-white to-gray-50 py-8">
  
  {/* Logo Gisele Galvão */}
  <picture>
    <source srcSet={STATIC_LOGO_IMAGE_URLS.webp} type="image/webp" />
    <img src={STATIC_LOGO_IMAGE_URLS.png} alt="Logo Gisele Galvão" width={120} height={50} />
  </picture>
  
  {/* Barra dourada */}
  <div className="h-[3px] bg-[#B89B7A] rounded-full mt-1.5" style={{width: '300px'}} />
  
  {/* Título principal com cores específicas */}
  <h1 className="text-2xl font-bold text-center leading-tight px-2 sm:text-3xl md:text-4xl playfair-display text-[#432818]">
    <span className="text-[#B89B7A]">Chega</span> de um guarda-roupa lotado e da sensação de que nada combina com{' '}
    <span className="text-[#B89B7A]">Você</span>.
  </h1>
  
  {/* Imagem hero específica */}
  <picture>
    <source srcSet={STATIC_INTRO_IMAGE_URLS.avif} type="image/avif" />
    <source srcSet={STATIC_INTRO_IMAGE_URLS.webp} type="image/webp" />
    <img src={STATIC_INTRO_IMAGE_URLS.png} alt="Descubra seu estilo predominante" width={300} height={204} />
  </picture>
  
  {/* Texto descritivo específico */}
  <p className="text-sm text-center leading-relaxed px-2 sm:text-base text-gray-600">
    Em poucos minutos, descubra seu{' '}
    <span className="font-semibold text-[#B89B7A]">Estilo Predominante</span>{' '}
    — e aprenda a montar looks que realmente refletem sua{' '}
    <span className="font-semibold text-[#432818]">essência</span>
  </p>
  
  {/* Campo nome com estilo específico */}
  <Input className="border-[#B89B7A] focus:ring-[#A1835D]" placeholder="Digite seu nome" />
  
  {/* Botão CTA específico */}
  <button className="bg-[#B89B7A] text-white hover:bg-[#A1835D] active:bg-[#947645]">
    Quero Descobrir meu Estilo Agora!
  </button>
</main>
```

### **2. QuizQuestion (Questões Reais)**

#### **Estrutura Real:**
```tsx
// Componente principal: /components/QuizQuestion.tsx
<div className="w-full max-w-6xl mx-auto pb-5 relative">
  
  {/* Título da questão com fonte Playfair */}
  <h2 className="font-playfair text-center mb-5 px-3 pt-3 text-brand-coffee font-semibold text-base sm:text-xl">
    {highlightStrategicWords(question.title)}
  </h2>
  
  {/* Grid de opções responsivo */}
  <div className={cn(
    "grid", 
    question.type === 'text' ? 
      "grid-cols-1 gap-4 px-4" : 
      "grid-cols-2 gap-3 px-2"
  )}>
    {question.options.map(option => (
      <QuizOption
        key={option.id}
        option={option}
        isSelected={currentAnswers.includes(option.id)}
        onSelect={() => handleOptionSelect(option.id)}
        hasImage={question.type !== 'text'}
        isStrategicQuestion={isStrategicQuestion}
      />
    ))}
  </div>
</div>
```

### **3. ResultPage (Página de Resultado Real)**

#### **Estrutura Real:**
```tsx
// Componente principal: /pages/ResultPage.tsx
<div className="min-h-screen bg-background">
  
  {/* Header com logo */}
  <Header />
  
  {/* Resultado personalizado baseado no estilo calculado */}
  <div className="container mx-auto px-4 py-8">
    
    {/* Estilo Primário */}
    <Card className="mb-8">
      <img src={`${styleConfig[category].image}?q=auto:best&f=auto&w=340`} alt={category} />
      <h2 className="text-2xl font-bold text-center mb-4">Seu Estilo: {category}</h2>
      <p className="text-gray-600">{styleConfig[category].description}</p>
    </Card>
    
    {/* Estilos Secundários */}
    <SecondaryStylesSection secondaryStyles={secondaryStyles} />
    
    {/* Oferta de Vendas */}
    <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200">
      <h3 className="text-3xl font-bold text-gray-800">Guias de Estilo Completo - R$ 97</h3>
      <Button className="w-full bg-green-600 hover:bg-green-700">
        QUERO MEUS GUIAS
      </Button>
    </Card>
    
    {/* Depoimentos */}
    <Testimonials />
    
    {/* Garantia */}
    <GuaranteeSection />
    
    {/* Transformações */}
    <BeforeAfterTransformation />
    
    {/* Seção Mentor */}
    <MentorSection />
    
    {/* Bônus */}
    <BonusSection />
  </div>
</div>
```

### **4. quiz-descubra-seu-estilo (Variante B Real)**

#### **Estrutura Real:**
```tsx
// Componente principal: /pages/quiz-descubra-seu-estilo.tsx
<div className="min-h-screen" style={{background: 'var(--background)'}}>
  
  {/* Hero Section */}
  <section className="container-main section-gap">
    <h1 className="text-4xl font-bold text-center mb-4" style={{fontFamily: 'Playfair Display'}}>
      Descubra Seu Estilo Pessoal
    </h1>
    <p className="text-xl text-center text-gray-600">
      Transforme sua imagem e autoestima com nossos Guias de Estilo personalizados
    </p>
  </section>
  
  {/* Oferta Principal */}
  <Card className="card-impact">
    <h2 className="text-3xl font-bold mb-4">Pacote Completo de Estilo</h2>
    <div className="price-display">
      <span className="text-2xl line-through text-gray-500">R$ 297,00</span>
      <span className="text-5xl font-bold text-green-600">R$ 97,00</span>
    </div>
    <Button className="btn-impact w-full">
      Quero Descobrir Meu Estilo
    </Button>
  </Card>
  
  {/* Benefícios, prova social, etc */}
</div>
```

---

## 🛠️ **PLANO DE IMPLEMENTAÇÃO CORRETO**

### **FASE 1: Implementar Renderizações Reais no Advanced Editor**

#### **1. Bloco `intro` (baseado em QuizIntro.tsx):**
```tsx
case 'intro':
  content = (
    <main className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-b from-white to-gray-50 py-8">
      {/* Logo Gisele Galvão real */}
      <div className="flex flex-col items-center space-y-2">
        <picture>
          <img src="https://res.cloudinary.com/dqljyf76t/image/upload/f_webp,q_70,w_120,h_50,c_fit/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp" 
               alt="Logo Gisele Galvão" width={120} height={50} />
        </picture>
        <div className="h-[3px] bg-[#B89B7A] rounded-full mt-1.5" style={{width: '300px'}} />
      </div>
      
      {/* Título com cores específicas */}
      <h1 className="text-2xl font-bold text-center leading-tight px-2 sm:text-3xl md:text-4xl text-[#432818]" 
          style={{fontFamily: '"Playfair Display", serif'}}>
        <span className="text-[#B89B7A]">Chega</span> de um guarda-roupa lotado e da sensação de que nada combina com{' '}
        <span className="text-[#B89B7A]">Você</span>.
      </h1>
      
      {/* Imagem hero real */}
      <div className="w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto mt-2">
        <img src="https://res.cloudinary.com/dqljyf76t/image/upload/f_webp,q_85,w_300,c_limit/v1746838118/20250509_2137_Desordem_e_Reflex%C3%A3o_simple_compose_01jtvszf8sfaytz493z9f16rf2_z1c2up.webp"
             alt="Descubra seu estilo predominante" className="w-full h-full object-contain rounded-lg" />
      </div>
      
      {/* Texto descritivo real */}
      <p className="text-sm text-center leading-relaxed px-2 sm:text-base text-gray-600">
        Em poucos minutos, descubra seu{' '}
        <span className="font-semibold text-[#B89B7A]">Estilo Predominante</span>{' '}
        — e aprenda a montar looks que realmente refletem sua{' '}
        <span className="font-semibold text-[#432818]">essência</span>
      </p>
      
      {/* Campo nome real */}
      <div className="w-full max-w-xs sm:max-w-md md:max-w-lg px-4 space-y-6 md:space-y-8 mx-auto">
        <input type="text" placeholder="Digite seu nome" 
               className="w-full p-2.5 bg-[#FEFEFE] rounded-md border-2 border-[#B89B7A] focus:ring-[#A1835D]" />
        
        {/* Botão CTA real */}
        <button className="w-full py-2 px-3 text-sm font-semibold rounded-md shadow-md bg-[#B89B7A] text-white hover:bg-[#A1835D] transition-all duration-300">
          Quero Descobrir meu Estilo Agora!
        </button>
      </div>
    </main>
  );
  break;
```

#### **2. Bloco `question` (baseado em QuizQuestion.tsx):**
```tsx
case 'question':
  content = (
    <div className="w-full max-w-6xl mx-auto pb-5 relative">
      {/* Título com fonte Playfair real */}
      <h2 className="font-playfair text-center mb-5 px-3 pt-3 text-[#432818] font-semibold text-base sm:text-xl"
          style={{fontFamily: '"Playfair Display", serif'}}>
        {block.settings.content || 'Pergunta do Quiz'}
      </h2>
      
      {/* Grid de opções real */}
      <div className={cn("grid", 
        block.settings.questionType === 'text' ? 
          "grid-cols-1 gap-4 px-4" : 
          "grid-cols-2 gap-3 px-2"
      )}>
        {block.settings.options?.map((option, index) => (
          <div key={option.id} 
               className="p-4 border-2 border-gray-200 rounded-lg hover:border-[#B89B7A] cursor-pointer transition-all">
            {option.image && (
              <div className="aspect-square bg-gray-100 rounded-lg mb-3">
                <img src={option.image} alt={option.text} className="w-full h-full object-cover rounded-lg" />
              </div>
            )}
            <p className="text-sm text-gray-700">{option.text}</p>
          </div>
        )) || (
          <div className="p-4 border-2 dashed border-gray-300 rounded-lg text-center text-gray-500">
            Configure as opções da pergunta
          </div>
        )}
      </div>
    </div>
  );
  break;
```

#### **3. Bloco `strategic-question` (baseado em StrategicQuestions):**
```tsx
case 'strategic-question':
  content = (
    <div className="w-full max-w-3xl mx-auto pb-5 relative strategic-question">
      <h2 className="text-center mb-6 px-3 pt-3 text-[#432818] font-bold text-[1.25rem] sm:text-2xl whitespace-pre-line"
          style={{fontFamily: '"Playfair Display", serif'}}>
        {block.settings.content || 'Pergunta Estratégica'}
      </h2>
      
      {/* Imagem se houver */}
      {block.settings.src && (
        <div className="w-full mb-6">
          <img src={block.settings.src} alt="Question visual" 
               className="w-full max-w-md mx-auto rounded-lg shadow-sm" />
        </div>
      )}
      
      {/* Opções estratégicas */}
      <div className="grid grid-cols-1 gap-3 px-2">
        {block.settings.options?.map((option, index) => (
          <div key={option.id} 
               className="border-2 border-gray-200 rounded-lg p-4 hover:border-[#B89B7A] cursor-pointer transition-all">
            <span className="text-gray-700">{option.text}</span>
          </div>
        )) || (
          <div className="border-2 dashed border-gray-300 rounded-lg p-4 text-center text-gray-500">
            Configure as opções estratégicas
          </div>
        )}
      </div>
    </div>
  );
  break;
```

#### **4. Bloco `sales-offer` (baseado em ResultPage):**
```tsx
case 'sales-offer':
  content = (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-8 relative overflow-hidden">
      {/* Badge de oferta */}
      <div className="absolute top-0 right-0 bg-red-500 text-white px-4 py-2 text-sm font-bold transform rotate-12 translate-x-4 -translate-y-2">
        OFERTA ESPECIAL
      </div>
      
      <div className="text-center">
        <h3 className="text-3xl font-bold text-gray-800 mb-2">
          {block.settings.productName || 'Guias de Estilo Completo'}
        </h3>
        
        {/* Preços */}
        <div className="mb-6">
          <div className="text-sm text-gray-500 mb-2">DE:</div>
          <span className="text-2xl text-gray-500 line-through">
            {block.settings.originalPrice || 'R$ 297,00'}
          </span>
          <div className="text-sm text-gray-500 mt-1 mb-4">POR APENAS:</div>
          <span className="text-5xl font-bold text-green-600">
            {block.settings.price || 'R$ 97,00'}
          </span>
          <div className="text-sm text-gray-600 mt-2">ou 12x de R$ 9,70</div>
        </div>
        
        {/* Features */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <h4 className="font-bold text-gray-800 mb-4">O que você vai receber:</h4>
          <div className="space-y-3 text-left">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
              <span className="text-gray-700">Guia de Estilo Personalizado</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
              <span className="text-gray-700">Análise Completa do seu Perfil</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
              <span className="text-gray-700">Dicas de Combinações</span>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <button className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-4 rounded-lg font-bold transition-all">
          {block.settings.ctaText || 'QUERO MEUS GUIAS AGORA'}
        </button>
        
        {/* Garantia */}
        <div className="flex items-center justify-center mt-4 text-sm text-gray-600">
          <Shield className="w-4 h-4 mr-2" />
          Garantia de 7 dias ou seu dinheiro de volta
        </div>
      </div>
    </div>
  );
  break;
```

---

## 🎯 **RESULTADO ESPERADO**

### **Editor WYSIWYG 100% Fiel ao Funil Real:**

- ✅ **Intro idêntica** ao QuizIntro.tsx (logo, cores, layout)
- ✅ **Questões idênticas** ao QuizQuestion.tsx (grid, fonte Playfair)
- ✅ **Questões estratégicas** como no funil real
- ✅ **Ofertas de venda** como na ResultPage real
- ✅ **Variante B** como no quiz-descubra-seu-estilo real
- ✅ **Cores, fontes e estilos** exatamente iguais

### **Timeline:**
- **Fase 1**: 2-3 dias (implementar renderizações reais)
- **Resultado**: Editor WYSIWYG que gera preview 100% idêntico ao funil funcionante

**Agora sim teremos um editor que mostra EXATAMENTE como ficará no funil real!** 🎯
