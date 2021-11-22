import bcryptjs from "bcryptjs";

export const generatePassword = async (password) => {
    const salt = await bcryptjs.genSalt(12);
    return await bcryptjs.hash(password, salt);
}

export const comparePassword = async (password, newPassword) => {
    return await bcryptjs.compare(newPassword, password);
}