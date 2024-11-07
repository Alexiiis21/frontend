import { buttonVariants } from "@/components/ui/button";
import Wrapper from "@/components/Wrapper";
import {
  ArrowRight,
  FolderKanban,
  Timer,
} from 'lucide-react'
import Link from "next/link";


const perks = [
  {
    name: 'Productividad',
    Icon: FolderKanban,
    description:
      'Clasifica tus tareas, establece prioridades y visualiza tu día de forma clara y concisa',
  },
  {
    name: 'A tiempo',
    Icon: Timer,
    description:
      'Lleva el control de tu vida y tus tareas, nunca más olvides una fecha límite.',
  },
  {
    name: 'Por definir',
    Icon: Timer,
    description:"por definir"
  },
]

export default function Home() {
  return (
    <main>
      <Wrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-4xl pb-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Manten tus tareas bajo control y {""}
            <span className="text-primary">aumenta tu productividad</span>.
            Organiza tu vida.
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Nuestra app te ayuda a mantener tus tareas bajo control, desde
            listas de compras hasta proyectos complejos. ¡Olvídate del estrés y
            aumenta tu productividad!
          </p>
          <div className='flex flex-col gap-4 mt-6'>
            <Link
              href='/mis-paquetes'
              className={buttonVariants({
                size: 'default',
                className: 'w-full px-6 h-full py-3 my-8',
              })}>
                <span className='w-full px-6 flex text-center items-center justify-center h-full'>
                Comienza
                <ArrowRight className='w-4 h-4 ml-1.5'/>
                </span>
            </Link>
            </div>
        </div>
        <div className='w-full h-full flex items-center justify-center'>
        <img aria-hidden={true} src='/image-1.jpeg' alt='Map' className='max-w-2xl relative ' width={500} height={50}/>
        </div>
      </Wrapper>
      <section className='border-t border-gray-200 bg-gray-50'>
        <Wrapper className='py-20'>
          <div className='grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0'>
            {perks.map((perk) => (
              <div
                key={perk.name}
                className='text-center md:flex md:items-start md:text-left lg:block lg:text-center'>
                <div className='md:flex-shrink-0 flex justify-center'>
                  <div className='h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900'>
                    {<perk.Icon className='w-1/3 h-1/3' />}
                  </div>
                </div>

                <div className='mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6'>
                  <h3 className='text-base font-medium text-gray-900'>
                    {perk.name}
                  </h3>
                  <p className='mt-3 text-sm text-muted-foreground'>
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Wrapper>
      </section>
    </main>
  );
}
