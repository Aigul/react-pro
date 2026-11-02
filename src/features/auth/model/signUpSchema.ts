import { z } from 'zod'

export const signUpSchema = z
  .object({
    username: z.string().min(3).max(20),
    email: z.string().min(3).email('Неккоректный формат email'),
    password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
    confirmPassword: z.string().min(1, 'Подтвердите пароль'),
    socialLinks: z.array(
      z.object({
        url: z
          .string()
          .min(1, 'Ссылка не может быть пустой')
          .url('Некорректный URL'),
      })
    ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  })

export type SignUpFormData = z.infer<typeof signUpSchema>
