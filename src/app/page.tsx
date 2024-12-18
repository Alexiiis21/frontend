import { buttonVariants } from "@/components/ui/button";
import Wrapper from "@/components/Wrapper";
import {
  ArrowRight,
  FolderClock,
  FolderKanban,
  Timer,
} from 'lucide-react'
import Image from "next/image";
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
    name: 'Prioriza',
    Icon: FolderClock,
    description:"Enfócate en las tareas más urgentes primero y ve a tu ritmo."
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
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Nuestra app te ayuda a mantener tus tareas bajo control, desde
            listas de compras hasta proyectos complejos. ¡Olvídate del estrés y
            aumenta tu productividad!
          </p>
          <div className='flex flex-col gap-4 mt-6'>
            <Link
              href='/dashboard'
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
        <div>
            <div className='mx-auto max-w-6xl px-6 lg:px-8'>
              <div className='mt-16 flow-root sm:mt-16'>
                <div className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
                  <Image
                    src='/dashboard.png'
                    alt='product preview'
                    width={1364}
                    height={866}
                    quality={100}
                    className='rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10'
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className='relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]'
            />
          </div>
      </Wrapper>
      <section className='border-t border-gray-200 bg-gray-50 mt-16'>
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
