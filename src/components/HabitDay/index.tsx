import * as P from '@radix-ui/react-popover';
import * as X from '@radix-ui/react-checkbox';
import { clsx } from 'clsx';


import { ProgressBar } from '../ProgressBar';
import { Check } from 'phosphor-react';
import dayjs from 'dayjs';

interface HabitDayProps {
  date: Date
  completed?: number
  amount?: number
}

export function HabitDay({ completed = 0, amount = 0, date }: HabitDayProps) {

  const completedPercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0

  const dayAndMonth = dayjs(date).format('DD/MM')
  const dayOfWeek = dayjs(date).format('dddd')

  return (

    <P.Root>
      <P.Trigger
        className={clsx('w-10 h-10 border-2  rounded-lg', {
          'bg-zinc-900 border-zinc-800': completedPercentage === 0,
          'bg-violet-900 border-violet-700': completedPercentage > 0 && completedPercentage < 20,
          'bg-violet-800 border-violet-600': completedPercentage >= 20 && completedPercentage < 40,
          'bg-violet-700 border-violet-500': completedPercentage >= 40 && completedPercentage < 60,
          'bg-violet-600 border-violet-500': completedPercentage >= 60 && completedPercentage < 80,
          'bg-violet-500 border-violet-400': completedPercentage >= 80,
        })}
      />

      <P.Portal>
        <P.Content className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col'>
          <span className='font-semibold text-zinc-400'>{dayOfWeek}</span>
          <span className='mt-1 font-extrabold leading-tight text-3xl '>{dayAndMonth}</span>

          <ProgressBar progress={completedPercentage} />

          <div className='mt-6 flex flex-col gap-3'>

            <X.Root className='flex items-center gap-3 group'>
              <div className=' h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-x-green-500'>
                <X.Indicator >
                  <Check size={20} className=" text-white" />
                </X.Indicator>

              </div>


              <span className='font-semibold text-xl leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>
                Beber 2L litro de água
              </span>
            </X.Root>

          </div>


          <P.Arrow height={9} width={15} className='fill-zinc-900' />
        </P.Content>
      </P.Portal>
    </P.Root>


  );
}