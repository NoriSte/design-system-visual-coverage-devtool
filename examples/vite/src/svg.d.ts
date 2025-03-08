declare module '*.svg' {
    import type { FC, SVGProps } from 'react';

    declare const Component: FC<SVGProps<SVGSVGElement>>;

    export default Component;
}
