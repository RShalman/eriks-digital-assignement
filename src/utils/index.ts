export const sleep = (delay = 3000): Promise<unknown> => {
    return new Promise((resolve) => setTimeout(resolve, delay));
};
