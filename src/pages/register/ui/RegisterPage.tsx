import { SignUpForm } from 'features/auth'
import { SubscriptionWizard } from 'features/auth'

export function RegisterPage() {
  return (
    <div className="register-page">
      <SignUpForm />
      <hr />
      <SubscriptionWizard />
    </div>
  )
}
