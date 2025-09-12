import React from 'react';

/**
 * Utilitário para renderização segura de propriedades de texto
 * Previne o erro React #31 quando objetos são passados como children
 */

/**
 * Converte qualquer valor em uma string segura para renderização
 * @param textProp - A propriedade de texto que pode ser string ou objeto
 * @param fallback - Valor padrão caso não seja possível extrair texto
 * @returns String segura para renderização
 */
export const safeRenderText = (textProp: any, fallback: string = 'Texto'): string => {
    // Se já é uma string, retorna diretamente
    if (typeof textProp === 'string') {
        return textProp;
    }

    // Se é um objeto, tenta extrair propriedades comuns de texto
    if (typeof textProp === 'object' && textProp !== null) {
        // Propriedades comuns para texto
        const textProps = ['text', 'content', 'value', 'label', 'title'];

        for (const prop of textProps) {
            if (prop in textProp && typeof textProp[prop] === 'string') {
                return textProp[prop];
            }
        }

        // Se tem toString customizado, usa ele
        if (textProp.toString && textProp.toString !== Object.prototype.toString) {
            return textProp.toString();
        }
    }

    // Se é número, converte para string
    if (typeof textProp === 'number') {
        return textProp.toString();
    }

    // Se é boolean, converte para string
    if (typeof textProp === 'boolean') {
        return textProp.toString();
    }

    // Fallback para casos não cobertos
    return fallback;
};

/**
 * Versões específicas para diferentes tipos de componentes
 */
export const safeRenderButtonText = (textProp: any): string =>
    safeRenderText(textProp, 'Botão');

export const safeRenderHeadingText = (textProp: any): string =>
    safeRenderText(textProp, 'Título');

export const safeRenderOptionText = (textProp: any): string =>
    safeRenderText(textProp, 'Opção');

export const safeRenderContentText = (textProp: any): string =>
    safeRenderText(textProp, 'Conteúdo');

export const safeRenderQuestionText = (textProp: any): string =>
    safeRenderText(textProp, 'Pergunta');

/**
 * Função para validar se um valor é seguro para renderização
 * @param value - Valor a ser verificado
 * @returns true se o valor é seguro para renderizar como children
 */
export const isSafeToRender = (value: any): boolean => {
    return (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        value === null ||
        value === undefined ||
        React.isValidElement(value)
    );
};