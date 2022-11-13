import { Dialog } from "@capacitor/dialog";

const editPostPrompt = async (title: string, message: string) => {
  const { value } = await Dialog.prompt({
    title,
    message,
  });

  return value;
};

export function postDialog() {
  return {
    editPostPrompt,
  };
}
