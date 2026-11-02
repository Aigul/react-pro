import { useActionState } from 'react'

type ActionState = {
  status: 'idle' | 'success' | 'error'
  message: string
}

async function subscribeAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const email = formData.get('email')?.toString().trim()

  if (!email || !email.includes('@')) {
    return { status: 'error', message: 'Укажите кооректный  email' }
  }
  await new Promise<ActionState>((resolve) => setTimeout(resolve, 1500))

  return { status: 'success', message: `Вы успешно подписаны: ${email}` }
}

export function SubscriptionWizard() {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    subscribeAction,
    {
      status: 'idle',
      message: '',
    }
  )
  if (state.status === 'success') {
    return <div>{state.message}</div>
  }

  return (
    <div>
      <h3>Шаг 2: Подтверждение подписки</h3>
      <form action={formAction}>
        <input
          type="email"
          name="email"
          disabled={isPending}
          placeholder="Ввведите email"
        />
        {state.status === 'error' && <div>{state.message}</div>}
        <button type="submit" disabled={isPending}>
          {isPending ? 'Отправка...' : 'Подписаться'}
        </button>
      </form>
    </div>
  )
}
