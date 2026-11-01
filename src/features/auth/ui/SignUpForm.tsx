import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUpSchema } from 'features/auth/model/signUpSchema'
import type { SignUpFormData } from 'features/auth/model/signUpSchema'

export function SignUpForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      socialLinks: [{ url: '' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'socialLinks',
  })

  const onSubmit = (data: SignUpFormData) => {
    console.log('data', data)
    alert('Успешная регистрация!')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
      <h2>Регистрация (Sign Up)</h2>

      <div>
        <label>Имя пользователя</label>
        <input {...register('username')} />
        {errors.username && <span className="error-message">{errors.username.message}</span>}
      </div>

      <div>
        <label>Email</label>
        <input type="email" {...register('email')} />
        {errors.email && <span className="error-message">{errors.email.message}</span>}
      </div>

      <div>
        <label>Пароль</label>
        <input type="password" {...register('password')} />
        {errors.password && <span className="error-message">{errors.password.message}</span>}
      </div>

      <div>
        <label>Подтверждение пароля</label>
        <input type="password" {...register('confirmPassword')} />
        {errors.confirmPassword && <span className="error-message">{errors.confirmPassword.message}</span>}
      </div>

      <div>
        <p>Социальные профили:</p>
        <div className="social-links">
          {fields.map((field, index) => (
            <div key={field.id} className="social-link-row">
              <input
                placeholder="https://github.com/username"
                {...register(`socialLinks.${index}.url` as const)}
              />
              <button type="button" onClick={() => remove(index)}>
                Удалить
              </button>
            </div>
          ))}
        </div>
        <button type="button" className="btn-add-link" onClick={() => append({ url: '' })}>
          + Добавить ссылку
        </button>
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Отправка...' : 'Зарегистрироваться'}
      </button>
    </form>
  )
}
