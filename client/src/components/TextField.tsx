import { ArcherElement } from "react-archer";
import { RelationType } from "react-archer/lib/types";
import { cn } from "../utils/cn";

const TextField = ({
  relations,
  id,
  text,
  className,
}: {
  relations?: RelationType[];
  id: string;
  text: string;
  className?: string;
}) => {
  return (
    <ArcherElement id={id} relations={relations}>
      <div className="relative group ">
        <p
          className={cn(
            `text-[14px] relative py-2 px-2 md:px-8 text-grad-3 bg-popover rounded-md border-2 border-[#9ca3af95]`,
            className
          )}
        >
          {text}
        </p>
      </div>
    </ArcherElement>
  );
};

export default TextField;
