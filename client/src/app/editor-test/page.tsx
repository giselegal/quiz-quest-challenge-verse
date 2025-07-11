export default function EditorTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-8 text-center">
        <h1 className="text-4xl font-playfair text-[#432818] mb-6">
          Sistema de Editor de Componentes
        </h1>
        
        <div className="space-y-6">
          <p className="text-lg text-[#8F7A6A]">
            O editor de componentes foi criado com sucesso! Agora você pode:
          </p>
          
          <div className="grid gap-4 text-left bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-[#432818] mb-3">Funcionalidades Implementadas:</h3>
            
            <div className="space-y-2 text-sm text-[#6B5B4E]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>✅ Biblioteca de componentes com drag-and-drop</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>✅ Canvas editor com preview responsivo</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>✅ Painel de propriedades com validação</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>✅ Componentes editáveis: MotivationSection, BonusSection, GuaranteeSection</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>✅ Sistema de histórico (Undo/Redo)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>✅ Modo preview e modo edição</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>✅ Controles de visibilidade e ordenação</span>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-2">Como usar:</h4>
            <ol className="text-sm text-blue-700 text-left space-y-1">
              <li>1. Arraste componentes da biblioteca (lado esquerdo)</li>
              <li>2. Clique em um componente no canvas para selecioná-lo</li>
              <li>3. Edite as propriedades no painel da direita</li>
              <li>4. Use os controles de viewport para testar responsividade</li>
              <li>5. Use o modo preview para ver o resultado final</li>
            </ol>
          </div>
          
          <div className="flex gap-4 justify-center">
            <a 
              href="/editor" 
              className="bg-[#B89B7A] hover:bg-[#aa6b5d] text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              🚀 Abrir Editor
            </a>
            
            <a 
              href="/" 
              className="border border-[#B89B7A] text-[#B89B7A] hover:bg-[#B89B7A]/5 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              ← Voltar ao Quiz
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
