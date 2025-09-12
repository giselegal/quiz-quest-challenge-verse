import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Upload, Copy, FileText, CheckCircle, AlertCircle } from 'lucide-react';

interface ExportImportModalProps {
    isVisible: boolean;
    onClose: () => void;
    currentQuiz: any;
    onImport: (quizData: any) => void;
}

export const ExportImportModal: React.FC<ExportImportModalProps> = ({
    isVisible,
    onClose,
    currentQuiz,
    onImport
}) => {
    const [activeTab, setActiveTab] = useState<'export' | 'import'>('export');
    const [exportFormat, setExportFormat] = useState<'json' | 'compressed'>('json');
    const [importText, setImportText] = useState('');
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Export functionality
    const handleExport = () => {
        try {
            const exportData = {
                version: '1.0',
                exported_at: new Date().toISOString(),
                quiz: currentQuiz,
                metadata: {
                    title: currentQuiz.title || 'Quiz sem título',
                    stages_count: currentQuiz.stages?.length || 0,
                    blocks_count: currentQuiz.stages?.reduce((total: number, stage: any) => total + (stage.blocks?.length || 0), 0) || 0
                }
            };

            let output = '';
            let filename = '';

            if (exportFormat === 'json') {
                output = JSON.stringify(exportData, null, 2);
                filename = `quiz-${Date.now()}.json`;
            } else {
                // Compressed format - remove whitespace
                output = JSON.stringify(exportData);
                filename = `quiz-${Date.now()}.min.json`;
            }

            // Download file
            const blob = new Blob([output], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            setStatus({ type: 'success', message: `Quiz exportado como ${filename}` });
        } catch (error) {
            setStatus({ type: 'error', message: 'Erro ao exportar quiz: ' + (error instanceof Error ? error.message : 'Erro desconhecido') });
        }
    };

    // Copy to clipboard
    const handleCopyToClipboard = async () => {
        try {
            const exportData = {
                version: '1.0',
                exported_at: new Date().toISOString(),
                quiz: currentQuiz
            };

            const output = JSON.stringify(exportData, null, 2);
            await navigator.clipboard.writeText(output);
            setStatus({ type: 'success', message: 'Quiz copiado para área de transferência!' });
        } catch (error) {
            setStatus({ type: 'error', message: 'Erro ao copiar: ' + (error instanceof Error ? error.message : 'Erro desconhecido') });
        }
    };

    // Import from text
    const handleImportFromText = () => {
        if (!importText.trim()) {
            setStatus({ type: 'error', message: 'Cole o JSON do quiz na área de texto' });
            return;
        }

        try {
            const importData = JSON.parse(importText);
            
            // Validate structure
            if (!importData.quiz) {
                throw new Error('Formato inválido: propriedade "quiz" não encontrada');
            }

            if (!importData.quiz.stages || !Array.isArray(importData.quiz.stages)) {
                throw new Error('Formato inválido: "stages" deve ser um array');
            }

            onImport(importData.quiz);
            setStatus({ type: 'success', message: 'Quiz importado com sucesso!' });
            setImportText('');
            setTimeout(onClose, 1500); // Close modal after success
        } catch (error) {
            setStatus({ type: 'error', message: 'Erro ao importar: ' + (error instanceof Error ? error.message : 'JSON inválido') });
        }
    };

    // Import from file
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result as string;
            try {
                const importData = JSON.parse(content);
                
                if (!importData.quiz) {
                    throw new Error('Formato inválido: propriedade "quiz" não encontrada');
                }

                onImport(importData.quiz);
                setStatus({ type: 'success', message: `Quiz importado de ${file.name}!` });
                setTimeout(onClose, 1500);
            } catch (error) {
                setStatus({ type: 'error', message: 'Erro ao ler arquivo: ' + (error instanceof Error ? error.message : 'Arquivo inválido') });
            }
        };
        reader.readAsText(file);
        
        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Clear status after 5 seconds
    React.useEffect(() => {
        if (status.type) {
            const timer = setTimeout(() => {
                setStatus({ type: null, message: '' });
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [status]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-700">
                    <h2 className="text-xl font-semibold text-white">
                        Exportar / Importar Quiz
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-700">
                    <button
                        onClick={() => setActiveTab('export')}
                        className={`px-6 py-3 text-sm font-medium transition-colors ${
                            activeTab === 'export'
                                ? 'text-blue-400 border-b-2 border-blue-400 bg-gray-800'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        <Download className="w-4 h-4 inline mr-2" />
                        Exportar
                    </button>
                    <button
                        onClick={() => setActiveTab('import')}
                        className={`px-6 py-3 text-sm font-medium transition-colors ${
                            activeTab === 'import'
                                ? 'text-blue-400 border-b-2 border-blue-400 bg-gray-800'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        <Upload className="w-4 h-4 inline mr-2" />
                        Importar
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 max-h-[60vh] overflow-y-auto">
                    <AnimatePresence mode="wait">
                        {activeTab === 'export' && (
                            <motion.div
                                key="export"
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 20, opacity: 0 }}
                                className="space-y-6"
                            >
                                <div>
                                    <h3 className="text-lg font-medium text-white mb-3">Exportar Quiz</h3>
                                    <p className="text-gray-400 text-sm mb-4">
                                        Salve seu quiz em formato JSON para backup ou compartilhamento.
                                    </p>

                                    {/* Export format */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Formato de exportação
                                        </label>
                                        <div className="flex gap-4">
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    value="json"
                                                    checked={exportFormat === 'json'}
                                                    onChange={(e) => setExportFormat(e.target.value as 'json')}
                                                    className="mr-2"
                                                />
                                                <span className="text-sm text-gray-300">JSON formatado (legível)</span>
                                            </label>
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    value="compressed"
                                                    checked={exportFormat === 'compressed'}
                                                    onChange={(e) => setExportFormat(e.target.value as 'compressed')}
                                                    className="mr-2"
                                                />
                                                <span className="text-sm text-gray-300">JSON comprimido (menor tamanho)</span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Quiz info */}
                                    <div className="bg-gray-800 rounded-lg p-4 mb-4">
                                        <h4 className="text-sm font-medium text-white mb-2">Informações do Quiz</h4>
                                        <div className="text-sm text-gray-300 space-y-1">
                                            <div><strong>Título:</strong> {currentQuiz.title || 'Sem título'}</div>
                                            <div><strong>Etapas:</strong> {currentQuiz.stages?.length || 0}</div>
                                            <div><strong>Blocos:</strong> {currentQuiz.stages?.reduce((total: number, stage: any) => total + (stage.blocks?.length || 0), 0) || 0}</div>
                                        </div>
                                    </div>

                                    {/* Export buttons */}
                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleExport}
                                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                                        >
                                            <Download className="w-4 h-4" />
                                            Baixar arquivo
                                        </button>
                                        <button
                                            onClick={handleCopyToClipboard}
                                            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                                        >
                                            <Copy className="w-4 h-4" />
                                            Copiar JSON
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'import' && (
                            <motion.div
                                key="import"
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -20, opacity: 0 }}
                                className="space-y-6"
                            >
                                <div>
                                    <h3 className="text-lg font-medium text-white mb-3">Importar Quiz</h3>
                                    <p className="text-gray-400 text-sm mb-4">
                                        Carregue um quiz a partir de um arquivo JSON ou cole o conteúdo diretamente.
                                    </p>

                                    {/* File upload */}
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Upload de arquivo
                                        </label>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept=".json"
                                            onChange={handleFileUpload}
                                            className="block w-full text-sm text-gray-400
                                                     file:mr-4 file:py-2 file:px-4
                                                     file:rounded-lg file:border-0
                                                     file:text-sm file:font-medium
                                                     file:bg-blue-600 file:text-white
                                                     hover:file:bg-blue-700"
                                        />
                                    </div>

                                    <div className="text-center text-gray-500 mb-4">ou</div>

                                    {/* Text input */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Cole o JSON do quiz
                                        </label>
                                        <textarea
                                            value={importText}
                                            onChange={(e) => setImportText(e.target.value)}
                                            placeholder="Cole aqui o JSON exportado do quiz..."
                                            className="w-full h-40 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:border-blue-500"
                                        />
                                    </div>

                                    <button
                                        onClick={handleImportFromText}
                                        disabled={!importText.trim()}
                                        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                                    >
                                        <Upload className="w-4 h-4" />
                                        Importar Quiz
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Status Message */}
                {status.type && (
                    <div className={`mx-6 mb-6 p-3 rounded-lg flex items-center gap-2 ${
                        status.type === 'success' 
                            ? 'bg-green-900 border border-green-700 text-green-300'
                            : 'bg-red-900 border border-red-700 text-red-300'
                    }`}>
                        {status.type === 'success' ? (
                            <CheckCircle className="w-4 h-4" />
                        ) : (
                            <AlertCircle className="w-4 h-4" />
                        )}
                        <span className="text-sm">{status.message}</span>
                    </div>
                )}
            </motion.div>
        </div>
    );
};