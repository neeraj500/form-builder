import FormBuilderWrapper from "@/components/FormBuilderWrapper";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center">
      <main className="text-3xl font-bold underline">
        <FormBuilderWrapper />
      </main>
    </div>
  );
}
