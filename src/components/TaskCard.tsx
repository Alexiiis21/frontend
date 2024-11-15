import { tasks } from "@/files/file";
import { compareAsc, format } from "date-fns";
import { es } from "date-fns/locale";
import Link from "next/link";

const TaskCard = () => {
  return (
    <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
    {tasks
      .sort((a, b) => compareAsc(a.date, b.date))
      .map((task) => (
        <li key={task.id} className="flex flex-col bg-muted">
          <Link href="#" legacyBehavior>
            <a className="text-lg font-semibold text-primary">
              {task.name}
            </a>
          </Link>
          <span>{task.description}</span>
          <span className="text-sm text-gray-500">
            Fecha límite: {format(task.date, "PPPPP p", { locale: es })}
          </span>
        </li>
      ))}
  </ul>
  )
}

export default TaskCard