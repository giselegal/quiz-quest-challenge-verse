/* 
🎯 ISSUE #6 RESOLUTION: Dynamic Funnel Loading Implementation
============================================================

PROBLEM: ModularEditorPro.tsx always loaded hardcoded QUIZ_STYLE_21_STEPS_TEMPLATE
         regardless of funnelId in URL (/editor/:funnelId)

SOLUTION: Added dynamic funnel loading with smart fallbacks

KEY CHANGES MADE:
================

1. IMPORTS ADDED:
   + import { useLocation } from 'wouter';
   + import { useFunnelLoader } from '@/hooks/useFunnelLoader';

2. FUNNEL ID CAPTURE:
   ```typescript
   const [location] = useLocation();
   
   const funnelId = useMemo(() => {
     const match = location.match(/\/editor\/([^/?]+)/);
     const extractedId = match?.[1] || 'quiz-style-21-steps';
     console.log('🎯 ModularEditorPro: funnelId capturado da URL:', extractedId);
     return extractedId;
   }, [location]);
   ```

3. DYNAMIC FUNNEL LOADING:
   ```typescript
   const { funnel: funnelData, isLoading: funnelLoading, isError: funnelError } = useFunnelLoader(
     funnelId !== 'quiz-style-21-steps' ? funnelId : undefined,
     { autoLoad: true, enableEvents: false }
   );
   ```

4. SMART BLOCK RESOLUTION:
   ```typescript
   const currentStepBlocks = useMemo(() => {
     // PRIORITY: Dynamic funnel data > EditorProvider fallback
     if (funnelData && funnelData.pages) {
       const pageIndex = state.currentStep - 1;
       const currentPage = funnelData.pages[pageIndex];
       if (currentPage?.blocks?.length > 0) {
         blocks = currentPage.blocks; // 🎯 DYNAMIC DATA
       }
     } else {
       blocks = state.stepBlocks[stepKey] || []; // 🛡️ FALLBACK
     }
   }, [funnelData, state.stepBlocks, state.currentStep]);
   ```

5. SIDEBAR INTEGRATION:
   ```typescript  
   const stepHasBlocksRecord = useMemo(() => {
     // Consider both dynamic funnel pages AND EditorProvider steps
     if (funnelData?.pages) {
       record[i] = (funnelData.pages[pageIndex]?.blocks?.length || 0) > 0;
     } else {
       record[i] = (state.stepBlocks[stepKey]?.length || 0) > 0; 
     }
   }, [state.stepBlocks, funnelData]);
   ```

RESULT: 
=======
✅ URL /editor/my-custom-funnel-123 → Loads specific funnel
✅ Console shows: "🎯 funnelId capturado: my-custom-funnel-123"  
✅ Sidebar reflects actual funnel structure
✅ Canvas shows correct blocks from dynamic funnel
✅ Robust fallback to template on any error
✅ Zero breaking changes - full backward compatibility

BEHAVIOR:
=========
/editor/custom-funnel-123  → useFunnelLoader("custom-funnel-123") → Dynamic data
/editor                    → Default template (no API call)
/editor/nonexistent       → API call + graceful fallback to template
```

TESTING: 
========
- Created useFunnelLoaderMock.ts for isolated testing
- Validated URL parsing logic with multiple test cases
- Confirmed fallback mechanisms work correctly
- Verified console logging provides clear debugging info

🎉 ISSUE #6 COMPLETELY RESOLVED! 
*/