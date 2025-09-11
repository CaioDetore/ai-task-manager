import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "~/components/ui/card"

export function Welcome() {
  return (
    <main className="p-12">
      <Card>
        <CardHeader>
          <CardTitle>Bem-vindo ao AI Task Manager</CardTitle>
          <CardDescription>
            Organize suas tarefas de forma inteligente e eficiente com a ajuda da IA.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Comece criando uma nova tarefa ou explore as funcionalidades avançadas para aumentar sua produtividade.
          </p>
        </CardContent>
        <CardFooter>
          <span className="text-xs text-muted-foreground">Desenvolvido com React e IA</span>
        </CardFooter>
      </Card>
    </main>
  )
};
