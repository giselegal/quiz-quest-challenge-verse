#!/usr/bin/env node

/**
 * Script para inserir as questões estratégicas com UUIDs válidos
 */

import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "crypto";

const supabaseUrl = "https://txqljpitotmcxntprxiu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4cWxqcGl0b3RtY3hudHByeGl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4NjI3MzQsImV4cCI6MjA2NTQzODczNH0.rHGZV47KUnSJ0fDNXbL-OjuB50BsuzT2IeO_LL-P8ok";

const supabase = createClient(supabaseUrl, supabaseKey);

// UUIDs pré-definidos para as questões estratégicas
const questionUUIDs = {
  12: "550e8400-e29b-41d4-a716-446655440012",
  13: "550e8400-e29b-41d4-a716-446655440013",
  14: "550e8400-e29b-41d4-a716-446655440014",
  15: "550e8400-e29b-41d4-a716-446655440015",
  16: "550e8400-e29b-41d4-a716-446655440016",
  17: "550e8400-e29b-41d4-a716-446655440017",
  18: "550e8400-e29b-41d4-a716-446655440018",
  19: "550e8400-e29b-41d4-a716-446655440019",
};

const strategicQuestionsData = [
  {
    order_index: 12,
    type: "text",
    title:
      "Etapa de Transição 1: Página Transição antes do resultado e oferta - 🕐 Enquanto calculamos o seu resultado... Queremos te fazer algumas perguntas que vão tornar sua experiência ainda mais completa. A ideia é simples: te ajudar a enxergar com mais clareza onde você está agora — e para onde pode ir com mais intenção, leveza e autenticidade. 💬 Responda com sinceridade. Isso é só entre você e a sua nova versão.",
    options: [],
  },
  {
    order_index: 13,
    type: "text",
    title:
      "Como você se vê hoje? - Quando você se olha no espelho, como se sente com sua imagem pessoal atualmente?",
    options: [
      { text: "Me sinto desconectada da mulher que sou hoje", points: 1 },
      { text: "Tenho dúvidas sobre o que realmente me valoriza", points: 2 },
      { text: "Às vezes acerto, às vezes erro", points: 3 },
      { text: "Me sinto segura, mas sei que posso evoluir", points: 4 },
    ],
  },
  {
    order_index: 14,
    type: "text",
    title: "O que mais te desafia na hora de se vestir?",
    options: [
      { text: "Tenho peças, mas não sei como combiná-las", points: 1 },
      { text: "Compro por impulso e me arrependo depois", points: 2 },
      { text: "Minha imagem não reflete quem eu sou", points: 3 },
      { text: "Perco tempo e acabo usando sempre os mesmos looks", points: 4 },
    ],
  },
  {
    order_index: 15,
    type: "text",
    title:
      'Com que frequência você se pega pensando: "Com que roupa eu vou?" — mesmo com o guarda-roupa cheio?',
    options: [
      { text: "Quase todos os dias — é sempre uma indecisão", points: 1 },
      { text: "Sempre que tenho um compromisso importante", points: 2 },
      { text: "Às vezes, mas me sinto limitada nas escolhas", points: 3 },
      { text: "Raramente — já me sinto segura ao me vestir", points: 4 },
    ],
  },
  {
    order_index: 16,
    type: "text",
    title:
      "Pense no quanto você já gastou com roupas que não usa ou que não representam quem você é... Você acredita que ter acesso a um material estratégico, direto ao ponto, que te ensina a aplicar seu estilo com clareza, faria diferença?",
    options: [
      { text: "Sim! Se existisse algo assim, eu quero", points: 4 },
      { text: "Sim, mas teria que ser no momento certo", points: 3 },
      { text: "Tenho dúvidas se funcionaria pra mim", points: 2 },
      { text: "Não, prefiro continuar como estou", points: 1 },
    ],
  },
  {
    order_index: 17,
    type: "text",
    title:
      "Se esse conteúdo completo custasse R$ 97,00 — incluindo Guia de Estilo, bônus especiais e um passo a passo prático para transformar sua imagem pessoal — você consideraria um bom investimento?",
    options: [
      { text: "Sim! Por esse resultado, vale muito", points: 4 },
      {
        text: "Sim, mas só se eu tiver certeza de que funciona pra mim",
        points: 3,
      },
      { text: "Talvez — depende do que está incluso", points: 2 },
      { text: "Não, ainda não estou pronta para investir", points: 1 },
    ],
  },
  {
    order_index: 18,
    type: "text",
    title:
      "Qual desses resultados você mais gostaria de alcançar com os Guias de Estilo e Imagem?",
    options: [
      { text: "Montar looks com mais facilidade e confiança", points: 1 },
      { text: "Usar o que já tenho e me sentir estilosa", points: 2 },
      { text: "Comprar com mais consciência e sem culpa", points: 3 },
      { text: "Ser admirada pela imagem que transmito", points: 4 },
      {
        text: "Resgatar peças esquecidas e criar novos looks com estilo",
        points: 5,
      },
    ],
  },
  {
    order_index: 19,
    type: "text",
    title:
      "Etapa Transição 2: mensagem antes do resultado - Obrigada por compartilhar. Chegar até aqui já mostra que você está pronta para se olhar com mais amor, se vestir com mais intenção e deixar sua imagem comunicar quem você é de verdade — com leveza, presença e propósito. Agora, é hora de revelar o seu Estilo Predominante — e os seus Estilos Complementares. E, mais do que isso, uma oportunidade real de aplicar o seu Estilo com leveza e confiança — todos os dias. Ah, e lembra do valor que mencionamos? Prepare-se para uma surpresa: o que você vai receber vale muito mais do que imagina — e vai custar muito menos do que você esperava.",
    options: [],
  },
];

const insertStrategicQuestions = async () => {
  console.log("🚀 Inserindo questões estratégicas...");

  try {
    const quizId = "550e8400-e29b-41d4-a716-446655440000";

    for (const questionData of strategicQuestionsData) {
      // Inserir/atualizar questão usando UUID válido
      const questionId = questionUUIDs[questionData.order_index];

      const { data: question, error: questionError } = await supabase
        .from("quiz_questions")
        .upsert(
          {
            id: questionId,
            quiz_id: quizId,
            title: questionData.title,
            type: questionData.type,
            order_index: questionData.order_index,
            required_selections: 1,
            active: true,
          },
          {
            onConflict: "id",
          }
        );

      if (questionError) {
        console.error(
          `❌ Erro ao inserir questão ${questionData.order_index}:`,
          questionError
        );
        continue;
      }

      console.log(`✅ Questão ${questionData.order_index} inserida`);

      // Inserir opções se existirem
      if (questionData.options && questionData.options.length > 0) {
        for (const [index, option] of questionData.options.entries()) {
          const optionId = `${questionId}-opt${index + 1}`;

          const { error: optionError } = await supabase
            .from("question_options")
            .upsert(
              {
                id: optionId,
                question_id: questionId,
                text: option.text,
                style_code: "",
                points: option.points,
                order_index: index + 1,
              },
              {
                onConflict: "id",
              }
            );

          if (optionError) {
            console.error(
              `❌ Erro ao inserir opção ${index + 1} da questão ${
                questionData.order_index
              }:`,
              optionError
            );
          }
        }
        console.log(
          `✅ ${questionData.options.length} opções inseridas para questão ${questionData.order_index}`
        );
      }
    }

    console.log(
      "🎉 Todas as questões estratégicas foram inseridas com sucesso!"
    );
    return true;
  } catch (error) {
    console.error("❌ Erro geral ao inserir questões:", error);
    return false;
  }
};

// Executar a função
const runUpdate = async () => {
  console.log("🚀 Iniciando atualização das questões estratégicas...");
  console.log("📊 Total de questões a inserir:", strategicQuestionsData.length);

  try {
    const success = await insertStrategicQuestions();

    if (success) {
      console.log("🎉 SUCESSO: Questões estratégicas atualizadas com sucesso!");
      console.log("🌐 Recarregue o site para ver as mudanças!");
      process.exit(0);
    } else {
      console.log("❌ ERRO: Falha ao atualizar questões estratégicas");
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ ERRO CRÍTICO:", error);
    process.exit(1);
  }
};

console.log("🔧 Script iniciado...");
runUpdate().catch((error) => {
  console.error("❌ Erro na execução:", error);
  process.exit(1);
});
