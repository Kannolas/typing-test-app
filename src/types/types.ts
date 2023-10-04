export type TextType = {
    char: string;
    class: string;
  };

 export type TextState = {
    text: TextType[];
    isLoading: boolean;
    error: string | null | undefined;
    currentCharIndex: number;
    mistakes: number;
    pressingCount: number;
  };