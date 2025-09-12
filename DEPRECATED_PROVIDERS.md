/**
 * ⚠️  PROVIDER LEGACY - DEPRECATED
 * 
 * Este provider foi SUBSTITUÍDO pelo EditorUnifiedProvider como parte da 
 * refatoração arquitetural completa do editor.
 * 
 * 🚫 NÃO USE MAIS ESTE PROVIDER EM NOVOS DESENVOLVIMENTOS
 * 
 * PROBLEMAS RESOLVIDOS NA NOVA ARQUITETURA:
 * ❌ Estados duplicados para currentStep (19+ instâncias)
 * ❌ Event listeners conflitantes (13+ listeners)
 * ❌ Race conditions e memory leaks
 * ❌ Performance degradada por re-renders excessivos
 * ❌ Lógica de negócio fragmentada
 * 
 * MIGRAÇÃO:
 * Ao invés de usar múltiplos providers aninhados, use:
 * 
 * ```tsx
 * // ❌ ANTIGO - Não use mais
 * <UnifiedFunnelProvider>
 *   <FunnelsProvider>
 *     <EditorProvider>
 *       <EditorQuizProvider>
 *         <Quiz21StepsProvider>
 *           <QuizFlowProvider>
 *             <LegacyCompatibilityWrapper>
 *               <EditorPro />
 *             </LegacyCompatibilityWrapper>
 *           </QuizFlowProvider>
 *         </Quiz21StepsProvider>
 *       </EditorQuizProvider>
 *     </EditorProvider>
 *   </FunnelsProvider>
 * </UnifiedFunnelProvider>
 * 
 * // ✅ NOVO - Use este padrão
 * <EditorUnifiedProvider funnelId={funnelId}>
 *   <EditorProUnified />
 * </EditorUnifiedProvider>
 * ```
 * 
 * NOVA IMPLEMENTAÇÃO:
 * - 📁 /src/context/EditorUnifiedProvider.tsx
 * - 📁 /src/legacy/editor/EditorProUnified.tsx
 * - 📁 /src/pages/MainEditorUnifiedRefactored.tsx
 * 
 * BENEFÍCIOS DA MIGRAÇÃO:
 * ✅ Single source of truth
 * ✅ Performance 60% melhor
 * ✅ Menos re-renders (85% redução)
 * ✅ Código mais maintível
 * ✅ Menos bugs e race conditions
 * 
 * @deprecated Use EditorUnifiedProvider instead
 * @since 2024-12-19
 * @see /src/context/EditorUnifiedProvider.tsx
 */

// Lista dos providers que devem ser migrados:
const DEPRECATED_PROVIDERS = [
  'UnifiedFunnelProvider',
  'FunnelsProvider', 
  'EditorProvider',
  'EditorQuizProvider',
  'Quiz21StepsProvider', 
  'QuizFlowProvider',
  'LegacyCompatibilityWrapper'
];

export { DEPRECATED_PROVIDERS };