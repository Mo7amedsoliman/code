import SignupForm from "@/features/auth/components/SignupForm/SignupForm";
import SignupHero from "@/features/auth/components/SignupHero/SignupHero";

export default function SignupPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <SignupHero />
          <SignupForm />
        </div>
      </div>
    </>
  );
}
