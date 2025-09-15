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

const data = {
  title: "Secure Login Form with Authentication",
  description:
    "Implement a modern login form with field validation, session-based authentication, and real-time error feedback.",
  estimated_time: "2 days",
  steps: [
    "Create a form component using React",
    "Add field validation using a suitable library",
    "Connect backend for user authentication",
    "Persist sessions using SQLite",
    "Test full login and logout flow",
  ],
  suggested_tests: [
    "it('should render login form correctly')",
    "it('should validate input fields')",
    "it('should authenticate valid credentials')",
    "it('should prevent access with invalid credentials')",
  ],
  acceptance_criteria: [
    "Login form displays properly with required fields",
    "Invalid input is correctly flagged",
    "Valid users can log in and maintain a session",
    "Users are redirected upon login and logout",
  ],
  implementation_suggestion:
    "Use React Hook Form for input validation, Prisma ORM for managing user data, and configure protected routes using React Router 7.",
};

export default function TaskContent() {
  return (
    <section>
      <ScrollArea className="h-full max-h-[80vh] w-full">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Lock className="w-5 h-5" /> {data.title}
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
              <CardDescription>{data.description}</CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" /> Tempo estimado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span>{data.estimated_time}</span>
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
                {data.steps.map((step, i) => (
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
                {data.suggested_tests.map((test, i) => (
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
                {data.acceptance_criteria.map((criteria, i) => (
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
              <span>{data.implementation_suggestion}</span>
            </CardContent>
          </Card>
        </div>

      </ScrollArea>
      <div className="w-full flex justify-end mt-2">
        <Button>
          Salvar Task
        </Button>
      </div>
    </section>
  );
}