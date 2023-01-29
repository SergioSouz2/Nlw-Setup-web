import * as D from '@radix-ui/react-dialog';

import logoImage from '../../assets/logo.png'
import { Plus, X } from 'phosphor-react'
import { useState } from 'react';
import { NewHabitForm } from '../NewHabitForm';



export function Header() {

  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className='w-full max-w-3xl mx-auto flex items-center justify-between'>
      <img src={logoImage} alt="Habits" />

      <D.Root>
        <D.Trigger
          type='button'
          className='border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center justify-center gap-3 hover:border-violet-300'
        >
          <Plus size={20} className="text-violet-500" />
          Novo Hábito
        </D.Trigger>

        <D.Portal>
          <D.Overlay className='w-screen h-screen bg-black/80 fixed inset-0' />

          <D.Content className='absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>

            <D.Close className='absolute right-6 top-6 text-zinc-400 hover:text-zinc-200'>
              <X size={24} aria-label='Fechar' />
            </D.Close>

            <D.Title className='text-3xl leading-tight font-extrabold'>
              Criar hábito
            </D.Title>

            <NewHabitForm />

          </D.Content>
        </D.Portal>
      </D.Root>

    </div>

  );
}

