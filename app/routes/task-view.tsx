import prisma from "prisma/prisma";
import { redirect } from "react-router";
import type { Route } from "./+types/task-view";

export async function loader({ params }: Route.LoaderArgs) {
  const task = await prisma.task.findUnique({
    where: {
      id: params.id
    }
  })

  if (!task) {
    return redirect('/tasks')
  }

  return { task }
}

export default function ({ loaderData }: Route.ComponentProps) {
  const { task } = loaderData;

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-md mt-8">
      <h1 className="text-2xl font-bold mb-4">{task.title}</h1>
      <div className="mb-4">
        <span className="font-semibold">Descrição:</span>
        <p className="text-gray-700 mt-1 whitespace-pre-line">{task.description}</p>
      </div>
      <div className="mb-4">
        <span className="font-semibold">Tempo Estimado:</span>
        <span className="ml-2 text-gray-800">{task.estimated_time}</span>
      </div>
      {task.acceptance_criteria && (
        <div className="mb-4">
          <span className="font-semibold">Critérios de Aceitação:</span>
          <ul className="list-disc list-inside mt-1 text-gray-700">
            {Array.isArray(task.acceptance_criteria)
              ? task.acceptance_criteria.map((c: string, i: number) => <li key={i}>{c}</li>)
              : (() => {
                  try {
                    return JSON.parse(task.acceptance_criteria).map((c: string, i: number) => <li key={i}>{c}</li>);
                  } catch {
                    return <li>{task.acceptance_criteria}</li>;
                  }
                })()}
          </ul>
        </div>
      )}
      {task.suggested_tests && (
        <div className="mb-4">
          <span className="font-semibold">Testes Sugeridos:</span>
          <ul className="list-disc list-inside mt-1 text-gray-700">
            {Array.isArray(task.suggested_tests)
              ? task.suggested_tests.map((t: string, i: number) => <li key={i}>{t}</li>)
              : (() => {
                  try {
                    return JSON.parse(task.suggested_tests).map((t: string, i: number) => <li key={i}>{t}</li>);
                  } catch {
                    return <li>{task.suggested_tests}</li>;
                  }
                })()}
          </ul>
        </div>
      )}
      {task.implementation_suggestion && (
        <div className="mb-4">
          <span className="font-semibold">Sugestão de Implementação:</span>
          <p className="text-gray-700 mt-1 whitespace-pre-line">{task.implementation_suggestion}</p>
        </div>
      )}
      {task.steps && (
        <div className="mb-4">
          <span className="font-semibold">Passos:</span>
          <ul className="list-decimal list-inside mt-1 text-gray-700">
            {Array.isArray(task.steps)
              ? task.steps.map((s: string, i: number) => <li key={i}>{s}</li>)
              : (() => {
                  try {
                    return JSON.parse(task.steps).map((s: string, i: number) => <li key={i}>{s}</li>);
                  } catch {
                    return <li>{task.steps}</li>;
                  }
                })()}
          </ul>
        </div>
      )}
      {task.content && (
        <div className="mb-4">
          <span className="font-semibold">Conteúdo:</span>
          <pre className="bg-gray-100 rounded p-2 mt-1 overflow-x-auto text-sm">{task.content}</pre>
        </div>
      )}
      <div className="text-sm text-gray-500 mt-6 flex flex-col gap-1">
        <span>Criado em: {new Date(task.created_at).toLocaleString("pt-BR")}</span>
        <span>Atualizado em: {new Date(task.updated_at).toLocaleString("pt-BR")}</span>
      </div>
    </div>
  );
}