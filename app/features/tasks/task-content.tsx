import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "~/components/ui/card";
import {
  Lock,
  FileText,
  Clock,
  ListChecks,
  FlaskConical,
  CheckCircle2,
  Lightbulb,
} from "lucide-react";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Button } from "~/components/ui/button";
import { useFetcher, useLoaderData } from "react-router";
import { loader } from "~/routes/task-new";

export default function TaskContent() {
  const fetcher = useFetcher()
  const { task, message_id, task_id } = useLoaderData<typeof loader>()

  if (!task.title) {
    return null
  }

  return (
    <section>
      <ScrollArea className="h-full max-h-[80vh] w-full">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Lock className="w-5 h-5" /> {task.title}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" /> Descrição
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{task.description}</CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" /> Tempo estimado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span>{task.estimated_time}</span>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ListChecks className="w-5 h-5" /> Passos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1">
                {task.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FlaskConical className="w-5 h-5" /> Testes sugeridos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1">
                {task.suggested_tests.map((test, i) => (
                  <li key={i}>{test}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" /> Critérios de aceitação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1">
                {task.acceptance_criteria.map((criteria, i) => (
                  <li key={i}>{criteria}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" /> Sugestão de implementação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span>{task.implementation_suggestion}</span>
            </CardContent>
          </Card>
        </div>

      </ScrollArea>
      <fetcher.Form method="POST" className="w-full flex justify-end mt-2">
        <input type="hidden" name="task_id" value={task_id} />
        <input type="hidden" name="message_id" value={message_id} />
        <Button type="submit" disabled={fetcher.state !== 'idle'}>
          Salvar Task
        </Button>
      </fetcher.Form>
    </section>
  );
}