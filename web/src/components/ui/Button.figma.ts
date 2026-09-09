// url=https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G/SLOWARIUM?node-id=67-2
// source=web/src/components/ui/button.tsx
// component=Button
// NOTE: Live Code Connect publish blocked on Free/Pro Figma plans (Org/Enterprise + Dev seat required).
import figma from "figma";

const instance = figma.selectedInstance;
const style = instance.getString("Style") ?? "Primary";
const state = instance.getString("State") ?? "Default";

const variantMap: Record<string, string> = {
  Primary: "primary",
  Amber: "amber",
  Secondary: "secondary",
  Ghost: "ghost",
};

const doc = {
  example: figma.code`<Button variant="${variantMap[style] ?? "primary"}"${state === "Disabled" ? " disabled" : ""}>Continue</Button>`,
  imports: ['import { Button } from "@/components/ui/button"'],
  props: {
    variant: variantMap[style] ?? "primary",
    disabled: state === "Disabled",
  },
};

export default doc;
