// url=https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G/SLOWARIUM?node-id=67-131
// source=web/src/components/ui/badge.tsx
// component=Badge
// NOTE: Live Code Connect publish blocked on Free/Pro Figma plans.
import figma from "figma";

const instance = figma.selectedInstance;
const tone = (instance.getString("Tone") ?? "info").toLowerCase();

const doc = {
  example: figma.code`<Badge tone="${tone}">A1</Badge>`,
  imports: ['import { Badge } from "@/components/ui/badge"'],
  props: { tone },
};

export default doc;
