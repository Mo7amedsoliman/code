import LoginForm from "@/features/auth/components/LoginForm/LoginForm";
import LoginHero from "@/features/auth/components/LoginHero/LoginHero";

export default function LoginScreen() {
  return (
    <>
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <LoginHero />
          <LoginForm />
        </div>
      </div>
    </>
  );
}
