import { ArcherContainer } from "react-archer";
import TextField from "./TextField";
import { cn } from "../utils/cn";

const lineStyle = {
  strokeColor: "#9ca3af8e",
  startMarker: false,
  endMarker: false,
};

type FeatueGraphType = { className: string };
export function FeatueGraph({ className }: FeatueGraphType) {
  return (
    <div
      className={cn(
        "w-[320px] md:w-[490px] flex items-center justify-center self-center",
        className
      )}
    >
      <ArcherContainer className="h-full w-full">
        <div className="w-full h-full flex items-center py-8">
          <div className="flex w-full flex-col md:flex-col gap-12 sm:gap-0">
            <div className="w-full flex items-center justify-center  md:items-end gap-4 mf:gap-8 pb-4 sm:pb-10 mf:pb-16">
              <TextField
                text="Reliability"
                id="input1"
                relations={[
                  {
                    targetId: "process",
                    targetAnchor: "top",
                    sourceAnchor: "bottom",
                    style: lineStyle,
                  },
                ]}
              />
              <TextField
                text="Security"
                id="input2"
                relations={[
                  {
                    targetId: "process",
                    targetAnchor: "top",
                    sourceAnchor: "bottom",
                    style: lineStyle,
                  },
                ]}
              />
              <TextField
                text="Ethereum"
                id="input3"
                relations={[
                  {
                    targetId: "process",
                    targetAnchor: "top",
                    sourceAnchor: "bottom",
                    style: lineStyle,
                  },
                ]}
              />
            </div>
            <div className="md:w-full md:w--1/3 w-full flex items-center justify-center">
              <TextField
                text="BitTrade"
                id="process"
                relations={[
                  {
                    targetId: "output1",
                    targetAnchor: "top",
                    sourceAnchor: "bottom",
                    style: { ...lineStyle },
                  },
                  {
                    targetId: "output2",
                    targetAnchor: "top",
                    sourceAnchor: "bottom",
                    style: { ...lineStyle },
                  },
                  {
                    targetId: "output3",
                    targetAnchor: "top",
                    sourceAnchor: "bottom",
                    style: { ...lineStyle },
                  },
                ]}
                className="font-bold border-transparent text-grad-3 border-2 border-gray-400 "
              />
            </div>
            <div className="flex justify-center gap-4 mf:gap-8 pt-4 sm:pt-10 mf:pt-16">
              <TextField text="Low Fees" id="output1" />
              <TextField text="Blockchain" id="output2" />
              <TextField text="Web 3.0" id="output3" />
            </div>
          </div>
        </div>
      </ArcherContainer>
    </div>
  );
}
