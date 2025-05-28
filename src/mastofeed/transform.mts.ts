import { Transform } from "mastofeed/dist/utils/transforms.mjs";

export class TrimTransform extends Transform {
    apply = (value: string) => {
        return value.trim();
    };
}
