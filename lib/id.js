import ShortUniqueId from "short-unique-id";

export const generateId = () => {
    const uid = new ShortUniqueId({ length: 12 });

    return uid();
};