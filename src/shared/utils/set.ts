import { Indexed } from "@shared/models/common";

function merge(lhs: Indexed, rhs: Indexed): Indexed {
    Object.keys(rhs).forEach((p) => {
        if (!Object.prototype.hasOwnProperty.call(rhs, p)) {
            return;
        }
        try {
            if ((rhs[p] as Object).constructor === Object) {
                rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
            } else {
                lhs[p] = rhs[p];
            }
        } catch (e) {
            if (e instanceof Error) {
                lhs[p] = rhs[p];
            }
        }
    });

    return lhs;
}

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
    if (typeof object !== 'object' || object === null) {
        return object;
    }

    if (typeof path !== 'string') {
        throw new Error('path must be string');
    }

    const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
        [key]: acc,
    }), value as any);
    return merge(object as Indexed, result);
}