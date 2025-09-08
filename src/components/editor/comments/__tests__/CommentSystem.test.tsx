import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { CommentSystem } from '../CommentSystem';
import { EditorProvider } from '../../EditorProvider';

// Mock the useEditor hook to verify it's not being modified
const mockEditorState = {
  stepBlocks: {},
  currentStep: 1,
  selectedBlockId: null,
  stepValidation: {},
  isSupabaseEnabled: false,
  databaseMode: 'local' as const,
  isLoading: false,
};

const mockEditorActions = {
  setCurrentStep: vi.fn(),
  setSelectedBlockId: vi.fn(),
  setStepValid: vi.fn(),
  loadDefaultTemplate: vi.fn(),
  addBlock: vi.fn(),
  addBlockAtIndex: vi.fn(),
  removeBlock: vi.fn(),
  reorderBlocks: vi.fn(),
  updateBlock: vi.fn(),
  ensureStepLoaded: vi.fn(),
  undo: vi.fn(),
  redo: vi.fn(),
  canUndo: false,
  canRedo: false,
  exportJSON: vi.fn(() => '{}'),
  importJSON: vi.fn(),
};

// Test wrapper component that provides editor context
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div data-testid="test-wrapper">
      {children}
    </div>
  );
};

// Mock useEditor hook
vi.mock('../../EditorProvider', () => ({
  useEditor: () => ({
    state: mockEditorState,
    actions: mockEditorActions,
  }),
}));

describe('CommentSystem', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    console.log = vi.fn(); // Mock console.log to capture debug output
  });

  it('renders without crashing', () => {
    render(
      <TestWrapper>
        <CommentSystem />
      </TestWrapper>
    );
    
    expect(screen.getByText('Comentários')).toBeInTheDocument();
    expect(screen.getByText('(Apenas anotações - não editam conteúdo)')).toBeInTheDocument();
  });

  it('shows add comment button initially', () => {
    render(
      <TestWrapper>
        <CommentSystem />
      </TestWrapper>
    );
    
    expect(screen.getByText('+ Adicionar comentário')).toBeInTheDocument();
  });

  it('does NOT trigger any editor actions when adding a comment', async () => {
    render(
      <TestWrapper>
        <CommentSystem blockId="test-block" stepKey="step-1" />
      </TestWrapper>
    );
    
    // Click add comment button
    fireEvent.click(screen.getByText('+ Adicionar comentário'));
    
    // Add comment text
    const textarea = screen.getByPlaceholderText('Adicione um comentário...');
    fireEvent.change(textarea, { target: { value: 'Test comment' } });
    
    // Submit comment
    fireEvent.click(screen.getByText('Adicionar'));
    
    await waitFor(() => {
      expect(screen.getByText('Test comment')).toBeInTheDocument();
    });
    
    // Verify NO editor actions were called
    expect(mockEditorActions.addBlock).not.toHaveBeenCalled();
    expect(mockEditorActions.updateBlock).not.toHaveBeenCalled();
    expect(mockEditorActions.setCurrentStep).not.toHaveBeenCalled();
    expect(mockEditorActions.setSelectedBlockId).not.toHaveBeenCalled();
    expect(mockEditorActions.setStepValid).not.toHaveBeenCalled();
    
    // Verify comment was logged as non-editing action
    expect(console.log).toHaveBeenCalledWith(
      '✅ Comment added (no editing triggered):',
      expect.objectContaining({
        text: 'Test comment',
        blockId: 'test-block',
        stepKey: 'step-1',
      })
    );
  });

  it('does NOT trigger editor actions when deleting a comment', async () => {
    render(
      <TestWrapper>
        <CommentSystem />
      </TestWrapper>
    );
    
    // Add a comment first
    fireEvent.click(screen.getByText('+ Adicionar comentário'));
    const textarea = screen.getByPlaceholderText('Adicione um comentário...');
    fireEvent.change(textarea, { target: { value: 'Comment to delete' } });
    fireEvent.click(screen.getByText('Adicionar'));
    
    await waitFor(() => {
      expect(screen.getByText('Comment to delete')).toBeInTheDocument();
    });
    
    // Clear previous calls
    vi.clearAllMocks();
    
    // Delete the comment
    const deleteButton = screen.getByTitle('Deletar comentário');
    fireEvent.click(deleteButton);
    
    await waitFor(() => {
      expect(screen.queryByText('Comment to delete')).not.toBeInTheDocument();
    });
    
    // Verify NO editor actions were called during deletion
    expect(mockEditorActions.removeBlock).not.toHaveBeenCalled();
    expect(mockEditorActions.updateBlock).not.toHaveBeenCalled();
    expect(mockEditorActions.setCurrentStep).not.toHaveBeenCalled();
    expect(mockEditorActions.setSelectedBlockId).not.toHaveBeenCalled();
    
    // Verify deletion was logged as non-editing action
    expect(console.log).toHaveBeenCalledWith(
      '✅ Comment deleted (no editing triggered):',
      expect.stringContaining('comment-')
    );
  });

  it('displays proper isolation message', () => {
    render(
      <TestWrapper>
        <CommentSystem />
      </TestWrapper>
    );
    
    expect(screen.getByText('(Apenas anotações - não editam conteúdo)')).toBeInTheDocument();
  });

  it('can cancel adding a comment without triggering editor actions', () => {
    render(
      <TestWrapper>
        <CommentSystem />
      </TestWrapper>
    );
    
    // Start adding comment
    fireEvent.click(screen.getByText('+ Adicionar comentário'));
    const textarea = screen.getByPlaceholderText('Adicione um comentário...');
    fireEvent.change(textarea, { target: { value: 'Cancelled comment' } });
    
    // Cancel
    fireEvent.click(screen.getByText('Cancelar'));
    
    // Verify we're back to initial state
    expect(screen.getByText('+ Adicionar comentário')).toBeInTheDocument();
    expect(screen.queryByText('Cancelled comment')).not.toBeInTheDocument();
    
    // Verify NO editor actions were called
    expect(mockEditorActions.addBlock).not.toHaveBeenCalled();
    expect(mockEditorActions.updateBlock).not.toHaveBeenCalled();
    expect(mockEditorActions.setCurrentStep).not.toHaveBeenCalled();
  });

  it('shows debug info in development mode', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';
    
    render(
      <TestWrapper>
        <CommentSystem blockId="debug-block" stepKey="step-2" />
      </TestWrapper>
    );
    
    expect(screen.getByText('Step: step-2')).toBeInTheDocument();
    expect(screen.getByText('Block: debug-block')).toBeInTheDocument();
    expect(screen.getByText('Editor Step: 1')).toBeInTheDocument();
    expect(screen.getByText('Comments: 0')).toBeInTheDocument();
    
    process.env.NODE_ENV = originalEnv;
  });
});