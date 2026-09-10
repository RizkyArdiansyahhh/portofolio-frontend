import { StackBlock } from "@/features/stack/components/stack-block";
import { StackForm } from "@/features/stack/components/stack-form";

const StackPage = () => {
  return (
    <div className="w-full h-full flex flex-col md:flex-row gap-6 items-start">
      <div className="w-full md:w-80 lg:w-96 shrink-0">
        <StackForm />
      </div>
      <div className="flex-1 w-full min-w-0">
        <StackBlock />
      </div>
    </div>
  );
};

export default StackPage;
